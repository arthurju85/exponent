"use client"

import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

// Project data with fixed names (not translated) and descriptions in their native language
// 7 种项目状态：preparing, pending_review, cornerstone, public, coming, listed, failed
type ProjectStatus = "preparing" | "pending_review" | "cornerstone" | "public" | "coming" | "listed" | "failed"
type RoleType = "superSeller" | "solopreneur" | "creator"

interface Project {
  id: string
  name: string // Fixed name, not translated
  role: RoleType
  roleKey: string
  roleColor: string
  avatar: string // X.com style avatar URL
  description: string // In native language of the creator
  descriptionLang: "en" | "zh-CN" | "zh-HK" | "ja"
  status: ProjectStatus
  fundingDisplay: string // Fixed funding amount to avoid hydration mismatch
  eta: string // Time string that will be translated
}

const projectsData: Project[] = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "superSeller",
    roleKey: "superSeller",
    roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    description: "Auto insurance agency expansion. Need working capital to scale client coverage and hire additional agents.",
    descriptionLang: "en",
    status: "preparing",
    fundingDisplay: "$145K",
    eta: "Q3 2026",
  },
  {
    id: "2",
    name: "Alex Rivera",
    role: "solopreneur",
    roleKey: "solopreneur",
    roleColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    description: "AI-powered code assistant SaaS seeking seed funding for product iteration and cloud infrastructure.",
    descriptionLang: "en",
    status: "preparing",
    fundingDisplay: "$420K",
    eta: "Q3 2026",
  },
  {
    id: "3",
    name: "林小薇",
    role: "creator",
    roleKey: "creator",
    roleColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop&crop=face",
    description: "科技测评内容创作者，需要资金升级拍摄设备和组建剪辑团队，打造专业级评测频道。",
    descriptionLang: "zh-CN",
    status: "preparing",
    fundingDisplay: "$185K",
    eta: "Q3 2026",
  },
  {
    id: "4",
    name: "陳志豪",
    role: "superSeller",
    roleKey: "superSeller",
    roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop&crop=face",
    description: "高端房產經紀業務拓展，計劃開拓海外豪宅市場，需要資金建立國際客戶網絡與行銷渠道。",
    descriptionLang: "zh-HK",
    status: "cornerstone",
    fundingDisplay: "$210K",
    eta: "july-2026",
  },
  {
    id: "5",
    name: "田中健太",
    role: "solopreneur",
    roleKey: "solopreneur",
    roleColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop&crop=face",
    description: "生成AIを活用したマーケティング自動化ツールの開発。クラウドインフラと顧客獲得のための資金調達。",
    descriptionLang: "ja",
    status: "public",
    fundingDisplay: "$680K",
    eta: "june-2026",
  },
  {
    id: "6",
    name: "王浩然",
    role: "creator",
    roleKey: "creator",
    roleColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop&crop=face",
    description: "独立音乐制作人，计划发行首张专辑并举办巡回演出，寻求资金支持录音制作与宣传发行。",
    descriptionLang: "zh-CN",
    status: "public",
    fundingDisplay: "$125K",
    eta: "june-2026",
  },
  {
    id: "7",
    name: "Sarah Mitchell",
    role: "superSeller",
    roleKey: "superSeller",
    roleColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    description: "Commercial insurance brokerage specializing in tech startups. Ready to scale operations nationwide.",
    descriptionLang: "en",
    status: "coming",
    fundingDisplay: "$175K",
    eta: "may-2026",
  },
  {
    id: "8",
    name: "David Park",
    role: "solopreneur",
    roleKey: "solopreneur",
    roleColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    description: "No-code automation platform for e-commerce. Profitable MVP, seeking growth capital for team expansion.",
    descriptionLang: "en",
    status: "coming",
    fundingDisplay: "$395K",
    eta: "may-2026",
  },
]

export function ProjectsSection() {
  const t = useTranslations("projects")
  const tr = useTranslations("roleCards")
  const locale = useLocale()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  // Status configuration with translations
  // 7 种项目状态配置
  const getStatusConfig = (status: ProjectStatus) => {
    const configs: Record<ProjectStatus, { label: string; color: string; description?: string }> = {
      preparing: {
        label: t("status.preparing"),
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        description: t("status.preparingDesc"),
      },
      pending_review: {
        label: t("status.pending_review"),
        color: "bg-gray-500/10 text-gray-600 border-gray-500/30",
        description: t("status.pending_reviewDesc"),
      },
      cornerstone: {
        label: t("status.cornerstone"),
        color: "bg-purple-500/10 text-purple-600 border-purple-500/30",
        description: t("status.cornerstoneDesc"),
      },
      public: {
        label: t("status.public"),
        color: "bg-blue-500/10 text-blue-600 border-blue-500/30",
        description: t("status.publicDesc"),
      },
      coming: {
        label: t("status.coming"),
        color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
        description: t("status.comingDesc"),
      },
      listed: {
        label: t("status.listed"),
        color: "bg-green-500/10 text-green-600 border-green-500/30",
        description: t("status.listedDesc"),
      },
      failed: {
        label: t("status.failed"),
        color: "bg-red-500/10 text-red-600 border-red-500/30",
        description: t("status.failedDesc"),
      },
    }
    return configs[status]
  }

  // Format ETA based on locale and status
  const formatETA = (eta: string): string => {
    if (eta.startsWith("Q")) {
      // Quarter format: Q3 2026
      return eta
    }

    const monthKeys: Record<string, Record<string, string>> = {
      "july-2026": {
        en: "July 2026",
        "zh-CN": "2026年7月",
        "zh-HK": "2026年7月",
        ja: "2026年7月",
      },
      "june-2026": {
        en: "June 2026",
        "zh-CN": "2026年6月",
        "zh-HK": "2026年6月",
        ja: "2026年6月",
      },
      "may-2026": {
        en: "May 2026",
        "zh-CN": "2026年5月",
        "zh-HK": "2026年5月",
        ja: "2026年5月",
      },
    }

    return monthKeys[eta]?.[locale] || monthKeys[eta]?.["en"] || eta
  }

  return (
    <section className="px-6 py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        {/* Header with View All link */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center transition-opacity",
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center transition-opacity",
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projectsData.map((project) => {
              const statusConfig = getStatusConfig(project.status)

              return (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-[340px] overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
                >
                  {/* Avatar and Name */}
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src={project.avatar}
                      alt={project.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs border whitespace-nowrap ${project.roleColor}`}>
                          {tr(`${project.roleKey}.title`)}
                        </span>
                        <Badge variant="outline" className={`text-xs whitespace-nowrap ${statusConfig.color}`}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description - 2 lines with ellipsis */}
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2 h-10 leading-5">
                    {project.description}
                  </p>

                  {/* Funding and ETA */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{t("preview.fundingRange")}</div>
                      <div className="font-semibold text-foreground">{project.fundingDisplay}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">{t("preview.eta")}</div>
                      <div className="font-medium text-foreground">{formatETA(project.eta)}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mt-8 mb-8">
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
