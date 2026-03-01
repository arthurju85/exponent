"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Check, ArrowLeft, ExternalLink, GraduationCap, Lock, Vault, ArrowDown, Copy, Twitter } from "lucide-react"
import Link from "next/link"

function FundFlowDiagram() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Total */}
      <div className="w-full max-w-xs rounded-xl border border-primary/30 bg-primary/10 p-4 text-center">
        <div className="text-xs text-muted-foreground">总募集资金</div>
        <div className="font-mono text-2xl font-bold text-primary">$75,200 USDT</div>
      </div>

      <ArrowDown className="h-6 w-6 text-muted-foreground" />

      {/* Split */}
      <div className="grid w-full max-w-lg grid-cols-2 gap-4">
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 text-center">
          <div className="text-xs text-muted-foreground">L 池</div>
          <div className="font-mono text-xl font-bold text-blue-400">$22,000</div>
          <div className="mt-1 text-xs text-muted-foreground">(30%)</div>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-400">
            <Lock className="h-3 w-3" /> 流动性池
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
          <div className="text-xs text-muted-foreground">F 池</div>
          <div className="font-mono text-xl font-bold text-emerald-400">$53,200</div>
          <div className="mt-1 text-xs text-muted-foreground">(70%)</div>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-400">
            <Vault className="h-3 w-3" /> 业务资金
          </div>
        </div>
      </div>

      <div className="grid w-full max-w-lg grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-1">
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
          <div className="rounded-lg bg-secondary p-3 text-center text-xs">
            <div className="font-medium text-foreground">Uniswap V3 LP</div>
            <div className="text-muted-foreground">永久锁定</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
          <div className="rounded-lg bg-secondary p-3 text-center text-xs">
            <div className="font-medium text-foreground">生产力金库</div>
            <div className="text-muted-foreground">分期解锁</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GraduationPage() {
  const [graduated, setGraduated] = useState(false)

  if (graduated) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pb-20 pt-28 text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20">
            <GraduationCap className="h-12 w-12 text-emerald-400" />
          </div>

          <h1 className="mb-4 text-4xl font-bold text-foreground">恭喜毕业!</h1>
          <p className="mb-10 text-lg text-muted-foreground">你的代币已成功上市 Uniswap</p>

          <div className="mb-8 w-full rounded-2xl border border-border bg-card p-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">交易对</span>
                <span className="font-mono text-foreground">$IMP / USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">合约地址</span>
                <span className="flex items-center gap-1 font-mono text-primary">
                  0x7a3f...9e2d <Copy className="h-3 w-3 cursor-pointer" />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">当前价格</span>
                <span className="font-mono text-foreground">$0.000147 USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">流动性</span>
                <span className="font-mono text-foreground">$44,000 (双边)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">市值预估</span>
                <span className="font-mono text-primary">$147,000</span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex gap-4">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <ExternalLink className="h-4 w-4" /> 在 Uniswap 交易
            </Button>
            <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-accent">
              添加代币到钱包
            </Button>
          </div>

          <div>
            <p className="mb-3 text-sm text-muted-foreground">分享你的成功</p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                <Twitter className="h-4 w-4" /> Twitter
              </Button>
              <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                Discord
              </Button>
              <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                <Copy className="h-4 w-4" /> 复制链接
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/vault/1">
              <Button variant="outline" className="gap-2 border-border text-foreground hover:bg-accent">
                前往生产力金库 <ArrowDown className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-28">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/incubation/1" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">项目毕业中心</h1>
            <p className="text-sm text-muted-foreground">InsureMax Pro ($IMP)</p>
          </div>
        </div>

        {/* Graduation Status */}
        <div className="mb-8 rounded-2xl border border-emerald-500/20 bg-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
            <h2 className="text-xl font-semibold text-foreground">已达到硬顶，准备毕业</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "硬顶目标", value: "$72,000 USDT", passed: true },
              { label: "实际募集", value: "$75,200 USDT", passed: true },
              { label: "软顶要求", value: "$36,000 USDT", passed: true },
              { label: "募集时长", value: "12 天", passed: true },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-secondary p-4">
                <div className="mb-1 text-xs text-muted-foreground">{item.label}</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium text-foreground">{item.value}</span>
                  {item.passed && <Check className="h-4 w-4 text-emerald-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fund Flow */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-8 text-center text-xl font-semibold text-foreground">资金分流方案</h2>
          <FundFlowDiagram />

          <div className="mt-8 rounded-xl bg-secondary p-5">
            <h3 className="mb-3 text-sm font-medium text-foreground">代币配对详情</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">L 池资金</span>
                <span className="font-mono text-foreground">$22,000 USDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">B 池代币</span>
                <span className="font-mono text-foreground">150,000,000 $IMP (15%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">初始价格</span>
                <span className="font-mono text-primary">$0.0001467 USDT/$IMP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm */}
        <div className="flex justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg" className="gap-2 bg-primary px-12 text-primary-foreground hover:bg-primary/90">
                <GraduationCap className="h-5 w-5" /> 确认毕业并上市
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-border bg-card">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">毕业确认</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  即将执行以下不可逆操作:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4 text-sm text-foreground">
                <p>1. 提取 $22,000 USDT 作为流动性资金</p>
                <p>2. 从 B 池释放 150,000,000 $IMP</p>
                <p>3. 在 Uniswap V3 创建交易对</p>
                <p>4. 销毁 LP 凭证 (永久锁定流动性)</p>
                <p>5. 将 $53,200 USDT 转入生产力金库</p>
                <p>6. 立即解锁首笔启动金 $15,960 (30%)</p>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-border text-foreground hover:bg-accent">取消</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => setGraduated(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  确认执行毕业
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </main>
  )
}
