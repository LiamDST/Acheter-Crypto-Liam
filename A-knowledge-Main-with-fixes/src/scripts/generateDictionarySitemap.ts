import 'dotenv/config';
import { supabase } from '../lib/supabaseClient';
import fs from 'fs';
import path from 'path';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Génère un sitemap spécifique pour le dictionnaire crypto
 */
async function generateDictionarySitemap() {
  try {
    console.log('🚀 Génération du sitemap du dictionnaire...');

    const today = new Date().toISOString();
    
    // Récupérer tous les termes du dictionnaire
    const { data: terms, error } = await supabase
      .from('dictionary_terms')
      .select('slug')
      .order('term');

    if (error) {
      console.error(`Erreur lors de la récupération des termes: ${error.message}`);
    }

    const termList = terms ?? [];

    if (termList.length === 0) {
      console.warn('⚠️ Aucun terme trouvé dans le dictionnaire');
    } else {
      console.log(`📚 ${termList.length} termes trouvés dans le dictionnaire`);
    }
    
    // Créer les entrées du sitemap
    const entries: SitemapEntry[] = [
      // Page principale du dictionnaire
      {
        loc: 'https://alyah-knowledge.com/dictionnaire-crypto',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.8
      },
      // Pages de définition individuelles
      ...termList.map(term => ({
        loc: `https://alyah-knowledge.com/dictionnaire-crypto/${term.slug}`,
        lastmod: today,
        changefreq: 'monthly' as const,
        priority: 0.7
      }))
    ];
    
    // Générer le XML du sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Écrire le fichier sitemap
    const outputPath = path.join(process.cwd(), 'public', 'sitemap-dictionnaire.xml');
    fs.writeFileSync(outputPath, sitemap);
    
    console.log(`✅ Sitemap du dictionnaire généré avec succès !`);
    console.log(`📍 Fichier: ${outputPath}`);
      console.log(`📊 ${entries.length} URLs incluses (1 page principale + ${termList.length} définitions)`);
    
    // Mettre à jour le sitemap principal pour inclure le sitemap du dictionnaire
    await updateMainSitemap();
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération du sitemap du dictionnaire:', error);
    throw error;
  }
}

/**
 * Met à jour le sitemap principal pour inclure le sitemap du dictionnaire
 */
async function updateMainSitemap() {
  try {
    const mainSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    // Vérifier si le sitemap principal existe
    if (!fs.existsSync(mainSitemapPath)) {
      console.warn('⚠️ Sitemap principal non trouvé, création d\'un nouveau sitemap');
    }
    
    // Lire le sitemap principal existant
    let mainSitemapContent = '';
    if (fs.existsSync(mainSitemapPath)) {
      mainSitemapContent = fs.readFileSync(mainSitemapPath, 'utf-8');
    }
    
    // Vérifier si le sitemap du dictionnaire est déjà référencé
    const dictionarySitemapUrl = 'https://alyah-knowledge.com/sitemap-dictionnaire.xml';
    
    if (!mainSitemapContent.includes('sitemap-dictionnaire.xml')) {
      // Ajouter la référence au sitemap du dictionnaire dans le sitemap principal
      const sitemapIndexEntry = `  <url>
    <loc>${dictionarySitemapUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      
      if (mainSitemapContent.includes('</urlset>')) {
        // Insérer avant la balise de fermeture
        mainSitemapContent = mainSitemapContent.replace(
          '</urlset>',
          `${sitemapIndexEntry}\n</urlset>`
        );
      } else {
        // Créer un nouveau sitemap principal
        mainSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://alyah-knowledge.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${sitemapIndexEntry}
</urlset>`;
      }
      
      fs.writeFileSync(mainSitemapPath, mainSitemapContent);
      console.log('✅ Sitemap principal mis à jour avec la référence au dictionnaire');
    } else {
      console.log('ℹ️ Le sitemap du dictionnaire est déjà référencé dans le sitemap principal');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du sitemap principal:', error);
  }
}

/**
 * Fonction utilitaire pour régénérer le sitemap du dictionnaire
 * Peut être appelée lors de l'ajout/suppression de termes
 */
export async function regenerateDictionarySitemap() {
  await generateDictionarySitemap();
}

// Exécuter la génération
generateDictionarySitemap().catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});

export default generateDictionarySitemap;