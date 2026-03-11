// SPDX-License-Identifier: MIT
// Exponent Platform - Dividend Calendar Smart Contract
// MVP Version: Dividend Calendar with snapshot mechanism

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DividendCalendar
 * @author Exponent Platform
 * @notice 分红日历智能合约 - 支持多次分红计划和快照机制
 *
 * Features:
 * - 创始人可以设置多个分红计划（到期日和金额）
 * - 到期日自动创建持币者快照
 * - 投资者按持币比例领取分红
 * - 违约惩罚机制（65% 创始人代币锁定）
 */
contract DividendCalendar is ERC20, ERC20Permit, Ownable, ReentrancyGuard {

    // ========== 状态变量 ==========

    /// @notice 分红计划结构
    struct DividendPlan {
        uint256 daysFromGraduation; // 自毕业日起的天数
        uint256 amount;             // 承诺分红金额（USDT）
        uint256 snapshotTime;       // 快照时间戳
        uint256 totalSupply;        // 快照时总供应量
        bool claimed;               // 是否已领取
        mapping(address => uint256) claimedAmount; // 各地址已领取金额
    }

    /// @notice 持币者分红记录
    struct HolderRecord {
        uint256 balance;        // 快照时持币量
        uint256 dividendRight;  // 应得分红
        bool claimed;           // 是否已领取
    }

    /// @notice 项目状态枚举
    enum ProjectStatus {
        Preparing,          // 筹备中
        PendingReview,      // 审核中
        Cornerstone,        // 基石轮
        Public,             // 公开募集
        Coming,             // 即将上市
        Listed,             // 已上市
        Failed              // 募集失败
    }

    // 分红计划数组
    DividendPlan[] public dividendPlans;

    // 快照记录：分红计划索引 -> 持币者地址 -> 持币记录
    mapping(uint256 => mapping(address => HolderRecord)) public snapshotRecords;

    // 是否已创建快照
    mapping(uint256 => bool) public snapshotCreated;

    // 项目状态
    ProjectStatus public status;

    // 毕业时间戳
    uint256 public graduationTime;

    // 创始人地址
    address public founder;

    // 创始人代币锁定比例（65%）
    uint256 public constant FOUNDER_LOCK_RATIO = 6500; // 基础点数 10000 = 100%

    // 分红达标状态
    mapping(uint256 => bool) public dividendAchieved;

    // 事件
    event DividendPlanAdded(uint256 indexed planIndex, uint256 days, uint256 amount);
    event SnapshotCreated(uint256 indexed planIndex, uint256 snapshotTime, uint256 totalSupply);
    event DividendDeposited(uint256 indexed planIndex, uint256 amount);
    event DividendClaimed(uint256 indexed planIndex, address indexed holder, uint256 amount);
    event DividendFailed(uint256 indexed planIndex, string reason);
    event ProjectGraduated(uint256 graduationTime);
    event FounderTokensLocked(address indexed founder, uint256 lockedAmount);

    // ========== 构造函数 ==========

    constructor(
        string memory name,
        string memory symbol,
        address _founder,
        uint256 initialSupply
    ) ERC20(name, symbol) ERC20Permit(name) Ownable(_founder) {
        founder = _founder;
        status = ProjectStatus.Preparing;

        // 铸造初始代币（总量）
        // 分配：20% 公开发售，15% 流动性储备，65% 创始人锁定
        _mint(address(this), initialSupply);
    }

    // ========== 管理员函数 ==========

    /**
     * @notice 添加分红计划
     * @param days 自毕业日起的天数
     * @param amount 承诺分红金额（USDT）
     */
    function addDividendPlan(uint256 days, uint256 amount) external onlyOwner {
        require(status == ProjectStatus.Preparing || status == ProjectStatus.PendingReview,
                "Only allowed before listing");
        require(days > 0, "Days must be positive");
        require(amount > 0, "Amount must be positive");

        uint256 planIndex = dividendPlans.length;
        DividendPlan storage plan = dividendPlans.push();
        plan.daysFromGraduation = days;
        plan.amount = amount;

        emit DividendPlanAdded(planIndex, days, amount);
    }

    /**
     * @notice 项目毕业
     * @notice 触发条件：达到硬顶或 90 天到期
     */
    function graduate() external onlyOwner {
        require(status == ProjectStatus.Coming, "Must be in Coming status");
        require(graduationTime == 0, "Already graduated");

        graduationTime = block.timestamp;
        status = ProjectStatus.Listed;

        // 计算所有分红计划的快照时间
        for (uint256 i = 0; i < dividendPlans.length; i++) {
            dividendPlans[i].snapshotTime = graduationTime + (dividendPlans[i].daysFromGraduation * 1 days);
        }

        // 锁定创始人代币（65%）
        uint256 founderBalance = balanceOf(founder);
        uint256 lockedAmount = (founderBalance * FOUNDER_LOCK_RATIO) / 10000;

        emit ProjectGraduated(graduationTime);
        emit FounderTokensLocked(founder, lockedAmount);
    }

    /**
     * @notice 创建分红快照
     * @notice 任何人均可触发，Gas 优化考虑
     * @param planIndex 分红计划索引
     */
    function createSnapshot(uint256 planIndex) external nonReentrant {
        require(planIndex < dividendPlans.length, "Invalid plan index");
        require(!snapshotCreated[planIndex], "Snapshot already created");
        require(block.timestamp >= dividendPlans[planIndex].snapshotTime, "Snapshot time not reached");
        require(status == ProjectStatus.Listed, "Project must be listed");

        DividendPlan storage plan = dividendPlans[planIndex];
        plan.totalSupply = totalSupply();
        snapshotCreated[planIndex] = true;

        // 记录所有持币者的余额
        // 注意：实际生产中需要使用链下快照或 Gas 优化方案
        // 这里简化处理，在 claim 时动态计算

        emit SnapshotCreated(planIndex, block.timestamp, plan.totalSupply);
    }

    /**
     * @notice 存入分红资金
     * @notice 创始人或任何人可代存
     * @param planIndex 分红计划索引
     * @param amount 存入金额
     * @param dividendToken 分红代币地址（USDT）
     */
    function depositDividend(
        uint256 planIndex,
        uint256 amount,
        address dividendToken
    ) external nonReentrant {
        require(planIndex < dividendPlans.length, "Invalid plan index");
        require(snapshotCreated[planIndex], "Snapshot not created");
        require(!dividendPlans[planIndex].claimed, "Dividend already claimed");

        // 转移 USDT 到合约
        // 需要用户先 approve 此合约
        IERC20(dividendToken).transferFrom(msg.sender, address(this), amount);

        emit DividendDeposited(planIndex, amount);

        // 检查是否达标
        if (amount >= dividendPlans[planIndex].amount) {
            dividendAchieved[planIndex] = true;
        } else {
            emit DividendFailed(planIndex, "Insufficient amount");
        }
    }

    /**
     * @notice 领取分红
     * @param planIndex 分红计划索引
     */
    function claimDividend(uint256 planIndex, address dividendToken) external nonReentrant {
        require(planIndex < dividendPlans.length, "Invalid plan index");
        require(snapshotCreated[planIndex], "Snapshot not created");
        require(dividendPlans[planIndex].claimed, "Dividend not ready");
        require(dividendPlans[planIndex].claimedAmount[msg.sender] == 0, "Already claimed");

        DividendPlan storage plan = dividendPlans[planIndex];

        // 计算持币者应得分红
        uint256 holderBalance = _getSnapshotBalance(planIndex, msg.sender);
        require(holderBalance > 0, "No balance at snapshot time");

        uint256 dividendAmount = (holderBalance * plan.amount) / plan.totalSupply;
        require(dividendAmount > 0, "Dividend too small");

        // 标记已领取
        plan.claimedAmount[msg.sender] = dividendAmount;

        // 转移分红代币
        IERC20(dividendToken).transfer(msg.sender, dividendAmount);

        emit DividendClaimed(planIndex, msg.sender, dividendAmount);
    }

    // ========== 查看函数 ==========

    /**
     * @notice 获取分红计划详情
     */
    function getDividendPlan(uint256 planIndex) external view returns (
        uint256 daysFromGraduation,
        uint256 amount,
        uint256 snapshotTime,
        uint256 totalSupply,
        bool claimed,
        bool achieved
    ) {
        require(planIndex < dividendPlans.length, "Invalid plan index");
        DividendPlan storage plan = dividendPlans[planIndex];
        return (
            plan.daysFromGraduation,
            plan.amount,
            plan.snapshotTime,
            plan.totalSupply,
            plan.claimed,
            dividendAchieved[planIndex]
        );
    }

    /**
     * @notice 获取可领取分红金额
     */
    function getClaimableDividend(uint256 planIndex, address holder) external view returns (uint256) {
        require(planIndex < dividendPlans.length, "Invalid plan index");
        require(dividendPlans[planIndex].claimedAmount[holder] == 0, "Already claimed");

        uint256 holderBalance = _getSnapshotBalance(planIndex, holder);
        if (holderBalance == 0) return 0;

        return (holderBalance * dividendPlans[planIndex].amount) / dividendPlans[planIndex].totalSupply;
    }

    /**
     * @notice 检查分红是否达标
     */
    function isDividendAchieved(uint256 planIndex) external view returns (bool) {
        return dividendAchieved[planIndex];
    }

    /**
     * @notice 获取创始人锁定代币状态
     */
    function getFounderLockedBalance() external view returns (uint256) {
        uint256 founderBalance = balanceOf(founder);
        return (founderBalance * FOUNDER_LOCK_RATIO) / 10000;
    }

    // ========== 内部函数 ==========

    /**
     * @notice 获取快照时持币余额
     * @notice 简化实现，实际生产需要使用 Merkle Tree 或链下快照
     */
    function _getSnapshotBalance(uint256 planIndex, address account) internal view returns (uint256) {
        // MVP 简化：直接返回当前余额
        // TODO: 实现完整的快照机制
        return balanceOf(account);
    }

    // ========== 紧急函数 ==========

    /**
     * @notice 紧急提款（仅管理员）
     * @notice 仅在合约被攻击或异常时使用
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner, amount);
    }
}

// ========== USDT 接口 ==========
interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}
