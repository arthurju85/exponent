"use client"

import { useState, useEffect } from "react"
import { useRouter } from "@/i18n/routing"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  FileText,
  Users,
  TrendingUp,
  Clock,
  Search
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const dynamic = 'force-dynamic'

// Project status types
type ProjectStatus = "preparing" | "pending_review" | "cornerstone" | "public" | "coming" | "listed" | "failed"

interface Project {
  id: string
  name: string
  founderName: string
  founderAvatar?: string
  roleType: string
  fundingAmount: number
  status: ProjectStatus
  submittedAt: string
  kpi?: {
    type: string
    baseline: number
    target: number
  }
  dividendPlan?: Array<{ days: number; amount: number }>
  bpContent?: string
  socialLinks?: {
    twitter?: string
    website?: string
  }
}

// Mock data for MVP
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Marcus Chen 财富管理工作室",
    founderName: "Marcus Chen",
    roleType: "superSeller",
    fundingAmount: 80000,
    status: "pending_review",
    submittedAt: "2026-03-07T10:30:00Z",
    kpi: { type: "revenue", baseline: 500000, target: 1200000 },
    bpContent: "商业计划书内容...",
  },
  {
    id: "2",
    name: "AI Code Assistant SaaS",
    founderName: "Alex Rivera",
    roleType: "solopreneur",
    fundingAmount: 420000,
    status: "pending_review",
    submittedAt: "2026-03-06T15:45:00Z",
    kpi: { type: "users", baseline: 1000, target: 200000 },
    bpContent: "商业计划书内容...",
  },
  {
    id: "3",
    name: "科技测评频道",
    founderName: "林小薇",
    roleType: "creator",
    fundingAmount: 185000,
    status: "cornerstone",
    submittedAt: "2026-03-05T09:00:00Z",
    kpi: { type: "fans", baseline: 50000, target: 500000 },
    bpContent: "商业计划书内容...",
  },
  {
    id: "4",
    name: "高端房产经纪业务",
    founderName: "陳志豪",
    roleType: "superSeller",
    fundingAmount: 210000,
    status: "public",
    submittedAt: "2026-03-01T14:20:00Z",
    kpi: { type: "revenue", baseline: 800000, target: 2000000 },
    bpContent: "商业计划书内容...",
  },
]

const statusLabels: Record<ProjectStatus, { label: string; color: string }> = {
  preparing: { label: "筹备中", color: "bg-yellow-500/10 text-yellow-600" },
  pending_review: { label: "审核中", color: "bg-gray-500/10 text-gray-600" },
  cornerstone: { label: "基石轮", color: "bg-purple-500/10 text-purple-600" },
  public: { label: "公开募集", color: "bg-blue-500/10 text-blue-600" },
  coming: { label: "即将上市", color: "bg-emerald-500/10 text-emerald-600" },
  listed: { label: "已上市", color: "bg-green-500/10 text-green-600" },
  failed: { label: "募集失败", color: "bg-red-500/10 text-red-600" },
}

const roleLabels: Record<string, string> = {
  superSeller: "超级销售",
  solopreneur: "独立开发/AI",
  creator: "内容创作者",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProjectDialog, setShowProjectDialog] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "request" | null>(null)
  const [reviewNote, setReviewNote] = useState("")
  const [processing, setProcessing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | ProjectStatus>("all")

  useEffect(() => {
    // In production, fetch from API
    // For MVP, use mock data
    setTimeout(() => {
      setProjects(mockProjects)
      setIsLoading(false)
    }, 500)
  }, [])

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.founderName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    total: projects.length,
    pendingReview: projects.filter(p => p.status === "pending_review").length,
    cornerstone: projects.filter(p => p.status === "cornerstone").length,
    public: projects.filter(p => p.status === "public").length,
  }

  // Handle review action
  const handleReview = async (action: "approve" | "reject" | "request") => {
    if (!selectedProject) return

    setProcessing(true)

    // In production, call API
    // For MVP, simulate with timeout
    setTimeout(() => {
      setProjects(prev => prev.map(p => {
        if (p.id === selectedProject.id) {
          return {
            ...p,
            status: action === "approve" ? "cornerstone" : action === "reject" ? "preparing" : p.status,
          }
        }
        return p
      }))
      setProcessing(false)
      setShowProjectDialog(false)
      setReviewNote("")
      setReviewAction(null)
    }, 1000)
  }

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project)
    setShowProjectDialog(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            项目审核后台
          </h1>
          <p className="text-muted-foreground">
            管理和审核平台项目申请
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">总项目数</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">待审核</p>
                  <p className="text-2xl font-bold">{stats.pendingReview}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">基石轮</p>
                  <p className="text-2xl font-bold">{stats.cornerstone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">公开募集</p>
                  <p className="text-2xl font-bold">{stats.public}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索项目名称或创始人..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={filterStatus} onValueChange={setFilterStatus}>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="pending_review">待审核</TabsTrigger>
              <TabsTrigger value="active">进行中</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">项目列表</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>项目</TableHead>
                  <TableHead>创始人</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>融资金额</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>提交时间</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => {
                  const statusConfig = statusLabels[project.status]
                  return (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.founderName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {roleLabels[project.roleType] || project.roleType}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        {formatCurrency(project.fundingAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig.color}>
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(project.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openProjectDetail(project)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Project Detail Dialog */}
        <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    {selectedProject.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">创始人</Label>
                      <p className="font-medium">{selectedProject.founderName}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">角色类型</Label>
                      <Badge variant="secondary">
                        {roleLabels[selectedProject.roleType] || selectedProject.roleType}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">融资金额</Label>
                      <p className="font-mono text-lg font-bold text-primary">
                        {formatCurrency(selectedProject.fundingAmount)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">状态</Label>
                      <Badge className={statusLabels[selectedProject.status].color}>
                        {statusLabels[selectedProject.status].label}
                      </Badge>
                    </div>
                  </div>

                  {/* KPI */}
                  {selectedProject.kpi && (
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">关键业绩指标 (KPI)</Label>
                      <div className="rounded-lg border p-4 bg-secondary/50">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">指标类型</p>
                            <p className="font-medium capitalize">{selectedProject.kpi.type}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">当前基准</p>
                            <p className="font-medium">{selectedProject.kpi.baseline.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">1 年目标</p>
                            <p className="font-medium">{selectedProject.kpi.target.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-muted-foreground">预计增长率</p>
                          <p className="text-lg font-bold text-emerald-500">
                            +{((selectedProject.kpi.target - selectedProject.kpi.baseline) / selectedProject.kpi.baseline * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dividend Plan */}
                  {selectedProject.dividendPlan && selectedProject.dividendPlan.length > 0 && (
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">分红计划</Label>
                      <div className="space-y-2">
                        {selectedProject.dividendPlan.map((plan, i) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-lg border">
                            <span className="text-sm">第 {plan.days} 天</span>
                            <span className="font-mono font-bold">${plan.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BP Content Preview */}
                  {selectedProject.bpContent && (
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">商业计划书预览</Label>
                      <div className="rounded-lg border p-4 bg-secondary/50 max-h-64 overflow-y-auto">
                        <pre className="text-sm whitespace-pre-wrap font-sans">
                          {selectedProject.bpContent}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Review Actions */}
                  {selectedProject.status === "pending_review" && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                          onClick={() => handleReview("approve")}
                          disabled={processing}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          审核通过
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setReviewAction("request")}
                          disabled={processing}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          要求补充
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleReview("reject")}
                          disabled={processing}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          拒绝
                        </Button>
                      </div>

                      {reviewAction && (
                        <div>
                          <Label className="mb-2 block">审核意见</Label>
                          <Textarea
                            placeholder={
                              reviewAction === "reject"
                                ? "请说明拒绝原因..."
                                : "请说明需要补充的材料..."
                            }
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <DialogFooter className="mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setReviewAction(null)}
                            >
                              取消
                            </Button>
                            <Button
                              onClick={() => handleReview(reviewAction)}
                              disabled={processing || !reviewNote.trim()}
                            >
                              {processing ? "处理中..." : "确认"}
                            </Button>
                          </DialogFooter>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
