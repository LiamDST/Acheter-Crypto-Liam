import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/app/admin/login/AdminLoginForm";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const errorMessages: Record<string, string> = {
  config: "Configuration admin manquante. Ajoutez ADMIN_EMAIL, ADMIN_PASSWORD et ADMIN_SESSION_SECRET dans .env.local.",
  credentials: "Identifiants admin incorrects."
};

export default function AdminLoginPage({ searchParams }: { searchParams?: { error?: string; next?: string; loggedOut?: string } }) {
  const error = searchParams?.error ? errorMessages[searchParams.error] : null;
  const nextPath = searchParams?.next || "/admin";

  return (
    <main className="relative grid min-h-[78vh] place-items-center px-4 py-16 md:px-6">
      <AnimatedCryptoBackground variant="admin" intensity="medium" />
      <Card className="w-full max-w-md" hover={false}>
        <Badge tone="premium" icon={ShieldCheck}>Accès admin privé</Badge>
        <h1 className="mt-5 text-4xl font-semibold">Connexion admin</h1>
        <p className="mt-3 text-sm leading-7 text-muted">La page admin n’est plus exposée dans la navigation publique. Elle reste accessible par URL, après authentification.</p>

        {searchParams?.loggedOut && <p className="mt-5 rounded-2xl border border-line bg-cream px-4 py-3 text-sm text-muted">Session admin fermée.</p>}
        <AdminLoginForm nextPath={nextPath} initialError={error} />
      </Card>
    </main>
  );
}
