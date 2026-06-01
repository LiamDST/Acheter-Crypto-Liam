/* eslint-disable react/no-unescaped-entities */
import { AlertTriangle, Bitcoin, Clock, Code, Coins, DollarSign, Globe, Key, Lock, Shield, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function CryptomonnaiesContent() {
  return (
    <section className="mt-8 grid gap-6">
      <Card>
        <Badge tone="premium" icon={Bitcoin}>Leçon 1 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Bitcoin et son histoire</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Découvrez l'origine et l'évolution de la première cryptomonnaie.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Le <strong>Bitcoin</strong> est né en 2008 avec la publication d'un livre blanc par Satoshi Nakamoto.
            Cette innovation a marqué le début d'une révolution financière en introduisant la première monnaie
            numérique décentralisée.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les origines du Bitcoin</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Le 31 octobre 2008, Satoshi Nakamoto publie le livre blanc "Bitcoin: A Peer-to-Peer Electronic Cash System".
          Ce document décrit un système permettant d'effectuer des transactions électroniques sans intermédiaire de confiance.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Chronologie des événements clés</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-amber-500" />
              <h4 className="text-lg font-semibold">2008-2009</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Publication du livre blanc Bitcoin</li>
              <li>Création du Genesis Block</li>
              <li>Première transaction Bitcoin</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-orange-500" />
              <h4 className="text-lg font-semibold">2010-2013</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Première transaction commerciale (Pizza Bitcoin)</li>
              <li>Création des premiers exchanges</li>
              <li>Premier bull run majeur</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Caractéristiques uniques</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <h4 className="text-lg font-semibold">Aspects techniques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Offre limitée à 21 millions</li>
              <li>Halving tous les 4 ans</li>
              <li>Preuve de travail (PoW)</li>
              <li>Réseau décentralisé</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-cream/70 p-5">
            <h4 className="text-lg font-semibold">Innovations</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Premier système de paiement décentralisé</li>
              <li>Solution au problème de la double dépense</li>
              <li>Création de la technologie blockchain</li>
              <li>Consensus distribué</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Impact économique</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h4 className="text-lg font-semibold">Une nouvelle classe d'actifs</h4>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Création d'une nouvelle classe d'actifs</li>
            <li>Démocratisation de l'investissement</li>
            <li>Remise en question du système financier traditionnel</li>
            <li>Adoption croissante par les institutions</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Le Bitcoin a ouvert la voie à une nouvelle ère financière en démontrant la viabilité d'un système monétaire
            décentralisé. Son histoire continue d'influencer l'évolution du secteur des cryptomonnaies et de la finance.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans la prochaine leçon, nous explorerons Ethereum et les smart contracts, la grande évolution après Bitcoin.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Code}>Leçon 2 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Ethereum et les smart contracts</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre la plateforme Ethereum et la logique des contrats intelligents.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            <strong>Ethereum</strong> a révolutionné le monde des cryptomonnaies en introduisant les <strong>smart contracts</strong>,
            des programmes autonomes qui s'exécutent automatiquement lorsque certaines conditions sont remplies.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Qu'est-ce qu'Ethereum ?</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          Ethereum est une plateforme blockchain décentralisée qui permet la création et l'exécution de smart contracts.
          Contrairement à Bitcoin qui se concentre sur les transactions financières, Ethereum est un véritable ordinateur
          mondial décentralisé.
        </p>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les smart contracts</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Caractéristiques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Auto-exécutables</li>
              <li>Immuables</li>
              <li>Transparents</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Applications</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>DeFi (Finance Décentralisée)</li>
              <li>NFTs (Tokens Non Fongibles)</li>
              <li>DAOs (Organisations Autonomes)</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Comment fonctionnent les smart contracts ?</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Le contrat est écrit en Solidity (langage de programmation).</li>
            <li>Il est déployé sur la blockchain Ethereum.</li>
            <li>Les conditions du contrat sont définies dans le code.</li>
            <li>Le contrat s'exécute automatiquement quand les conditions sont remplies.</li>
          </ol>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Sécurité et considérations</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Avantages</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Automatisation des processus</li>
              <li>Réduction des intermédiaires</li>
              <li>Transparence totale</li>
              <li>Immuabilité des contrats</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Risques</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Bugs dans le code</li>
              <li>Coûts de transaction (Gas)</li>
              <li>Vulnérabilités potentielles</li>
              <li>Irréversibilité des transactions</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Ethereum et les smart contracts représentent une avancée majeure dans le monde de la blockchain. Ils permettent
            de créer des applications décentralisées complexes et ouvrent la voie à de nombreuses innovations.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans la prochaine leçon, nous explorerons les différents types de tokens qui peuvent être créés sur Ethereum.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Coins}>Leçon 3 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les différents types de tokens</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Comprendre les catégories de tokens et leurs cas d'usage.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            Les <strong>tokens</strong> sont des actifs numériques créés sur des blockchains existantes, principalement Ethereum.
            Ils peuvent représenter une grande variété d'actifs et de droits, chaque type ayant ses propres usages.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les types principaux de tokens</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Tokens fongibles (ERC-20)</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Interchangeables entre eux</li>
              <li>Divisibles</li>
              <li>Ex : USDT, LINK, UNI</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Tokens non fongibles (NFT)</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Uniques et non interchangeables</li>
              <li>Représentent des actifs uniques</li>
              <li>Ex : art numérique, objets de collection</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Cas d'utilisation des tokens</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Finance (DeFi)</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Stablecoins</li>
              <li>Tokens de gouvernance</li>
              <li>Tokens de prêt</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Utilitaires</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Accès aux services</li>
              <li>Récompenses</li>
              <li>Votes</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <h4 className="text-lg font-semibold">Actifs réels</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Immobilier tokenisé</li>
              <li>Art et objets de valeur</li>
              <li>Actions tokenisées</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Standards de tokens</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="text-lg font-semibold">ERC-20</h4>
              <p className="mt-2 text-sm text-muted">Standard pour les tokens fongibles.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">ERC-721</h4>
              <p className="mt-2 text-sm text-muted">Standard pour les NFTs, uniques et non divisibles.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">ERC-1155</h4>
              <p className="mt-2 text-sm text-muted">Standard multi-tokens pour gérer fongibles et non fongibles.</p>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Sécurité et bonnes pratiques</h3>
        <div className="mt-5 rounded-3xl border border-line bg-white p-5">
          <ul className="space-y-2 text-sm text-muted">
            <li>Vérifier la légitimité du projet et du contrat.</li>
            <li>Utiliser des wallets sécurisés.</li>
            <li>Comprendre les risques de liquidité.</li>
            <li>Faire attention aux arnaques et aux tokens frauduleux.</li>
          </ul>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            Les tokens représentent une innovation majeure dans l'écosystème blockchain, permettant de tokeniser
            pratiquement n'importe quel actif ou droit. Leur diversité ouvre de nombreuses possibilités d'application.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Dans la prochaine leçon, nous explorerons la sécurité des wallets et les meilleures pratiques pour protéger vos actifs.
          </p>
        </div>
      </Card>

      <Card>
        <Badge tone="premium" icon={Shield}>Leçon 4 · 15 min</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Les wallets et la sécurité</h2>
        <p className="mt-3 text-sm leading-7 text-muted">Apprendre à sécuriser ses portefeuilles et limiter les risques.</p>

        <div className="mt-6 rounded-3xl border border-line bg-cream/80 p-5">
          <p className="text-sm leading-7 text-muted">
            La <strong>sécurité des wallets</strong> est un aspect crucial de l'investissement en cryptomonnaies.
            Une bonne stratégie de sécurité permet de protéger vos actifs contre les piratages, les pertes et les erreurs humaines.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Les différents types de wallets</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-red-600" />
              <h4 className="text-lg font-semibold">Hot wallets</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Connectés à Internet</li>
              <li>Faciles d'utilisation</li>
              <li>Plus vulnérables aux attaques</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-blue-600" />
              <h4 className="text-lg font-semibold">Cold wallets</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Stockage hors ligne</li>
              <li>Sécurité maximale</li>
              <li>Idéal pour le long terme</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Bonnes pratiques de sécurité</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
            <li>Utiliser un gestionnaire de mots de passe sécurisé.</li>
            <li>Activer l'authentification à deux facteurs (2FA).</li>
            <li>Stocker vos clés privées de manière sécurisée.</li>
            <li>Faire des sauvegardes régulières de vos wallets.</li>
            <li>Vérifier toujours les adresses de destination.</li>
          </ol>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Menaces courantes</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <h4 className="text-lg font-semibold">Attaques externes</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Phishing</li>
              <li>Malwares</li>
              <li>Sites frauduleux</li>
              <li>Attaques par force brute</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="text-lg font-semibold">Erreurs humaines</h4>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Perte des clés privées</li>
              <li>Mauvaise sauvegarde</li>
              <li>Erreurs de transaction</li>
              <li>Partage d'informations sensibles</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">Protection avancée</h3>
        <div className="mt-5 rounded-3xl border border-line bg-cream/70 p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="text-lg font-semibold">Multi-signature</h4>
              <p className="mt-2 text-sm text-muted">Nécessite plusieurs signatures pour valider une transaction.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">HSM</h4>
              <p className="mt-2 text-sm text-muted">Protection matérielle des clés cryptographiques.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Wallets de récupération</h4>
              <p className="mt-2 text-sm text-muted">Configuration de wallets de secours en cas de perte.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-5">
          <h4 className="text-lg font-semibold">Conclusion</h4>
          <p className="mt-3 text-sm leading-7 text-muted">
            La sécurité de vos wallets crypto est un aspect crucial de votre investissement. En suivant les bonnes pratiques
            et en restant vigilant, vous pouvez réduire les risques de perte ou de vol de vos actifs.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Le prochain module abordera les arnaques courantes et la façon de les éviter.
          </p>
        </div>
      </Card>
    </section>
  );
}
