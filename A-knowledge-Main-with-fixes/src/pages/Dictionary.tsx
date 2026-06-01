import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, BookOpen, ArrowRight, Tag } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SEOHead from '../components/SEOHead';
import type { DictionaryTerm, DictionaryCategory } from '../types/dictionary';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function Dictionary() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();
  const [terms, setTerms] = useState<DictionaryTerm[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<DictionaryTerm[]>([]);
  const [categories, setCategories] = useState<DictionaryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('dictionary_terms')
        .select('*')
        .order('term');

      if (error) throw error;

      if (data) {
        setTerms(data);
        setFilteredTerms(data);
        
        // Extract unique categories and count terms in each
        const categoriesMap = data.reduce((acc: Record<string, number>, term) => {
          const category = term.category || 'Non classé';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        
        const categoriesArray = Object.entries(categoriesMap).map(([name, count]) => ({
          name,
          count
        }));
        
        setCategories(categoriesArray);
      }
    } catch (error) {
      console.error('Error fetching dictionary terms:', error);
      setError(currentLang === 'en' 
        ? 'An error occurred while loading the dictionary.'
        : 'Une erreur est survenue lors du chargement du dictionnaire.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter terms based on search query, category, and letter
    let filtered = [...terms];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(query) || 
        term.definition.toLowerCase().includes(query) ||
        (currentLang === 'en' && term.term_en && term.term_en.toLowerCase().includes(query)) ||
        (currentLang === 'en' && term.definition_en && term.definition_en.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(term => term.category === selectedCategory);
    }
    
    if (selectedLetter) {
      filtered = filtered.filter(term => term.term.toLowerCase().startsWith(selectedLetter.toLowerCase()));
    }
    
    setFilteredTerms(filtered);
  }, [searchQuery, selectedCategory, selectedLetter, terms]);

  // Prepare structured data for search engines
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: currentLang === 'en' ? 'Alyah Knowledge Crypto Dictionary' : 'Dictionnaire Crypto Alyah Knowledge',
    description: currentLang === 'en' 
      ? 'Explore our comprehensive dictionary of cryptocurrency and blockchain terms and concepts.'
      : 'Explorez notre dictionnaire complet des termes et concepts de la cryptomonnaie et de la blockchain.',
    url: `https://alyah-knowledge.com/${currentLang}/dictionnaire-crypto`,
    numberOfTerms: terms.length,
    inLanguage: currentLang === 'en' ? 'en-US' : 'fr-FR'
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Get all first letters that exist in the dictionary
  const availableLetters = terms.length > 0 
    ? [...new Set(terms.map(term => term.term.charAt(0).toUpperCase()))]
    : [];

  return (
    <>
      <SEOHead />

      <Helmet>
        {/* Données structurées pour le dictionnaire complet */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentLang === 'en' ? 'Crypto Dictionary' : 'Dictionnaire Crypto'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentLang === 'en'
                ? 'Explore the definitions of essential cryptocurrency and blockchain terms to better understand this constantly evolving ecosystem.'
                : 'Explorez les définitions des termes essentiels de la cryptomonnaie et de la blockchain pour mieux comprendre cet écosystème en constante évolution.'}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={currentLang === 'en' ? 'Search for a term...' : 'Rechercher un terme...'}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-200"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="relative inline-block w-full md:w-auto">
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="appearance-none w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-200 pr-10 bg-white"
                  >
                    <option value="">{currentLang === 'en' ? 'All categories' : 'Toutes les catégories'}</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alphabet Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 overflow-x-auto">
            <div className="flex justify-center space-x-1 min-w-max">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                  ${!selectedLetter 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {currentLang === 'en' ? 'All' : 'Tous'}
              </button>
              {alphabet.map((letter) => {
                const isAvailable = availableLetters.includes(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    disabled={!isAvailable}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                      ${selectedLetter === letter 
                        ? 'bg-blue-600 text-white' 
                        : isAvailable 
                          ? 'text-gray-600 hover:bg-gray-100' 
                          : 'text-gray-300 cursor-not-allowed'}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dictionary Content */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-xl text-red-600 text-center">
              {error}
              <button
                onClick={fetchTerms}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          ) : filteredTerms.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentLang === 'en' ? 'No terms found' : 'Aucun terme trouvé'}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentLang === 'en'
                  ? 'No terms match your search. Try with other keywords or filters.'
                  : 'Aucun terme ne correspond à votre recherche. Essayez avec d\'autres mots-clés ou filtres.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedLetter(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentLang === 'en' ? 'Reset filters' : 'Réinitialiser les filtres'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredTerms.map((term) => (
                <Link
                  key={term.id}
                  to={`/${currentLang}/dictionnaire-crypto/${term.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 
                      transition-colors duration-300">
                      {currentLang === 'en' && term.term_en ? term.term_en : term.term}
                    </h2>
                    {term.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Tag className="w-3 h-3 mr-1" />
                        {term.category}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {currentLang === 'en' && term.definition_en ? term.definition_en : term.definition}
                  </p>
                  <div className="flex justify-end mt-auto">
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 
                      group-hover:text-blue-800 transition-colors">
                      {currentLang === 'en' ? 'Read definition' : 'Lire la définition'}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}