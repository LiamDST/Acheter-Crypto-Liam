"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "ghost" | "accent";
const variants: Record<Variant, string> = {
  dark: "bg-black text-white hover:bg-black/90",
  light: "border border-line bg-white text-ink hover:bg-cream",
  ghost: "border border-transparent bg-transparent text-ink hover:border-line hover:bg-cream",
  accent: "accent-gradient-bg text-white hover:opacity-95"
};

export function Button({ children, href, onClick, variant = "dark", className, type = "button" }: { children: ReactNode; href?: string; onClick?: () => void; variant?: Variant; className?: string; type?: "button" | "submit" }) {
  const base = cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors", variants[variant], className);
  if (href) {
    return <Link href={href} className={base}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={base}>{children}</button>;
}
