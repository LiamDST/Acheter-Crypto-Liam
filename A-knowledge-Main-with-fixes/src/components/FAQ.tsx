import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fonction pour convertir le HTML en JSX avec des composants Link
  const renderAnswer = (answer: string) => {
    const parts = answer.split(/(<a[^>]*>.*?<\/a>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<a')) {
        const href = part.match(/href="([^"]*)"/)![1];
        const text = part.replace(/<[^>]*>/g, '');
        return (
          <Link
            key={index}
            to={href}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {text}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between 
                  hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-gray-900">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300
                    ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {renderAnswer(item.answer)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}