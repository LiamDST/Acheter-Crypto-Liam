"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";

export function AdminLoginForm({ nextPath, initialError }: { nextPath: string; initialError?: string | null }) {
  const router = useRouter();
  const [error, setError] = useState(initialError || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        body: formData,
        headers: { "x-admin-login-mode": "json" }
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Connexion admin impossible.");
        return;
      }

      router.replace(payload.redirectTo || "/admin");
      router.refresh();
    } catch {
      setError("Erreur réseau pendant la connexion admin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action="/api/admin/login" method="POST" onSubmit={handleSubmit} className="mt-6 grid gap-3">
      <input type="hidden" name="next" value={nextPath} />
      {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <label className="text-sm font-medium">
        Email admin
        <input name="email" type="email" autoComplete="username" className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none" placeholder="admin@acheter-crypto.fr" required />
      </label>
      <label className="text-sm font-medium">
        Mot de passe
        <input name="password" type="password" autoComplete="current-password" className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 outline-none" placeholder="••••••••" required />
      </label>
      <button type="submit" disabled={isSubmitting} className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(29,78,216,0.18)] transition hover:bg-blue/90 disabled:cursor-not-allowed disabled:opacity-60">
        <Lock className="h-4 w-4" /> {isSubmitting ? "Connexion..." : "Se connecter"} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
