import type { ComponentType, SVGProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "premium" | "success" | "warning" | "danger" | "dark";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-white text-muted",
  premium: "border-blue/20 bg-blue/10 text-blue",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-700",
  dark: "border-ink bg-ink text-white"
};

export function Badge({ children, tone = "neutral", icon: Icon, className }: { children: ReactNode; tone?: Tone; icon?: ComponentType<SVGProps<SVGSVGElement>>; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-semibold", tones[tone], className)}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}
