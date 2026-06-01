/* eslint-disable react/no-unescaped-entities */
import { AlertTriangle, BarChart2, Calculator, Clock, LineChart, PieChart, Shield, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function AnalyseTechniqueContent() {
  return (
    <section className="mt-8 grid gap-6">
      <Card>
        <Badge tone="premium" icon={LineChart}>Leçon 1 · 20 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les indicateurs techniques</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Maîtriser les outils essentiels de l'analyse technique pour le trading crypto.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Les <strong>indicateurs techniques</strong> sont des outils mathématiques essentiels qui aident les traders à analyser
            les mouvements de prix et à identifier les opportunités de trading. Ils permettent de prendre des décisions basées
            sur des données objectives plutôt que sur l'émotion.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Indicateurs de tendance</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Moyennes mobiles</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Simple (SMA)</li>
              <li>Exponentielle (EMA)</li>
              <li>Croisements et signaux</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">MACD</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Convergence / divergence</li>
              <li>Histogramme</li>
              <li>Signaux de trading</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Indicateurs de momentum</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">RSI</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Surachat / survente</li>
              <li>Divergences</li>
              <li>Niveaux clés</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Stochastique</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Oscillateur %K</li>
              <li>Signal %D</li>
              <li>Croisements</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">ADX</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Force de tendance</li>
              <li>DI+ et DI-</li>
              <li>Seuils critiques</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Indicateurs de volatilité</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold">Bandes de Bollinger</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Bande supérieure (résistance)</li>
                <li>Bande médiane (tendance)</li>
                <li>Bande inférieure (support)</li>
                <li>Squeeze et expansion</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">ATR (Average True Range)</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Mesure de la volatilité</li>
                <li>Gestion du risque</li>
                <li>Stop-loss dynamique</li>
                <li>Taille des positions</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Utilisation pratique</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Utiliser plusieurs indicateurs pour confirmer les signaux.</li>
            <li>Analyser différentes échelles de temps pour une vue complète.</li>
            <li>Définir les stop-loss et take-profit en fonction de la volatilité.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Les indicateurs techniques sont puissants mais doivent être utilisés en combinaison, avec une bonne compréhension
            de leurs limites. La pratique et la discipline sont essentielles pour les utiliser efficacement.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            La leçon suivante approfondit la lecture des graphiques et l'identification des tendances.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={TrendingUp}>Leçon 2 · 18 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">L'analyse des graphiques</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Lire les mouvements du marché et repérer supports, résistances et tendances.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            L'<strong>analyse graphique</strong> est un élément fondamental du trading. Elle permet d'identifier les tendances,
            les supports, les résistances et les figures chartistes qui aident à prendre des décisions éclairées.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Types de graphiques</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Graphique en ligne</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Simple et clair</li>
              <li>Prix de clôture uniquement</li>
              <li>Vue d'ensemble rapide</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Chandeliers japonais</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Information complète</li>
              <li>Figures de retournement</li>
              <li>Lecture psychologique</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Graphique en barres</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>OHLC complet</li>
              <li>Moins visuel</li>
              <li>Analyse technique avancée</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Tendances, supports et résistances</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Tendance haussière</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Hauts et bas de plus en plus hauts</li>
              <li>Momentum positif</li>
              <li>Cassures de résistances</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Tendance baissière</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Hauts et bas de plus en plus bas</li>
              <li>Momentum négatif</li>
              <li>Cassures de supports</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold">Supports</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Zones d'achat potentielles</li>
                <li>Points de rebond</li>
                <li>Niveaux psychologiques</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Résistances</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Zones de vente potentielles</li>
                <li>Points de retournement</li>
                <li>Niveaux historiques</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Timeframes & volume</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Court terme</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>1 min à 1 heure</li>
              <li>Trading intraday</li>
              <li>Scalping</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Moyen terme</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>4 heures à 1 jour</li>
              <li>Swing trading</li>
              <li>Tendances intermédiaires</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Long terme</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>1 semaine et plus</li>
              <li>Position trading</li>
              <li>Tendances majeures</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-line bg-white p-5">
          <h4 className="text-lg font-semibold">Volume et liquidité</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Confirmation des mouvements</li>
            <li>Validation des cassures</li>
            <li>Impact du spread et de la profondeur de marché</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La combinaison de différents timeframes, l'étude des volumes et la lecture des supports et résistances
            permettent de prendre des décisions de trading plus éclairées.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            La prochaine leçon porte sur les patterns de trading les plus courants.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={TrendingDown}>Leçon 3 · 20 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les patterns de trading</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Identifier les figures chartistes et anticiper les mouvements.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Les <strong>patterns de trading</strong> sont des configurations graphiques qui se répètent régulièrement.
            Leur identification permet d'anticiper les mouvements de prix et d'améliorer le ratio risque / récompense.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Patterns de continuation</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Triangles</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Triangle ascendant</li>
              <li>Triangle descendant</li>
              <li>Triangle symétrique</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Drapeaux et fanions</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Drapeau haussier</li>
              <li>Drapeau baissier</li>
              <li>Fanions</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Patterns de retournement</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Doubles formations</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Double top</li>
              <li>Double bottom</li>
              <li>Niveaux clés</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Têtes et épaules</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Tête et épaules</li>
              <li>Tête et épaules inversé</li>
              <li>Ligne de cou</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Autres patterns</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Triple top / bottom</li>
              <li>Diamant</li>
              <li>Rectangle</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Patterns en chandeliers</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold">Haussiers</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Marteau</li>
                <li>Étoile du matin</li>
                <li>Avalement haussier</li>
                <li>Harami haussier</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Baissiers</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Étoile filante</li>
                <li>Étoile du soir</li>
                <li>Avalement baissier</li>
                <li>Harami baissier</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Méthode de trading</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Identifier le pattern sur le graphique.</li>
            <li>Confirmer avec les indicateurs techniques.</li>
            <li>Définir points d'entrée et de sortie.</li>
            <li>Placer stop-loss et take-profit.</li>
            <li>Gérer la position avec discipline.</li>
          </ol>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Les patterns de trading sont efficaces lorsqu'ils sont combinés à d'autres indicateurs et à une gestion du
            risque rigoureuse. La pratique est essentielle pour les identifier correctement.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            La leçon suivante se concentre sur la gestion du risque et du capital.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Shield}>Leçon 4 · 20 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">La gestion du risque</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Protéger son capital et stabiliser les performances.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La <strong>gestion du risque</strong> est l'aspect le plus crucial du trading. Une stratégie solide permet de
            préserver son capital et d'assurer la longévité de son activité, même en période de pertes.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Principes fondamentaux</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Protection du capital</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Préservation des fonds</li>
              <li>Gestion des pertes</li>
              <li>Diversification</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Ratio risque / récompense</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Définition des objectifs</li>
              <li>Calcul du ratio</li>
              <li>Optimisation des trades</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Calcul du risque</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="flex items-center gap-3">
            <Calculator className="h-5 w-5 text-purple-600" />
            <h4 className="text-lg font-semibold">Position sizing</h4>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            Formule : <strong>Taille de position = (Capital × % risque) ÷ (Prix d'entrée - Stop loss)</strong>
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Déterminer le pourcentage de risque par trade.</li>
            <li>Calculer la taille de position optimale.</li>
            <li>Ajuster selon la volatilité.</li>
          </ul>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Gestion du portefeuille</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <PieChart className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold">Diversification</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Répartition des actifs</li>
              <li>Corrélation</li>
              <li>Équilibrage</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Exposition</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Limites par position</li>
              <li>Exposition totale</li>
              <li>Gestion du levier</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Suivi</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Journal de trading</li>
              <li>Analyse des performances</li>
              <li>Ajustements</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Erreurs à éviter</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold">Erreurs émotionnelles</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Trading revenge</li>
                <li>Over-trading</li>
                <li>FOMO</li>
                <li>Biais de confirmation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Erreurs techniques</h4>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>Absence de stop loss</li>
                <li>Position sizing incorrect</li>
                <li>Mauvaise diversification</li>
                <li>Levier excessif</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Règles d'or</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Ne jamais risquer plus de 1-2% du capital par trade.</li>
            <li>Toujours utiliser un stop loss.</li>
            <li>Maintenir un ratio risque / récompense minimum de 1:2.</li>
            <li>Diversifier son portefeuille.</li>
            <li>Tenir un journal de trading.</li>
          </ol>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Une approche disciplinée et systématique de la gestion du risque permet de protéger le capital et d'assurer une
            croissance durable. C'est la clé de la longévité en trading.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Le module suivant abordera la finance décentralisée (DeFi) et ses opportunités.
          </p>
        </div>
      </Card>
    </section>
  );
}
