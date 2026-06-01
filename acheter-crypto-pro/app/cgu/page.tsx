import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function CguPage() {
  return (
    <LegalPageTemplate
      title="Conditions générales d’utilisation"
      updatedAt="29 mai 2026"
      intro="Ces règles définissent le cadre d’accès et d’utilisation de la plateforme."
      sections={[
        {
          id: "acces",
          title: "Accès au service",
          content: "L’accès membre dépend du statut du compte et, le cas échéant, de l’abonnement actif."
        },
        {
          id: "usage",
          title: "Usage autorisé",
          content: "Le service doit être utilisé de manière légale, personnelle et responsable."
        },
        {
          id: "risque",
          title: "Avertissement risque",
          content: "Les contenus de marché sont éducatifs et informatifs. Ils ne constituent pas une garantie de résultat."
        }
      ]}
    />
  );
}
