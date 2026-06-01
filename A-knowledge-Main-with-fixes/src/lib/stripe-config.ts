// Stripe product configuration
export const stripeProducts = {
  formationSeule: {
    name: 'Formation seule',
    id: 'prod_SavGReJR8HcXOG',
    priceId: 'price_1RfjPXHzOQ9ME26O88bnLWy3', 
    description: 'Accès complet à la formation crypto (modules vidéos, PDF), accès à la communauté, support email standard.',
    mode: 'subscription'
  },
  formationEtSignaux: {
    name: 'Formation + Signaux',
    id: 'prod_SavHunpql391t7',
    priceId: 'price_1RfjROHzOQ9ME26OJkNXTTzM',
    description: 'Tout ce qui est inclus dans le plan formation, plus accès aux signaux de trading sur toutes les cryptos disponibles sur Alyah-Knowledge.',
    mode: 'subscription'
  }
};

// Helper function to get product by plan type
export function getProductByPlan(plan: string) {
  switch (plan) {
    case 'formation':
    case 'formationSeule':
      return stripeProducts.formationSeule;
    case 'formationSignaux':
    case 'formationEtSignaux':
      return stripeProducts.formationEtSignaux;
    default:
      return stripeProducts.formationSeule;
  }
}