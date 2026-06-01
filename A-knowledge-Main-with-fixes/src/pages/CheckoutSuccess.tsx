import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, BookOpen, BarChart2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SEOHead from '../components/SEOHead';

export default function CheckoutSuccess() {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a success redirect from Stripe
    const query = new URLSearchParams(location.search);
    const success = query.get('success');
    
    if (!success) {
      navigate('/');
      return;
    }
    
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/');
          return;
        }
        
        // Fetch subscription data
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
          
        if (subscriptionError && subscriptionError.code !== 'PGRST116') {
          throw subscriptionError;
        }
        
        setSubscription(subscriptionData);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setError('Une erreur est survenue lors de la récupération de votre abonnement.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubscription();
  }, [navigate, location.search]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Paiement Confirmé | Accès Immédiat à Alyah Knowledge"
        description="Votre paiement a été validé. Accédez dès maintenant à vos formations, signaux et outils exclusifs Alyah Knowledge."
        canonicalUrl="https://alyah-knowledge.com/checkout/success"
        noIndex
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 text-center">
            {/* Success animation */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Paiement réussi !
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Merci pour votre abonnement à Alyah Knowledge. Votre compte a été activé avec succès.
            </p>
            
            {subscription ? (
              <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de votre abonnement</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium text-gray-900">{subscription.plan_name || (subscription.includes_signals ? 'Formation + Signaux' : 'Formation seule')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="font-medium text-gray-900">{subscription.amount}€ / mois</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Statut</span>
                    <span className="font-medium text-green-600">Actif</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de renouvellement</span>
                    <span className="font-medium text-gray-900">
                      {new Date(subscription.end_date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-xl text-red-600 mb-8">
                {error}
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-xl text-blue-600 mb-8">
                Votre abonnement a été activé. Vous pouvez maintenant accéder à tous les contenus premium.
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link
                to="/formation/comprendre-la-crypto"
                className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-900">Accéder à la formation</span>
              </Link>
              
              {subscription?.includes_signals && (
                <Link
                  to="/signaux-trading"
                  className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <BarChart2 className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-900">Voir les signaux</span>
                </Link>
              )}
            </div>
            
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl 
                font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1"
            >
              Aller au tableau de bord
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
      </>
  );
}