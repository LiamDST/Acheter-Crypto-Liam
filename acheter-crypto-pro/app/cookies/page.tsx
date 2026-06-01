import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate";

export default function CookiesPage() {
  return (
    <LegalPageTemplate
      title="Politique cookies"
      updatedAt="29 mai 2026"
      intro="Les cookies sont utilisés pour faire fonctionner le site et améliorer la navigation."
      sections={[
        {
          id: "types",
          title: "Types de cookies",
          content: "Nous utilisons des cookies techniques essentiels, et des cookies de mesure d’audience lorsque cela est activé."
        },
        {
          id: "gestion",
          title: "Gestion",
          content: "Vous pouvez gérer vos préférences depuis votre navigateur ou via le bandeau de consentement lorsqu’il est affiché."
        },
        {
          id: "duree",
          title: "Durée de conservation",
          content: "La durée de conservation varie selon la finalité. Les cookies non essentiels restent limités dans le temps."
        }
      ]}
    />
  );
}
