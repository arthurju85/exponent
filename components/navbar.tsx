"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Menu, X, Wallet, User } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { LogoWithText } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <LogoWithText />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('home')}
            </Link>
            <Link href="/explore" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('explore')}
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('myProjects')}
            </Link>
            <Link href="/help" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t('help')}
            </Link>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="gap-2" onClick={handleLogout}>
                  <Wallet className="h-4 w-4" />
                  <span className="hidden lg:inline">0x7a3f...9e2d</span>
                </Button>
              </div>
            ) : (
              <Button
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setAuthOpen(true)}
              >
                <User className="h-4 w-4" />
                {t('login')}
              </Button>
            )}
          </div>

          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {t('home')}
              </Link>
              <Link href="/explore" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {t('explore')}
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {t('myProjects')}
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                {t('help')}
              </Link>
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                    <Wallet className="h-4 w-4" />
                    0x7a3f...9e2d
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    setAuthOpen(true)
                    setMobileOpen(false)
                  }}
                >
                  <User className="h-4 w-4" />
                  {t('login')}
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} onSuccess={() => setIsLoggedIn(true)} />
    </>
  )
}
