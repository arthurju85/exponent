"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

const stats = [
  { key: "totalProjects", value: 128, suffix: "", prefix: "" },
  { key: "tvl", value: 4.2, suffix: "M", prefix: "$" },
  { key: "graduated", value: 43, suffix: "", prefix: "" },
  { key: "avgReturn", value: 34, suffix: "%", prefix: "" },
]

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(eased * target)
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function StatCard({ label, value, suffix, prefix }: { label: string; value: number; suffix: string; prefix: string }) {
  const { count, ref } = useCountUp(value)
  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count).toString()

  return (
    <div ref={ref} className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
      <div className="mb-2 font-mono text-4xl font-bold text-foreground">
        {prefix}{displayValue}{suffix}
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
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              label={t(stat.key)}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
