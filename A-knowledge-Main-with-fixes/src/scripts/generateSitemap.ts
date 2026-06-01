import 'dotenv/config';
import { generateSitemap } from '../lib/sitemapGenerator';
import { supabase } from '../lib/supabaseClient';
import { siteConfig } from '../config/siteConfig';

// Fonction pour récupérer les termes du dictionnaire depuis Supabase
async function fetchDictionaryTerms() {
  try {
    const { data, error } = await supabase
      .from('dictionary_terms')
      .select('slug');
    
    if (error) {
      console.error('Erreur lors de la récupération des termes du dictionnaire:', error);
      return [];
    }
    
    return data.map(term => term.slug);
  } catch (error) {
    console.error('Erreur lors de la récupération des termes du dictionnaire:', error);
    return [];
  }
}

// Fonction pour récupérer les articles depuis Supabase
async function fetchArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('slug');
    
    if (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      return [];
    }
    
    return data.map(article => article.slug);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }
}

async function generateDynamicSitemap() {
  const today = new Date().toISOString();

  const staticRoutes = Object.values(siteConfig.pages)
    .filter(page => page.canonical && !page.noindex)
    .map(page => ({
      path: new URL(page.canonical).pathname,
      priority: 0.7,
      changefreq: 'weekly',
      lastmod: today
    }));

  // Récupérer les termes du dictionnaire
  const dictionaryTerms = await fetchDictionaryTerms();
  const dictionaryRoutes = dictionaryTerms.map(slug => ({
    path: `/dictionnaire-crypto/${slug}`,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: today
  }));

  // Récupérer les articles
  const articles = await fetchArticles();
  const articleRoutes = articles.map(slug => ({
    path: `/articles/${slug}`,
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: today
  }));

  // Combiner toutes les routes
  const allRoutes = [...staticRoutes, ...dictionaryRoutes, ...articleRoutes].map(route => ({
    ...route,
    lastmod: route.lastmod || today
  }));

  // Configuration pour le sitemap
  const sitemapConfig = {
    baseUrl: 'https://alyah-knowledge.com',
    outputPath: 'public/sitemap.xml',
    routes: allRoutes
  };

  // Générer le sitemap
  generateSitemap(sitemapConfig);
  console.log(
    `Sitemap généré avec ${allRoutes.length} URLs, dont ${dictionaryRoutes.length} termes du dictionnaire et ${articleRoutes.length} articles.`
  );
}

// Generate the sitemap
generateDynamicSitemap().catch(error => {
  console.error('Erreur lors de la génération du sitemap:', error);
});