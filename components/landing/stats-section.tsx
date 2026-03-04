"use client"

import { useTranslations } from "next-intl"
import { Rocket, Wallet, GraduationCap, BarChart3 } from "lucide-react"

const stats = [
  { key: "totalProjects", value: 12, suffix: "", prefix: "", icon: Rocket },
  { key: "tvl", value: 1.3, suffix: "M", prefix: "$", icon: Wallet },
  { key: "graduated", value: 8, suffix: "", prefix: "", icon: GraduationCap },
  { key: "totalFunding", value: 5.2, suffix: "M", prefix: "$", icon: BarChart3 },
]

function StatCard({ label, value, suffix, prefix, icon: Icon }: {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="mb-1 font-mono text-4xl font-bold text-foreground">
        {prefix}{value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}

export function StatsSection() {
  const t = useTranslations("stats")

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
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              label={t(stat.key)}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              icon={stat.icon}
            />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t("footnote")}
        </p>
      </div>
    </section>
  )
}
