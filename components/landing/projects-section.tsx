"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Sparkles, ArrowRight, Calendar, Target } from "lucide-react"
import Link from "next/link"

const previewProjects = [
  {
    id: "1",
    name: "InsureMax Pro",
    roleKey: "superSeller",
    roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    avatar: "SS",
    avatarColor: "bg-blue-600",
    description: "车险代理业务扩张，需要资金周转以扩大客户覆盖",
    status: "preparing",
    fundingRange: "$50K - $80K",
    eta: "Q2 2025",
  },
  {
    id: "2",
    name: "CodeForge AI",
    roleKey: "solopreneur",
    roleColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    avatar: "SO",
    avatarColor: "bg-emerald-600",
    description: "AI 代码助手 SaaS，寻求种子资金用于产品迭代",
    status: "beta",
    fundingRange: "$30K - $60K",
    eta: "Q2 2025",
  },
  {
    id: "3",
    name: "TechTok Studio",
    roleKey: "creator",
    roleColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    avatar: "CC",
    avatarColor: "bg-amber-600",
    description: "科技测评创作者，融资用于设备升级和团队搭建",
    status: "coming",
    fundingRange: "$20K - $50K",
    eta: "Q3 2025",
  },
]

const statusConfig = {
  preparing: { label: "筹备中", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30" },
  beta: { label: "内测预约", color: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
  coming: { label: "即将上线", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" },
}

export function ProjectsSection() {
  const t = useTranslations("projects")
  const tr = useTranslations("roleCards")

  return (
    <section className="px-6 py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Preview Projects */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {previewProjects.map((project) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.avatarColor} text-sm font-bold text-white`}>
                  {project.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs border ${project.roleColor}`}>
                      {tr(`${project.roleKey}.title`)}
                    </span>
                    <Badge variant="outline" className={`text-xs ${statusConfig[project.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[project.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{t("preview.fundingRange")}</div>
                    <div className="font-medium">{project.fundingRange}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">{t("preview.eta")}</div>
                    <div className="font-medium">{project.eta}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-8">
          <p className="text-center text-sm text-muted-foreground">
            {t("preview.footnote")}
          </p>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-foreground">
            {t("preview.title")}
          </h3>
          <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
            {t("preview.description")}
          </p>
          <Link href="/explore">
            <Button size="lg" className="gap-2">
              {t("preview.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
