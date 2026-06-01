import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { Article } from '../types/article';
import SEOHead from '../components/SEOHead';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 9;

// Fonction pour calculer le temps de lecture
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function Articles() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, [currentPage, searchQuery]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (searchQuery) {
        if (currentLang === 'en') {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,title_en.ilike.%${searchQuery}%,content_en.ilike.%${searchQuery}%`);
        } else {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }
      }

      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;
      query = query.range(start, end);

      const { data: articles, error: fetchError, count } = await query;

      if (fetchError) {
        throw fetchError;
      }

      if (articles) {
        setArticles(articles);
        if (count) {
          setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(currentLang === 'en' 
        ? 'An error occurred while loading articles. Please try again later.'
        : 'Une erreur est survenue lors du chargement des articles. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const locale = currentLang === 'en' ? 'en-US' : 'fr-FR';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentLang === 'en' ? 'Articles' : 'Articles'}
            </h1>
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-red-600">{error}</p>
              <button
                onClick={fetchArticles}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {currentLang === 'en' ? 'All' : 'Tous'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead />
      
      <Helmet>
        {/* Schema pour la liste d'articles */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: currentLang === 'en' ? 'Alyah Knowledge Blog' : 'Blog Alyah Knowledge',
            description: currentLang === 'en' 
              ? 'Articles about cryptocurrencies, blockchain and trading'
              : 'Articles sur les cryptomonnaies, la blockchain et le trading',
            url: `https://alyah-knowledge.com/${currentLang}/articles`,
            publisher: {
              '@type': 'Organization',
              name: 'Alyah Knowledge',
              url: 'https://alyah-knowledge.com'
            },
            inLanguage: currentLang === 'en' ? 'en-US' : 'fr-FR',
            blogPost: articles.map(article => ({
              '@type': 'BlogPosting',
              headline: currentLang === 'en' && article.title_en ? article.title_en : article.title,
              description: currentLang === 'en' && article.summary_en ? article.summary_en : article.summary,
              url: `https://alyah-knowledge.com/${currentLang}/articles/${article.slug}`,
              datePublished: article.created_at,
              dateModified: article.updated_at,
              image: article.image_url,
              author: {
                '@type': 'Person',
                name: 'Alyah Knowledge'
              }
            }))
          })}
        </script>
        
        {/* Meta tags additionnels pour le SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Alyah Knowledge" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AlyahKnowledge" />
        
        {/* Hreflang pour le français */}
        <link rel="alternate" hrefLang="fr" href="https://alyah-knowledge.com/fr/articles" />
        <link rel="alternate" hrefLang="en" href="https://alyah-knowledge.com/en/articles" />
        <link rel="alternate" hrefLang="x-default" href="https://alyah-knowledge.com/fr/articles" />
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80" />
        
        {/* Enhanced social sharing meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Articles crypto et blockchain par Alyah Knowledge" />
        <meta name="twitter:image:alt" content="Articles crypto et blockchain par Alyah Knowledge" />
      </Helmet>
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentLang === 'en' ? 'Articles' : 'Articles'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLang === 'en' 
                ? 'Discover our latest articles on cryptocurrencies, blockchain and market trends'
                : 'Découvrez nos derniers articles sur les cryptomonnaies, la blockchain et les tendances du marché'}
            </p>
          </div>

          <div className="mb-12">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'en' ? 'Search for an article...' : 'Rechercher un article...'}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                  transition-all duration-200"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-2xl" />
                  <div className="bg-white p-6 rounded-b-2xl border border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    {currentLang === 'en' ? 'No articles found.' : 'Aucun article trouvé.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/${currentLang}/articles/${article.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 
                        transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={`${currentLang === 'en' && article.title_en ? article.title_en : article.title} - ${currentLang === 'en' ? 'Crypto article by Alyah Knowledge' : 'Article crypto par Alyah Knowledge'}`}
                          className="w-full h-full object-cover transform transition-transform 
                            duration-300 group-hover:scale-110"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 
                          group-hover:text-blue-600 transition-colors duration-300">
                          {currentLang === 'en' && article.title_en ? article.title_en : article.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {currentLang === 'en' && article.summary_en ? article.summary_en : article.summary}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(article.created_at)}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {calculateReadingTime(currentLang === 'en' && article.content_en ? article.content_en : article.content)} min
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {article.likes_count || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 
                      disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <span className="text-gray-600">
                    {currentLang === 'en' 
                      ? `Page ${currentPage} of ${totalPages}`
                      : `Page ${currentPage} sur ${totalPages}`}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 
                      disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}