"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { LogoWithText } from "@/components/logo"

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <LogoWithText />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('copyright')}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
            <div className="flex flex-col gap-3">
              <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('explore')}</Link>
              <Link href="/onboarding" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Launch Project</Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('help')}</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">{t('community')}</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter / X</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Telegram</a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <div className="flex flex-col gap-3">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('about')}</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('privacy')}</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('terms')}</Link>
              <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('disclaimer')}</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Exponent. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}
