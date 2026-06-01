import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

interface DictionaryLinkProps {
  term: string;
  slug: string;
  children: React.ReactNode;
  className?: string;
}

export default function DictionaryLink({ term, slug, children, className = '' }: DictionaryLinkProps) {
  return (
    <Link
      to={`/dictionary/${slug}`}
      className={`relative group inline-flex items-center text-blue-600 hover:text-blue-800 ${className}`}
      title={`Voir la définition de "${term}" dans le dictionnaire`}
    >
      {children}
      <BookOpen className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute -bottom-px left-0 w-full h-px bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
    </Link>
  );
}