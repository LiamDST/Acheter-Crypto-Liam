"use client";
import { cn } from "@/lib/utils";

type Variant = "hero" | "page" | "dashboard" | "admin";

type Props = {
  variant?: Variant;
  intensity?: "low" | "medium" | "high";
  className?: string;
};

export function AnimatedCryptoBackground({ variant = "page", intensity = "medium", className }: Props) {
  const opacity = intensity === "high" ? "opacity-100" : intensity === "low" ? "opacity-90" : "opacity-95";
  void variant;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", opacity, className)}>
      <div className="absolute inset-0 bg-white" />
    </div>
  );
}
