"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, Shield } from "lucide-react"

const roles = [
  {
    key: "superSeller",
    color: "bg-blue-500",
    avatar: "SS",
    avatarColor: "bg-blue-600",
    scriptKey: "superSeller",
    suggestedFunding: 80000,
  },
  {
    key: "solopreneur",
    color: "bg-emerald-500",
    avatar: "SO",
    avatarColor: "bg-emerald-600",
    scriptKey: "solopreneur",
    suggestedFunding: 50000,
  },
  {
    key: "creator",
    color: "bg-amber-500",
    avatar: "CC",
    avatarColor: "bg-amber-600",
    scriptKey: "creator",
    suggestedFunding: 40000,
  },
]

function calculateDLP(F: number) {
  const beta = 0.25
  const Lmin = 5000
  const L = Math.max(Lmin, F * beta)
  const H = F + L
  return { H: Math.round(H), L: Math.round(L) }
}

export function DLPSection() {
  const t = useTranslations("dlp")
  const tr = useTranslations("roleCards")
  const [fundingAmount, setFundingAmount] = useState([50000])
  const [selectedRole, setSelectedRole] = useState(0)

  const F = fundingAmount[0]
  const { H, L } = calculateDLP(F)
  const suggestedH = Math.round(roles[selectedRole].suggestedFunding * 1.25)

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

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Role Selection (40%) */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t("calculator.title")}</h3>
                <p className="text-xs text-muted-foreground">{t("calculator.subtitle")}</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  {t("fundingAmount")}
                </label>
                <span className="font-mono text-lg font-semibold text-primary">
                  ${F.toLocaleString()}
                </span>
              </div>
              <Slider
                value={fundingAmount}
                onValueChange={setFundingAmount}
                min={5000}
                max={500000}
                step={1000}
                className="py-2"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>$5,000</span>
                <span>$250,000</span>
                <span>$500,000</span>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-foreground">{t("selectRole")}</p>
              <div className="flex gap-3">
                {roles.map((role, i) => (
                  <button
                    key={role.key}
                    onClick={() => setSelectedRole(i)}
                    className={`flex-1 rounded-xl border p-3 text-center text-sm transition-all ${
                      selectedRole === i
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-secondary text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${role.avatarColor} text-xs font-bold text-white`}>
                      {role.avatar}
                    </div>
                    <div className="font-medium">{tr(`${role.key}.title`)}</div>
                        </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Financing Advice (60%) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Main Suggested Amount Card */}
            <div className="flex-1 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("suggestedAmount.title")}</h3>
                  <p className="text-xs text-muted-foreground">{t("suggestedAmount.subtitle")}</p>
                </div>
              </div>

              {/* Big Suggested Amount */}
              <div className="mb-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">{t("suggestedAmount.forRole")} {tr(`${roles[selectedRole].key}.title`)}</div>
                <div className="font-mono text-5xl md:text-6xl font-bold text-primary tracking-tight">
                  ${roles[selectedRole].suggestedFunding.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{t("suggestedAmount.usdt")}</div>
              </div>

              {/* Quick Calculation Result */}
              <div className="rounded-xl bg-secondary/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("currentCalc.title")}</span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{t("currentCalc.beta", { value: "25%" })}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">{t("fundingShort")}</div>
                    <div className="font-mono text-lg font-semibold text-foreground">${(F/1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t("hardCapShort")}</div>
                    <div className="font-mono text-lg font-semibold text-primary">${(H/1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{t("poolShort")}</div>
                    <div className="font-mono text-lg font-semibold text-emerald-500">${(L/1000).toFixed(0)}K</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Script/Quote Card */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${roles[selectedRole].avatarColor} text-sm font-bold text-white`}>
                  {roles[selectedRole].avatar}
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-sm font-medium text-foreground">{tr(`${roles[selectedRole].key}.title`)}</div>
                  <div className="mb-2 text-xs text-muted-foreground">{tr(`${roles[selectedRole].key}.fundingTraits`)} | {tr(`${roles[selectedRole].key}.lpLock`)}</div>
                  <p className="text-sm italic text-primary leading-relaxed">
                    "{t(`scripts.${roles[selectedRole].scriptKey}`)}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
