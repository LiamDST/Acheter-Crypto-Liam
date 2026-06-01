/**
 * Utilitaires de validation pour les slugs et URLs
 */

/**
 * Valide un slug (URL-friendly string)
 * @param slug - Le slug à valider
 * @returns true si le slug est valide
 */
export const isValidSlug = (slug: string): boolean => {
  if (!slug || typeof slug !== 'string') return false;
  
  // Regex pour slug valide : lettres minuscules, chiffres, tirets uniquement
  // Longueur entre 1 et 100 caractères
  const slugRegex = /^[a-z0-9-]+$/;
  
  return slugRegex.test(slug) && 
         slug.length >= 1 && 
         slug.length <= 100 &&
         !slug.startsWith('-') &&
         !slug.endsWith('-') &&
         !slug.includes('--');
};

/**
 * Nettoie un slug des caractères non autorisés
 * @param input - La chaîne d'entrée
 * @returns Le slug nettoyé
 */
export const sanitizeSlug = (input: string): string => {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Valide une URL d'article ou de terme de dictionnaire
 * @param path - Le chemin de l'URL
 * @returns true si le chemin est valide
 */
export const isValidPath = (path: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  
  // Chemins autorisés
  const validPaths = [
    /^\/dictionnaire-crypto\/[a-z0-9-]+$/,
    /^\/articles\/[a-z0-9-]+$/,
    /^\/formation\/[a-z0-9-\/]+$/
  ];
  
  return validPaths.some(regex => regex.test(path));
};

/**
 * Détecte si une erreur Supabase indique un enregistrement non trouvé
 * @param error - L'erreur Supabase
 * @returns true si c'est une erreur 404
 */
export const isNotFoundError = (error: any): boolean => {
  if (!error) return false;
  
  return error.code === 'PGRST116' || 
         (error.message && error.message.includes('not found')) ||
         (error.details && error.details.includes('0 rows'));
};