import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Tag, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SEOHead from '../components/SEOHead';
import SocialShareButtons from '../components/SocialShareButtons';
import type { DictionaryTerm } from '../types/dictionary';
import { Helmet } from 'react-helmet-async';
import { isValidSlug, isNotFoundError } from '../utils/validation';
import { useTranslation } from 'react-i18next';

export default function DictionaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();
  const [term, setTerm] = useState<DictionaryTerm | null>(null);
  const [relatedTerms, setRelatedTerms] = useState<DictionaryTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !isValidSlug(slug)) {
      navigate(`/${currentLang}/dictionnaire-crypto`, { replace: true });
      return;
    }
    
    fetchTerm(slug);
  }, [slug, navigate, currentLang]);

  const fetchTerm = async (termSlug: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('dictionary_terms')
        .select('*')
        .eq('slug', termSlug)
        .single();

      if (error) throw error;

      if (data) {
        setTerm(data);
        
        // Fetch related terms (same category)
        if (data.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('dictionary_terms')
            .select('*')
            .eq('category', data.category)
            .neq('id', data.id)
            .order('term')
            .limit(3);
            
          if (relatedError) throw relatedError;
          
          setRelatedTerms(relatedData || []);
        }
      } else {
        navigate('/dictionnaire-crypto');
      }
    } catch (error) {
      console.error('Error fetching term:', error);
      
      if (isNotFoundError(error)) {
        // Terme non trouvé, rediriger vers la liste
        navigate(`/${currentLang}/dictionnaire-crypto`, { replace: true });
        return;
      }
      
      setError(currentLang === 'en' 
        ? 'An error occurred while loading the definition.'
        : 'Une erreur est survenue lors du chargement de la définition.');
    } finally {
      setLoading(false);
    }
  };

  // Function to highlight dictionary terms in the definition
  const highlightTerms = (definition: string, allTerms: DictionaryTerm[]) => {
    let highlightedText = definition;
    
    // Sort terms by length (descending) to avoid partial matches
    const sortedTerms = [...allTerms].sort((a, b) => b.term.length - a.term.length);
    
    for (const term of sortedTerms) {
      // Skip the current term to avoid self-reference
      if (term.term === term.term) continue;
      
      const regex = new RegExp(`\\b${term.term}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<a href="/dictionnaire-crypto/${term.slug}" class="text-blue-600 hover:text-blue-800 hover:underline">${term.term}</a>`);
    }
    
    return highlightedText;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
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

  if (error || !term) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 p-6 rounded-xl text-center">
            <p className="text-red-600 mb-4">
              {error || (currentLang === 'en' ? 'Term not found' : 'Terme non trouvé')}
            </p>
            <Link
              to={`/${currentLang}/dictionnaire-crypto`}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {currentLang === 'en' ? 'Back to dictionary' : 'Retour au dictionnaire'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Prepare structured data for search engines (DefinedTerm schema)
  const termTitle = currentLang === 'en' && term.term_en ? term.term_en : term.term;
  const termDefinition = currentLang === 'en' && term.definition_en ? term.definition_en : term.definition;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: termTitle,
    description: termDefinition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: currentLang === 'en' ? 'Alyah Knowledge Crypto Dictionary' : 'Dictionnaire Crypto Alyah Knowledge',
      url: `https://alyah-knowledge.com/${currentLang}/dictionnaire-crypto`
    },
    url: `https://alyah-knowledge.com/${currentLang}/dictionnaire-crypto/${term.slug}`,
    identifier: term.id,
    ...(term.category && { category: term.category })
  };

  return (
    <>
      <SEOHead 
        title={`${termTitle} - ${currentLang === 'en' ? 'Crypto Dictionary' : 'Dictionnaire Crypto'}`}
        description={termDefinition.substring(0, 160)}
        canonicalUrl={`https://alyah-knowledge.com/${currentLang}/dictionnaire-crypto/${term.slug}`}
        type="article"
        articlePublishedTime={term.created_at}
        articleModifiedTime={term.updated_at}
      />
      
      <Helmet>
        {/* Données structurées DefinedTerm pour améliorer l'indexation */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <Link
              to={`/${currentLang}/dictionnaire-crypto`}
              className="inline-flex items-center text-gray-600 hover:text-blue-600 
                transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {currentLang === 'en' ? 'Back to dictionary' : 'Retour au dictionnaire'}
            </Link>
            
            {/* Social sharing section */}
            <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 
              max-w-full overflow-hidden">
              <SocialShareButtons 
                article={{
                  title: termTitle,
                  summary: termDefinition.substring(0, 160),
                  image_url: 'https://alyah-knowledge.com/og-image.jpg',
                  slug: term?.slug || ''
                }}
                showLabels={false}
                isDictionaryTerm={true}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{termTitle}</h1>
                {term.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Tag className="w-4 h-4 mr-1" />
                    {term.category}
                  </span>
                )}
              </div>
              
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: highlightTerms(termDefinition, []) }}
                />
              </div>
            </div>
          </div>

          {relatedTerms.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {currentLang === 'en' ? 'Related terms' : 'Termes associés'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTerms.map((relatedTerm) => (
                  <Link
                    key={relatedTerm.id}
                    to={`/${currentLang}/dictionnaire-crypto/${relatedTerm.slug}`}
                    className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 
                      transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 
                      transition-colors duration-300">
                      {currentLang === 'en' && relatedTerm.term_en ? relatedTerm.term_en : relatedTerm.term}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                      {currentLang === 'en' && relatedTerm.definition_en ? relatedTerm.definition_en : relatedTerm.definition}
                    </p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-xs font-medium text-blue-600 
                        group-hover:text-blue-800 transition-colors">
                        {currentLang === 'en' ? 'Read definition' : 'Lire la définition'}
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {currentLang === 'en' ? 'Can\'t find a term?' : 'Vous ne trouvez pas un terme ?'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {currentLang === 'en'
                    ? 'Our dictionary is regularly enriched. If you can\'t find the definition you\'re looking for, don\'t hesitate to contact us.'
                    : 'Notre dictionnaire s\'enrichit régulièrement. Si vous ne trouvez pas la définition que vous cherchez, n\'hésitez pas à nous contacter.'}
                </p>
                <Link
                  to={`/${currentLang}/support`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  {currentLang === 'en' ? 'Contact us' : 'Contactez-nous'}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}