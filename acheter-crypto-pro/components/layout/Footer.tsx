import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/site";

export function Footer() {
  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Confidentialité" },
    { href: "/cgu", label: "CGU" },
    { href: "/cookies", label: "Cookies" },
    { href: "/conformite", label: "Conformité" }
  ];

  return (
    <footer className="border-t border-line bg-surface px-4 py-12 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <div className="flex items-center gap-3"><Image src="/logo-acheter-crypto-final.png" alt="Acheter des crypto" width={320} height={106} className="h-14 w-auto md:h-16" /></div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">Un espace simple pour apprendre, analyser et avancer avec méthode.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div><p className="font-semibold">Produit</p><div className="mt-4 grid gap-2 text-sm text-muted">{navItems.slice(1, 6).map((item) => <Link key={item.href} href={item.href} className="hover:text-ink">{item.label}</Link>)}</div></div>
          <div><p className="font-semibold">Conformité</p><div className="mt-4 grid gap-2 text-sm text-muted">{legalLinks.map((item) => <Link key={item.href} href={item.href} className="hover:text-ink">{item.label}</Link>)}</div></div>
          <div><p className="font-semibold">Production</p><div className="mt-4 grid gap-2 text-sm text-muted"><span>Supabase</span><span>Stripe</span><span>Next.js</span><span>SEO/GEO</span></div></div>
        </div>
      </div>
    </footer>
  );
}
