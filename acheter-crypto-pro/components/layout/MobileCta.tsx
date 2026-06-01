"use client";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function MobileCta() {
  const pathname = usePathname();
  if (["/", "/pricing", "/analyses", "/formations", "/signaux", "/dashboard", "/admin"].includes(pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
      <Button href="/dashboard" className="w-full">Espace membre <ArrowRight className="h-4 w-4" /></Button>
    </div>
  );
}
