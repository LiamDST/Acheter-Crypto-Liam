import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Calendar, ArrowLeft, Clock, Share2, Bookmark, Eye, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { Article } from '../types/article';
import SEOHead from '../components/SEOHead';
import ArticleSchema from '../components/ArticleSchema';
import SocialShareButtons from '../components/SocialShareButtons';

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      
      const { data: article, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (articleError) throw articleError;

      if (article) {
        // Fetch related articles (3 most recent articles excluding current one)
        const { data: relatedData, error: relatedError } = await supabase
          .from('articles')
          .select('*')
          .neq('id', article.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (!relatedError && relatedData) {
          setRelatedArticles(relatedData);
        }

        const { count, error: likesError } = await supabase
          .from('article_likes')
          .select('*', { count: 'exact', head: true })
          .eq('article_id', article.id);

        if (likesError) throw likesError;

        const user = await supabase.auth.getUser();
        if (user.data.user) {
          const { data: userLike, error: userLikeError } = await supabase
            .from('article_likes')
            .select('*')
            .eq('article_id', article.id)
            .eq('user_id', user.data.user.id)
            .maybeSingle();

          if (!userLikeError && userLike) {
            setIsLiked(true);
          }
        }

        setArticle(article);
        setLikesCount(count || 0);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Une erreur est survenue lors du chargement de l\'article.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        return;
      }

      if (isLiked) {
        await supabase
          .from('article_likes')
          .delete()
          .match({ article_id: article?.id, user_id: user.data.user.id });
        setLikesCount(prev => prev - 1);
      } else {
        await supabase
          .from('article_likes')
          .insert({ article_id: article?.id, user_id: user.data.user.id });
        setLikesCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article?.title,
          text: article?.summary,
          url: window.location.href,
        });
      } else {
        // Fallback pour les navigateurs qui ne supportent pas Web Share API
        await navigator.clipboard.writeText(window.location.href);
        // Vous pourriez ajouter une notification toast ici
        console.log('Lien copié dans le presse-papier');
      }
    } catch (error) {
      // Fallback en cas d'erreur
      try {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Lien copié dans le presse-papier');
      } catch (clipboardError) {
        console.error('Error sharing and copying:', error, clipboardError);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      if (paragraph.startsWith('##')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mb-6 mt-12 first:mt-0">
            {paragraph.replace('##', '').trim()}
          </h2>
        );
      }
      
      if (paragraph.startsWith('###')) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mb-4 mt-8">
            {paragraph.replace('###', '').trim()}
          </h3>
        );
      }
      
      if (paragraph.includes('•') || paragraph.includes('✓') || paragraph.includes('🔹') || paragraph.includes('✅')) {
        const items = paragraph.split('\n');
        return (
          <ul key={index} className="space-y-3 mb-6">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start">
                <span className="text-blue-600 mr-2">{item.charAt(0)}</span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: item.slice(1).trim() }} />
              </li>
            ))}
          </ul>
        );
      }
      
      return (
        <p 
          key={index} 
          className="mb-6 leading-relaxed text-gray-700 text-lg"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error || 'Article non trouvé'}</p>
          </div>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(article.content);
  const canonicalUrl = `https://alyah-knowledge.com/articles/${article.slug}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {article && (
        <>
          <SEOHead 
            title={article.title}
            description={article.summary}
            canonicalUrl={canonicalUrl}
            imageUrl={article.image_url}
            type="article"
            articlePublishedTime={article.created_at}
            articleModifiedTime={article.updated_at}
          />
          <ArticleSchema
            title={article.title}
            description={article.summary}
            imageUrl={article.image_url}
            datePublished={article.created_at}
            dateModified={article.updated_at}
            authorName="Alyah Knowledge"
          />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28">
        {/* Mobile-optimized header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <Link
            to="/articles"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 
              transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux articles
          </Link>
          
          {/* Mobile sharing section - properly contained */}
          <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 
            max-w-full overflow-hidden">
            <SocialShareButtons 
              article={article}
            />
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleLike}
                className="p-2 transition-colors rounded-full hover:bg-red-50"
                title={isLiked ? 'Je n\'aime plus' : 'J\'aime'}
                aria-label={isLiked ? 'Ne plus aimer cet article' : 'Aimer cet article'}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                title="Sauvegarder"
                aria-label="Sauvegarder cet article"
              >
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <article className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 sm:mb-12">
          {/* Mobile-optimized hero image */}
          <div className="relative h-[250px] sm:h-[400px] lg:h-[500px]">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {/* Mobile-optimized title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 
              leading-tight sm:leading-tight lg:leading-tight">
              {article.title}
            </h1>

            {/* Mobile-optimized metadata */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-gray-500 text-xs sm:text-sm mb-6 sm:mb-8 lg:mb-12">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" aria-hidden="true" />
                {formatDate(article.created_at)}
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" aria-hidden="true" />
                {readingTime} min de lecture
              </div>
              <div className="flex items-center">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" aria-hidden="true" />
                {Math.floor(Math.random() * 1000) + 100} vues
              </div>
              <div className="flex items-center">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" aria-hidden="true" />
                {likesCount} j'aime
              </div>
            </div>

            {/* Mobile-optimized content with better typography */}
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none 
              prose-li:text-gray-700 prose-li:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-3 sm:prose-h3:mb-4">
              {renderContent(article.content)}
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center">
              📚 Ces articles pourraient aussi vous passionner !
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
              Continuez votre exploration de l'univers crypto avec ces contenus sélectionnés pour vous
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/articles/${relatedArticle.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 
                    transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img
                      src={relatedArticle.image_url}
                      alt={`${relatedArticle.title} - Article crypto recommandé`}
                      className="w-full h-full object-cover transform transition-transform 
                        duration-300 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2
                      group-hover:text-blue-600 transition-colors duration-300">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                      {relatedArticle.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{formatDate(relatedArticle.created_at)}</span>
                    </div>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 
                      transition-colors text-xs sm:text-sm font-medium">
                      Lire l'article
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}