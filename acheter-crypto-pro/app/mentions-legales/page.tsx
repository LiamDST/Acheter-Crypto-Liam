import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function MentionsLegalesPage() {
  return (
    <LegalPageTemplate
      title="Mentions légales"
      updatedAt="29 mai 2026"
      intro="Ces informations présentent l’éditeur du site et le cadre d’utilisation général."
      sections={[
        {
          id: "editeur",
          title: "Éditeur",
          content: "Le site Acheter des crypto est édité par son propriétaire. Les coordonnées complètes peuvent être communiquées sur demande légitime."
        },
        {
          id: "hebergement",
          title: "Hébergement",
          content: "Le site est hébergé sur une infrastructure cloud sécurisée, avec surveillance et mises à jour régulières."
        },
        {
          id: "responsabilite",
          title: "Responsabilité",
          content: "Les contenus sont fournis à titre informatif. Aucune promesse de performance financière n’est faite."
        }
      ]}
    />
  );
}
