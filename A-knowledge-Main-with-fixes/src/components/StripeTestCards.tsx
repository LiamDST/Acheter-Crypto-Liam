import React from 'react';
import { CreditCard, Copy } from 'lucide-react';

export default function StripeTestCards() {
  const testCards = [
    {
      number: '4242 4242 4242 4242',
      description: 'Visa - Paiement réussi',
      cvc: '123',
      expiry: '12/34'
    },
    {
      number: '4000 0000 0000 0002',
      description: 'Visa - Carte déclinée',
      cvc: '123',
      expiry: '12/34'
    },
    {
      number: '4000 0000 0000 9995',
      description: 'Visa - Fonds insuffisants',
      cvc: '123',
      expiry: '12/34'
    },
    {
      number: '5555 5555 5555 4444',
      description: 'Mastercard - Paiement réussi',
      cvc: '123',
      expiry: '12/34'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
      <div className="flex items-center mb-3">
        <CreditCard className="h-5 w-5 text-yellow-600 mr-2" />
        <h3 className="font-medium text-yellow-800">Cartes de test Stripe</h3>
      </div>
      
      <div className="space-y-2">
        {testCards.map((card, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg">
            <div>
              <div className="font-mono text-sm text-gray-900">{card.number}</div>
              <div className="text-xs text-gray-600">{card.description}</div>
            </div>
            <button
              onClick={() => copyToClipboard(card.number.replace(/\s/g, ''))}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copier le numéro"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-yellow-700">
        <p><strong>CVC:</strong> 123 | <strong>Expiration:</strong> 12/34 | <strong>Code postal:</strong> 12345</p>
      </div>
    </div>
  );
}