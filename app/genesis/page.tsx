"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Lock, FileText, Loader2, RefreshCw, Pencil, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export const dynamic = 'force-dynamic'

// Token allocation donut chart
function DonutChart() {
  const segments = [
    { percent: 20, color: "#10B981", label: "公开发售", offset: 0 },
    { percent: 15, color: "#2563EB", label: "流动性储备", offset: 20 },
    { percent: 65, color: "#F59E0B", label: "创始人持有", offset: 35 },
  ]

  return (
    <div className="flex items-center justify-center gap-8">
      <div className="relative h-48 w-48">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          {segments.map((seg) => (
            <circle
              key={seg.label}
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              stroke={seg.color}
              strokeWidth="3"
              strokeDasharray={`${seg.percent} ${100 - seg.percent}`}
              strokeDashoffset={`${-seg.offset}`}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">总供应量</span>
          <span className="font-mono text-sm font-bold text-foreground">1,000,000,000</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-sm text-foreground">{seg.percent}% {seg.label}</span>
            {seg.label === "创始人持有" && <Lock className="h-3 w-3 text-muted-foreground" />}
          </div>
        ))}
      </div>
    </div>
  )
}

// Bonding curve SVG
function BondingCurvePreview() {
  const points = Array.from({ length: 100 }, (_, i) => {
    const x = i / 100
    const y = Math.pow(x, 1.8)
    return `${10 + x * 280},${190 - y * 170}`
  }).join(" ")

  return (
    <svg viewBox="0 0 300 200" className="h-full w-full">
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      <line x1="10" y1="190" x2="290" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1="10" y1="20" x2="10" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Filled area */}
      <polygon points={`10,190 ${points} 290,190`} fill="url(#curveGrad)" />
      {/* Curve */}
      <polyline points={points} fill="none" stroke="#2563EB" strokeWidth="2" />
      {/* Labels */}
      <text x="10" y="205" fill="#94A3B8" fontSize="8">0%</text>
      <text x="60" y="205" fill="#94A3B8" fontSize="8">20%</text>
      <text x="270" y="205" fill="#94A3B8" fontSize="8">100%</text>
      <text x="12" y="195" fill="#94A3B8" fontSize="7">低价期(邀请制)</text>
      <text x="200" y="60" fill="#94A3B8" fontSize="7">指数上涨期</text>
      {/* Axes labels */}
      <text x="150" y="215" fill="#94A3B8" fontSize="8" textAnchor="middle">供应量</text>
      <text x="5" y="105" fill="#94A3B8" fontSize="8" textAnchor="middle" transform="rotate(-90, 5, 105)">价格</text>
    </svg>
  )
}

export default function GenesisPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("")
  const [projectCode, setProjectCode] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("EXP")
  const [stakeAmount, setStakeAmount] = useState([750])
  const [dividendPercent, setDividendPercent] = useState("15")
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [businessDesc, setBusinessDesc] = useState("")
  const [generatingBP, setGeneratingBP] = useState(false)
  const [bpGenerated, setBpGenerated] = useState(false)

  const handleGenerateBP = () => {
    setGeneratingBP(true)
    setTimeout(() => {
      setGeneratingBP(false)
      setBpGenerated(true)
    }, 2000)
  }

  const handleConfirmGenesis = () => {
    router.push("/project/1")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-28">
        <h1 className="mb-2 text-3xl font-bold text-foreground">代币创世配置</h1>
        <p className="mb-10 text-muted-foreground">确认你的融资方案并完成创世设置</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Plan Overview */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-semibold text-foreground">方案总览</h2>
              
              <div className="mb-6 flex flex-col gap-4">
                <div>
                  <Label className="mb-2 block text-sm text-muted-foreground">项目名称</Label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="输入项目名称"
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm text-muted-foreground">项目代号</Label>
                  <Input
                    value={projectCode}
                    onChange={(e) => setProjectCode(e.target.value)}
                    placeholder="输入项目代号"
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm text-muted-foreground">代币符号</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                      className="border-border bg-secondary pl-7 font-mono text-foreground"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl bg-secondary p-5">
                  <div className="mb-1 text-sm text-muted-foreground">融资需求 (F)</div>
                  <div className="font-mono text-2xl font-bold text-foreground">$50,000 <span className="text-sm font-normal text-muted-foreground">USDT</span></div>
                  <div className="mt-1 text-xs text-muted-foreground">你的业务资金</div>
                </div>
                <div className="rounded-xl bg-secondary p-5">
                  <div className="mb-1 text-sm text-muted-foreground">募集硬顶 (H)</div>
                  <div className="font-mono text-2xl font-bold text-primary">$72,000 <span className="text-sm font-normal text-muted-foreground">USDT</span></div>
                  <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                    <span>20% 公开发售</span>
                    <span>15% 流动性储备</span>
                    <span>65% 创始人锁定 (1年)</span>
                  </div>
                </div>
                <div className="rounded-xl bg-secondary p-5">
                  <div className="mb-1 text-sm text-muted-foreground">入池资金 (L)</div>
                  <div className="font-mono text-2xl font-bold text-emerald-400">$22,000 <span className="text-sm font-normal text-muted-foreground">USDT</span></div>
                  <div className="mt-1 text-xs text-muted-foreground">毕业时注入 Uniswap</div>
                </div>
              </div>
            </div>

            {/* Token Allocation */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-semibold text-foreground">代币分配</h2>
              <DonutChart />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* Bonding Curve */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-semibold text-foreground">联合曲线预览</h2>
              <div className="h-56">
                <BondingCurvePreview />
              </div>
            </div>

            {/* Staking */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">身价对赌质押</h2>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                为保证项目真实性，你需要质押保证金
              </p>

              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-sm text-foreground">质押金额</Label>
                  <span className="font-mono text-lg font-bold text-primary">
                    ${stakeAmount[0].toLocaleString()} USDT
                  </span>
                </div>
                <Slider
                  value={stakeAmount}
                  onValueChange={setStakeAmount}
                  min={500}
                  max={5000}
                  step={50}
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>$500</span>
                  <span>$5,000</span>
                </div>
              </div>

              <div className="mb-6 rounded-xl bg-secondary p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">链上协议摘要</span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  本人承诺在毕业后1年内，通过业务营收达成以下分红目标:
                </p>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">年度分红 ≥ 募集资金的</span>
                  <Input
                    value={dividendPercent}
                    onChange={(e) => setDividendPercent(e.target.value)}
                    className="w-20 border-border bg-accent text-center font-mono text-foreground"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground">如未达标，质押金将赔付给投资者</p>
              </div>

              <div className="mb-6 flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={agreedTerms}
                  onCheckedChange={(checked) => setAgreedTerms(checked === true)}
                />
                <Label htmlFor="terms" className="cursor-pointer text-sm text-muted-foreground">
                  我已阅读并同意上述条款
                </Label>
              </div>

              <Button
                onClick={handleConfirmGenesis}
                disabled={!agreedTerms}
                className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Lock className="h-4 w-4" /> 确认质押并创世
              </Button>
            </div>

            {/* AI BP Generator */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">AI 商业计划书生成</h2>
              </div>

              <div className="mb-4">
                <Label className="mb-2 block text-sm text-muted-foreground">
                  描述你的业务背景 (限200字)
                </Label>
                <Textarea
                  value={businessDesc}
                  onChange={(e) => setBusinessDesc(e.target.value)}
                  maxLength={200}
                  placeholder="我是一名资深保险代理人，拥有10年行业经验..."
                  className="min-h-24 resize-none border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
                <div className="mt-1 text-right text-xs text-muted-foreground">
                  {businessDesc.length}/200
                </div>
              </div>

              <Button
                onClick={handleGenerateBP}
                disabled={generatingBP || !businessDesc}
                className="mb-6 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {generatingBP ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> 生成中...
                  </>
                ) : (
                  "生成商业计划书"
                )}
              </Button>

              {bpGenerated && (
                <div className="rounded-xl border border-border bg-secondary p-6">
                  <h3 className="mb-4 font-semibold text-foreground">商业计划书预览</h3>
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <div className="rounded-lg bg-accent p-3">
                      <div className="mb-1 font-medium text-foreground">项目愿景</div>
                      <p>打造行业领先的客户服务体系，通过代币化激励机制实现业务快速增长...</p>
                    </div>
                    <div className="rounded-lg bg-accent p-3">
                      <div className="mb-1 font-medium text-foreground">市场分析</div>
                      <p>目标市场规模预计达到 $2.5B，年增长率 18%...</p>
                    </div>
                    <div className="rounded-lg bg-accent p-3">
                      <div className="mb-1 font-medium text-foreground">资金使用计划</div>
                      <p>60% 用于获客，25% 用于技术建设，15% 用于运营...</p>
                    </div>
                    <div className="rounded-lg bg-accent p-3">
                      <div className="mb-1 font-medium text-foreground">营收预测</div>
                      <p>预计首年营收 $120,000，第二年增长至 $350,000...</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                      <RefreshCw className="h-3 w-3" /> 重新生成
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                      <Pencil className="h-3 w-3" /> 手动编辑
                    </Button>
                    <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Check className="h-3 w-3" /> 确认使用
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
