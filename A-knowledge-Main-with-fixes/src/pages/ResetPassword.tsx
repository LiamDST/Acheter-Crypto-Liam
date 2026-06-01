import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // Check if we have a hash fragment in the URL (from the reset password email)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes('type=recovery')) {
      navigate('/');
    }
  }, [navigate]);

  // Check password strength
  useEffect(() => {
    setPasswordStrength({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    });
  }, [newPassword]);

  const isPasswordStrong = () => {
    return passwordStrength.length && 
           (passwordStrength.uppercase || passwordStrength.special) && 
           passwordStrength.number;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate password
    if (!isPasswordStrong()) {
      setError('Votre mot de passe ne respecte pas les critères de sécurité');
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      // Log the password reset for security (timestamp only, no personal data)
      await supabase.from('security_logs').insert({
        event_type: 'password_reset',
        user_id: (await supabase.auth.getUser()).data.user?.id,
        ip_address: null, // We don't store IP for privacy
        user_agent: null, // We don't store user agent for privacy
      });
      
      setSuccess(true);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error resetting password:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Réinitialiser votre Mot de Passe | Alyah Knowledge"
        description="Modifiez votre mot de passe et sécurisez l’accès à votre compte Alyah Knowledge en quelques étapes."
        canonicalUrl="https://alyah-knowledge.com/reset-password"
        noIndex
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        {success ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Mot de passe réinitialisé</h1>
            <p className="text-gray-600 mb-6">
              Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page d'accueil.
            </p>
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-1 animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Réinitialisation du mot de passe</h1>
            
            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 flex items-center text-red-700">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mr-3" />
                  <p>{error}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-200"
                    placeholder="Entrez votre nouveau mot de passe"
                    required
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
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition-all duration-200"
                    placeholder="Confirmez votre nouveau mot de passe"
                    required
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Critères de sécurité :</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    {passwordStrength.length ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={passwordStrength.length ? 'text-green-700' : 'text-gray-600'}>
                      Au moins 8 caractères
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    {passwordStrength.uppercase ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={passwordStrength.uppercase ? 'text-green-700' : 'text-gray-600'}>
                      Au moins une lettre majuscule
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    {passwordStrength.number ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={passwordStrength.number ? 'text-green-700' : 'text-gray-600'}>
                      Au moins un chiffre
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    {passwordStrength.special ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className={passwordStrength.special ? 'text-green-700' : 'text-gray-600'}>
                      Au moins un caractère spécial (recommandé)
                    </span>
                  </li>
                </ul>
              </div>
              
              <button
                type="submit"
                disabled={loading || !isPasswordStrong() || newPassword !== confirmPassword}
                className={`w-full py-3 px-6 rounded-xl font-medium text-white
                  transition-all duration-200 transform hover:-translate-y-1
                  ${(loading || !isPasswordStrong() || newPassword !== confirmPassword)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Réinitialisation en cours...
                  </div>
                ) : (
                  'Réinitialiser le mot de passe'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
}