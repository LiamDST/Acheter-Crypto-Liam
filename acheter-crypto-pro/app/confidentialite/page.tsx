import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function ConfidentialitePage() {
  return (
    <LegalPageTemplate
      title="Politique de confidentialité"
      updatedAt="29 mai 2026"
      intro="Nous utilisons vos données uniquement pour faire fonctionner votre compte, améliorer votre expérience et sécuriser la plateforme."
      sections={[
        {
          id: "donnees",
          title: "Données collectées",
          content: "Nous collectons les données nécessaires à l’authentification, à la facturation et au support membre."
        },
        {
          id: "usage",
          title: "Utilisation",
          content: "Les données servent à fournir les services demandés et à protéger les accès contre les usages non autorisés."
        },
        {
          id: "droits",
          title: "Vos droits",
          content: "Vous pouvez demander l’accès, la correction ou la suppression de vos données personnelles selon la réglementation applicable."
        }
      ]}
    />
  );
}
