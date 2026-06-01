export interface DictionaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface DictionaryCategory {
  name: string;
  count: number;
}