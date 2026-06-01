"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className, hover = true }: { children: ReactNode; className?: string; hover?: boolean }) {
  void hover;
  return (
    <div className={cn("rounded-xl border border-line bg-white p-6 shadow-premium", className)}>
      {children}
    </div>
  );
}
