"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, Clock, ArrowUpRight, Send } from "lucide-react"
import Link from "next/link"

const investors = [
  { address: "0x7a3f...9e2d", displayName: null, amount: "$5,000", time: "2 分钟前" },
  { address: "0x9b1e...8e1a", displayName: null, amount: "$2,500", time: "5 分钟前" },
  { address: "0x3c5a...5a9f", displayName: null, amount: "$10,000", time: "12 分钟前" },
  { address: null, displayName: "Alice_Chen", amount: "$1,200", time: "15 分钟前" },
  { address: "0x2d7f...7f4b", displayName: null, amount: "$3,000", time: "23 分钟前" },
  { address: null, displayName: "Bob_Dev", amount: "$8,000", time: "45 分钟前" },
  { address: "0x6e8c...2d1a", displayName: null, amount: "$1,500", time: "1 小时前" },
]

const transfers = [
  { contact: "138****8888", amount: "$2,000", date: "昨天" },
  { contact: "liwei@email.com", amount: "$5,000", date: "2 天前" },
]

function LiveBondingCurve() {
  const points = Array.from({ length: 100 }, (_, i) => {
    const x = i / 100
    const y = Math.pow(x, 1.8)
    return { x: 20 + x * 360, y: 240 - y * 210 }
  })
  const soldPercent = 0.675
  const soldIdx = Math.floor(soldPercent * 100)
  const soldPoints = points.slice(0, soldIdx + 1)

  return (
    <svg viewBox="0 0 400 280" className="h-full w-full">
      <defs>
        <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[50, 100, 150, 200].map((y) => (
        <line key={y} x1="20" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}
      {/* Axes */}
      <line x1="20" y1="240" x2="380" y2="240" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <line x1="20" y1="30" x2="20" y2="240" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      {/* Sold area */}
      <polygon
        points={`20,240 ${soldPoints.map((p) => `${p.x},${p.y}`).join(" ")} ${soldPoints[soldPoints.length - 1].x},240`}
        fill="url(#liveGrad)"
      />
      {/* Full curve */}
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />
      {/* Sold curve */}
      <polyline
        points={soldPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#2563EB"
        strokeWidth="2.5"
      />
      {/* Current point */}
      <circle
        cx={soldPoints[soldPoints.length - 1].x}
        cy={soldPoints[soldPoints.length - 1].y}
        r="6"
        fill="#2563EB"
        stroke="#0F172A"
        strokeWidth="3"
      />
      {/* Price tooltip */}
      <rect
        x={soldPoints[soldPoints.length - 1].x - 40}
        y={soldPoints[soldPoints.length - 1].y - 35}
        width="80"
        height="24"
        rx="6"
        fill="#1E293B"
        stroke="#2563EB"
        strokeWidth="1"
      />
      <text
        x={soldPoints[soldPoints.length - 1].x}
        y={soldPoints[soldPoints.length - 1].y - 19}
        fill="#2563EB"
        fontSize="10"
        textAnchor="middle"
        fontFamily="monospace"
      >
        $0.018 USDT
      </text>
      {/* Labels */}
      <text x="20" y="258" fill="#94A3B8" fontSize="8">$0.008</text>
      <text x="360" y="258" fill="#94A3B8" fontSize="8">$0.045</text>
      <text x="200" y="272" fill="#94A3B8" fontSize="8" textAnchor="middle">供应量</text>
    </svg>
  )
}

function Countdown() {
  return (
    <div className="flex items-center gap-3">
      {[
        { value: "03", label: "天" },
        { value: "14", label: "时" },
        { value: "32", label: "分" },
        { value: "18", label: "秒" },
      ].map((item, i) => (
        <div key={item.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary font-mono text-2xl font-bold text-foreground">
              {item.value}
            </div>
            <span className="mt-1 text-xs text-muted-foreground">{item.label}</span>
          </div>
          {i < 3 && <span className="text-xl text-muted-foreground">:</span>}
        </div>
      ))}
    </div>
  )
}

export default function IncubationDashboardPage() {
  const [transferContact, setTransferContact] = useState("")
  const [transferAmount, setTransferAmount] = useState("")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/project/1" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">内盘交易面板</h1>
              <p className="text-sm text-muted-foreground">InsureMax Pro ($IMP) - 公售期</p>
            </div>
          </div>
          <Badge className="bg-primary/20 text-primary border-0">第 12/90 天</Badge>
        </div>

        {/* Countdown */}
        <div className="mb-8 flex items-center justify-center rounded-2xl border border-border bg-card p-8">
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">内盘认购倒计时</p>
            <Countdown />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Bonding Curve */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">实时联合曲线</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-400">实时</span>
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-4 text-center">
                  <div className="text-xs text-muted-foreground">当前价格</div>
                  <div className="font-mono text-3xl font-bold text-primary">$0.018</div>
                  <div className="text-xs text-muted-foreground">USDT</div>
                </div>
              </div>

              <div className="h-64 lg:h-72">
                <LiveBondingCurve />
              </div>

              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <span>价格区间: $0.008 → $0.045</span>
                <span>当前阶段: 公售期 (第12/90天)</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Subscription Stats */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">认购数据</h3>

              <div className="mb-4 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">目标硬顶</span>
                  <span className="font-mono text-foreground">$72,000 USDT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">已募集</span>
                  <span className="font-mono text-primary">$48,600 USDT (67.5%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">剩余目标</span>
                  <span className="font-mono text-foreground">$23,400 USDT</span>
                </div>
              </div>

              <Progress value={67.5} className="mb-4 h-2" />

              <div className="rounded-xl bg-secondary p-4">
                <h4 className="mb-2 text-xs font-medium text-muted-foreground">代币分配</h4>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">公开发售</span>
                    <span className="font-mono text-foreground">200,000,000 $IMP (20%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">已售出</span>
                    <span className="font-mono text-primary">135,000,000 $IMP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">剩余</span>
                    <span className="font-mono text-foreground">65,000,000 $IMP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investors List */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">最新投资者</h3>
                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  实时更新
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {investors.map((inv, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-medium text-foreground">
                      {inv.displayName ? inv.displayName.charAt(0) : inv.address!.charAt(2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-mono text-sm text-foreground">
                        {inv.displayName || inv.address}
                      </div>
                      <div className="text-xs text-muted-foreground">{inv.time}</div>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-sm font-medium text-emerald-400">
                      <ArrowUpRight className="h-3 w-3" />
                      {inv.amount}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-4 w-full border-border text-foreground hover:bg-accent">
                <Users className="mr-2 h-4 w-4" /> 查看全部 127 位投资者
              </Button>
            </div>
          </div>
        </div>

        {/* Dual-Track Transfer (founder only) */}
        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <Send className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">双轨入金 - 权益转让</h2>
              <p className="text-sm text-muted-foreground">
                通过线下业务获得的法币客户，可转让代币权益给他们
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">客户手机号 / 邮箱</label>
                <Input
                  value={transferContact}
                  onChange={(e) => setTransferContact(e.target.value)}
                  placeholder="输入手机号或邮箱"
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">转让金额</label>
                <div className="relative">
                  <Input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0.00"
                    className="border-border bg-secondary pr-16 font-mono text-foreground placeholder:text-muted-foreground"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                </div>
              </div>
              {transferAmount && (
                <div className="rounded-lg bg-secondary p-3 text-sm">
                  <span className="text-muted-foreground">对应代币: </span>
                  <span className="font-mono text-foreground">
                    {(parseFloat(transferAmount || "0") / 0.018).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $IMP
                  </span>
                </div>
              )}
              <Button className="gap-2 bg-amber-500 text-foreground hover:bg-amber-600">
                <Send className="h-4 w-4" /> 创建无感钱包并转让权益
              </Button>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium text-foreground">最近转让记录</h4>
              <div className="flex flex-col gap-3">
                {transfers.map((t, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3 text-sm">
                    <span className="text-foreground">{t.contact}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-muted-foreground">{t.amount}</span>
                      <span className="text-xs text-muted-foreground">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
