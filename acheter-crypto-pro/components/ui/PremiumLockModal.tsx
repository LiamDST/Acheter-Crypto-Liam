"use client";
import { X, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PremiumLockModalProps {
  onClose: () => void;
}

export function PremiumLockModal({ onClose }: PremiumLockModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-8 shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1.5 text-muted hover:bg-cream hover:text-ink transition-colors" aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream">
          <Lock className="h-6 w-6 text-blue" />
        </div>

        <h2 className="mt-5 text-2xl font-semibold leading-tight">Contenu réservé aux membres premium</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Vous avez terminé l&apos;introduction. Débloquez la formation complète pour continuer pas à pas, accéder aux exercices pratiques et aux ressources premium.
        </p>

        <div className="mt-6 grid gap-3">
          <Button href="/pricing" variant="accent" className="w-full">
            Débloquer la formation
          </Button>
          <button onClick={onClose} className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-muted transition-colors hover:bg-cream hover:text-ink">
            Continuer gratuitement
          </button>
        </div>
      </div>
    </div>
  );
}
