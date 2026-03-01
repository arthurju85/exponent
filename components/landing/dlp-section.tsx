"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Slider } from "@/components/ui/slider"

const roles = [
  { key: "superSeller", gamma: 1.8, color: "bg-blue-500" },
  { key: "solopreneur", gamma: 1.2, color: "bg-emerald-500" },
  { key: "creator", gamma: 0.8, color: "bg-amber-500" },
]

function calculateDLP(F: number, gamma: number) {
  const beta = 0.3
  const Lmin = 5000
  const H = F * (1 + beta + beta * gamma)
  const L = Math.max(Lmin, beta * H, H / (1 + gamma * (F / H)))
  return { H: Math.round(H), L: Math.round(L) }
}

export function DLPSection() {
  const t = useTranslations("dlp")
  const tr = useTranslations("roleCards")
  const [fundingAmount, setFundingAmount] = useState([50000])
  const [selectedRole, setSelectedRole] = useState(0)

  const F = fundingAmount[0]
  const gamma = roles[selectedRole].gamma
  const { H, L } = calculateDLP(F, gamma)

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

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Formula & Controls */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8 rounded-xl bg-secondary p-6">
              <p className="mb-2 text-sm text-muted-foreground">{t("formula")}</p>
              <div className="font-mono text-lg text-foreground">
                <span className="text-primary">L</span> = max(
                <span className="text-blue-400">L<sub>min</sub></span>,{" "}
                <span className="text-emerald-400">&beta; &middot; H</span>,{" "}
                <span className="text-amber-400">H / (1 + &gamma; &middot; F/H)</span>
                )
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
                    <div className="font-medium">{tr(`${role.key}.title`)}</div>
                    <div className="mt-1 font-mono text-xs text-muted-foreground">
                      &gamma; = {role.gamma}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-2xl border border-border bg-card p-8">
              <h3 className="mb-6 text-lg font-semibold text-foreground">{t("results")}</h3>

              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-secondary p-5">
                  <div className="mb-1 text-sm text-muted-foreground">{t("funding")}</div>
                  <div className="font-mono text-2xl font-bold text-foreground">
                    ${F.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">USDT</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{t("fundingDesc")}</div>
                </div>

                <div className="rounded-xl bg-secondary p-5">
                  <div className="mb-1 text-sm text-muted-foreground">{t("hardCap")}</div>
                  <div className="font-mono text-2xl font-bold text-primary">
                    ${H.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">USDT</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{t("hardCapDesc")}</div>
                </div>

                <div className="rounded-xl bg-secondary p-5">
                  <div className="mb-1 text-sm text-muted-foreground">{t("pool")}</div>
                  <div className="font-mono text-2xl font-bold text-emerald-400">
                    ${L.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">USDT</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{t("poolDesc")}</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-3 w-3 rounded-full ${roles[selectedRole].color}`} />
                <div>
                  <div className="text-sm font-medium text-foreground">{tr(`${roles[selectedRole].key}.title`)}</div>
                  <div className="text-xs text-muted-foreground">{tr(`${roles[selectedRole].key}.fundingTraits`)} | {tr(`${roles[selectedRole].key}.lpLock`)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
