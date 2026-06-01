import React, { useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface FeedbackFormProps {
  userId?: string;
}

export default function FeedbackForm({ userId }: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Veuillez sélectionner une note');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: userId,
          message: message.trim() || null,
          rating
        });
        
      if (error) throw error;
      
      setSuccess(true);
      setRating(0);
      setMessage('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Une erreur est survenue lors de l\'envoi de votre avis');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Merci pour votre avis !</h3>
        <p className="text-gray-600">
          Votre feedback est précieux et nous aide à améliorer nos services.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Comment évaluez-vous votre expérience avec Alyah Knowledge ?
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none transition-transform duration-200 hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  (hoverRating || rating) >= star
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                } transition-colors duration-200`}
              />
            </button>
          ))}
        </div>
        
        {rating > 0 && (
          <p className="mt-2 text-sm font-medium text-gray-700">
            {rating === 1 ? 'Très insatisfait' :
             rating === 2 ? 'Insatisfait' :
             rating === 3 ? 'Neutre' :
             rating === 4 ? 'Satisfait' :
             'Très satisfait'}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Commentaires (facultatif)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 
            focus:ring-blue-500 focus:border-transparent transition-all duration-200
            resize-none"
          placeholder="Partagez votre expérience ou vos suggestions..."
        />
      </div>
      
      {error && (
        <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading || rating === 0}
        className={`w-full py-3 px-6 rounded-xl font-medium text-white
          transition-all duration-200 flex items-center justify-center
          ${loading || rating === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'
          }`}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
            Envoi en cours...
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="h-5 w-5 mr-2" />
            Envoyer mon avis
          </div>
        )}
      </button>
    </form>
  );
}