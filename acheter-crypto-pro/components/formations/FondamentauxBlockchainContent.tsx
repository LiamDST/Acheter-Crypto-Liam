/* eslint-disable react/no-unescaped-entities */
import { AlertTriangle, Brain, Database, Globe, Key, Lock, Network, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function FondamentauxBlockchainContent() {
  return (
    <section className="mt-8 grid gap-6">
      <Card>
        <Badge tone="success" icon={Brain}>Leçon 1 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les fondamentaux de la blockchain</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre les bases de la technologie blockchain et son fonctionnement.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La <strong>blockchain</strong> est une technologie révolutionnaire qui a transformé le monde numérique
            en offrant un système sécurisé, décentralisé et transparent pour enregistrer des transactions. Elle est
            surtout connue pour être la base des cryptomonnaies comme le Bitcoin, mais ses applications vont bien au-delà.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Définition de la blockchain</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          La <strong>blockchain</strong> est un registre numérique décentralisé qui enregistre des transactions de manière transparente
          et immuable. Contrairement aux bases de données traditionnelles qui sont centralisées, la blockchain est répartie
          sur un réseau d'ordinateurs (appelés <strong>nœuds</strong>) qui travaillent ensemble pour valider et enregistrer les transactions.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Pourquoi la blockchain a-t-elle été créée ?</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Avant d'expliquer le fonctionnement de la blockchain, il est essentiel de comprendre pourquoi cette technologie a vu le jour.
          Dans le <strong>système financier traditionnel</strong>, il est impossible de transférer de l'argent directement entre deux individus
          via Internet sans passer par un <strong>intermédiaire</strong>, comme une banque ou un service de paiement.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted">
          Lorsqu'une personne effectue un <strong>virement bancaire</strong>, plusieurs étapes se déroulent :
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>La banque vérifie que le compte de l'émetteur dispose des fonds nécessaires.</li>
          <li>Elle valide la transaction et transfère l'argent au compte du destinataire.</li>
          <li>L'opération est inscrite dans le registre comptable de la banque.</li>
        </ul>
        <p className="mt-3 text-sm leading-7 text-muted">
          Le rôle de la banque est donc central. C'est un <strong>tiers de confiance</strong> qui garantit la validité des transactions.
          Cependant, ce système présente plusieurs inconvénients :
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li><strong>Dépendance</strong> aux institutions financières qui contrôlent l'accès aux services bancaires.</li>
          <li>Frais de transaction parfois élevés.</li>
          <li>Délais de traitement qui peuvent ralentir les transactions.</li>
          <li>Risque de centralisation et de manipulation des données.</li>
        </ul>
        <p className="mt-3 text-sm leading-7 text-muted">
          La blockchain a été créée pour répondre à ces limites. Elle permet de réaliser des transactions de manière
          <strong> sécurisée</strong>, <strong>transparente</strong> et <strong>sans intermédiaire</strong>.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Comment fonctionne la blockchain ?</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          La blockchain est un <strong>registre numérique décentralisé</strong> qui enregistre toutes les transactions effectuées sur un réseau.
          Elle fonctionne comme un grand livre comptable, mais au lieu d'être contrôlé par une seule entité, il est partagé entre de nombreux
          participants appelés <strong>nœuds</strong>.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted">
          Chaque transaction effectuée sur la blockchain est inscrite dans un <strong>bloc de données</strong>, qui est ensuite ajouté à une
          chaîne de blocs. Ce processus suit plusieurs étapes :
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Enregistrement et validation</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Enregistrement de la transaction sur le réseau</li>
              <li>Regroupement des transactions dans un bloc</li>
              <li>Validation par les mineurs ou validateurs</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Mécanismes de consensus</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><strong>Proof of Work (PoW)</strong> : résolution de problèmes cryptographiques.</li>
              <li><strong>Proof of Stake (PoS)</strong> : mise en jeu de cryptomonnaies.</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Différence entre la blockchain et le Bitcoin</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <h4 className="text-lg font-semibold">La blockchain</h4>
            <p className="mt-3 text-sm leading-7 text-muted">
              Une <strong>technologie</strong>, un protocole informatique qui permet de stocker et de sécuriser des transactions
              de manière décentralisée.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <h4 className="text-lg font-semibold">Le Bitcoin</h4>
            <p className="mt-3 text-sm leading-7 text-muted">
              Une <strong>application</strong> de la blockchain, une cryptomonnaie qui utilise cette technologie pour exister et fonctionner.
            </p>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Pourquoi la blockchain est-elle révolutionnaire ?</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold">Sécurité et immuabilité</h4>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              Une fois une transaction enregistrée, elle ne peut plus être modifiée ni supprimée.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-blue-600" />
              <h4 className="text-lg font-semibold">Décentralisation</h4>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              Les données sont réparties sur des milliers d'ordinateurs à travers le monde.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La blockchain a le potentiel de révolutionner de nombreux secteurs en offrant <strong>sécurité</strong>,
            <strong> transparence</strong> et <strong>décentralisation</strong>. Son adoption croissante laisse entrevoir un avenir
            où les transactions seront plus sécurisées, efficaces et accessibles à tous.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans les prochains modules, nous aborderons les principes de la décentralisation, la cryptographie et la sécurité,
            ainsi que les différents types de blockchain.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Network}>Leçon 2 · 12 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les principes de la décentralisation</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre les fondements et les avantages de la décentralisation dans la blockchain.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La <strong>décentralisation</strong> est l'un des principes fondamentaux qui distingue la blockchain des systèmes traditionnels.
            Elle représente un changement de paradigme majeur dans la manière dont nous gérons et sécurisons les données, les transactions
            et les interactions numériques.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Qu'est-ce que la décentralisation ?</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          La décentralisation signifie qu'aucune entité unique ne contrôle le réseau. Le pouvoir et les responsabilités sont distribués entre
          tous les participants du réseau, créant un système plus démocratique et résilient.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les trois piliers de la décentralisation</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Architecture</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Distribution des nœuds</li>
              <li>Redondance des données</li>
              <li>Résistance aux pannes</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Politique</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Gouvernance distribuée</li>
              <li>Prise de décision collective</li>
              <li>Équité du système</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Logique</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Consensus distribué</li>
              <li>Smart contracts</li>
              <li>Automatisation</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Avantages de la décentralisation</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <h4 className="text-lg font-semibold">Sécurité renforcée</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Pas de point unique de défaillance</li>
              <li>Résistance aux attaques DDoS</li>
              <li>Protection contre la censure</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <h4 className="text-lg font-semibold">Transparence</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Historique immuable</li>
              <li>Auditabilité publique</li>
              <li>Traçabilité des transactions</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Défis de la décentralisation</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-3 text-sm text-muted">
            <li><strong>Scalabilité</strong> : la décentralisation peut ralentir les transactions et augmenter les coûts.</li>
            <li><strong>Coordination</strong> : la prise de décision collective peut être plus lente et complexe.</li>
            <li><strong>Responsabilité</strong> : l'absence d'autorité centrale peut compliquer la résolution des problèmes.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La décentralisation est bien plus qu'une simple caractéristique technique de la blockchain. C'est un changement fondamental
            dans la manière dont nous organisons les systèmes et les interactions numériques. Malgré ses défis, elle offre des avantages
            uniques qui la rendent indispensable pour l'avenir des technologies blockchain.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans le prochain module, nous explorerons en détail la cryptographie et la sécurité, des éléments essentiels qui permettent
            à la décentralisation de fonctionner efficacement.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Key}>Leçon 3 · 14 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">La cryptographie et la sécurité</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Découvrez les mécanismes de sécurité qui protègent la blockchain et vos transactions.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La <strong>cryptographie</strong> est le pilier fondamental qui garantit la sécurité et l'intégrité de la blockchain.
            Elle permet de protéger les transactions, d'authentifier les utilisateurs et d'assurer la confidentialité des données.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les bases de la cryptographie blockchain</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          La cryptographie dans la blockchain repose sur plusieurs concepts clés qui travaillent ensemble pour créer un système sécurisé
          et fiable. Ces mécanismes assurent que les transactions sont authentiques, inaltérables et confidentielles.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les mécanismes cryptographiques essentiels</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Clés cryptographiques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Clé privée : signature des transactions</li>
              <li>Clé publique : identification</li>
              <li>Paire de clés : sécurité complète</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Fonctions de hachage</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Empreinte unique des données</li>
              <li>Intégrité des blocs</li>
              <li>Chaînage cryptographique</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">La sécurité des transactions</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <h4 className="text-lg font-semibold">Processus de sécurisation</h4>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Création de la transaction avec les détails nécessaires.</li>
            <li>Signature avec la clé privée du propriétaire.</li>
            <li>Vérification par le réseau avec la clé publique.</li>
            <li>Inclusion dans un bloc après validation.</li>
          </ol>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Menaces et protections</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h4 className="text-lg font-semibold">Menaces courantes</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Attaques à 51%</li>
              <li>Double dépense</li>
              <li>Vol de clés privées</li>
              <li>Attaques Sybil</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold">Protections</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Consensus distribué</li>
              <li>Cryptographie robuste</li>
              <li>Stockage sécurisé</li>
              <li>Validation par les pairs</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La cryptographie est le fondement de la sécurité blockchain, permettant des transactions sûres et vérifiables.
            Sa robustesse repose sur des principes mathématiques éprouvés et des protocoles sophistiqués qui travaillent ensemble
            pour protéger l'intégrité du réseau.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans le prochain module, nous explorerons les différents types de blockchain et leurs cas d'utilisation spécifiques.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Database}>Leçon 4 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les différents types de blockchain</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Explorez les différentes architectures blockchain et leurs cas d'utilisation.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Il existe différents types de blockchain, chacun conçu pour répondre à des besoins spécifiques.
            Comprendre leurs caractéristiques est essentiel pour choisir la solution la plus adaptée à chaque cas d'utilisation.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les types principaux de blockchain</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Publiques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Accessibles à tous</li>
              <li>Totalement décentralisées</li>
              <li>Ex : Bitcoin, Ethereum</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Privées</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Accès restreint</li>
              <li>Contrôle centralisé</li>
              <li>Usage entreprise</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Consortium</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Semi-privées</li>
              <li>Consensus partagé</li>
              <li>Collaboration B2B</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Caractéristiques spécifiques</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <h4 className="text-lg font-semibold">Blockchains publiques</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Transparence totale</li>
              <li>Consensus distribué</li>
              <li>Sécurité maximale</li>
              <li>Scalabilité limitée</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold">Blockchains privées</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Performance élevée</li>
              <li>Contrôle d'accès</li>
              <li>Confidentialité</li>
              <li>Évolutivité facile</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Cas d'utilisation</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Blockchains publiques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Cryptomonnaies</li>
              <li>DeFi</li>
              <li>NFTs</li>
              <li>Applications décentralisées</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Blockchains privées</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Gestion de la chaîne logistique</li>
              <li>Services financiers</li>
              <li>Données médicales</li>
              <li>Identité numérique</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Chaque type de blockchain présente ses avantages et ses limites. Le choix dépend des besoins spécifiques du projet :
            niveau de décentralisation requis, performance nécessaire, confidentialité des données, etc.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans le prochain module, nous explorerons l'histoire du Bitcoin, la première et plus célèbre application
            de la technologie blockchain.
          </p>
        </div>
      </Card>
    </section>
  );
}
