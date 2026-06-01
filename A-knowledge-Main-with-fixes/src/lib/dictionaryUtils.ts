import { supabase } from './supabaseClient';
import type { DictionaryTerm } from '../types/dictionary';

/**
 * Fetches all dictionary terms from the database
 * @returns Promise with array of dictionary terms
 */
export async function fetchAllDictionaryTerms(): Promise<DictionaryTerm[]> {
  try {
    const { data, error } = await supabase
      .from('dictionary_terms')
      .select('*')
      .order('term');
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching dictionary terms:', error);
    return [];
  }
}

/**
 * Fetches a dictionary term by its slug
 * @param slug The slug of the term to fetch
 * @returns Promise with the dictionary term or null if not found
 */
export async function fetchDictionaryTermBySlug(slug: string): Promise<DictionaryTerm | null> {
  try {
    const { data, error } = await supabase
      .from('dictionary_terms')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error fetching dictionary term with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Processes text to highlight dictionary terms with links
 * @param text The text to process
 * @param terms Array of dictionary terms to highlight
 * @returns Processed text with dictionary terms linked
 */
export function highlightDictionaryTerms(text: string, terms: DictionaryTerm[]): string {
  if (!terms || terms.length === 0 || !text) return text;
  
  // Sort terms by length (descending) to avoid partial matches
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
  
  let processedText = text;
  
  for (const term of sortedTerms) {
    // Create a regex that matches the term as a whole word, case insensitive
    const regex = new RegExp(`\\b${term.term}\\b`, 'gi');
    
    // Replace with a link to the dictionary term
    processedText = processedText.replace(regex, `<a href="/dictionary/${term.slug}" class="text-blue-600 hover:text-blue-800 hover:underline">${term.term}</a>`);
  }
  
  return processedText;
}

/**
 * Fetches dictionary terms by category
 * @param category The category to filter by
 * @returns Promise with array of dictionary terms in the specified category
 */
export async function fetchDictionaryTermsByCategory(category: string): Promise<DictionaryTerm[]> {
  try {
    const { data, error } = await supabase
      .from('dictionary_terms')
      .select('*')
      .eq('category', category)
      .order('term');
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching dictionary terms in category ${category}:`, error);
    return [];
  }
}

/**
 * Fetches all available dictionary categories
 * @returns Promise with array of category names and counts
 */
export async function fetchDictionaryCategories(): Promise<{ name: string, count: number }[]> {
  try {
    const { data, error } = await supabase
      .from('dictionary_terms')
      .select('category');
      
    if (error) throw error;
    
    // Count terms in each category
    const categoriesMap: Record<string, number> = {};
    
    data.forEach(item => {
      const category = item.category || 'Non classé';
      categoriesMap[category] = (categoriesMap[category] || 0) + 1;
    });
    
    // Convert to array of objects
    return Object.entries(categoriesMap).map(([name, count]) => ({
      name,
      count
    }));
  } catch (error) {
    console.error('Error fetching dictionary categories:', error);
    return [];
  }
}