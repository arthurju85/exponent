"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, ArrowLeft, Mail, Upload, Briefcase, Code, Video, Loader2, Key, Shield, Lock } from "lucide-react"
import { useRouter } from "@/i18n/routing"
import { AuthModal } from "@/components/auth-modal"

const steps = ["邀请码", "角色选择", "填写需求", "生成方案"]

const roleOptions = [
  {
    icon: Briefcase,
    title: "超级销售",
    subtitle: "Super Seller",
    gamma: 1.8,
    audiences: ["保险、房产、高端顾问"],
    fundingTraits: "现金转化极快",
    lpLock: "较少 (更多资金用于业务)",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-500/10",
  },
  {
    icon: Code,
    title: "独立开发 / AI",
    subtitle: "Solopreneur",
    gamma: 1.2,
    audiences: ["程序员、AI创业者、SaaS开发者"],
    fundingTraits: "研发周期中等",
    lpLock: "平衡配置",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    selectedBorder: "border-emerald-500",
    selectedBg: "bg-emerald-500/10",
  },
  {
    icon: Video,
    title: "内容创作者",
    subtitle: "Content Creator",
    gamma: 0.8,
    audiences: ["网红、YouTuber、自媒体"],
    fundingTraits: "现金流不稳定",
    lpLock: "较多 (靠共识驱动)",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/20",
    selectedBorder: "border-amber-500",
    selectedBg: "bg-amber-500/10",
  },
]

const fundingCategories = [
  { id: "leads", label: "购买线索 / 客户资源" },
  { id: "compute", label: "购买算力 / API 服务" },
  { id: "hardware", label: "硬件设备采购" },
  { id: "content", label: "内容制作投入" },
  { id: "other", label: "其他" },
]

// Valid invitation codes (mock)
const VALID_INVITATION_CODES = ["EXPO2025", "EARLYBIRD", "VIP001", "LAUNCH"]

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [fundingAmount, setFundingAmount] = useState([50000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationSteps, setGenerationSteps] = useState<string[]>([])
  // Invitation code state
  const [invitationCode, setInvitationCode] = useState("")
  const [invitationVerified, setInvitationVerified] = useState(false)
  const [invitationError, setInvitationError] = useState("")

  // Check login status on mount
  useEffect(() => {
    // In real app, check auth token/cookie
    const checkLogin = () => {
      // Mock check - user is not logged in initially
      setIsLoggedIn(false)
      setShowAuthModal(true)
    }
    checkLogin()
  }, [])

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 2) {
        startGeneration()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const startGeneration = () => {
    setGenerating(true)
    setGenerationProgress(0)
    setGenerationSteps([])

    const stepsToShow = [
      "分析角色特征",
      "计算流动性需求",
      "确定硬顶金额",
      "生成代币经济模型",
    ]

    stepsToShow.forEach((step, i) => {
      setTimeout(() => {
        setGenerationSteps((prev) => [...prev, step])
        setGenerationProgress((i + 1) / stepsToShow.length * 100)
        if (i === stepsToShow.length - 1) {
          setTimeout(() => {
            setGenerating(false)
            router.push("/genesis")
          }, 1000)
        }
      }, (i + 1) * 800)
    })
  }

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-28">
        {/* Step Indicator */}
        <div className="mb-12 flex items-center justify-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}>
                {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-sm sm:block ${
                i <= currentStep ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step}
              </span>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-px w-8 ${
                  i < currentStep ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Invitation Code */}
        {currentStep === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">输入邀请码</h2>
              <p className="text-muted-foreground">发布项目需要有效的邀请码</p>
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
                  <span>验证通过</span>
                </div>
              )}
              {invitationError && (
                <p className="mt-3 text-sm text-red-500">{invitationError}</p>
              )}
            </div>

            <div className="flex justify-end">
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

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">选择你的角色</h2>
            <p className="text-muted-foreground">选择最符合你业务类型的角色模板</p>

            <div className="grid gap-4 md:grid-cols-3">
              {roleOptions.map((role, i) => (
                <button
                  key={role.title}
                  onClick={() => setSelectedRole(i)}
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
                  <Badge variant="secondary" className="mb-4 font-mono text-xs">
                    &gamma; = {role.gamma}
                  </Badge>
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

        {/* Step 2: Funding Needs */}
        {currentStep === 2 && (
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground">你需要多少钱来扩张业务?</h2>
            <p className="mb-8 text-muted-foreground">请填写你的融资需求与资金用途</p>

            <div className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <Label className="text-sm text-foreground">融资金额</Label>
                <span className="font-mono text-2xl font-bold text-primary">
                  ${fundingAmount[0].toLocaleString()} <span className="text-sm font-normal text-muted-foreground">USDT</span>
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

            <div className="mb-8">
              <Label className="mb-4 block text-sm text-foreground">资金用途说明 (至少选一项)</Label>
              <div className="flex flex-col gap-4">
                {fundingCategories.map((cat) => (
                  <div key={cat.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={cat.id}
                        checked={selectedCategories.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                      />
                      <Label htmlFor={cat.id} className="cursor-pointer text-sm text-foreground">
                        {cat.label}
                      </Label>
                    </div>
                    {selectedCategories.includes(cat.id) && (
                      <div className="ml-8">
                        <Input
                          placeholder="预算 (USDT)"
                          className="max-w-xs border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="gap-2 border-border text-foreground hover:bg-accent">
                <ArrowLeft className="h-4 w-4" /> 上一步
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedCategories.length === 0}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                生成方案 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Generating */}
        {currentStep === 3 && generating && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin text-primary" />
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              正在计算最优融资方案...
            </h2>
            <p className="mb-8 text-muted-foreground">AI 正在为你生成个性化的代币经济模型</p>

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
              {["分析角色特征", "计算流动性需求", "确定硬顶金额", "生成代币经济模型"].map(
                (step) => (
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
                )
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
