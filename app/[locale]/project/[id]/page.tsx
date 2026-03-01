"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Share2, Clock, Users, Shield, ExternalLink, Wallet, CreditCard, Building } from "lucide-react"
import Link from "next/link"

function PriceCurveChart() {
  const points = Array.from({ length: 100 }, (_, i) => {
    const x = i / 100
    const y = Math.pow(x, 1.8)
    return { x: 10 + x * 280, y: 190 - y * 170 }
  })
  const soldPercent = 0.675
  const soldIdx = Math.floor(soldPercent * 100)
  const soldPoints = points.slice(0, soldIdx + 1)
  const allPoints = points.map((p) => `${p.x},${p.y}`).join(" ")
  const soldArea = soldPoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <svg viewBox="0 0 300 220" className="h-full w-full">
      <defs>
        <linearGradient id="soldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <line x1="10" y1="190" x2="290" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1="10" y1="20" x2="10" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Sold area fill */}
      <polygon
        points={`10,190 ${soldArea} ${soldPoints[soldPoints.length - 1].x},190`}
        fill="url(#soldGrad)"
      />
      {/* Full curve */}
      <polyline points={allPoints} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      {/* Sold portion */}
      <polyline
        points={soldPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
      />
      {/* Current position marker */}
      <circle cx={soldPoints[soldPoints.length - 1].x} cy={soldPoints[soldPoints.length - 1].y} r="4" fill="#2563EB" stroke="#0F172A" strokeWidth="2" />
      <text x={soldPoints[soldPoints.length - 1].x} y={soldPoints[soldPoints.length - 1].y - 12} fill="#2563EB" fontSize="8" textAnchor="middle">$0.018</text>
      <text x="150" y="210" fill="#94A3B8" fontSize="8" textAnchor="middle">已售代币百分比 (0-100%)</text>
      <text x="5" y="105" fill="#94A3B8" fontSize="8" textAnchor="middle" transform="rotate(-90, 5, 105)">代币价格</text>
    </svg>
  )
}

export default function ProjectShowcasePage() {
  const [investAmount, setInvestAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card" | "bank">("wallet")

  const estimatedTokens = investAmount ? (parseFloat(investAmount) / 0.018).toFixed(0) : "0"

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> 返回
          </Link>
          <Button variant="outline" size="sm" className="gap-2 border-border text-foreground hover:bg-accent">
            <Share2 className="h-4 w-4" /> 分享
          </Button>
        </div>

        {/* Project Hero */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-8">
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-foreground">
              IM
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">InsureMax Pro</h1>
                <Badge className="bg-destructive/20 text-destructive border-0">内盘认购中</Badge>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-mono">$IMP</span>
                <span>|</span>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-0">超级销售</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-warning">剩余 3 天 14 小时</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "募集进度", value: "$48,600", sub: "67.5%", progress: 67.5 },
            { label: "当前价格", value: "$0.018", sub: "USDT" },
            { label: "参与者", value: "127", sub: "人" },
            { label: "硬顶", value: "$72,000", sub: "USDT" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-1 text-xs text-muted-foreground">{stat.label}</div>
              <div className="font-mono text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.sub}</div>
              {stat.progress !== undefined && (
                <Progress value={stat.progress} className="mt-2 h-1.5" />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: 2 cols */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* Price Curve */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-semibold text-foreground">认购价格曲线</h2>
              <div className="h-64">
                <PriceCurveChart />
              </div>
            </div>

            {/* Business Plan Tabs */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6 w-full justify-start bg-secondary">
                  <TabsTrigger value="overview" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">项目概览</TabsTrigger>
                  <TabsTrigger value="team" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">团队背景</TabsTrigger>
                  <TabsTrigger value="funds" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">资金用途</TabsTrigger>
                  <TabsTrigger value="risk" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">风险提示</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-foreground">项目愿景</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      InsureMax Pro 致力于打造保险行业最高效的客户获取体系。通过代币化融资，我们将资金用于购买高质量线索，建立可持续的业务增长飞轮。
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-foreground">市场分析</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      中国保险市场规模持续扩大，年保费收入超过 4.5 万亿元。高净值客户群体不断增长，对专业保险顾问的需求日益旺盛。
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-medium text-foreground">营收预测</h3>
                    <div className="rounded-xl bg-secondary p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xs text-muted-foreground">首季度</div>
                          <div className="font-mono text-lg font-bold text-foreground">$30,000</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">半年</div>
                          <div className="font-mono text-lg font-bold text-foreground">$85,000</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">全年</div>
                          <div className="font-mono text-lg font-bold text-primary">$200,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                  <p className="leading-relaxed text-muted-foreground">
                    创始人拥有 10 年保险行业经验，连续多年获得 MDRT 会员资格，服务高净值客户 500+ 人，年均保费收入超过 100 万元。
                  </p>
                </TabsContent>

                <TabsContent value="funds" className="space-y-4">
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "高端客户线索采购", percent: 60, amount: "$30,000" },
                      { label: "CRM 系统建设", percent: 20, amount: "$10,000" },
                      { label: "市场推广", percent: 15, amount: "$7,500" },
                      { label: "运营储备", percent: 5, amount: "$2,500" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg bg-secondary p-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-foreground">{item.label}</span>
                          <span className="font-mono text-muted-foreground">{item.amount} ({item.percent}%)</span>
                        </div>
                        <Progress value={item.percent} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="risk" className="space-y-4">
                  <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      投资有风险，请谨慎决策。代币价格可能波动，创始人业务发展存在不确定性。质押保证金机制仅为部分风险缓释手段，不构成投资回报的保证。
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-8">
            {/* Founder Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">关于创始人</h3>
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-bold text-foreground">
                  JC
                </div>
                <div>
                  <div className="font-medium text-foreground">James Chen</div>
                  <div className="text-sm text-muted-foreground">@james_insure</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="mb-2 text-sm font-medium text-foreground">职业背景</div>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    10年保险行业经验
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    连续 MDRT 会员
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    服务高净值客户 500+
                  </li>
                </ul>
              </div>

              <div className="mb-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-border text-foreground hover:bg-accent">Twitter</Button>
                <Button variant="outline" size="sm" className="flex-1 border-border text-foreground hover:bg-accent">LinkedIn</Button>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">质押保证: $1,000 USDT</span>
              </div>
            </div>

            {/* Subscribe Card */}
            <div className="rounded-2xl border border-primary/30 bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">参与认购</h3>

              <div className="mb-4">
                <label className="mb-2 block text-sm text-muted-foreground">投资金额</label>
                <div className="relative">
                  <Input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder="0.00"
                    className="border-border bg-secondary pr-16 font-mono text-foreground placeholder:text-muted-foreground"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                </div>
              </div>

              <div className="mb-4 rounded-lg bg-secondary p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">预估获得代币</span>
                  <span className="font-mono text-foreground">{Number(estimatedTokens).toLocaleString()} $IMP</span>
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">当前价格</span>
                  <span className="text-primary">$0.018 USDT/$IMP</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm text-muted-foreground">入金方式</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "wallet" as const, label: "Web3 钱包", icon: Wallet },
                    { id: "card" as const, label: "信用卡", icon: CreditCard },
                    { id: "bank" as const, label: "银行转账", icon: Building },
                  ]).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <method.icon className="h-4 w-4" />
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Wallet className="h-4 w-4" /> 连接钱包进行认购
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                投资有风险，请谨慎决策
              </p>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">快速链接</h3>
              <div className="flex flex-col gap-2">
                <Link href={`/incubation/1`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <ExternalLink className="h-3.5 w-3.5" /> 查看内盘交易面板
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
