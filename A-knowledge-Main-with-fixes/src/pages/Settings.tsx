import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import SEOHead from '../components/SEOHead';
import { 
  Mail, 
  User as UserIcon, 
  Lock, 
  Eye, 
  EyeOff, 
  Save, 
  AlertTriangle, 
  Edit, 
  CreditCard, 
  Calendar, 
  LogOut,
  LayoutDashboard
} from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }
      setUser(user);
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
      }));
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      // Update profile information
      const { error: updateError } = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      });

      if (updateError) throw updateError;

      // Update password if provided
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }

        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.newPassword
        });

        if (passwordError) throw passwordError;
      }

      setSuccess('Vos paramètres ont été mis à jour avec succès');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Une erreur est survenue lors de la déconnexion');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 sm:pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Paramètres du Compte | Alyah Knowledge"
        description="Gérez vos informations personnelles, préférences et sécurité de compte sur la plateforme Alyah Knowledge."
        canonicalUrl="https://alyah-knowledge.com/settings"
        noIndex
      />
      <div className="min-h-screen pt-20 sm:pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Paramètres du compte</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 sm:p-4 rounded-xl bg-red-50 flex items-start sm:items-center text-red-700 text-sm sm:text-base">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mr-2 sm:mr-3 mt-0.5 sm:mt-0" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 sm:p-4 rounded-xl bg-green-50 flex items-start sm:items-center text-green-700 text-sm sm:text-base">
                  <Save className="h-5 w-5 flex-shrink-0 mr-2 sm:mr-3 mt-0.5 sm:mt-0" />
                  <p>{success}</p>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200"
                    />
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          transition-all duration-200"
                      />
                      <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          transition-all duration-200"
                      />
                      <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <h2 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-gray-300 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200"
                      placeholder="Laissez vide pour ne pas changer"
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600
                        transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200"
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className={`w-full py-3 px-6 rounded-xl font-medium text-white
                    transition-all duration-200 transform hover:-translate-y-1
                    ${saving
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                >
                  {saving ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                      Enregistrement...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Save className="h-5 w-5 mr-2" />
                      Enregistrer les modifications
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Abonnement</h2>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-600 text-sm sm:text-base">
                Consultez les détails de votre abonnement et gérez vos paiements.
              </p>
              <div className="mt-4">
                <a 
                  href="/dashboard"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
                >
                  Voir mes abonnements
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Préférences de notification</h2>
            <div className="space-y-4">
              <div className="flex items-start sm:items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Signaux de trading</p>
                  <p className="text-xs sm:text-sm text-gray-500">Recevez des alertes pour les nouveaux signaux de trading</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-start sm:items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Mises à jour du marché</p>
                  <p className="text-xs sm:text-sm text-gray-500">Recevez des résumés quotidiens du marché crypto</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-start sm:items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Nouveaux articles</p>
                  <p className="text-xs sm:text-sm text-gray-500">Soyez informé des nouveaux articles publiés</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-start sm:items-center justify-between opacity-60">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Mode sombre</p>
                  <p className="text-xs sm:text-sm text-gray-500">Disponible prochainement</p>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed ml-4 flex-shrink-0">
                  <input type="checkbox" className="sr-only peer" disabled />
                  <div className="w-10 sm:w-11 h-5 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions du compte</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Edit className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Modifier le profil</h3>
                    <p className="text-xs text-gray-500">Mettre à jour vos informations personnelles</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate('/dashboard#subscription')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Gérer l'abonnement</h3>
                    <p className="text-xs text-gray-500">Modifier ou annuler votre abonnement</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate('/appointment')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Prendre rendez-vous</h3>
                    <p className="text-xs text-gray-500">Réserver une consultation avec un expert</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <LayoutDashboard className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Tableau de bord</h3>
                    <p className="text-xs text-gray-500">Accéder à votre espace personnel</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="bg-red-50 p-4 rounded-xl hover:bg-red-100 transition-colors duration-200 cursor-pointer col-span-1 sm:col-span-2"
                onClick={handleSignOut}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Se déconnecter</h3>
                    <p className="text-xs text-gray-500">Déconnexion de votre compte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-8">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Zone de danger</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Les actions ci-dessous sont irréversibles. Veuillez procéder avec précaution.
            </p>
            <button
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 
                hover:bg-red-100 transition-colors duration-200 text-sm sm:text-base"
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}