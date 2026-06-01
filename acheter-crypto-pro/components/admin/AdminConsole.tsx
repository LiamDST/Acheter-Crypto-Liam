"use client";
import { useEffect, useMemo, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  Command,
  CreditCard,
  Database,
  Edit3,
  FileText,
  Filter,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Plus,
  ReceiptText,
  RefreshCcw,
  Reply,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Signal,
  Sparkles,
  Trash2,
  Users,
  X
} from "lucide-react";
import { TradingBarsBackground } from "@/components/backgrounds/TradingBarsBackground";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MiniChart } from "@/components/ui/MiniChart";
import { adminStats, signals as seedSignals } from "@/data/site";
import { cn } from "@/lib/utils";

type TabId = "overview" | "users" | "content" | "payments" | "signals" | "support" | "security" | "settings";
type ModalMode = "user" | "content" | "payment" | "signal" | "ticket" | "template" | null;

type AdminUser = { id: string; name: string; email: string; plan: string; role: string; status: string; joined: string; notes: string };
type ContentItem = { id: string; title: string; type: string; visibility: string; status: string; owner: string; summary: string };
type PaymentItem = { id: string; customer: string; email: string; amount: string; plan: string; status: string; date: string; dueDate: string; invoiceNo: string; note: string };
type AdminSignal = { id: string; asset: string; direction: string; entry: string; target: string; stop: string; risk: string; status: string; confidence: number; rr: string; horizon: string; update: string; rationale: string };
type Ticket = { id: string; subject: string; user: string; email: string; priority: string; status: string; messages: string[] };
type ReplyTemplate = { id: string; title: string; text: string };
type SecurityFlag = { id: string; label: string; enabled: boolean; description: string };
type SiteSettings = { siteName: string; supportEmail: string; maintenance: boolean; signupsOpen: boolean; defaultCurrency: string; seoTitle: string; alertEmail: boolean; cookieBanner: boolean };

const adminTabs: Array<{ id: TabId; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { id: "overview", label: "Vue globale", icon: LayoutDashboard },
  { id: "users", label: "Utilisateurs", icon: Users },
  { id: "content", label: "Contenus", icon: FileText },
  { id: "payments", label: "Paiements", icon: CreditCard },
  { id: "signals", label: "Signaux", icon: Signal },
  { id: "support", label: "Support", icon: MessageSquare },
  { id: "security", label: "Sécurité", icon: KeyRound },
  { id: "settings", label: "Réglages", icon: Settings }
];

const initialUsers: AdminUser[] = [
  { id: "usr_1", name: "Alex Martin", email: "alex@exemple.fr", plan: "12 mois", role: "Membre", status: "Actif", joined: "28 mai", notes: "Intéressé par les analyses BTC." },
  { id: "usr_2", name: "Sarah Dubois", email: "sarah@exemple.fr", plan: "6 mois", role: "Premium", status: "Actif", joined: "27 mai", notes: "Demande souvent des factures entreprise." },
  { id: "usr_3", name: "Nassim Leroy", email: "nassim@exemple.fr", plan: "Gratuit", role: "Lead", status: "À relancer", joined: "26 mai", notes: "À inviter sur l’offre annuelle." },
  { id: "usr_4", name: "Camille Petit", email: "camille@exemple.fr", plan: "1 mois", role: "Premium", status: "Paiement échoué", joined: "25 mai", notes: "Relance paiement à envoyer." }
];

const initialContent: ContentItem[] = [
  { id: "cnt_1", title: "Comprendre Bitcoin et Ethereum", type: "Formation", visibility: "Public", status: "Publié", owner: "Équipe contenu", summary: "Les bases pour comprendre les deux actifs majeurs." },
  { id: "cnt_2", title: "Analyse technique appliquée", type: "Formation", visibility: "Premium", status: "Brouillon", owner: "Trader pro", summary: "Supports, résistances, invalidation et gestion du risque." },
  { id: "cnt_3", title: "Bitcoin : résistance majeure", type: "Analyse", visibility: "Premium", status: "Programmé", owner: "Market desk", summary: "Dossier technique sur une zone clé BTC." },
  { id: "cnt_4", title: "Signal BTC long", type: "Signal", visibility: "Premium", status: "Actif", owner: "Trading desk", summary: "Signal live avec entrée, stop et objectif." }
];

const initialPayments: PaymentItem[] = [
  { id: "pay_1", customer: "Sarah Dubois", email: "sarah@exemple.fr", amount: "14,99 €/mois", plan: "6 mois", status: "Payé", date: "28 mai", dueDate: "28 juin", invoiceNo: "FAC-2026-001", note: "Paiement CB validé." },
  { id: "pay_2", customer: "Alex Martin", email: "alex@exemple.fr", amount: "9,99 €/mois", plan: "12 mois", status: "Payé", date: "27 mai", dueDate: "27 juin", invoiceNo: "FAC-2026-002", note: "Abonnement annuel." },
  { id: "pay_3", customer: "Camille Petit", email: "camille@exemple.fr", amount: "19,99 €/mois", plan: "1 mois", status: "Échec", date: "26 mai", dueDate: "26 mai", invoiceNo: "FAC-2026-003", note: "Carte refusée." }
];

const initialSignals: AdminSignal[] = seedSignals.map((signal) => ({
  ...signal,
  confidence: signal.confidence,
  rationale: `${signal.asset} surveillé sur horizon ${signal.horizon}. Ratio R/R ${signal.rr}, risque ${signal.risk}.`
}));

const initialTickets: Ticket[] = [
  { id: "tic_1", subject: "Accès premium non activé", user: "Camille", email: "camille@exemple.fr", priority: "Haute", status: "Ouvert", messages: ["Je viens de payer mais mon compte reste gratuit."] },
  { id: "tic_2", subject: "Question sur le signal ETH", user: "Alex", email: "alex@exemple.fr", priority: "Moyenne", status: "En cours", messages: ["Pouvez-vous préciser l’invalidation du signal ETH ?"] },
  { id: "tic_3", subject: "Facture entreprise", user: "Sarah", email: "sarah@exemple.fr", priority: "Basse", status: "Résolu", messages: ["J’ai besoin d’une facture avec TVA."] }
];

const initialTemplates: ReplyTemplate[] = [
  { id: "tpl_1", title: "Accès premium", text: "Bonjour, je viens de vérifier votre compte. L’accès premium est maintenant synchronisé. Pouvez-vous vous reconnecter ?" },
  { id: "tpl_2", title: "Facture", text: "Bonjour, votre facture est disponible dans l’espace membre. Je peux aussi la renvoyer par email si besoin." }
];

const initialSecurity: SecurityFlag[] = [
  { id: "sec_2fa", label: "2FA admin recommandé", enabled: true, description: "Demander une double validation pour les actions sensibles." },
  { id: "sec_rls", label: "RLS Supabase activé", enabled: true, description: "Contrôles d’accès au niveau base de données." },
  { id: "sec_webhooks", label: "Webhooks Stripe signés", enabled: true, description: "Vérification des signatures Stripe côté serveur." },
  { id: "sec_destructive", label: "Confirmation suppression", enabled: true, description: "Confirmer les suppressions utilisateurs, contenus et factures." }
];

const initialSettings: SiteSettings = {
  siteName: "Acheter Crypto",
  supportEmail: "support@acheter-crypto.fr",
  maintenance: false,
  signupsOpen: true,
  defaultCurrency: "EUR",
  seoTitle: "Acheter Crypto — SaaS premium crypto",
  alertEmail: true,
  cookieBanner: true
};

const initialLogs = [
  { action: "Console admin initialisée", actor: "system", time: "Maintenant", severity: "success" },
  { action: "Tentative d’accès admin bloquée", actor: "unknown", time: "Il y a 41 min", severity: "danger" }
];

const storageKeys = [
  "acheter_admin_users",
  "acheter_admin_content",
  "acheter_admin_payments",
  "acheter_admin_signals",
  "acheter_admin_tickets",
  "acheter_admin_templates",
  "acheter_admin_security",
  "acheter_admin_settings",
  "acheter_admin_logs"
];

const autoSignalCandidates = [
  { asset: "BTC", direction: "Long", entry: "66 950 €", target: "70 800 €", stop: "64 880 €", risk: "Modéré", confidence: 82, rr: "1.9", horizon: "Swing", rationale: "Momentum supérieur au marché, support défendu et volume en reprise." },
  { asset: "ETH", direction: "Long", entry: "3 185 €", target: "3 420 €", stop: "3 040 €", risk: "Faible", confidence: 76, rr: "1.6", horizon: "Court terme", rationale: "Flux positifs et structure de reprise progressive." },
  { asset: "SOL", direction: "Short", entry: "154 €", target: "143 €", stop: "160 €", risk: "Élevé", confidence: 68, rr: "1.8", horizon: "Scalp", rationale: "Perte de momentum et retour probable vers liquidité basse." }
];

function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored) as T);
    } catch {
      setValue(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function fieldClass() {
  return "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/10";
}

function TextField({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase text-muted">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={fieldClass()} />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase text-muted">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass()}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase text-muted">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={4} className={fieldClass()} />
    </label>
  );
}

function Toolbar({ title, description, action, search, setSearch, onAction }: { title: string; description: string; action?: string; search: string; setSearch: (v: string) => void; onAction?: () => void }) {
  return (
    <div className="mb-5 flex flex-col gap-4 rounded-lg border border-line bg-white/90 p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full bg-transparent text-sm outline-none" />
        </div>
        <Button variant="light"><Filter className="h-4 w-4" /> Filtrer</Button>
        {action ? <Button onClick={onAction}><Plus className="h-4 w-4" /> {action}</Button> : null}
      </div>
    </div>
  );
}

function AdminTable<T>({ columns, rows, renderRow, empty }: { columns: string[]; rows: T[]; renderRow: (row: T) => ReactNode; empty?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-premium">
      <div className="hidden border-b border-line bg-cream px-5 py-4 text-xs font-semibold uppercase text-muted md:grid" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
        {columns.map((column) => <span key={column}>{column}</span>)}
      </div>
      {rows.length ? <div className="divide-y divide-line">{rows.map(renderRow)}</div> : <p className="p-6 text-sm text-muted">{empty || "Aucun résultat."}</p>}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg border border-line bg-white shadow-hero">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg border border-line p-2 text-muted hover:bg-cream" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange} className="flex w-full items-center justify-between gap-4 rounded-lg border border-line bg-white p-4 text-left">
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        <span className="mt-1 block text-sm text-muted">{description}</span>
      </span>
      <span className={cn("h-7 w-12 rounded-full p-1 transition", checked ? "bg-ink" : "bg-line")}>
        <span className={cn("block h-5 w-5 rounded-full bg-white transition", checked ? "translate-x-5" : "translate-x-0")} />
      </span>
    </button>
  );
}

export function AdminConsole() {
  const [tab, setTab] = useState<TabId>("overview");
  const [search, setSearch] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);
  const [users, setUsers] = useStoredState("acheter_admin_users", initialUsers);
  const [contentItems, setContentItems] = useStoredState("acheter_admin_content", initialContent);
  const [payments, setPayments] = useStoredState("acheter_admin_payments", initialPayments);
  const [signals, setSignals] = useStoredState("acheter_admin_signals", initialSignals);
  const [tickets, setTickets] = useStoredState("acheter_admin_tickets", initialTickets);
  const [templates, setTemplates] = useStoredState("acheter_admin_templates", initialTemplates);
  const [security, setSecurity] = useStoredState("acheter_admin_security", initialSecurity);
  const [settings, setSettings] = useStoredState("acheter_admin_settings", initialSettings);
  const [logs, setLogs] = useStoredState("acheter_admin_logs", initialLogs);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("Prêt");

  const filteredUsers = useMemo(() => users.filter((user) => `${user.name} ${user.email} ${user.plan} ${user.status}`.toLowerCase().includes(search.toLowerCase())), [users, search]);
  const filteredContent = useMemo(() => contentItems.filter((item) => `${item.title} ${item.type} ${item.status} ${item.owner}`.toLowerCase().includes(search.toLowerCase())), [contentItems, search]);
  const filteredPayments = useMemo(() => payments.filter((payment) => `${payment.customer} ${payment.email} ${payment.invoiceNo} ${payment.status}`.toLowerCase().includes(search.toLowerCase())), [payments, search]);
  const filteredSignals = useMemo(() => signals.filter((signal) => `${signal.asset} ${signal.direction} ${signal.status} ${signal.risk}`.toLowerCase().includes(search.toLowerCase())), [signals, search]);
  const filteredTickets = useMemo(() => tickets.filter((ticket) => `${ticket.subject} ${ticket.user} ${ticket.status} ${ticket.priority}`.toLowerCase().includes(search.toLowerCase())), [tickets, search]);
  const activeTicket = tickets.find((ticket) => ticket.id === activeTicketId) || tickets[0];

  function log(action: string, severity: "success" | "warning" | "danger" = "success") {
    setLogs((current) => [{ action, actor: "admin@acheter-crypto.fr", time: "Maintenant", severity }, ...current].slice(0, 12));
    setNotice(action);
  }

  function openModal(mode: ModalMode, item?: AdminUser | ContentItem | PaymentItem | AdminSignal | Ticket | ReplyTemplate) {
    setModalMode(mode);
    setEditingId(item && "id" in item ? item.id : null);
    setDraft(item ? Object.fromEntries(Object.entries(item).map(([key, value]) => [key, Array.isArray(value) ? value.join("\n") : String(value)])) : {});
  }

  function closeModal() {
    setModalMode(null);
    setEditingId(null);
    setDraft({});
  }

  function updateDraft(key: string, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function saveUser() {
    const item: AdminUser = {
      id: editingId || newId("usr"),
      name: draft.name || "Nouvel utilisateur",
      email: draft.email || "invite@exemple.fr",
      plan: draft.plan || "Gratuit",
      role: draft.role || "Lead",
      status: draft.status || "Invité",
      joined: draft.joined || "Aujourd’hui",
      notes: draft.notes || ""
    };
    setUsers((current) => editingId ? current.map((user) => user.id === editingId ? item : user) : [item, ...current]);
    log(editingId ? "Utilisateur modifié" : "Invitation utilisateur créée");
    closeModal();
  }

  function saveContent() {
    const item: ContentItem = {
      id: editingId || newId("cnt"),
      title: draft.title || "Nouveau contenu",
      type: draft.type || "Formation",
      visibility: draft.visibility || "Premium",
      status: draft.status || "Brouillon",
      owner: draft.owner || "Équipe contenu",
      summary: draft.summary || ""
    };
    setContentItems((current) => editingId ? current.map((content) => content.id === editingId ? item : content) : [item, ...current]);
    log(editingId ? "Contenu modifié" : "Nouveau contenu créé");
    closeModal();
  }

  function savePayment() {
    const item: PaymentItem = {
      id: editingId || newId("pay"),
      customer: draft.customer || "Nouveau client",
      email: draft.email || "client@exemple.fr",
      amount: draft.amount || "19,99 €",
      plan: draft.plan || "1 mois",
      status: draft.status || "Brouillon",
      date: draft.date || "Aujourd’hui",
      dueDate: draft.dueDate || "À définir",
      invoiceNo: draft.invoiceNo || `FAC-2026-${String(payments.length + 1).padStart(3, "0")}`,
      note: draft.note || ""
    };
    setPayments((current) => editingId ? current.map((payment) => payment.id === editingId ? item : payment) : [item, ...current]);
    log(editingId ? "Facture modifiée" : "Facture créée");
    closeModal();
  }

  function saveSignal() {
    const item: AdminSignal = {
      id: editingId || newId("sig"),
      asset: draft.asset || "BTC",
      direction: draft.direction || "Long",
      entry: draft.entry || "66 800 €",
      target: draft.target || "70 900 €",
      stop: draft.stop || "64 950 €",
      risk: draft.risk || "Modéré",
      status: draft.status || "Actif",
      confidence: Number(draft.confidence || 70),
      rr: draft.rr || "2.0",
      horizon: draft.horizon || "Swing",
      update: "Maintenant",
      rationale: draft.rationale || "Signal ajouté depuis la console admin."
    };
    setSignals((current) => editingId ? current.map((signal) => signal.id === editingId ? item : signal) : [item, ...current]);
    log(editingId ? "Signal modifié" : "Signal publié");
    closeModal();
  }

  function saveTicket() {
    const item: Ticket = {
      id: editingId || newId("tic"),
      subject: draft.subject || "Nouveau ticket",
      user: draft.user || "Client",
      email: draft.email || "client@exemple.fr",
      priority: draft.priority || "Moyenne",
      status: draft.status || "Ouvert",
      messages: draft.messages ? draft.messages.split("\n").filter(Boolean) : ["Ticket ouvert depuis la console admin."]
    };
    setTickets((current) => editingId ? current.map((ticket) => ticket.id === editingId ? item : ticket) : [item, ...current]);
    setActiveTicketId(item.id);
    log(editingId ? "Ticket modifié" : "Ticket ouvert");
    closeModal();
  }

  function saveTemplate() {
    const item: ReplyTemplate = {
      id: editingId || newId("tpl"),
      title: draft.title || "Réponse type",
      text: draft.text || "Bonjour, merci pour votre message."
    };
    setTemplates((current) => editingId ? current.map((template) => template.id === editingId ? item : template) : [item, ...current]);
    log(editingId ? "Réponse type modifiée" : "Réponse type ajoutée");
    closeModal();
  }

  function deleteById<T extends { id: string }>(id: string, setter: (updater: (current: T[]) => T[]) => void, label: string) {
    setter((current) => current.filter((item) => item.id !== id));
    log(`${label} supprimé`, "warning");
  }

  function generateBestSignal() {
    const best = [...autoSignalCandidates].sort((a, b) => b.confidence - a.confidence)[0];
    const item: AdminSignal = { ...best, id: newId("sig"), status: "Actif", update: "Maintenant" };
    setSignals((current) => [item, ...current]);
    log(`Signal automatique ajouté via scan API simulé: ${item.asset} ${item.direction}`);
  }

  function closeSignal(id: string) {
    setSignals((current) => current.map((signal) => signal.id === id ? { ...signal, status: "Clôturé", update: "Maintenant" } : signal));
    log("Signal clôturé", "warning");
  }

  function replyToTicket() {
    if (!activeTicket || !reply.trim()) return;
    setTickets((current) => current.map((ticket) => ticket.id === activeTicket.id ? { ...ticket, status: "En cours", messages: [...ticket.messages, reply.trim()] } : ticket));
    setReply("");
    log("Réponse envoyée au ticket");
  }

  function updateTicketStatus(status: string) {
    if (!activeTicket) return;
    setTickets((current) => current.map((ticket) => ticket.id === activeTicket.id ? { ...ticket, status } : ticket));
    log(`Ticket passé en statut ${status}`);
  }

  function modalContent() {
    if (modalMode === "user") {
      return <div className="grid gap-4 md:grid-cols-2"><TextField label="Nom" value={draft.name || ""} onChange={(v) => updateDraft("name", v)} /><TextField label="Email" value={draft.email || ""} onChange={(v) => updateDraft("email", v)} /><SelectField label="Plan" value={draft.plan || "Gratuit"} onChange={(v) => updateDraft("plan", v)} options={["Gratuit", "1 mois", "6 mois", "12 mois"]} /><SelectField label="Rôle" value={draft.role || "Lead"} onChange={(v) => updateDraft("role", v)} options={["Lead", "Membre", "Premium", "Admin"]} /><SelectField label="Statut" value={draft.status || "Invité"} onChange={(v) => updateDraft("status", v)} options={["Invité", "Actif", "Suspendu", "À relancer", "Paiement échoué"]} /><TextField label="Arrivée" value={draft.joined || "Aujourd’hui"} onChange={(v) => updateDraft("joined", v)} /><div className="md:col-span-2"><TextAreaField label="Notes" value={draft.notes || ""} onChange={(v) => updateDraft("notes", v)} /></div><div className="md:col-span-2"><Button onClick={saveUser}><Save className="h-4 w-4" /> Enregistrer utilisateur</Button></div></div>;
    }
    if (modalMode === "content") {
      return <div className="grid gap-4 md:grid-cols-2"><TextField label="Titre" value={draft.title || ""} onChange={(v) => updateDraft("title", v)} /><SelectField label="Type" value={draft.type || "Formation"} onChange={(v) => updateDraft("type", v)} options={["Formation", "Analyse", "Signal", "Ressource", "Quiz"]} /><SelectField label="Accès" value={draft.visibility || "Premium"} onChange={(v) => updateDraft("visibility", v)} options={["Public", "Premium", "Privé"]} /><SelectField label="Statut" value={draft.status || "Brouillon"} onChange={(v) => updateDraft("status", v)} options={["Brouillon", "Publié", "Programmé", "Archivé", "Actif"]} /><TextField label="Auteur" value={draft.owner || ""} onChange={(v) => updateDraft("owner", v)} /><div className="md:col-span-2"><TextAreaField label="Résumé / contenu court" value={draft.summary || ""} onChange={(v) => updateDraft("summary", v)} /></div><div className="md:col-span-2"><Button onClick={saveContent}><Save className="h-4 w-4" /> Enregistrer contenu</Button></div></div>;
    }
    if (modalMode === "payment") {
      return <div className="grid gap-4 md:grid-cols-2"><TextField label="Client" value={draft.customer || ""} onChange={(v) => updateDraft("customer", v)} /><TextField label="Email" value={draft.email || ""} onChange={(v) => updateDraft("email", v)} /><TextField label="Montant" value={draft.amount || ""} onChange={(v) => updateDraft("amount", v)} /><SelectField label="Plan" value={draft.plan || "1 mois"} onChange={(v) => updateDraft("plan", v)} options={["Gratuit", "1 mois", "6 mois", "12 mois", "Entreprise"]} /><SelectField label="Statut" value={draft.status || "Brouillon"} onChange={(v) => updateDraft("status", v)} options={["Brouillon", "Payé", "Envoyé", "Échec", "Remboursé"]} /><TextField label="N° facture" value={draft.invoiceNo || ""} onChange={(v) => updateDraft("invoiceNo", v)} placeholder="Auto si vide" /><TextField label="Date" value={draft.date || "Aujourd’hui"} onChange={(v) => updateDraft("date", v)} /><TextField label="Échéance" value={draft.dueDate || ""} onChange={(v) => updateDraft("dueDate", v)} /><div className="md:col-span-2"><TextAreaField label="Note facture" value={draft.note || ""} onChange={(v) => updateDraft("note", v)} /></div><div className="md:col-span-2"><Button onClick={savePayment}><ReceiptText className="h-4 w-4" /> Créer / éditer facture</Button></div></div>;
    }
    if (modalMode === "signal") {
      return <div className="grid gap-4 md:grid-cols-3"><TextField label="Actif" value={draft.asset || "BTC"} onChange={(v) => updateDraft("asset", v)} /><SelectField label="Direction" value={draft.direction || "Long"} onChange={(v) => updateDraft("direction", v)} options={["Long", "Short"]} /><SelectField label="Statut" value={draft.status || "Actif"} onChange={(v) => updateDraft("status", v)} options={["Actif", "Surveillance", "Clôturé"]} /><TextField label="Entrée" value={draft.entry || ""} onChange={(v) => updateDraft("entry", v)} /><TextField label="Objectif" value={draft.target || ""} onChange={(v) => updateDraft("target", v)} /><TextField label="Stop" value={draft.stop || ""} onChange={(v) => updateDraft("stop", v)} /><SelectField label="Risque" value={draft.risk || "Modéré"} onChange={(v) => updateDraft("risk", v)} options={["Faible", "Modéré", "Élevé"]} /><TextField label="Confiance" value={draft.confidence || "70"} onChange={(v) => updateDraft("confidence", v)} /><TextField label="R/R" value={draft.rr || "2.0"} onChange={(v) => updateDraft("rr", v)} /><TextField label="Horizon" value={draft.horizon || "Swing"} onChange={(v) => updateDraft("horizon", v)} /><div className="md:col-span-3"><TextAreaField label="Justification" value={draft.rationale || ""} onChange={(v) => updateDraft("rationale", v)} /></div><div className="md:col-span-3"><Button onClick={saveSignal}><Signal className="h-4 w-4" /> Publier le signal</Button></div></div>;
    }
    if (modalMode === "ticket") {
      return <div className="grid gap-4 md:grid-cols-2"><TextField label="Sujet" value={draft.subject || ""} onChange={(v) => updateDraft("subject", v)} /><TextField label="Utilisateur" value={draft.user || ""} onChange={(v) => updateDraft("user", v)} /><TextField label="Email" value={draft.email || ""} onChange={(v) => updateDraft("email", v)} /><SelectField label="Priorité" value={draft.priority || "Moyenne"} onChange={(v) => updateDraft("priority", v)} options={["Basse", "Moyenne", "Haute"]} /><SelectField label="Statut" value={draft.status || "Ouvert"} onChange={(v) => updateDraft("status", v)} options={["Ouvert", "En cours", "En attente", "Résolu"]} /><div className="md:col-span-2"><TextAreaField label="Messages" value={draft.messages || ""} onChange={(v) => updateDraft("messages", v)} /></div><div className="md:col-span-2"><Button onClick={saveTicket}><MessageSquare className="h-4 w-4" /> Enregistrer ticket</Button></div></div>;
    }
    if (modalMode === "template") {
      return <div className="grid gap-4"><TextField label="Titre" value={draft.title || ""} onChange={(v) => updateDraft("title", v)} /><TextAreaField label="Réponse" value={draft.text || ""} onChange={(v) => updateDraft("text", v)} /><Button onClick={saveTemplate}><Save className="h-4 w-4" /> Enregistrer réponse type</Button></div>;
    }
    return null;
  }

  const content = () => {
    if (tab === "users") return (
      <>
        <Toolbar title="Gestion utilisateurs" description="Inviter, éditer, suspendre, supprimer et relancer les comptes membres." action="Inviter" search={search} setSearch={setSearch} onAction={() => openModal("user")} />
        <AdminTable columns={["Utilisateur", "Plan", "Rôle", "Statut", "Arrivée", "Actions"]} rows={filteredUsers} renderRow={(user) => (
          <div key={user.id} className="grid gap-4 px-5 py-5 text-sm md:grid-cols-6 md:items-center">
            <div><p className="font-semibold">{user.name}</p><p className="text-xs text-muted">{user.email}</p></div>
            <div>{user.plan}</div>
            <div><Badge tone="premium">{user.role}</Badge></div>
            <div><Badge tone={user.status === "Actif" ? "success" : user.status === "Paiement échoué" || user.status === "Suspendu" ? "danger" : "warning"}>{user.status}</Badge></div>
            <div>{user.joined}</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="light" className="px-3 py-2" onClick={() => openModal("user", user)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="light" className="px-3 py-2" onClick={() => { setUsers((current) => current.map((item) => item.id === user.id ? { ...item, status: item.status === "Suspendu" ? "Actif" : "Suspendu" } : item)); log("Statut utilisateur mis à jour"); }}><Lock className="h-4 w-4" /></Button>
              <Button variant="light" className="px-3 py-2" onClick={() => deleteById<AdminUser>(user.id, setUsers, "Utilisateur")}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        )} />
      </>
    );

    if (tab === "content") return (
      <>
        <Toolbar title="Gestion contenus" description="Ajouter, modifier, publier, archiver ou supprimer formations, analyses, quiz et ressources." action="Nouveau contenu" search={search} setSearch={setSearch} onAction={() => openModal("content")} />
        <AdminTable columns={["Titre", "Type", "Accès", "Statut", "Auteur", "Actions"]} rows={filteredContent} renderRow={(item) => (
          <div key={item.id} className="grid gap-4 px-5 py-5 text-sm md:grid-cols-6 md:items-center">
            <div><p className="font-semibold">{item.title}</p><p className="text-xs text-muted">{item.summary}</p></div>
            <div>{item.type}</div>
            <div><Badge tone={item.visibility === "Premium" ? "premium" : "success"}>{item.visibility}</Badge></div>
            <div><Badge tone={item.status === "Publié" || item.status === "Actif" ? "success" : item.status === "Brouillon" ? "neutral" : "warning"}>{item.status}</Badge></div>
            <div>{item.owner}</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="light" className="px-3 py-2" onClick={() => openModal("content", item)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="light" className="px-3 py-2" onClick={() => { setContentItems((current) => current.map((content) => content.id === item.id ? { ...content, status: content.status === "Publié" ? "Archivé" : "Publié" } : content)); log("Statut contenu modifié"); }}><CheckCircle2 className="h-4 w-4" /></Button>
              <Button variant="light" className="px-3 py-2" onClick={() => deleteById<ContentItem>(item.id, setContentItems, "Contenu")}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        )} />
      </>
    );

    if (tab === "payments") return (
      <>
        <Toolbar title="Paiements & abonnements" description="Créer une facture, éditer son statut, marquer comme payé, rembourser ou renvoyer au client." action="Créer facture" search={search} setSearch={setSearch} onAction={() => openModal("payment")} />
        <AdminTable columns={["Client", "Facture", "Montant", "Statut", "Échéance", "Actions"]} rows={filteredPayments} renderRow={(payment) => (
          <div key={payment.id} className="grid gap-4 px-5 py-5 text-sm md:grid-cols-6 md:items-center">
            <div><p className="font-semibold">{payment.customer}</p><p className="text-xs text-muted">{payment.email}</p></div>
            <div><p className="font-semibold">{payment.invoiceNo}</p><p className="text-xs text-muted">{payment.plan}</p></div>
            <div>{payment.amount}</div>
            <div><Badge tone={payment.status === "Payé" ? "success" : payment.status === "Échec" ? "danger" : "warning"}>{payment.status}</Badge></div>
            <div>{payment.dueDate}</div>
            <div className="flex flex-wrap gap-2">
              <Button variant="light" className="px-3 py-2" onClick={() => openModal("payment", payment)}><Edit3 className="h-4 w-4" /></Button>
              <Button variant="light" className="px-3 py-2" onClick={() => { setPayments((current) => current.map((item) => item.id === payment.id ? { ...item, status: "Payé" } : item)); log("Facture marquée payée"); }}><Check className="h-4 w-4" /></Button>
              <Button variant="light" className="px-3 py-2" onClick={() => { setPayments((current) => current.map((item) => item.id === payment.id ? { ...item, status: "Remboursé" } : item)); log("Facture remboursée", "warning"); }}><RefreshCcw className="h-4 w-4" /></Button>
            </div>
          </div>
        )} />
      </>
    );

    if (tab === "signals") return (
      <>
        <Toolbar title="Gestion signaux" description="Ajouter automatiquement les meilleurs signaux, modifier les niveaux, clôturer et archiver." action="Nouveau signal" search={search} setSearch={setSearch} onAction={() => openModal("signal")} />
        <div className="mb-5 flex flex-wrap gap-3 rounded-lg border border-line bg-white/90 p-4">
          <Button onClick={generateBestSignal}><Sparkles className="h-4 w-4" /> Scanner API & ajouter meilleur signal</Button>
          <Button variant="light" onClick={() => { setSignals((current) => current.map((signal) => signal.status === "Surveillance" ? { ...signal, status: "Actif" } : signal)); log("Signaux en surveillance activés"); }}><Signal className="h-4 w-4" /> Activer surveillances</Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredSignals.map((signal) => (
            <Card key={signal.id}>
              <div className="flex items-center justify-between"><Badge tone="premium">{signal.asset}</Badge><Badge tone={signal.status === "Actif" ? "success" : signal.status === "Clôturé" ? "neutral" : "warning"}>{signal.status}</Badge></div>
              <h3 className="mt-5 text-2xl font-semibold">{signal.direction} · {signal.asset}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{signal.rationale}</p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-sm"><div className="rounded-lg bg-cream p-3">Entrée<br/><strong>{signal.entry}</strong></div><div className="rounded-lg bg-cream p-3">Objectif<br/><strong>{signal.target}</strong></div><div className="rounded-lg bg-cream p-3">Stop<br/><strong>{signal.stop}</strong></div></div>
              <div className="mt-5 flex flex-wrap gap-2"><Button variant="light" onClick={() => openModal("signal", signal)}><Edit3 className="h-4 w-4" /> Modifier</Button><Button variant="light" onClick={() => closeSignal(signal.id)}>Clôturer</Button><Button variant="light" onClick={() => deleteById<AdminSignal>(signal.id, setSignals, "Signal")}><Trash2 className="h-4 w-4" /></Button></div>
            </Card>
          ))}
        </div>
      </>
    );

    if (tab === "support") return (
      <>
        <Toolbar title="Support client" description="Ouvrir un ticket, répondre, appliquer une réponse type et changer le statut." action="Ouvrir ticket" search={search} setSearch={setSearch} onAction={() => openModal("ticket")} />
        <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-3">
            {filteredTickets.map((ticket) => <button key={ticket.id} onClick={() => setActiveTicketId(ticket.id)} className={cn("rounded-lg border p-4 text-left transition", activeTicket?.id === ticket.id ? "border-ink bg-white shadow-premium" : "border-line bg-white/80 hover:bg-white")}><div className="flex items-center justify-between"><Badge tone={ticket.priority === "Haute" ? "danger" : ticket.priority === "Moyenne" ? "warning" : "success"}>{ticket.priority}</Badge><Badge>{ticket.status}</Badge></div><p className="mt-3 font-semibold">{ticket.subject}</p><p className="mt-1 text-sm text-muted">{ticket.user} · {ticket.email}</p></button>)}
          </div>
          <Card hover={false}>
            {activeTicket ? <>
              <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-2xl font-semibold">{activeTicket.subject}</h3><p className="text-sm text-muted">{activeTicket.user} · {activeTicket.email}</p></div><div className="flex gap-2"><Button variant="light" onClick={() => openModal("ticket", activeTicket)}><Edit3 className="h-4 w-4" /> Éditer</Button><Button variant="light" onClick={() => updateTicketStatus("Résolu")}><Check className="h-4 w-4" /> Résolu</Button></div></div>
              <div className="mt-5 grid gap-3">{activeTicket.messages.map((message, index) => <div key={`${activeTicket.id}-${index}`} className="rounded-lg border border-line bg-cream p-4 text-sm leading-6">{message}</div>)}</div>
              <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]"><textarea value={reply} onChange={(event) => setReply(event.target.value)} rows={4} placeholder="Répondre au ticket..." className={fieldClass()} /><div className="grid gap-2">{templates.map((template) => <button key={template.id} onClick={() => setReply(template.text)} className="rounded-lg border border-line px-3 py-2 text-left text-xs font-semibold hover:bg-cream">{template.title}</button>)}</div></div>
              <div className="mt-4 flex flex-wrap gap-2"><Button onClick={replyToTicket}><Reply className="h-4 w-4" /> Répondre</Button><Button variant="light" onClick={() => updateTicketStatus("En attente")}>Mettre en attente</Button><Button variant="light" onClick={() => openModal("template")}><Plus className="h-4 w-4" /> Réponse type</Button></div>
            </> : <p className="text-sm text-muted">Sélectionnez un ticket.</p>}
          </Card>
        </div>
      </>
    );

    if (tab === "security") return (
      <>
        <Toolbar title="Sécurité & accès" description="Gérer les protections, confirmations, logs et contrôles sensibles." action={undefined} search={search} setSearch={setSearch} />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card hover={false}><h3 className="text-2xl font-semibold">Checklist production</h3><div className="mt-6 grid gap-3">{security.map((flag) => <ToggleRow key={flag.id} label={flag.label} description={flag.description} checked={flag.enabled} onChange={() => { setSecurity((current) => current.map((item) => item.id === flag.id ? { ...item, enabled: !item.enabled } : item)); log(`Sécurité mise à jour: ${flag.label}`); }} />)}</div></Card>
          <Card hover={false}><h3 className="text-2xl font-semibold">Journal sécurité</h3><div className="mt-6 grid gap-3">{logs.map((entry, index) => <div key={`${entry.action}-${index}`} className="rounded-lg border border-line bg-white p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">{entry.action}</p><Badge tone={entry.severity as "success" | "warning" | "danger"}>{entry.severity}</Badge></div><p className="mt-2 text-xs text-muted">{entry.actor} · {entry.time}</p></div>)}</div></Card>
        </div>
      </>
    );

    if (tab === "settings") return (
      <>
        <Toolbar title="Réglages plateforme" description="Modifier branding, SEO, emails, maintenance, inscriptions et conformité." action={undefined} search={search} setSearch={setSearch} />
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Card hover={false}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Nom du site" value={settings.siteName} onChange={(value) => setSettings((current) => ({ ...current, siteName: value }))} />
              <TextField label="Email support" value={settings.supportEmail} onChange={(value) => setSettings((current) => ({ ...current, supportEmail: value }))} />
              <TextField label="Devise" value={settings.defaultCurrency} onChange={(value) => setSettings((current) => ({ ...current, defaultCurrency: value }))} />
              <TextField label="Titre SEO" value={settings.seoTitle} onChange={(value) => setSettings((current) => ({ ...current, seoTitle: value }))} />
            </div>
            <div className="mt-5 grid gap-3">
              <ToggleRow label="Mode maintenance" description="Masquer temporairement les inscriptions publiques." checked={settings.maintenance} onChange={() => setSettings((current) => ({ ...current, maintenance: !current.maintenance }))} />
              <ToggleRow label="Inscriptions ouvertes" description="Autoriser les nouveaux comptes depuis le site public." checked={settings.signupsOpen} onChange={() => setSettings((current) => ({ ...current, signupsOpen: !current.signupsOpen }))} />
              <ToggleRow label="Emails d’alerte" description="Recevoir les alertes paiement, support et sécurité." checked={settings.alertEmail} onChange={() => setSettings((current) => ({ ...current, alertEmail: !current.alertEmail }))} />
              <ToggleRow label="Bannière cookies" description="Afficher le consentement cookies." checked={settings.cookieBanner} onChange={() => setSettings((current) => ({ ...current, cookieBanner: !current.cookieBanner }))} />
            </div>
            <Button className="mt-5" onClick={() => log("Réglages du site sauvegardés")}><Save className="h-4 w-4" /> Sauvegarder réglages</Button>
          </Card>
          <div className="grid gap-5">{[{ icon: Globe2, title: "SEO & pages", text: settings.seoTitle }, { icon: Bell, title: "Notifications", text: settings.alertEmail ? "Alertes email actives" : "Alertes email coupées" }, { icon: Settings, title: "Configuration", text: settings.maintenance ? "Maintenance active" : "Site public actif" }].map((item) => <Card key={item.title}><item.icon className="h-6 w-6 text-gold" /><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{item.text}</p></Card>)}</div>
        </div>
      </>
    );

    return (
      <>
        <div className="mb-5 grid gap-5 lg:grid-cols-4">{adminStats.map((stat) => <Card key={stat.label}><stat.icon className="h-5 w-5 text-gold" /><p className="mt-5 text-sm text-muted">{stat.label}</p><p className="mt-1 text-3xl font-semibold">{stat.value}</p></Card>)}</div>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card><div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-semibold">Revenus & conversion</h2><Badge tone="success">Temps réel</Badge></div><MiniChart className="h-72 w-full" /></Card>
          <Card><h2 className="text-2xl font-semibold">Actions rapides</h2><div className="mt-6 grid gap-3">{[
            ["Créer une formation", "content"], ["Publier une analyse", "content"], ["Inviter un utilisateur", "users"], ["Créer une facture", "payments"], ["Envoyer un signal", "signals"], ["Ouvrir le support", "support"]
          ].map(([label, target]) => <button key={label} onClick={() => setTab(target as TabId)} className="flex items-center justify-between rounded-lg border border-line bg-cream p-4 text-left text-sm font-semibold transition hover:bg-white">{label}<ArrowRight className="h-4 w-4 text-muted" /></button>)}</div></Card>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">{[
          { icon: Activity, title: "Santé système", text: "API, Supabase, Stripe et webhooks surveillés depuis les logs." },
          { icon: AlertTriangle, title: "Risques", text: `${payments.filter((payment) => payment.status === "Échec").length} paiement(s) échoué(s), ${tickets.filter((ticket) => ticket.status !== "Résolu").length} ticket(s) actifs.` },
          { icon: Database, title: "Base de données", text: "Les actions admin sont persistées localement dans cette session navigateur." }
        ].map((item) => <Card key={item.title}><item.icon className="h-6 w-6 text-gold" /><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{item.text}</p></Card>)}</div>
      </>
    );
  };

  return (
    <main className="relative page-section">
      <TradingBarsBackground className="opacity-35" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><Badge tone="premium" icon={ShieldCheck}>Back-office · /admin</Badge><h1 className="mt-5 text-4xl font-semibold md:text-6xl">Système admin opérationnel</h1><p className="mt-4 max-w-3xl leading-8 text-muted">Gestion utilisateurs, contenus, paiements, signaux, support, sécurité et réglages avec actions directement utilisables dans l’interface.</p></div>
          <div className="flex flex-wrap gap-2"><Button onClick={() => setCommandOpen((value) => !value)} variant="dark"><Command className="h-4 w-4" /> Commandes</Button><Button href="/admin/logout" variant="light"><ShieldCheck className="h-4 w-4" /> Déconnexion admin</Button></div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-line bg-white/90 px-4 py-3 text-sm shadow-sm">
          <span className="text-muted">Dernière action: <strong className="text-ink">{notice}</strong></span>
          <Button variant="light" className="px-3 py-2" onClick={() => { storageKeys.forEach((key) => window.localStorage.removeItem(key)); window.location.reload(); }}><RefreshCcw className="h-4 w-4" /> Réinitialiser</Button>
        </div>

        {commandOpen ? <div className="mb-5 rounded-lg border border-line bg-white p-4 shadow-hero"><div className="mb-4 flex items-center justify-between"><p className="font-semibold">Command palette</p><Badge tone="premium">Actions rapides</Badge></div><div className="grid gap-2 md:grid-cols-4">{adminTabs.slice(1).map((item) => <button key={item.id} onClick={() => { setTab(item.id); setCommandOpen(false); }} className="flex items-center gap-3 rounded-lg border border-line bg-cream p-4 text-left text-sm font-semibold transition hover:bg-white"><item.icon className="h-4 w-4 text-gold" /> Ouvrir {item.label}</button>)}</div></div> : null}

        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-lg border border-line bg-white/90 p-3 shadow-premium backdrop-blur lg:sticky lg:top-24">{adminTabs.map((item) => <button key={item.id} onClick={() => setTab(item.id)} className={cn("mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition", tab === item.id ? "bg-blue text-white" : "text-muted hover:bg-cream hover:text-ink")}><item.icon className="h-4 w-4" />{item.label}</button>)}</aside>
          <section>{content()}</section>
        </div>
      </div>
      {modalMode ? <Modal title={editingId ? "Modifier" : "Créer"} onClose={closeModal}>{modalContent()}</Modal> : null}
    </main>
  );
}
