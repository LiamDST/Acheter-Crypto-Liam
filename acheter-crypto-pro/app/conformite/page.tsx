import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function ConformitePage() {
  return (
    <LegalPageTemplate
      title="Conformité"
      updatedAt="29 mai 2026"
      intro="La conformité est traitée de façon visible pour protéger les membres et maintenir un cadre professionnel."
      sections={[
        {
          id: "securite",
          title: "Sécurité",
          content: "Les accès membres sont protégés, les sessions sont contrôlées et les paiements passent par Stripe."
        },
        {
          id: "donnees",
          title: "Protection des données",
          content: "Les données sont limitées au nécessaire et traitées selon les principes de confidentialité et de minimisation."
        },
        {
          id: "transparence",
          title: "Transparence",
          content: "Les informations importantes (paiement, annulation, risques) sont présentées clairement avant chaque action."
        }
      ]}
    />
  );
}
