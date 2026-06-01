"use client";
import { useState } from "react";
import { Crown, Key, Mail, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const TABS = ["Profil", "Abonnement", "Sécurité"] as const;
type Tab = (typeof TABS)[number];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profil");

  return (
    <main className="premium-container py-12">
      <h1 className="text-3xl font-semibold">Mon compte</h1>
      <p className="mt-2 text-sm text-muted">Gérez votre profil, votre abonnement et vos préférences de sécurité.</p>

      <div className="mt-8 flex gap-1 border-b border-line">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab ? "border-b-2 border-blue text-blue" : "text-muted hover:text-ink"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "Profil" && <ProfileTab />}
        {activeTab === "Abonnement" && <SubscriptionTab />}
        {activeTab === "Sécurité" && <SecurityTab />}
      </div>
    </main>
  );
}

function ProfileTab() {
  const fields = [
    { icon: User, label: "Prénom", value: "Alex" },
    { icon: User, label: "Nom", value: "Martin" },
    { icon: Mail, label: "Email", value: "alex.martin@exemple.fr" },
    { icon: Phone, label: "Téléphone", value: "+33 6 12 34 56 78" },
    { icon: MapPin, label: "Pays", value: "France" },
  ];

  return (
    <Card className="max-w-lg">
      <h2 className="text-lg font-semibold">Informations personnelles</h2>
      <p className="mt-1 text-xs text-muted">Pour modifier vos informations, contactez-nous par email.</p>
      <div className="mt-6 grid gap-4">
        {fields.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg border border-line bg-cream px-4 py-3">
            <Icon className="h-4 w-4 flex-shrink-0 text-muted" />
            <div className="min-w-0">
              <p className="text-xs text-muted">{label}</p>
              <p className="text-sm font-semibold text-ink">{value}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">Pour toute modification, écrivez à <a href="mailto:contact@acheterdescrypto.fr" className="font-semibold text-ink hover:underline">contact@acheterdescrypto.fr</a></p>
    </Card>
  );
}

function SubscriptionTab() {
  return (
    <Card className="max-w-lg">
      <h2 className="text-lg font-semibold">Abonnement actuel</h2>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-cream p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10">
            <Crown className="h-5 w-5 text-blue" />
          </div>
          <div>
            <p className="text-sm font-semibold">Plan Premium — 6 mois</p>
            <p className="text-xs text-muted">Renouvellement le 1 décembre 2026</p>
          </div>
        </div>
        <Badge tone="premium">Actif</Badge>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-muted">
        <p>✓ Formations premium complètes</p>
        <p>✓ Analyses hebdomadaires</p>
        <p>✓ Watchlist personnalisée</p>
        <p>✓ Dashboard membre</p>
      </div>
      <div className="mt-6 grid gap-3">
        <Button variant="light" className="w-full" onClick={() => console.log("Stripe portal — à implémenter")}>Gérer mon abonnement</Button>
        <Link href="/pricing" className="text-center text-xs text-muted hover:text-ink">Voir tous les plans</Link>
      </div>
    </Card>
  );
}

function SecurityTab() {
  return (
    <Card className="max-w-lg">
      <h2 className="text-lg font-semibold">Sécurité</h2>
      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between rounded-lg border border-line p-4">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-muted" />
            <div>
              <p className="text-sm font-semibold">Mot de passe</p>
              <p className="text-xs text-muted">Dernière modification : inconnue</p>
            </div>
          </div>
          <Button href="/forgot-password" variant="light">Modifier</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line p-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted" />
            <div>
              <p className="text-sm font-semibold">Email vérifié</p>
              <p className="text-xs text-muted">alex.martin@exemple.fr</p>
            </div>
          </div>
          <Badge tone="success">Vérifié</Badge>
        </div>
      </div>
    </Card>
  );
}
