"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="premium-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo-acheter-crypto-final.png" alt="Acheter des crypto" width={300} height={100} className="h-12 w-auto md:h-14" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn("rounded-md px-3 py-2 text-sm font-semibold transition-colors", pathname === item.href ? "bg-cream text-blue" : "text-muted hover:bg-cream hover:text-ink")}>{item.label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/login" variant="ghost">Connexion</Button>
          <Button href="/register" variant="accent">Commencer gratuitement <ArrowRight className="h-4 w-4" /></Button>
        </div>

        <button className="rounded-lg border border-line bg-white p-2 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line bg-surface lg:hidden">
            <div className="grid gap-2 px-4 py-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-left text-sm font-semibold hover:bg-cream">{item.label}</Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
