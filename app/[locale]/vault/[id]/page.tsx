"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, FileText, Check, Clock, Loader2, Eye, RefreshCw, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

const unlockRecords = [
  {
    date: "2024-01-15",
    label: "毕业日",
    description: "首笔启动金",
    amount: "+$15,960",
    percent: "30%",
    status: "done" as const,
    receipt: null,
  },
  {
    date: "2024-02-03",
    label: null,
    description: "线索购买报销",
    amount: "+$5,000",
    percent: null,
    status: "done" as const,
    receipt: "发票 #INV-2024-0023",
  },
  {
    date: "2024-02-20",
    label: null,
    description: "OpenAI API 报销",
    amount: "+$2,400",
    percent: null,
    status: "done" as const,
    receipt: "账单截图",
  },
  {
    date: "2024-03-05",
    label: null,
    description: "线索购买报销",
    amount: "+$5,240",
    percent: null,
    status: "pending" as const,
    receipt: "发票 #INV-2024-0041",
  },
]

const reimbursementDetail = {
  id: "EXP-2024-0032",
  submitTime: "2024-03-05 14:32",
  status: "平台复核中",
  ai: {
    amount: "$5,240.00 USDT",
    merchant: "ABC 线索公司",
    date: "2024-03-01",
    type: "服务发票",
    confidence: 94,
  },
  progress: 50,
}

export default function VaultPage() {
  const [reimbursementType, setReimbursementType] = useState("")
  const [reimbursementAmount, setReimbursementAmount] = useState("")
  const [reimbursementNote, setReimbursementNote] = useState("")
  const [showDetail, setShowDetail] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-28">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/graduation/1" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">生产力金库</h1>
            <p className="text-sm text-muted-foreground">InsureMax Pro ($IMP)</p>
          </div>
        </div>

        {/* Vault Overview */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-8">
          <div className="mb-6 grid grid-cols-3 gap-6">
            <div className="rounded-xl bg-secondary p-5 text-center">
              <div className="mb-1 text-xs text-muted-foreground">总资金</div>
              <div className="font-mono text-2xl font-bold text-foreground">$53,200</div>
            </div>
            <div className="rounded-xl bg-secondary p-5 text-center">
              <div className="mb-1 text-xs text-muted-foreground">已解锁</div>
              <div className="font-mono text-2xl font-bold text-primary">$28,600</div>
              <div className="text-xs text-muted-foreground">(53.8%)</div>
            </div>
            <div className="rounded-xl bg-secondary p-5 text-center">
              <div className="mb-1 text-xs text-muted-foreground">可用余额</div>
              <div className="font-mono text-2xl font-bold text-emerald-400">$8,400</div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">资金解锁进度</span>
              <span className="font-mono text-foreground">53.8%</span>
            </div>
            <Progress value={53.8} className="h-3" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$53,200</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">资金解锁记录</h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-px bg-border" />

              <div className="flex flex-col gap-6">
                {unlockRecords.map((record, i) => (
                  <div key={i} className="relative flex gap-4 pl-4">
                    {/* Dot */}
                    <div className={`relative z-10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      record.status === "done"
                        ? "bg-emerald-500/20"
                        : "bg-amber-500/20"
                    }`}>
                      {record.status === "done" ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-400" />
                      )}
                    </div>

                    <div className="flex-1 rounded-xl bg-secondary p-4">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{record.date}</span>
                        {record.label && (
                          <Badge variant="secondary" className="text-xs">{record.label}</Badge>
                        )}
                      </div>
                      <div className="mb-1 text-sm text-foreground">
                        {record.description}
                        {record.percent && <span className="ml-1 text-muted-foreground">({record.percent})</span>}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-lg font-bold ${
                          record.status === "done" ? "text-emerald-400" : "text-amber-400"
                        }`}>
                          {record.amount}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            record.status === "done"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          } border-0`}
                        >
                          {record.status === "done" ? "已到账" : "审核中"}
                        </Badge>
                      </div>
                      {record.receipt && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          凭证: {record.receipt}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* OCR Reimbursement */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-xl font-semibold text-foreground">提交报销申请</h2>

              <div className="mb-4">
                <Label className="mb-2 block text-sm text-muted-foreground">报销类型</Label>
                <Select value={reimbursementType} onValueChange={setReimbursementType}>
                  <SelectTrigger className="border-border bg-secondary text-foreground">
                    <SelectValue placeholder="选择报销类型" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    <SelectItem value="leads" className="text-foreground">线索购买</SelectItem>
                    <SelectItem value="api" className="text-foreground">API / 算力服务</SelectItem>
                    <SelectItem value="hardware" className="text-foreground">硬件设备</SelectItem>
                    <SelectItem value="content" className="text-foreground">内容制作</SelectItem>
                    <SelectItem value="other" className="text-foreground">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Label className="mb-2 block text-sm text-muted-foreground">报销金额</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={reimbursementAmount}
                    onChange={(e) => setReimbursementAmount(e.target.value)}
                    placeholder="0.00"
                    className="border-border bg-secondary pr-16 font-mono text-foreground placeholder:text-muted-foreground"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">USDT</span>
                </div>
              </div>

              <div className="mb-4">
                <Label className="mb-2 block text-sm text-muted-foreground">上传凭证</Label>
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary p-8 transition-colors hover:border-primary/30">
                  <div className="text-center">
                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-foreground">拖拽上传或点击选择</p>
                    <p className="mt-1 text-xs text-muted-foreground">支持: JPG, PNG, PDF | 最大: 10MB</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Label className="mb-2 block text-sm text-muted-foreground">备注说明</Label>
                <Textarea
                  value={reimbursementNote}
                  onChange={(e) => setReimbursementNote(e.target.value)}
                  placeholder="购买2024年Q1高端医疗险线索包..."
                  className="min-h-20 resize-none border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Upload className="h-4 w-4" /> 提交审核
              </Button>

              <div className="mt-4 rounded-xl bg-secondary p-4">
                <div className="mb-2 text-xs font-medium text-foreground">AI 将自动识别凭证中的:</div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <span>* 金额信息</span>
                  <span>* 商家 / 服务方</span>
                  <span>* 日期</span>
                  <span>* 票据类型</span>
                </div>
              </div>
            </div>

            {/* Reimbursement Detail */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">报销详情</h2>
                <Badge variant="secondary" className="font-mono text-xs">#{reimbursementDetail.id}</Badge>
              </div>

              <div className="mb-4 flex justify-between text-sm">
                <span className="text-muted-foreground">提交时间</span>
                <span className="text-foreground">{reimbursementDetail.submitTime}</span>
              </div>
              <div className="mb-6 flex justify-between text-sm">
                <span className="text-muted-foreground">状态</span>
                <Badge className="bg-amber-500/20 text-amber-400 border-0">
                  <Clock className="mr-1 h-3 w-3" /> {reimbursementDetail.status}
                </Badge>
              </div>

              <div className="mb-6 rounded-xl bg-secondary p-5">
                <h3 className="mb-3 text-sm font-medium text-foreground">AI 识别结果</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">金额</span>
                    <span className="flex items-center gap-1 font-mono text-foreground">
                      {reimbursementDetail.ai.amount} <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">商家</span>
                    <span className="text-foreground">{reimbursementDetail.ai.merchant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">日期</span>
                    <span className="text-foreground">{reimbursementDetail.ai.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">类型</span>
                    <span className="text-foreground">{reimbursementDetail.ai.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">可信度</span>
                    <span className="font-mono text-emerald-400">{reimbursementDetail.ai.confidence}%</span>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                    <Eye className="h-3 w-3" /> 查看原图
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 border-border text-foreground hover:bg-accent">
                    <RefreshCw className="h-3 w-3" /> 重新识别
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">审核进度</h3>
                <Progress value={reimbursementDetail.progress} className="mb-3 h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="h-3 w-3" /> AI 初审
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Clock className="h-3 w-3" /> 平台复核
                  </span>
                  <span className="text-muted-foreground">资金释放</span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">预计到账: 1-2 个工作日</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
