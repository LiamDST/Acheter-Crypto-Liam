/* eslint-disable react/no-unescaped-entities */
import { AlertTriangle, Coins, DollarSign, Droplets, Shield, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function DefiFinanceContent() {
  return (
    <section className="mt-8 grid gap-6">
      <Card>
        <Badge tone="premium" icon={Wallet}>Leçon 1 · 20 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les protocoles DeFi</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre la finance décentralisée et ses principaux cas d'usage.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La <strong>Finance Décentralisée (DeFi)</strong> permet l'accès à des services financiers sans intermédiaires
            traditionnels. Les protocoles utilisent des smart contracts pour automatiser échanges, prêts et rendements.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Principes fondamentaux</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Décentralisation</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Sans permission</li>
              <li>Transparence des règles</li>
              <li>Accessibilité mondiale</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Composabilité</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Protocoles interconnectés</li>
              <li>Innovation rapide</li>
              <li>Programmable par défaut</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Principaux types de protocoles</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">DEX</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Uniswap</li>
              <li>SushiSwap</li>
              <li>PancakeSwap</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Lending</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Aave</li>
              <li>Compound</li>
              <li>MakerDAO</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Yield</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Yearn Finance</li>
              <li>Curve Finance</li>
              <li>Convex Finance</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Fonctionnement des DEX</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Pools de liquidité et formule x * y = k.</li>
            <li>Prix déterminé par les réserves du pool.</li>
            <li>Fournisseurs de liquidité rémunérés via les frais de trading.</li>
          </ul>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Risques principaux</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Risques de smart contracts (bugs, hacks).</li>
            <li>Liquidations sur les protocoles de prêt.</li>
            <li>Impermanent loss dans les pools.</li>
            <li>Risques de gouvernance.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La DeFi ouvre l'accès à des services financiers transparents et globaux. Elle exige toutefois une compréhension
            rigoureuse des risques avant d'engager du capital.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            La prochaine leçon traite du yield farming et des stratégies de rendement.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={TrendingUp}>Leçon 2 · 20 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Le yield farming</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Optimiser les rendements grâce aux protocoles DeFi.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Le <strong>yield farming</strong> consiste à fournir des liquidités à différents protocoles pour obtenir des
            récompenses en tokens et des frais de transaction.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Stratégies clés</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Liquidity Mining</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Pools de liquidité</li>
              <li>Récompenses en tokens</li>
              <li>APY variable</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Lending</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Prêts de tokens</li>
              <li>Intérêts composés</li>
              <li>Tokens d'intérêt</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Staking</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Verrouillage de tokens</li>
              <li>Récompenses fixes</li>
              <li>Gouvernance</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Calcul des rendements</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>APR : rendement annuel simple.</li>
            <li>APY : rendement composé.</li>
            <li>Impact des fees et de la volatilité des tokens.</li>
          </ul>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Risques à surveiller</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Impermanent loss.</li>
            <li>Volatilité des tokens de récompense.</li>
            <li>Risques de smart contracts.</li>
            <li>Coûts de transaction élevés.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Le yield farming peut augmenter les rendements, mais nécessite une stratégie claire et une gestion des risques stricte.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            La leçon suivante détaille le fonctionnement des pools de liquidité.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Droplets}>Leçon 3 · 18 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les pools de liquidité</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre les AMM et les mécanismes de liquidité.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Les <strong>pools de liquidité</strong> sont au cœur des DEX. Ils permettent d'échanger des actifs et de rémunérer
            les fournisseurs de liquidité via les frais de trading.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Fonctionnement de base</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Structure</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Paires de tokens</li>
              <li>Ratio constant</li>
              <li>LP tokens</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">AMM</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Formule x * y = k</li>
              <li>Prix dynamique</li>
              <li>Arbitrage</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Types de pools</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">50/50</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Ratio égal</li>
              <li>Standard Uniswap</li>
              <li>Usage général</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Stableswap</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Courbe modifiée</li>
              <li>Moins de slippage</li>
              <li>Stablecoins</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Weighted</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Ratio personnalisé</li>
              <li>Balancer</li>
              <li>Multi-tokens</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Impermanent loss</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Perte temporaire due à la variation des prix.</li>
            <li>Mitigation via choix des paires et durée d'investissement.</li>
            <li>Compensation partielle par les frais.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Les pools de liquidité sont essentiels pour la DeFi. Une bonne compréhension des mécanismes et des risques
            permet de les utiliser efficacement.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            La prochaine leçon traite des stablecoins et de leur rôle dans l'écosystème.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Coins}>Leçon 4 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les stablecoins</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre les stablecoins et leurs mécanismes de stabilité.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Les <strong>stablecoins</strong> sont des cryptomonnaies conçues pour maintenir une valeur stable, généralement
            indexée sur une monnaie fiduciaire. Ils apportent stabilité et liquidité à la DeFi.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Types de stablecoins</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Fiat-collatéralisés</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>USDT, USDC, BUSD</li>
              <li>Réserves en monnaie fiat</li>
              <li>Exposition réglementaire</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Crypto-collatéralisés</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>DAI</li>
              <li>Sur-collatéralisation</li>
              <li>Gestion on-chain</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Algorithmiques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Expansion / contraction</li>
              <li>Plus risqués</li>
              <li>Maintien du peg complexe</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Mécanismes de stabilité</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Réserves collatérales et audits.</li>
            <li>Mécanismes de mint/burn et arbitrage.</li>
            <li>Surveillance de la parité (peg).</li>
          </ul>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Risques à surveiller</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Risque de dépeg.</li>
            <li>Risque réglementaire.</li>
            <li>Risque technique des smart contracts.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Les stablecoins sont fondamentaux pour la DeFi. Comprendre leurs mécanismes et leurs risques est essentiel
            pour une utilisation sûre et efficace.
          </p>
        </div>
      </Card>
    </section>
  );
}
