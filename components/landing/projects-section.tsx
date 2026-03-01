"use client"

import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Users } from "lucide-react"
import Link from "next/link"

const mockProjects = [
  {
    id: "1",
    name: "InsureMax Pro",
    roleKey: "superSeller",
    roleColor: "bg-blue-500/20 text-blue-400",
    avatar: "IM",
    avatarColor: "bg-blue-600",
    progress: 82,
    raised: "$59,040",
    target: "$72,000",
    price: "$0.018",
    targetPrice: "$0.045",
    daysLeft: 3,
    investors: 127,
  },
  {
    id: "2",
    name: "CodeForge AI",
    roleKey: "solopreneur",
    roleColor: "bg-emerald-500/20 text-emerald-400",
    avatar: "CF",
    avatarColor: "bg-emerald-600",
    progress: 56,
    raised: "$28,000",
    target: "$50,000",
    price: "$0.012",
    targetPrice: "$0.035",
    daysLeft: 8,
    investors: 89,
  },
  {
    id: "3",
    name: "TechTok Studio",
    roleKey: "creator",
    roleColor: "bg-amber-500/20 text-amber-400",
    avatar: "TT",
    avatarColor: "bg-amber-600",
    progress: 91,
    raised: "$36,400",
    target: "$40,000",
    price: "$0.022",
    targetPrice: "$0.040",
    daysLeft: 1,
    investors: 203,
  },
  {
    id: "4",
    name: "PropConnect",
    roleKey: "superSeller",
    roleColor: "bg-blue-500/20 text-blue-400",
    avatar: "PC",
    avatarColor: "bg-blue-600",
    progress: 34,
    raised: "$20,400",
    target: "$60,000",
    price: "$0.009",
    targetPrice: "$0.038",
    daysLeft: 12,
    investors: 45,
  },
  {
    id: "5",
    name: "DataPilot",
    roleKey: "solopreneur",
    roleColor: "bg-emerald-500/20 text-emerald-400",
    avatar: "DP",
    avatarColor: "bg-emerald-600",
    progress: 67,
    raised: "$46,900",
    target: "$70,000",
    price: "$0.015",
    targetPrice: "$0.042",
    daysLeft: 5,
    investors: 156,
  },
  {
    id: "6",
    name: "VlogVerse",
    roleKey: "creator",
    roleColor: "bg-amber-500/20 text-amber-400",
    avatar: "VV",
    avatarColor: "bg-amber-600",
    progress: 45,
    raised: "$13,500",
    target: "$30,000",
    price: "$0.011",
    targetPrice: "$0.030",
    daysLeft: 10,
    investors: 67,
  },
]

export function ProjectsSection() {
  const t = useTranslations("projects")
  const tr = useTranslations("roleCards")

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30">
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${project.avatarColor} text-sm font-bold text-foreground`}>
                      {project.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <Badge variant="secondary" className={`text-xs ${project.roleColor} border-0`}>
                        {tr(`${project.roleKey}.title`)}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("progress")}</span>
                      <span className="font-mono font-medium text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>{project.raised}</span>
                      <span>{project.target}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{project.daysLeft} {t("daysLeft")}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{project.investors} {t("investors")}</span>
                      </div>
                    </div>
                    <div className="font-mono text-sm font-medium text-primary">
                      {project.price}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
