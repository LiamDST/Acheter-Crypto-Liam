"use client";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

function evaluate(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: "Faible", color: "bg-red-400" };
  if (score <= 3) return { score, label: "Moyen", color: "bg-amber-400" };
  return { score, label: "Fort", color: "bg-emerald-500" };
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, color } = evaluate(password);
  if (!password) return null;

  return (
    <div className="mt-2 grid gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300", i <= score ? color : "bg-line")} />
        ))}
      </div>
      <p className={cn("text-xs font-medium", score <= 2 ? "text-red-500" : score <= 3 ? "text-amber-600" : "text-emerald-600")}>
        {label}
        {score < 5 && (
          <span className="ml-1 font-normal text-muted">
            {password.length < 12 && " · min. 12 caractères"}
            {password.length >= 12 && !/[A-Z]/.test(password) && " · une majuscule requise"}
            {password.length >= 12 && /[A-Z]/.test(password) && !/[0-9]/.test(password) && " · un chiffre requis"}
            {password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && !/[^A-Za-z0-9]/.test(password) && " · un caractère spécial requis"}
          </span>
        )}
      </p>
    </div>
  );
}
