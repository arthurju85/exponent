"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Check, ArrowRight, ArrowLeft, Mail, Upload, Briefcase, Code, Video,
  Loader2, Key, Shield, Lock, TrendingUp, Calendar, FileText, Signature
} from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { AuthModal } from "@/components/auth-modal"

export const dynamic = 'force-dynamic'

// 8 步流程
const steps = [
  { id: "kyc", name: "身份认证", icon: Shield },
  { id: "invite", name: "邀请码", icon: Key },
  { id: "role", name: "角色选择", icon: Briefcase },
  { id: "funding", name: "融资需求", icon: TrendingUp },
  { id: "dividend", name: "分红方案", icon: Calendar },
  { id: "bp", name: "商业计划", icon: FileText },
  { id: "commitment", name: "方案确认", icon: Signature },
  { id: "submit", name: "提交审核", icon: Check },
]

// 有效邀请码 (测试用)
const VALID_INVITATION_CODES = ["EXPO2025", "EARLYBIRD", "VIP001", "LAUNCH"]

// 角色选项
const roleOptions = [
  {
    icon: Briefcase,
    title: "超级销售",
    subtitle: "Super Seller",
    audiences: ["保险、房产、高端顾问"],
    fundingTraits: "现金转化极快",
    lpLock: "较少 (更多资金用于业务)",
    gamma: 1.8,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-500/10",
  },
  {
    icon: Code,
    title: "独立开发 / AI",
    subtitle: "Solopreneur",
    audiences: ["程序员、AI 创业者、SaaS 开发者"],
    fundingTraits: "研发周期中等",
    lpLock: "平衡配置",
    gamma: 1.2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    selectedBorder: "border-emerald-500",
    selectedBg: "bg-emerald-500/10",
  },
  {
    icon: Video,
    title: "内容创作者",
    subtitle: "Content Creator",
    audiences: ["网红、YouTuber、自媒体"],
    fundingTraits: "现金流不稳定",
    lpLock: "较多 (靠共识驱动)",
    gamma: 0.8,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/20",
    selectedBorder: "border-amber-500",
    selectedBg: "bg-amber-500/10",
  },
]

// 资金用途分类
const fundingCategories = [
  { id: "leads", label: "购买线索 / 客户资源", icon: "💼" },
  { id: "compute", label: "购买算力 / API 服务", icon: "💻" },
  { id: "hardware", label: "硬件设备采购", icon: "🖥️" },
  { id: "content", label: "内容制作投入", icon: "🎬" },
  { id: "marketing", label: "营销推广", icon: "📢" },
  { id: "other", label: "其他", icon: "📦" },
]

// KPI 指标类型
const kpiTypes = [
  { id: "revenue", label: "年度营收", prefix: "$", suffix: "" },
  { id: "users", label: "用户数", prefix: "", suffix: "人" },
  { id: "fans", label: "粉丝数", prefix: "", suffix: "人" },
  { id: "other", label: "其他指标", prefix: "", suffix: "" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Step 1: KYC
  const [kycMethod, setKycMethod] = useState<"twitter" | "wallet" | null>(null)
  const [kycVerified, setKycVerified] = useState(false)

  // Step 2: Invitation Code
  const [invitationCode, setInvitationCode] = useState("")
  const [invitationVerified, setInvitationVerified] = useState(false)
  const [invitationError, setInvitationError] = useState("")

  // Step 3: Role Selection
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [businessTarget, setBusinessTarget] = useState("")
  const [suggestedFunding, setSuggestedFunding] = useState<number>(0)

  // Step 4: Funding Requirements
  const [fundingAmount, setFundingAmount] = useState([80000])
  const [fundAllocation, setFundAllocation] = useState<{ category: string; amount: string; note?: string }[]>([])
  const [showVIPChannel, setShowVIPChannel] = useState(false)

  // Step 5: Dividend Plan
  const [hasDividendPlan, setHasDividendPlan] = useState(false)
  const [dividendSource, setDividendSource] = useState("")
  const [dividendPlans, setDividendPlans] = useState<{ days: number; amount: number }[]>([])

  // Step 6: AI BP
  const [businessDescription, setBusinessDescription] = useState("")
  const [selectedKpiType, setSelectedKpiType] = useState("revenue")
  const [kpiBaseline, setKpiBaseline] = useState("")
  const [kpiTarget, setKpiTarget] = useState("")
  const [generatedBP, setGeneratedBP] = useState("")
  const [generatingBP, setGeneratingBP] = useState(false)
  const [bpGenerated, setBpGenerated] = useState(false)

  // Step 7: Commitment
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToShadow, setAgreedToShadow] = useState(false)

  // Generation state
  const [generating, setGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationSteps, setGenerationSteps] = useState<string[]>([])

  // Check login status on mount
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(false)
      setShowAuthModal(true)
    }
    checkLogin()
  }, [])

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
    // Auto-complete KYC step for MVP
    setKycVerified(true)
    setCurrentStep(1) // Move to invite code step
  }

  // Step 2: Verify invitation code
  const verifyInvitationCode = () => {
    const code = invitationCode.trim().toUpperCase()
    if (VALID_INVITATION_CODES.includes(code)) {
      setInvitationVerified(true)
      setInvitationError("")
    } else {
      setInvitationVerified(false)
      setInvitationError("无效的邀请码")
    }
  }

  // Step 3: Calculate suggested funding based on role and target
  useEffect(() => {
    if (selectedRole === null || !businessTarget) {
      setSuggestedFunding(0)
      return
    }

    const target = parseFloat(businessTarget.replace(/,/g, '')) || 0
    let suggested = 0

    switch (selectedRole) {
      case 0: // Super Seller: F = P_target / R_roi (R_roi = 1.5)
        suggested = target / 1.5
        break
      case 1: // Solopreneur: F = (U_target × C_cac) + E_fixed (C_cac=$2, E_fixed=$10,000)
        suggested = (target * 2) + 10000
        break
      case 2: // Content Creator: F = (W_target × C_cpf) + E_prod (C_cpf=$0.2, E_prod=$10,000)
        suggested = (target * 0.2) + 10000
        break
    }

    setSuggestedFunding(Math.round(suggested / 1000) * 1000) // Round to nearest 1000
    setFundingAmount([Math.round(suggested / 1000) * 1000])
  }, [selectedRole, businessTarget])

  // Step 4: Check VIP threshold
  useEffect(() => {
    if (fundingAmount[0] > 250000) {
      setShowVIPChannel(true)
    } else {
      setShowVIPChannel(false)
    }
  }, [fundingAmount])

  // Step 6: Generate AI BP
  const generateBP = () => {
    setGeneratingBP(true)

    // Mock AI generation
    setTimeout(() => {
      const role = roleOptions[selectedRole || 0]
      setGeneratedBP(`# ${role.title}商业计划书

## 项目愿景
基于用户在${role.title}领域的专业能力，通过代币化融资实现业务规模化扩张。

## 市场分析
目标市场容量巨大，${role.audiences.join("、")}等群体对专业服务需求旺盛。

## 资金使用计划
募集资金${fundingAmount[0].toLocaleString()} USDT 将用于：
${fundAllocation.map(a => `- ${fundingCategories.find(c => c.id === a.category)?.label}: $${a.amount}`).join("\n")}

## 营收预测
基于 KPI 目标${kpiTarget}${kpiTypes.find(t => t.id === selectedKpiType)?.suffix}，
预计 1 年内实现${((parseFloat(kpiTarget) - parseFloat(kpiBaseline)) / parseFloat(kpiBaseline) * 100).toFixed(0)}%增长。

## 风险提示
市场风险、合规风险、执行风险等已充分评估。`)
      setGeneratingBP(false)
      setBpGenerated(true)
    }, 3000)
  }

  // Step 8: Submit application
  const submitApplication = () => {
    setGenerating(true)
    setGenerationProgress(0)
    setGenerationSteps([])

    const stepsToShow = [
      "验证用户资格",
      "保存项目数据",
      "提交审核队列",
      "生成项目页面",
    ]

    stepsToShow.forEach((step, i) => {
      setTimeout(() => {
        setGenerationSteps((prev) => [...prev, step])
        setGenerationProgress((i + 1) / stepsToShow.length * 100)
        if (i === stepsToShow.length - 1) {
          setTimeout(() => {
            setGenerating(false)
            // Navigate to project status page
            router.push("/onboarding/status")
          }, 1000)
        }
      }, (i + 1) * 800)
    })
  }

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  // Step 4: Fund allocation helpers
  const addFundAllocation = (category: string) => {
    if (!fundAllocation.find(a => a.category === category)) {
      setFundAllocation([...fundAllocation, { category, amount: "" }])
    }
  }

  const updateFundAllocation = (category: string, amount: string) => {
    setFundAllocation(fundAllocation.map(a =>
      a.category === category ? { ...a, amount } : a
    ))
  }

  const totalAllocated = fundAllocation.reduce((sum, a) => sum + (parseFloat(a.amount) || 0), 0)
  const allocationDiff = fundingAmount[0] - totalAllocated

  // Step 5: Dividend plan helpers
  const addDividendPlan = () => {
    setDividendPlans([...dividendPlans, { days: 365, amount: 0 }])
  }

  const updateDividendPlan = (index: number, field: "days" | "amount", value: number) => {
    setDividendPlans(dividendPlans.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    ))
  }

  const removeDividendPlan = (index: number) => {
    setDividendPlans(dividendPlans.filter((_, i) => i !== index))
  }

  // Show login required message if not logged in
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">请先登录</h2>
            <p className="mb-8 text-muted-foreground">
              发布项目需要先登录账号。登录后我们将自动为你创建一个钱包地址。
            </p>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowAuthModal(true)}
            >
              登录 / 注册
            </Button>
          </div>
        </div>
        <AuthModal
          open={showAuthModal}
          onOpenChange={setShowAuthModal}
          onSuccess={handleAuthSuccess}
        />
      </main>
    )
  }

  // Step 8: Generating / Submitted
  if (currentStep === 7 && generating) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-primary" />
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              正在提交项目审核...
            </h2>
            <p className="mb-8 text-muted-foreground">预计 24-48 小时内完成审核</p>

            <div className="mx-auto mb-8 max-w-md">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted-foreground">进度</span>
                <span className="font-mono text-foreground">{Math.round(generationProgress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>

            <div className="mx-auto max-w-sm space-y-3 text-left">
              {["验证用户资格", "保存项目数据", "提交审核队列", "生成项目页面"].map((step) => (
                <div key={step} className="flex items-center gap-3 text-sm">
                  {generationSteps.includes(step) ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-border" />
                  )}
                  <span className={generationSteps.includes(step) ? "text-foreground" : "text-muted-foreground"}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-28">
        {/* Step Indicator */}
        <div className="mb-12 overflow-x-auto scrollbar-hide py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex items-center justify-center gap-6 min-w-max">
            {steps.map((step, i) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium transition-all ${
                      i < currentStep
                        ? "bg-primary text-primary-foreground"
                        : i === currentStep
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i < currentStep ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap text-center ${
                      i <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: KYC (Auto-completed on login) */}
        {currentStep === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">身份认证完成</h2>
            <p className="mb-8 text-muted-foreground">
              您已通过{KycMethod === "twitter" ? "Twitter/X" : "钱包"}身份认证
            </p>
            <div className="mx-auto max-w-md rounded-lg bg-secondary p-4 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Check className="h-5 w-5 text-emerald-500" />
                <span>身份已验证</span>
              </div>
              <div className="flex items-center gap-3 text-sm mt-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <span>钱包地址已生成</span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNext}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Invitation Code */}
        {currentStep === 1 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">输入邀请码</h2>
              <p className="text-muted-foreground">Exponent 当前采用邀请制注册</p>
            </div>

            <div className="mb-6">
              <Label className="mb-3 block text-sm text-foreground">邀请码</Label>
              <div className="flex gap-3">
                <Input
                  placeholder="请输入邀请码（如：EXPO2025）"
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground uppercase"
                  value={invitationCode}
                  onChange={(e) => {
                    setInvitationCode(e.target.value)
                    setInvitationVerified(false)
                    setInvitationError("")
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && verifyInvitationCode()}
                />
                <Button
                  variant="outline"
                  onClick={verifyInvitationCode}
                  disabled={!invitationCode.trim()}
                >
                  验证
                </Button>
              </div>
              {invitationVerified && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-500">
                  <Shield className="h-4 w-4" />
                  <span>验证通过 - 您已获得内测资格</span>
                </div>
              )}
              {invitationError && (
                <p className="mt-3 text-sm text-red-500">{invitationError}</p>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={handleNext}
                disabled={!invitationVerified}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Role Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">选择你的角色类型</h2>
              <p className="text-muted-foreground mt-2">选择最符合你业务类型的角色，我们将给出融资建议</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {roleOptions.map((role, i) => (
                <button
                  key={role.title}
                  onClick={() => {
                    setSelectedRole(i)
                    setBusinessTarget("")
                  }}
                  className={`rounded-2xl border p-6 text-left transition-all ${
                    selectedRole === i
                      ? `${role.selectedBorder} ${role.selectedBg}`
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${role.iconBg}`}>
                    <role.icon className={`h-6 w-6 ${role.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{role.title}</h3>
                  <p className="mb-3 text-xs text-muted-foreground">{role.subtitle}</p>
                  <ul className="mb-4 flex flex-col gap-1">
                    {role.audiences.map((a) => (
                      <li key={a} className="text-xs text-muted-foreground">
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-1 rounded-lg bg-secondary p-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">资金特点</span>
                      <span className="text-foreground">{role.fundingTraits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">LP 锁定</span>
                      <span className="text-foreground">{role.lpLock}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Business Target Input */}
            {selectedRole !== null && (
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Label className="text-sm font-medium">
                      {selectedRole === 0 && "你希望 1 年内赚多少利润？"}
                      {selectedRole === 1 && "你希望 1 年获取多少用户？"}
                      {selectedRole === 2 && "你希望 1 年新增多少粉丝？"}
                    </Label>
                    <div className="mt-2 flex items-center gap-2">
                      {selectedRole === 0 && <span className="text-lg">$</span>}
                      <Input
                        type="text"
                        placeholder={selectedRole === 0 ? "120,000" : selectedRole === 1 ? "200,000" : "500,000"}
                        className="flex-1"
                        value={businessTarget}
                        onChange={(e) => setBusinessTarget(e.target.value)}
                      />
                      {selectedRole !== 0 && <span className="text-lg">人</span>}
                    </div>
                  </div>

                  {suggestedFunding > 0 && (
                    <div className="rounded-lg bg-primary/10 p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">建议融资：</span>
                        <span className="text-xl font-bold text-primary">
                          ${suggestedFunding.toLocaleString()} USDT
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {selectedRole === 0 && "按行业 1:1.5 ROI 计算"}
                        {selectedRole === 1 && "按获客成本$2/人 + 固定开支$10,000 计算"}
                        {selectedRole === 2 && "按单粉成本$0.2+ 制作成本$10,000 计算"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedRole === null}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Funding Requirements */}
        {currentStep === 3 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground">你需要多少钱来扩张业务？</h2>
              <p className="text-muted-foreground mt-2">填写融资需求并分配资金用途</p>
            </div>

            {/* Funding Amount Slider */}
            <div className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <Label className="text-sm text-foreground">融资需求 (F)</Label>
                <span className="font-mono text-2xl font-bold text-primary">
                  ${fundingAmount[0].toLocaleString()} <span className="text-sm font-normal text-muted-foreground">USD</span>
                </span>
              </div>
              <Slider
                value={fundingAmount}
                onValueChange={setFundingAmount}
                min={5000}
                max={500000}
                step={1000}
                className="py-2"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>$5,000</span>
                <span>$250,000</span>
                <span>$500,000</span>
              </div>
            </div>

            {/* VIP Channel Alert */}
            {showVIPChannel && (
              <Card className="mb-8 border-amber-500/50 bg-amber-500/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20">
                      <TrendingUp className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-amber-500">大额融资 VIP 通道</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        您的融资需求已超过普通用户上限 ($250,000)。进入 VIP 专属通道可享受：
                      </p>
                      <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                        <li>专属客户经理对接</li>
                        <li>定制化融资方案</li>
                        <li>快速审核通道</li>
                      </ul>
                      <Button className="mt-4 bg-amber-500 text-amber-50 hover:bg-amber-600">
                        申请 VIP 通道
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fund Allocation */}
            <div className="mb-8">
              <Label className="mb-4 block text-sm font-medium">资金用途分配 (必填)</Label>
              <div className="space-y-4">
                {fundingCategories.map((cat) => {
                  const allocated = fundAllocation.find(a => a.category === cat.id)
                  return (
                    <div key={cat.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={cat.id}
                          checked={!!allocated}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addFundAllocation(cat.id)
                            } else {
                              setFundAllocation(fundAllocation.filter(a => a.category !== cat.id))
                            }
                          }}
                        />
                        <Label htmlFor={cat.id} className="flex-1 cursor-pointer text-sm">
                          <span className="mr-2">{cat.icon}</span>
                          {cat.label}
                        </Label>
                      </div>
                      {allocated && (
                        <div className="mt-3 ml-6">
                          <Input
                            type="number"
                            placeholder="预算金额 (USD)"
                            className="max-w-xs"
                            value={allocated.amount}
                            onChange={(e) => updateFundAllocation(cat.id, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Allocation Summary */}
              <div className={`mt-4 rounded-lg p-4 ${
                Math.abs(allocationDiff) < 0.01
                  ? "bg-emerald-500/10 border border-emerald-500/30"
                  : "bg-amber-500/10 border border-amber-500/30"
              }`}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">融资总额</span>
                  <span className="font-medium">${fundingAmount[0].toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">已分配</span>
                  <span className="font-medium">${totalAllocated.toLocaleString()}</span>
                </div>
                <div className={`flex justify-between font-bold mt-2 ${
                  Math.abs(allocationDiff) < 0.01 ? "text-emerald-500" : "text-amber-500"
                }`}>
                  <span>差额</span>
                  <span>{allocationDiff > 0 ? `+$${allocationDiff.toLocaleString()} 未分配` : `$${Math.abs(allocationDiff).toLocaleString()} 超出`}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={handleNext}
                disabled={fundAllocation.length === 0 || Math.abs(allocationDiff) > 0.01}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Dividend Plan */}
        {currentStep === 4 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">设置分红方案</h2>
              <p className="text-muted-foreground mt-2">设置分红承诺可显著提升投资者信心</p>
            </div>

            {/* Skip Option */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="skipDividend"
                  checked={!hasDividendPlan}
                  onCheckedChange={(checked) => setHasDividendPlan(!checked)}
                />
                <Label htmlFor="skipDividend" className="cursor-pointer">
                  暂不设置分红方案（可选）
                </Label>
              </div>
            </div>

            {hasDividendPlan && (
              <div className="space-y-6">
                {/* Dividend Source */}
                <div>
                  <Label className="mb-2 block text-sm font-medium">分红来源说明</Label>
                  <Input
                    placeholder="例如：销售佣金利润、广告收入、服务利润等"
                    value={dividendSource}
                    onChange={(e) => setDividendSource(e.target.value)}
                    className="max-w-lg"
                  />
                </div>

                {/* Dividend Plans */}
                <div>
                  <Label className="mb-2 block text-sm font-medium">分红计划</Label>
                  <div className="space-y-4">
                    {dividendPlans.map((plan, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <Label className="text-xs">分红时间（天）</Label>
                                  <Input
                                    type="number"
                                    value={plan.days}
                                    onChange={(e) => updateDividendPlan(index, "days", parseInt(e.target.value) || 0)}
                                    className="mt-1"
                                  />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    自毕业日起 {plan.days} 天后
                                  </p>
                                </div>
                                <div className="flex-1">
                                  <Label className="text-xs">承诺分红金额 (USD)</Label>
                                  <Input
                                    type="number"
                                    value={plan.amount}
                                    onChange={(e) => updateDividendPlan(index, "amount", parseFloat(e.target.value) || 0)}
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                            </div>
                            {dividendPlans.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDividendPlan(index)}
                                className="text-red-500 hover:text-red-600"
                              >
                                删除
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={addDividendPlan}
                    className="mt-4"
                  >
                    + 添加分红计划
                  </Button>
                </div>

                {/* Dividend Agreement Summary */}
                <Card className="bg-secondary/50">
                  <CardContent className="pt-4">
                    <h4 className="font-bold text-sm mb-2">📜 分红协议摘要</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 分红资金需在到期日前存入分红池合约</li>
                      <li>• 如未按时足额存入，将触发违约惩罚机制</li>
                      <li>• 65% 创始人代币将持续锁定直至达标</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={handleNext}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: AI BP Generation */}
        {currentStep === 5 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">生成商业计划书</h2>
              <p className="text-muted-foreground mt-2">AI 将根据你的输入生成专业的商业计划书</p>
            </div>

            <div className="space-y-6">
              {/* Business Description */}
              <div>
                <Label className="mb-2 block text-sm font-medium">业务描述（限 300 字）</Label>
                <textarea
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="描述你的业务背景、专业经验、目标市场等..."
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  已输入 {businessDescription.length}/300 字
                </p>
              </div>

              {/* KPI Input */}
              <Card>
                <CardContent className="pt-4">
                  <Label className="mb-4 block text-sm font-medium">关键业绩指标 (KPI)</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label className="text-xs">指标类型</Label>
                      <select
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={selectedKpiType}
                        onChange={(e) => setSelectedKpiType(e.target.value)}
                      >
                        {kpiTypes.map((type) => (
                          <option key={type.id} value={type.id}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs">当前基准</Label>
                      <Input
                        type="text"
                        placeholder={kpiTypes.find(t => t.id === selectedKpiType)?.prefix + "500,000" + kpiTypes.find(t => t.id === selectedKpiType)?.suffix}
                        value={kpiBaseline}
                        onChange={(e) => setKpiBaseline(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">1 年目标</Label>
                      <Input
                        type="text"
                        placeholder={kpiTypes.find(t => t.id === selectedKpiType)?.prefix + "1,200,000" + kpiTypes.find(t => t.id === selectedKpiType)?.suffix}
                        value={kpiTarget}
                        onChange={(e) => setKpiTarget(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  {kpiBaseline && kpiTarget && (
                    <p className="text-xs text-muted-foreground mt-2">
                      预计增长率：{((parseFloat(kpiTarget.replace(/,/g, '')) - parseFloat(kpiBaseline.replace(/,/g, ''))) / parseFloat(kpiBaseline.replace(/,/g, '')) * 100).toFixed(0)}%
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Generate Button */}
              {!bpGenerated ? (
                <Button
                  onClick={generateBP}
                  disabled={!businessDescription || !kpiBaseline || !kpiTarget}
                  className="w-full"
                >
                  {generatingBP ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      正在生成商业计划书...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      生成商业计划书
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <Label className="mb-2 block text-sm font-medium">商业计划书预览（可编辑）</Label>
                  <textarea
                    className="w-full min-h-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                    value={generatedBP}
                    onChange={(e) => setGeneratedBP(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={generateBP}
                      className="flex-1"
                    >
                      重新生成
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      确认使用 <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={handleNext}
                disabled={!bpGenerated}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                下一步 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Commitment & Review */}
        {currentStep === 6 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Signature className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">确认创世方案</h2>
              <p className="text-muted-foreground mt-2">请仔细核对以下信息后提交审核</p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4 mb-8">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    基本信息
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">角色类型</span>
                      <p className="font-medium">{roleOptions[selectedRole || 0]?.title}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">生产力系数</span>
                      <p className="font-medium">γ = {roleOptions[selectedRole || 0]?.gamma}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    融资结构 (DLP 模型)
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">融资需求 (F)</span>
                      <p className="font-medium text-primary">${fundingAmount[0].toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">硬顶 (H)</span>
                      <p className="font-medium">${Math.round(fundingAmount[0] * 1.25).toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">入池资金 (L)</span>
                      <p className="font-medium">${Math.round(fundingAmount[0] * 0.25).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    分配：20% 公开发售 | 15% 流动性储备 | 65% 创始人锁定
                  </div>
                </CardContent>
              </Card>

              {hasDividendPlan && dividendPlans.length > 0 && (
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      分红承诺
                    </h3>
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-2">分红来源：{dividendSource || "未指定"}</p>
                      {dividendPlans.map((plan, i) => (
                        <div key={i} className="flex justify-between py-2 border-t">
                          <span>第{plan.days}天</span>
                          <span className="font-medium">${plan.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {kpiBaseline && kpiTarget && (
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      关键业绩指标
                    </h3>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">指标类型</span>
                        <span className="font-medium">{kpiTypes.find(t => t.id === selectedKpiType)?.label}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-muted-foreground">当前 → 目标</span>
                        <span className="font-medium">
                          {kpiBaseline} → {kpiTarget}
                          {kpiBaseline && kpiTarget && (
                            <span className="text-emerald-500 ml-2">
                              (+{((parseFloat(kpiTarget.replace(/,/g, '')) - parseFloat(kpiBaseline.replace(/,/g, ''))) / parseFloat(kpiBaseline.replace(/,/g, '')) * 100).toFixed(0)}%)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Commitment Agreement */}
            <Card className="mb-6 bg-secondary/50">
              <CardContent className="pt-4">
                <h3 className="font-bold text-sm mb-4">🔒 身价对赌协议 (MVP 版)</h3>
                <div className="text-sm space-y-2 mb-4">
                  <p>本人承诺：</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>毕业后 1 年内，完成上述分红注入</li>
                    <li>如未达标，65% 创始人代币将永久锁定</li>
                    <li>募集资金仅用于申报的资金用途</li>
                  </ol>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                    />
                    <Label htmlFor="agreeTerms" className="cursor-pointer text-sm">
                      我已阅读并同意《Exponent 创世协议》
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="agreeShadow"
                      checked={agreedToShadow}
                      onCheckedChange={(checked) => setAgreedToShadow(!!checked)}
                    />
                    <Label htmlFor="agreeShadow" className="cursor-pointer text-sm">
                      我理解并接受"影子代投"相关合规要求
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="mb-6 border-amber-500/50 bg-amber-500/10">
              <CardContent className="pt-4">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-500" />
                  重要提示
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 提交后进入人工审核（预计 24-48 小时）</li>
                  <li>• 审核通过后项目将出现在"探索"页面</li>
                  <li>• 审核期间可撤回修改</li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={submitApplication}
                disabled={!agreedToTerms || !agreedToShadow}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                提交项目审核 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 8: Submitted (placeholder - actual state is above) */}
        {currentStep === 7 && !generating && (
          <div className="text-center py-12">
            <h2>Submitted</h2>
          </div>
        )}
      </div>
    </main>
  )
}
