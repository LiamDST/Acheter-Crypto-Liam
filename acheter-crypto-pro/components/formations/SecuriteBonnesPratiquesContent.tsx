/* eslint-disable react/no-unescaped-entities */
import { AlertTriangle, Eye, PieChart, Shield, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function SecuriteBonnesPratiquesContent() {
  return (
    <section className="mt-8 grid gap-6">
      <Card>
        <Badge tone="premium" icon={Shield}>Leçon 1 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">La sécurisation des wallets</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Protéger ses actifs et éviter les erreurs humaines.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La sécurité des wallets est un pilier essentiel de l'investissement crypto. Une bonne stratégie réduit les risques
            de piratage, de perte et d'erreurs de manipulation.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Types de wallets</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-red-600" />
              <h4 className="text-lg font-semibold">Hot wallets</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Connectés à Internet</li>
              <li>Rapides et pratiques</li>
              <li>Plus vulnérables</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <h4 className="text-lg font-semibold">Cold wallets</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Stockage hors ligne</li>
              <li>Sécurité maximale</li>
              <li>Idéal long terme</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Bonnes pratiques</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Activer le 2FA partout.</li>
            <li>Stocker les clés privées hors ligne.</li>
            <li>Utiliser un gestionnaire de mots de passe.</li>
            <li>Faire des sauvegardes régulières.</li>
            <li>Vérifier toutes les adresses.</li>
          </ol>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Une sécurité solide commence par des habitudes simples. Protégez vos wallets comme un coffre-fort et restez vigilant
            face aux menaces numériques.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={AlertTriangle}>Leçon 2 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les arnaques courantes</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Identifier les scams et éviter les pièges classiques.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            L'écosystème crypto attire des escrocs sophistiqués. Comprendre leurs méthodes est indispensable pour protéger
            ses investissements.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Scams fréquents</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Pump & dump</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Manipulation des prix</li>
              <li>Faux signaux</li>
              <li>Groupes privés douteux</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Rug pull</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Projets sans fondations solides</li>
              <li>Liquidité retirée brutalement</li>
              <li>Équipe anonyme</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Phishing & réseaux sociaux</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-purple-600" />
                <h4 className="text-lg font-semibold">Phishing</h4>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Sites clonés</li>
                <li>Emails frauduleux</li>
                <li>Faux wallets</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <h4 className="text-lg font-semibold">Réseaux sociaux</h4>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Giveaways truqués</li>
                <li>Faux influenceurs</li>
                <li>Promesses irréalistes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La prudence et le DYOR sont vos meilleures protections. Si une opportunité semble trop belle, elle l'est
            probablement.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={PieChart}>Leçon 3 · 20 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">La gestion de portfolio</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Diversifier, équilibrer et optimiser le risque.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Une gestion de portfolio efficace combine diversification, allocation stratégique et suivi régulier pour
            optimiser le rendement tout en maîtrisant le risque.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Principes clés</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Diversification</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Répartition des actifs</li>
              <li>Corrélation et exposition</li>
              <li>Équilibrage régulier</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Allocation stratégique</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Objectifs d'investissement</li>
              <li>Poids des actifs majeurs</li>
              <li>Rotation sectorielle</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Une stratégie claire, un suivi régulier et un rééquilibrage discipliné permettent de garder un portfolio robuste
            malgré la volatilité.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={TrendingUp}>Leçon 4 · 25 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les stratégies avancées</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Approches expertes pour optimiser la performance.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Les stratégies avancées combinent analyse multi-timeframes, gestion du risque sophistiquée et discipline stricte
            pour maximiser les opportunités.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Approches avancées</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Swing & breakout</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Confluence multi-timeframes</li>
              <li>Validation par le volume</li>
              <li>Gestion des faux breakouts</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Risk management avancé</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Position sizing dynamique</li>
              <li>Stops basés sur volatilité</li>
              <li>Optimisation du capital</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Les stratégies avancées exigent rigueur et patience. Elles s'appuient sur des règles claires, une exécution
            disciplinée et une amélioration continue.
          </p>
        </div>
      </Card>
    </section>
  );
}
