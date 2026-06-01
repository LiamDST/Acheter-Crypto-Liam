import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, ArrowRight } from 'lucide-react';

interface NoSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NoSubscriptionModal({ isOpen, onClose }: NoSubscriptionModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubscribe = () => {
    navigate('/solutions/formation-cryptomonnaie/tarification');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 
            hover:bg-gray-100 rounded-full transition-colors"
          aria-label={t('modal.closeAria')}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Vous n'avez pas encore d'abonnement actif
          </h3>
          
          <p className="text-gray-600 mb-6">
            Découvrez nos offres d'abonnement pour accéder à l'intégralité de nos formations et services premium.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 
              hover:bg-gray-50 transition-colors"
          >
            Plus tard
          </button>
          
          <button
            onClick={handleSubscribe}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
              text-white font-medium hover:from-blue-700 hover:to-purple-700 
              transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center"
          >
            Découvrir les abonnements
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}