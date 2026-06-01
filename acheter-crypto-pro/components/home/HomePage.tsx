"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Check, ChevronDown, ChevronUp, FileText, LineChart, PlayCircle, ShieldCheck, Signal, Star, Users, WalletCards, XCircle } from "lucide-react";
import { AnimatedCryptoBackground } from "@/components/backgrounds/AnimatedCryptoBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { analyses, featureCards, market } from "@/data/site";
import { CryptoCarousel } from "@/components/market/CryptoCarousel";
import { cn } from "@/lib/utils";

const pillars = [
  { icon: BookOpen, title: "Formations", text: "Parcours guidés pas à pas pour comprendre les cycles, wallets, risques et stratégies.", href: "/formations" },
  { icon: FileText, title: "Analyses", text: "Rapports clairs avec scénarios, niveaux clés, invalidation et lecture marché.", href: "/analyses" },
  { icon: Signal, title: "Signaux", text: "Opportunités sélectionnées selon une méthodologie lisible et contrôlée.", href: "/signaux" },
  { icon: WalletCards, title: "Espace membre", text: "Suivi apprentissage, portefeuille, alertes, progression et accès premium.", href: "/dashboard" }
];

const reviews = [
  {
    name: "Camille D.",
    role: "Graphiste freelance, Lyon",
    company: "Google Review",
    initials: "CD",
    color: "bg-violet-100 text-violet-700",
    rating: 5,
    date: "il y a 3 semaines",
    text: "J’avais essayé plusieurs plateformes avant. J’abandonnais toujours parce que les termes techniques me perdaient dès le départ. Ici, les formations commencent vraiment de zéro, sans te faire sentir stupide. Ça change tout."
  },
  {
    name: "Nicolas R.",
    role: "Technicien IT, 34 ans",
    company: "Google Review",
    initials: "NR",
    color: "bg-blue-100 text-blue-700",
    rating: 5,
    date: "il y a 1 mois",
    text: "Ce que j’apprécie le plus : ils ne promettent pas de t’enrichir. Le ton est honnête, les risques sont expliqués clairement. J’ai enfin une méthode au lieu de juste réagir aux news."
  },
  {
    name: "Sofia M.",
    role: "Infirmière, épargne long terme",
    company: "Google Review",
    initials: "SM",
    color: "bg-emerald-100 text-emerald-700",
    rating: 5,
    date: "il y a 6 semaines",
    text: "Je n’y connais rien en finance et je ne voulais pas me faire avoir. Les signaux sont accompagnés d’explications, pas juste ‘achète ça maintenant’. Je comprends pourquoi, et ça me rassure vraiment."
  },
  {
    name: "Alexandre B.",
    role: "Gérant de PME, Paris",
    company: "Google Review",
    initials: "AB",
    color: "bg-amber-100 text-amber-700",
    rating: 5,
    date: "il y a 2 mois",
    text: "J’avais perdu de l’argent sur des conseils YouTube avant. Ici c’est différent : ils t’apprennent à vérifier par toi-même. Depuis 4 mois je dors mieux, je panique moins dès qu’il y a une correction."
  },
  {
    name: "Sarah L.",
    role: "Étudiante en master finance",
    company: "Google Review",
    initials: "SL",
    color: "bg-pink-100 text-pink-700",
    rating: 5,
    date: "il y a 2 semaines",
    text: "Ce site complète bien mes cours académiques. Les analyses de marché sont sérieuses, sourcées, et on voit bien la démarche derrière. C’est pas du contenu généré à la va-vite."
  },
  {
    name: "Thomas V.",
    role: "Artisan, investisseur débutant",
    company: "Google Review",
    initials: "TV",
    color: "bg-sky-100 text-sky-700",
    rating: 5,
    date: "il y a 5 semaines",
    text: "J’avais peur de me lancer parce que j’entendais trop d’arnaques. Le fait qu’ils expliquent les risques autant que les opportunités m’a convaincu. J’aurais voulu trouver ça plus tôt."
  }
];

const FOR_WHO = [
  {
    emoji: "👋",
    title: "Tu débutes complètement",
    desc: "Tu as entendu parler de Bitcoin mais tu ne sais pas par où commencer. Tu veux comprendre sans te faire avoir, sans jargon inutile.",
    cta: "Commencer par les bases",
    href: "/formations"
  },
  {
    emoji: "📈",
    title: "Tu as déjà acheté, mais tu tâtonnes",
    desc: "Tu achètes sur un coup de tête, tu vends dans la panique. Tu cherches une méthode claire pour investir sans te laisser emporter par les émotions.",
    cta: "Voir la méthode",
    href: "/formations"
  },
  {
    emoji: "🧠",
    title: "Tu veux aller plus loin",
    desc: "Tu connais les bases. Tu veux une lecture de marché sérieuse, des signaux expliqués et des analyses que tu peux vérifier toi-même.",
    cta: "Explorer les signaux",
    href: "/signaux"
  }
];

const HONEST_LIMITS = [
  { bad: true,  text: "On ne te promet pas de devenir riche avec la crypto" },
  { bad: true,  text: "On ne gère pas ton argent à ta place" },
  { bad: true,  text: "On n'a pas de 'méthode secrète' ou de signal magique" },
  { bad: false, text: "On t'aide à comprendre ce que tu fais et pourquoi" },
  { bad: false, text: "On explique les risques autant que les opportunités" },
  { bad: false, text: "On est transparents sur nos sources et notre méthode" },
];

const FAQ_ITEMS = [
  {
    q: "Est-ce que ça va me faire gagner de l'argent ?",
    a: "Franchement, non — pas mécaniquement. Aucune formation ne peut garantir des gains sur les marchés financiers. Ce qu'on peut faire, c'est t'aider à comprendre les risques, éviter les erreurs classiques et développer une approche structurée. La crypto reste volatile et risquée, quoi qu'on y apprenne."
  },
  {
    q: "C'est fait pour quelqu'un qui part vraiment de zéro ?",
    a: "Oui. On a conçu les premières formations pour des gens qui ne savent pas ce qu'est un wallet ou une blockchain. Pas de prérequis technique. Si tu sais utiliser un smartphone, tu peux suivre."
  },
  {
    q: "Quelle est la différence avec les formations YouTube gratuites ?",
    a: "Le contenu YouTube est souvent excellent, mais fragmenté, sans fil conducteur et parfois biaisé (créateur sponsorisé par un exchange, etc.). Ici, le parcours est structuré, les analyses sont sourcées, et il n'y a pas de lien d'affiliation caché dans les recommandations."
  },
  {
    q: "Est-ce que je dois investir pour utiliser le site ?",
    a: "Non. Tu peux apprendre, lire les analyses et explorer la plateforme sans mettre un centime en crypto. L'accès gratuit couvre les bases. L'abonnement premium débloque les formations avancées et les signaux détaillés."
  },
  {
    q: "Combien coûte l'abonnement premium ?",
    a: "Les tarifs sont sur la page Abonnements. Il y a une option mensuelle sans engagement et une option annuelle avec réduction. On propose aussi une période d'essai pour que tu puisses te faire une idée sans risque."
  },
  {
    q: "Si j'ai une question, je peux contacter quelqu'un ?",
    a: "Oui. Chaque membre a accès à un support par email. On répond sous 24h ouvrées. Pour les membres premium, il y a aussi l'accès à la communauté Discord avec des échanges entre membres et des sessions Q&A régulières."
  }
];

export function HomePage() {
  const [activeReport, setActiveReport] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const report = analyses[activeReport];
  const visibleReviews = Array.from({ length: 3 }, (_, index) => reviews[(activeReview + index) % reviews.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24">
        <AnimatedCryptoBackground variant="hero" intensity="low" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl">
            <Badge tone="neutral" className="mb-5">Plateforme éducative · pas de conseils financiers</Badge>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink md:text-7xl">La crypto, c&apos;est compliqué.<br />On vous aide à y voir clair.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Des formations structurées, des analyses sourcées et des signaux expliqués — pour investir avec méthode, pas avec l&apos;adrénaline.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/register" variant="accent">Commencer gratuitement <ArrowRight className="h-4 w-4" /></Button>
              <Button href="/formations" variant="light">Voir les formations</Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> <strong className="text-ink">2 400+</strong> membres actifs</span>
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Accès gratuit sans carte</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-blue" /> 0 promesse de gains</span>
            </div>
          </motion.div>

          {/* ── Bloc droit : photo humaine + témoignage ── */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-line shadow-sm">

            {/* Photo */}
            <div className="relative h-72 overflow-hidden md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85"
                alt="Personne qui apprend à investir en crypto sur son ordinateur"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" />
            </div>

            {/* Témoignage */}
            <div className="bg-white px-6 pb-7 pt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="mt-3 text-base leading-7 text-ink">
                &ldquo;J&apos;avais essayé trois plateformes avant. Ici, les formations commencent vraiment de zéro sans te faire sentir stupide. Ça change tout.&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                    CD
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Camille D.</p>
                    <p className="text-xs text-muted">Graphiste freelance · Membre Premium</p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1">
                  <Image
                    src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                    alt="Google"
                    width={14}
                    height={14}
                    unoptimized
                  />
                  <span className="text-xs font-semibold text-muted">Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream/60 py-6">
        <div className="mx-auto mb-3 max-w-7xl px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Principaux actifs couverts</p>
        </div>
        <CryptoCarousel />
      </section>

      <section className="px-4 pb-10 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-3xl font-semibold">Commencer ici</h2>
            <p className="text-sm text-muted">Choisissez un chemin simple. Vous pourrez ajuster ensuite sans pression.</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-5">
              <pillar.icon className="h-5 w-5 text-gold" />
              <h3 className="mt-5 text-xl font-semibold">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{pillar.text}</p>
              <Button href={pillar.href} variant="ghost" className="mt-5 px-0">Ouvrir <ArrowRight className="h-4 w-4" /></Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f8fc] px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold text-ink md:text-5xl">Ce Que Nos Membres Disent</h2>
            <p className="mt-4 text-base text-muted md:text-lg">Des avis vérifiés, simples et clairs, publiés sur Google.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {visibleReviews.map((review, index) => (
              <motion.article
                key={`${review.name}-${activeReview}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.06 }}
                className="rounded-xl border border-line bg-white p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-5xl font-bold leading-none text-blue">”</span>
                  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1">
                    <Image
                      src="https://www.gstatic.com/images/branding/product/1x/googleg_32dp.png"
                      alt="Google"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-ink">Google</span>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star key={`${review.name}-star-${starIndex}`} className="h-4 w-4 fill-current text-[#f97316]" />
                  ))}
                </div>

                <p className="min-h-[112px] text-base leading-8 text-ink">“{review.text}”</p>

                <div className="mt-5 flex items-center gap-3">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${review.color}`}>
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-ink">{review.name}</p>
                    <p className="text-sm text-muted">{review.role}</p>
                    <p className="text-xs text-muted/70">{review.date}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveReview(index)}
                className={cn("h-2.5 rounded-full transition-all", activeReview === index ? "w-8 bg-blue" : "w-2.5 bg-line")}
                aria-label={`Voir l’avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Pour qui c&apos;est fait</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Peu importe où vous en êtes.</h2>
            <p className="mt-4 text-base leading-8 text-muted">On ne suppose pas que tu sais déjà. Le parcours s&apos;adapte à ton niveau, sans te faire sentir en retard.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {FOR_WHO.map((item) => (
              <div key={item.title} className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm">
                <span className="mb-4 text-4xl">{item.emoji}</span>
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{item.desc}</p>
                <Button href={item.href} variant="ghost" className="mt-5 px-0 self-start">{item.cta} <ArrowRight className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qu'on ne promet pas */}
      <section className="bg-ink px-4 py-16 text-white md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Transparence totale</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Ce qu&apos;on ne fait pas. Ce qu&apos;on fait vraiment.</h2>
            <p className="mt-4 text-base leading-8 text-white/60">Le secteur crypto est rempli de promesses exagérées. Voilà ce que vous trouverez ici, et ce que vous n&apos;y trouverez pas.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HONEST_LIMITS.map((item) => (
              <div key={item.text} className={`flex items-start gap-3 rounded-xl border p-4 ${item.bad ? "border-red-900/40 bg-red-950/30" : "border-emerald-800/40 bg-emerald-950/30"}`}>
                {item.bad
                  ? <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                  : <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                }
                <p className="text-sm leading-6 text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ honnête */}
      <section className="px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Questions fréquentes</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Les vraies questions que vous vous posez.</h2>
            <p className="mt-4 text-base leading-8 text-muted">Des réponses directes, sans langue de bois.</p>
          </div>
          <div className="grid gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-xl border border-line bg-white overflow-hidden">
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-ink">{item.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted" />
                    : <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted" />
                  }
                </button>
                {openFaq === i && (
                  <div className="border-t border-line px-6 py-4">
                    <p className="text-sm leading-7 text-muted">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionHeader title="Une méthode claire du début à la pratique" description="Apprendre, comprendre le marché, puis agir avec des repères simples." />
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Card hover={false}>
            <Badge tone="premium" icon={PlayCircle}>Parcours guidé</Badge>
            <h3 className="mt-5 text-3xl font-semibold">Apprendre avec une structure claire.</h3>
            <div className="mt-6 grid gap-3">
              {["Les fondamentaux", "Investir avec méthode", "Analyse technique", "Gestion du risque", "Trading & signaux"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-line bg-cream p-4">
                  <span className={cn("grid h-8 w-8 place-items-center rounded-md text-xs font-bold", index < 3 ? "bg-blue text-white" : "bg-white text-muted")}>{index + 1}</span>
                  <span className="text-sm font-semibold">{item}</span>
                  <ProgressBar value={index < 3 ? 72 - index * 16 : 18} className="ml-auto w-28" />
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false}>
            <div className="mb-5 flex items-center justify-between">
              <div><Badge tone="premium" icon={FileText}>Brief marché</Badge><h3 className="mt-4 text-3xl font-semibold">{report.title}</h3></div>
              <Badge>{report.readTime}</Badge>
            </div>
            <p className="text-sm leading-7 text-muted">{report.summary}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {market.slice(0, 3).map((item) => <div key={item.asset} className="rounded-lg border border-line bg-cream p-4"><p className="font-semibold">{item.asset}</p><p className="mt-1 text-sm text-muted">{item.price}</p><p className={cn("mt-2 text-sm font-semibold", item.positive ? "text-emerald-600" : "text-red-600")}>{item.change}</p></div>)}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {analyses.map((item, index) => <button key={item.slug} onClick={() => setActiveReport(index)} className={cn("rounded-lg border px-3 py-2 text-sm font-semibold", activeReport === index ? "border-blue bg-blue text-white" : "border-line bg-white hover:bg-cream")}>{item.tag}</button>)}
            </div>
          </Card>
        </div>
      </section>

      <section className="page-section">
        <SectionHeader title="Une progression sans surcharge" description="Chaque écran montre l’essentiel pour avancer sans ambiguïté." />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {featureCards.slice(0, 3).map((feature) => (
            <Card key={feature.title}>
              <feature.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-5 text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{feature.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">{feature.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="mx-auto max-w-7xl rounded-xl border border-line bg-white p-8 shadow-hero md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Badge tone="premium" icon={ShieldCheck}>Accès premium</Badge>
              <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">Commencez gratuitement. Payez seulement si ça vous aide vraiment.</h2>
              <p className="mt-5 leading-8 text-muted">Pas d&apos;engagement, pas de carte requise pour démarrer. L&apos;abonnement premium est là si vous voulez aller plus loin — pas pour verrouiller l&apos;essentiel.</p>
              <div className="mt-7 flex gap-3">
                <Button href="/register" variant="accent">Créer un compte gratuit <ArrowRight className="h-4 w-4" /></Button>
                <Button href="/pricing" variant="light">Voir les tarifs</Button>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { label: "Formations de base", free: true },
                { label: "Analyses de marché", free: true },
                { label: "Formations avancées", free: false },
                { label: "Signaux détaillés", free: false },
                { label: "Communauté Discord", free: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-line bg-cream p-4">
                  <Check className={`h-4 w-4 ${item.free ? "text-emerald-500" : "text-gold"}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${item.free ? "bg-emerald-100 text-emerald-700" : "bg-gold/10 text-gold"}`}>
                    {item.free ? "Gratuit" : "Premium"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
