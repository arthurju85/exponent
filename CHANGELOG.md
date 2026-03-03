# Exponent 设计文档变更记录

## 版本 v1.9 - 2026-03-03

### 变更概述
首页 Hero 区域文案和交互调整：按钮文案变更、实现内测标签多语言支持、按钮改为可点击状态。修复日文翻译文件缺失键问题。

### 详细变更内容

#### 1. Hero Section 按钮与交互调整

**变更前:**
- 主按钮: "预约内测资格" (灰色不可点击状态)
- 次按钮: "了解产品"
- 内测标签: 硬编码中文 "内测阶段 · 邀请制" (无多语言支持)

**变更后:**
- 主按钮: "启动我的项目" (可点击，跳转 /onboarding，需登录)
- 次按钮: "探索项目" (跳转 /explore)
- 内测标签: 使用 `t('betaBadge')` 支持多语言
  - 英文: "Beta · Invitation Only"
  - 简体中文: "内测阶段 · 邀请制"
  - 繁体中文: "內測階段 · 邀請制"
  - 日文: "ベータ · 招待制"

**影响文件:**
- `components/landing/hero-section.tsx` - 按钮逻辑、标签位置和多语言支持
- `messages/en.json`, `messages/zh-CN.json`, `messages/zh-HK.json`, `messages/ja.json` - 添加 `betaBadge` 翻译键

---

#### 2. 日文翻译文件修复

**问题描述:**
日文版 (`ja.json`) 有 24 个缺失的翻译键，导致界面显示 "MISSING_MESSAGE" 错误。

**修复内容:**

| 模块 | 添加的键 |
|------|----------|
| **dlp.calculator** | `title`, `subtitle` |
| **dlp.suggestedAmount** | `title`, `subtitle`, `forRole`, `usdt` |
| **dlp.currentCalc** | `title`, `beta` |
| **dlp.scripts** | `superSeller`, `solopreneur`, `creator` |
| **dlp (short)** | `fundingShort`, `hardCapShort`, `poolShort` |
| **projects.preview** | `title`, `description`, `cta`, `fundingRange`, `eta`, `footnote` |
| **onboarding.identity** | `usernameCheck` |

**验证结果:**
- 修复前: 24 个缺失键
- 修复后: 0 个缺失键
- 日文版总键数: 与英文版完全一致 ✅

**影响文件:**
- `messages/ja.json` - 补充所有缺失的翻译键

### 详细变更内容

#### 1. Hero Section 按钮与交互调整

**变更前:**
- 主按钮: "预约内测资格" (灰色不可点击状态)
- 次按钮: "了解产品"
- 副标题下方标签: "内测阶段 · 邀请制"

**变更后:**
- 主按钮: "启动我的项目" (可点击，跳转 /onboarding，需登录)
- 次按钮: "探索项目" (跳转 /explore)
- 移除 "内测阶段 · 邀请制" 标签

**影响文件:**
- `components/landing/hero-section.tsx` - 按钮逻辑和文案
- `messages/en.json`, `messages/zh-CN.json`, `messages/zh-HK.json`, `messages/ja.json` - 多语言翻译

---

## 版本 v1.8 - 2026-03-03

### 变更概述
重构 PRD 文档结构，删除重复的 PRD.md，建立基于模块的文档体系。

### 详细变更内容

#### 1. PRD 文档模块化重构

**变更前:**
- `PRD.md` - 单文件包含第一模块内容
- 与 `PRD_Module_1.md` 内容重复

**变更后:**
- 删除 `PRD.md` (内容与 PRD_Module_1.md 重复)
- `PRD_Module_1.md` - 第一模块：代币创世与内盘孵化
- `PRD_Module_2.md` - 第二模块：上市交易与价值共创

**引用更新:**
- `CHANGELOG.md` - 更新所有历史引用指向新的模块文件
- `DESIGN_SPEC.md` - 更新附录 B 的参考来源

**影响文件:**
- `PRD.md` - 已删除
- `CHANGELOG.md` - 更新引用
- `DESIGN_SPEC.md` - 更新引用

---

## 版本 v1.7 - 2026-03-03

### 变更概述
根据用户需求，对首页多个区块进行重构，包括 DLP 公式测算区域、角色模板展示、平台数据总览、最新项目列表以及首屏内测提示。

### 文档结构调整

#### PRD 文档模块化重构

**变更内容:**
- 删除 `PRD.md` (内容与 PRD_Module_1.md 重复)
- 更新所有文件中对 `PRD.md` 的引用，改为指向 `PRD_Module_1.md` 和 `PRD_Module_2.md`
- 更新文件:
  - `CHANGELOG.md` - 更新所有历史引用
  - `DESIGN_SPEC.md` - 更新附录 B 的参考来源

**文档结构现状:**
| 文件 | 说明 |
|------|------|
| `PRD_Module_1.md` | 第一模块：代币创世与内盘孵化 |
| `PRD_Module_2.md` | 第二模块：上市交易与价值共创 |
| `DESIGN_SPEC.md` | 详细设计需求说明书 (需求来源: PRD_Module_1/2) |
| `CHANGELOG.md` | 变更记录 |

---

### 详细变更内容

#### 1. DLP 公式测算区域重构 (dlp-section.tsx)

**变更前:**
- 动态展示复杂数学公式
- 交互式滑块调整 $F$ 值
- 三种角色模板卡片点击切换 $\gamma$ 系数
- 角色卡片只展示标签和特征

**变更后:**
- **整体布局**: 左侧角色选择区(40%) + 右侧融资建议区(60%)
- **左侧角色卡片**: 增加头像展示、角色名称、适用人群标签
- **右侧建议区**:
  - 大字号展示建议融资金额(如 "$80,000 USD")
  - 根据 PRD_Module_1.md 中的话术展示业务场景描述
  - 底部小字展示资金特点与 LP 锁定策略
- **公式展示**: 简化或隐藏复杂公式，改为"融资计算器"概念

**影响文件:**
- `components/landing/dlp-section.tsx`
- `messages/en.json`, `messages/zh-CN.json` (新增翻译 key)

**依赖:**
- 需要角色头像图片资源 (public/images/roles/)

---

#### 2. Choose Your Role 区块更新 (role-cards-section.tsx)

**变更内容:**
- 更新 "Capital Traits" 和 "LP Lock" 的描述文案
- 使其与 PRD_Module_1.md 中定义的资金特点和锁定策略保持一致

**影响文件:**
- `components/landing/role-cards-section.tsx`
- `messages/en.json`, `messages/zh-CN.json`

---

#### 3. Platform Overview 区块重构 (stats-section.tsx)

**变更前:**
- 展示实时数据：累计融资项目数、TVL、已毕业项目数、平均回报率

**变更后:**
- **数据状态改为"预筹备项目"**: 所有数据均为正式上线前的预筹备统计
- **展示数据**:
  - 预筹备项目数: 12
  - 预计总锁定流动性 (TVL): $2.5M
  - 预计首发项目数: 8
  - 预计平均生产力系数: 1.4γ
- **底部小字说明**: "*以上数据为平台正式上线前的预筹备项目统计，代表第一期优质项目阵容。实际数据将在产品正式上线后实时更新。*"

**影响文件:**
- `components/landing/stats-section.tsx`
- `messages/en.json`, `messages/zh-CN.json`

---

#### 4. Latest Projects 区块重构 (projects-section.tsx)

**变更前:**
- 展示实时项目数据
- 卡片显示募集进度、剩余时间、当前价格

**变更后:**
- **展示状态改为"内部邀请制预筹备项目"**
- **卡片内容**:
  - 项目封面图/头像
  - 项目名称与角色标签
  - **状态标签**: "即将上线" / "筹备中" / "内测预约"
  - **预计募集区间** (如: $50K - $200K)
  - **预计上线时间** (如: 预计 Q2 上线)
- **底部说明条**: "*当前展示为内部邀请制下的预筹备项目。正式认购通道将在产品上线后开放。*"

**影响文件:**
- `components/landing/projects-section.tsx`
- `messages/en.json`, `messages/zh-CN.json`

---

#### 5. Hero Section 首屏更新 (hero-section.tsx)

**新增内容:**

**1. 顶部固定通知条 (Beta Banner)**
- 位置: 页面顶部固定
- 背景色: primary/10 或 warning 色调
- 文案: "🚀 Exponent 内测版开放中 - 当前采用邀请制注册，正式上线 Coming Soon"
- 功能: 用户可手动关闭 (localStorage 记录关闭状态)

**2. Hero 主内容区更新**
- 副标题下方新增标签: "内测阶段 · 邀请制"
- CTA 按钮更新:
  - 主按钮: "预约内测资格" (带锁图标提示)
  - 次按钮: "了解产品" (跳转至产品文档或 Demo)

**影响文件:**
- `components/landing/hero-section.tsx`
- `components/navbar.tsx` (Beta Banner 也可放在导航栏组件)
- `messages/en.json`, `messages/zh-CN.json`

---

### 总结

本次变更是对首页的全面重构，主要围绕以下核心目标:
1. **DLP 区域**: 从复杂公式展示转向直观的融资建议，增加头像和话术
2. **预筹备状态**: Platform Overview 和 Latest Projects 改为展示预筹备项目，避免 MVP 阶段数据为空的问题
3. **内测提示**: 明确告知用户产品处于内测邀请制阶段，管理用户预期

所有变更都基于 PRD_Module_1.md 中定义的角色计算公式和话术，确保产品逻辑一致性。

## 版本 v1.6 - 2026-03-02

### 变更概述
同步 Obsidian 中的最新 PRD 更新到项目文档，确保所有文档保持一致。

### 详细变更内容

#### 1. PRD 模块文档同步更新

**操作:** 将 Obsidian 中的产品设计文档同步复制到项目目录
- `Exponent 产品设计（第一模块）.md` → `PRD_Module_1.md`
- `Exponent 产品设计（第二模块）.md` → `PRD_Module_2.md`

**状态:** ✅ 已完成同步

**验证:**
- PRD_Module_1.md: 293 行, ~14KB
- PRD_Module_2.md: 71 行, ~3KB
- 内容完整性: 已验证

---

## 版本 v1.5 - 2026-03-02

### 变更概述
根据 Obsidian 中更新的原始需求文档 (PRD_Module_1.md) 同步更新 DESIGN_SPEC.md，主要涉及失败处理机制和 MVP 场景数值演示的描述更新。

### 详细变更内容

#### 1. 失败处理机制 (附录 C: 内盘孵化参数)

**变更前:**
```
90天未达硬顶 → 资金原路退回，保证金（如有）退还（暂时无手续费）。
```

**变更后:**
```
90天未达硬顶 → 资金原路退回，保证金（如有）退还，由投资人领取。
```

**变更原因:** 明确了资金退还的具体流程，强调了投资人作为资金领取的主体。

---

#### 2. MVP 场景数值演示描述优化

**变更前:**
```
某"顶级保险代理人" (角色：超级销售)
需求：他想拿 $80,000 U 去买高端线索。
```

**变更后:**
```
某"顶级保险代理人" (角色：超级销售)
需求：他想拿 $80,000 U 去创业买高端线索/流量。
```

**变更原因:**
- 将"买高端线索"改为"创业买高端线索/流量"，更准确地描述了资金用途
- 增加了"/流量"，扩展了资金使用的范围，更符合实际业务场景

#### 3. PRD 模块文档更新

**操作:** 将 Obsidian 中更新的产品设计文档同步复制到项目目录

**变更文件:**
- `PRD_Module_1.md` - 第一模块：代币创世与内盘孵化
- `PRD_Module_2.md` - 第二模块：上市交易与价值共创（新增）

---

## 版本 v1.4 - 2026-03-02

### 变更概述
根据原始需求文档 (PRD_Module_1.md) 对 DESIGN_SPEC.md 进行补充和修正，主要涉及 DLP 公式、角色模板和流动性机制说明。

### 详细变更内容

#### 1. 附录 B: DLP公式参数 (修正)

**变更前:**
| 参数 | MVP设定 | 说明 |
|------|---------|------|
| $L_{min}$ | $10,000 | 保底流动性 |
| $\beta$ | 20% | 比例系数 |

**变更后:**
| 参数 | MVP设定 | 说明 |
|------|---------|------|
| $L_{min}$ | $5,000 | 保底流动性 |
| $\beta$ | 25% | 比例系数 |

**变更原因:** 与 PRD_Module_1.md 保持一致，$L_{min}$ 应为 $5,000 而非 $10,000，$\beta$ 应为 25% 而非 20%。

---

#### 2. 新增: 核心数学模型章节

**新增内容:** 在附录中新增 "DLP 核心数学模型" 章节，包含:

1. **基础 DLP 公式:**
   - $L = \max(L_{min}, F \times \beta)$
   - $H = F + L$ (简化版)

2. **完整 DLP 公式:**
   - $L = \max(L_{min}, \beta \cdot H, \frac{H}{1 + \gamma \cdot \frac{F}{H}})$
   - $H = F \times (1 + \beta + \beta \times \gamma)$

3. **变量定义表:**
   - $F$: 融资需求
   - $H$: 募集硬顶
   - $L$: 入池资金
   - $L_{min}$: 保底流动性 ($5,000)
   - $\beta$: 比例系数 (25%)
   - $\gamma$: 生产力系数 (角色相关)

**新增原因:** PRD_Module_1.md 中有详细的数学模型说明，DESIGN_SPEC.md 中缺失。

---

#### 3. 新增: 角色模板与融资建议公式

**新增内容:** 在附录中新增 "角色模板与融资建议" 章节，包含三种角色的详细信息:

#### 3.1 超级销售 (Super Seller)
- **生产力系数:** $\gamma = 1.8$
- **前端建议公式:** $F_{suggested} = \frac{P_{target}}{R_{roi}}$
- **适用人群:** 保险代理人、房产中介、高端销售顾问

#### 3.2 独立开发/AI (Solopreneur)
- **生产力系数:** $\gamma = 1.2$
- **前端建议公式:** $F_{suggested} = (U_{target} \times C_{cac}) + E_{fixed}$
- **适用人群:** 独立程序员、AI创业者、SaaS开发者

#### 3.3 内容创作者 (KOL)
- **生产力系数:** $\gamma = 0.8$
- **前端建议公式:** $F_{suggested} = (W_{target} \times C_{cpf}) + E_{prod}$
- **适用人群:** 网红/KOL、YouTuber、自媒体创作者

**新增原因:** PRD_Module_1.md 中有三种角色的详细融资建议公式，DESIGN_SPEC.md 中缺失。

---

#### 4. 新增: L/B 流动性机制详解

**新增内容:** 在附录中新增 "L/B 流动性机制详解" 章节，包含:

1. **L 部分 (Liquidity Amount):**
   - 物理形态: 钱 (USDT/ETH)
   - 来源: 从总募集资金 $H$ 中切出
   - 作用: 作为底仓资金维持交易深度

2. **B 池 (Liquidity Reserve Pool):**
   - 物理形态: 代币 (15% 总量)
   - 来源: 系统创世时强制预留
   - 作用: 毕业时与 L 配对建池

3. **毕业上市流程:**
   - 切分 L (钱)
   - 提取 B (币)
   - 配对锁死
   - 通缩销毁 (B 池剩余)

**新增原因:** PRD_Module_1.md 中有详细的 L/B 机制解释，DESIGN_SPEC.md 中缺失。

---

#### 5. 修正: 募集硬顶 $H$ 的计算公式

**变更前 (DESIGN_SPEC 附录 B):**
- $H$ 的计算未明确给出公式

**变更后:**
- 明确给出两种计算公式:
  1. **简化版:** $H = F + L$ (其中 $L = \max(L_{min}, F \times \beta)$)
  2. **完整版:** $H = F \times (1 + \beta + \beta \times \gamma)$

**变更原因:** PRD_Module_1.md 中明确给出了两种计算公式，DESIGN_SPEC.md 中缺失。

---

### 文件变更清单

| 操作 | 文件 | 说明 |
|------|------|------|
| 新增 | `CHANGELOG.md` | 本文档，记录所有变更 |
| 修改 | `DESIGN_SPEC.md` | 根据 PRD_Module_1.md 补充和修正内容 |
| 新增 | `PRD_Module_1.md` | 第一模块：代币创世与内盘孵化 |
| 新增 | `PRD_Module_2.md` | 第二模块：上市交易与价值共创 |

---

### 变更影响评估

1. **前端实现影响:**
   - DLP 公式需要更新实现 (特别是 $L_{min}$ 和 $\beta$ 的值)
   - 角色模板需要补充融资建议公式
   - L/B 机制需要在毕业流程中体现

2. **后端实现影响:**
   - DLP 计算接口需要更新参数
   - 毕业流程需要支持 B 池剩余销毁逻辑

3. **文档维护影响:**
   - 后续 PRD 变更需要同步更新 CHANGELOG
   - DESIGN_SPEC 版本号需要更新

---

### 后续行动项

- [ ] 更新前端 DLP 计算组件
- [ ] 更新后端 DLP 计算接口
- [ ] 在毕业流程中实现 B 池销毁逻辑
- [ ] 更新 DESIGN_SPEC.md 版本号至 v1.4
- [ ] 同步更新相关翻译文件

---

*变更记录创建日期: 2026-03-02*
*变更记录版本: v1.4*
