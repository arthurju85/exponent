"use client"

import { useTranslations } from "next-intl"
import { Briefcase, Code, Video } from "lucide-react"

const roles = [
  {
    icon: Briefcase,
    key: "superSeller",
    gradient: "from-blue-500/10 to-blue-600/10",
    borderHover: "hover:border-blue-500/40",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Code,
    key: "solopreneur",
    gradient: "from-emerald-500/10 to-green-600/10",
    borderHover: "hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Video,
    key: "creator",
    gradient: "from-amber-500/10 to-orange-600/10",
    borderHover: "hover:border-amber-500/40",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
  },
]

export function RoleCardsSection() {
  const t = useTranslations("roleCards")

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

        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.key}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all ${role.borderHover}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className="relative z-10">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${role.iconBg}`}>
                  <role.icon className={`h-7 w-7 ${role.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground">{t(`${role.key}.title`)}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t(`${role.key}.subtitle`)}</p>


                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-foreground">{t("audiences")}</p>
                  <ul className="flex flex-col gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {t(`${role.key}.audiences.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("fundingTraits")}</span>
                    <span className="text-foreground">{t(`${role.key}.fundingTraits`)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("lpLock")}</span>
                    <span className="text-foreground">{t(`${role.key}.lpLock`)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
