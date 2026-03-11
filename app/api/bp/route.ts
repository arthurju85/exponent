import { NextRequest, NextResponse } from "next/server"

/**
 * AI 商业计划书生成 API
 *
 * MVP 阶段使用模板化生成
 * 后续可集成真实的 AI 模型 (如 Claude API)
 *
 * @description Generates a business plan using AI
 * @method POST
 * @body { string } description - Business description
 * @body { string } roleType - Role type (superSeller, solopreneur, creator)
 * @body { number } fundingAmount - Funding amount needed
 * @body { array } fundAllocation - Fund allocation breakdown
 * @body { object } kpi - KPI information
 * @returns { success: boolean, bpContent: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      description,
      roleType,
      fundingAmount,
      fundAllocation,
      kpi,
      dividendPlan
    } = body

    // Validate required fields
    if (!description || !roleType) {
      return NextResponse.json(
        {
          success: false,
          message: "缺少必填字段"
        },
        { status: 400 }
      )
    }

    // Role configuration
    const roleConfig: Record<string, { gamma: number; label: string }> = {
      superSeller: { gamma: 1.8, label: "超级销售" },
      solopreneur: { gamma: 1.2, label: "独立开发/AI" },
      creator: { gamma: 0.8, label: "内容创作者" }
    }

    const role = roleConfig[roleType] || roleConfig.superSeller

    // Calculate KPI growth rate
    const growthRate = kpi?.baseline && kpi?.target
      ? (((parseFloat(kpi.target) - parseFloat(kpi.baseline)) / parseFloat(kpi.baseline)) * 100).toFixed(0)
      : null

    // Generate BP content using template
    // TODO: Integrate with Claude API or other AI models for production
    const bpContent = generateBusinessPlanTemplate({
      description,
      roleType: role.label,
      gamma: role.gamma,
      fundingAmount,
      fundAllocation,
      kpi,
      dividendPlan,
      growthRate
    })

    return NextResponse.json({
      success: true,
      bpContent,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: "template-mvp",
        roleType,
        fundingAmount
      }
    })

  } catch (error) {
    console.error("BP generation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "生成失败，请稍后重试"
      },
      { status: 500 }
    )
  }
}

/**
 * 生成商业计划书模板
 * MVP 阶段使用固定模板，后续替换为 AI 生成
 */
function generateBusinessPlanTemplate(data: {
  description: string
  roleType: string
  gamma: number
  fundingAmount?: number
  fundAllocation?: Array<{ category: string; amount: string }>
  kpi?: { type?: string; baseline: string; target: string }
  dividendPlan?: Array<{ days: number; amount: number }>
  growthRate?: string | null
}): string {
  const {
    description,
    roleType,
    gamma,
    fundingAmount,
    fundAllocation,
    kpi,
    dividendPlan,
    growthRate
  } = data

  const fundingAllocations = fundAllocation
    ?.map(a => `- ${getCategoryLabel(a.category)}: $${Number(a.amount).toLocaleString()} USD`)
    .join("\n") || "待补充"

  const dividendPlans = dividendPlan
    ?.map(p => `- 第${p.days}天：$${p.amount.toLocaleString()} USD`)
    .join("\n") || "暂未设置"

  return `# 商业计划书

## 一、项目愿景

${description}

基于用户在${roleType}领域的专业能力，通过代币化融资实现业务规模化扩张。

## 二、市场分析

### 2.1 目标市场
${roleType}所在市场容量巨大，专业化服务需求旺盛。

### 2.2 竞争优势
- 从业者具备丰富的行业经验
- 已验证的商业模式和收入能力
- 生产力系数 γ = ${gamma}，显示较强的业务扩张能力

## 三、资金使用计划

募集资金 **$${(fundingAmount || 0).toLocaleString()} USD** 将用于以下方面：

${fundingAllocations}

### 3.1 DLP 模型计算
根据动态流动性保护（DLP）模型：
- 融资需求 (F): $${(fundingAmount || 0).toLocaleString()}
- 硬顶 (H): $${Math.round((fundingAmount || 0) * 1.25).toLocaleString()}
- 入池资金 (L): $${Math.round((fundingAmount || 0) * 0.25).toLocaleString()}

分配比例：
- 20% 公开发售（投资人获得）
- 15% 流动性储备（毕业时锁池）
- 65% 创始人锁定（1 年悬崖期）

## 四、营收预测

### 4.1 关键业绩指标 (KPI)
${kpi ? `
| 指标 | 当前基准 | 1 年目标 | 增长率 |
|------|----------|----------|--------|
| ${getKpiLabel(kpi.type || "revenue")} | ${kpi.baseline} | ${kpi.target} | ${growthRate ? `+${growthRate}%` : "待计算"} |
` : "待补充"}

### 4.2 分红计划
${dividendPlan && dividendPlan.length > 0 ? `
${dividendPlans}

分红资金将按时存入分红池合约，按持币比例分配给快照时刻的持币地址。
` : "暂未设置具体分红计划"}

## 五、风险提示

### 5.1 市场风险
- 宏观经济波动可能影响业务增长
- 行业竞争加剧可能压缩利润空间

### 5.2 执行风险
- 业务扩张速度可能不及预期
- 团队建设可能存在挑战

### 5.3 合规风险
- 代币融资相关法规可能发生变化
- 跨境业务可能面临监管不确定性

## 六、身价对赌承诺

本人承诺：
1. 毕业后 1 年内，完成上述分红注入
2. 如未达标，65% 创始人代币将永久锁定
3. 募集资金仅用于申报的资金用途

---

*本商业计划书由 Exponent AI 生成，仅供参考。实际投资需谨慎评估风险。*

*生成时间：${new Date().toLocaleString("zh-CN")}*`
}

/**
 * 获取资金用途类别标签
 */
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    leads: "购买线索/客户资源",
    compute: "购买算力/API 服务",
    hardware: "硬件设备采购",
    content: "内容制作投入",
    marketing: "营销推广",
    other: "其他"
  }
  return labels[category] || category
}

/**
 * 获取 KPI 指标标签
 */
function getKpiLabel(type: string): string {
  const labels: Record<string, string> = {
    revenue: "年度营收",
    users: "用户数",
    fans: "粉丝数",
    other: "其他指标"
  }
  return labels[type] || type
}
