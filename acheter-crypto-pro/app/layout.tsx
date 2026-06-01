import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";

export const metadata: Metadata = {
  title: "Acheter Crypto — SaaS premium crypto",
  description: "Formations crypto, analyses premium, signaux trading, dashboard membre, paiements Stripe et admin complet.",
  openGraph: {
    title: "Acheter Crypto",
    description: "Plateforme premium crypto avec formations, analyses, signaux et dashboard.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
