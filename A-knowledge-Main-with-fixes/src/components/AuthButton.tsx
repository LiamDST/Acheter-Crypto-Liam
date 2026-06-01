import React, { useState, useEffect } from 'react';
import { UserCircle2, LogOut, Eye, EyeOff, Mail, Lock, Settings, LayoutDashboard } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AuthModalContentProps {
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
  onClose: () => void;
}

export function AuthModalContent({ isSignUp, setIsSignUp, onClose }: AuthModalContentProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = location.pathname.startsWith('/en') ? 'en' : 'fr';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationEmail = async (email: string, code: string) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: email,
          to_name: `${firstName} ${lastName}`,
          verification_code: code,
        },
        import.meta.env.VITE_EMAILJS_SIGNUP_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error(t('auth.verificationEmailError'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const code = generateVerificationCode();
        setGeneratedCode(code);
        await sendVerificationEmail(email, code);
        setShowVerification(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(t('auth.genericError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async () => {
    if (verificationCode === generatedCode) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });
        if (error) throw error;
        onClose();
        setShowVerification(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    } else {
      setError(t('auth.invalidVerificationCode'));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data) {
        onClose();
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error instanceof Error ? error.message : t('auth.googleSignInError'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email) {
      setError(t('auth.enterEmailAddress'));
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      
      setResetEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error instanceof Error ? error.message : t('auth.passwordResetError'));
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="space-y-6">
        {resetEmailSent ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{t('auth.emailSent')}</h3>
            <p className="text-gray-600">
              {t('auth.resetEmailSentMessage')}
            </p>
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmailSent(false);
              }}
              className="w-full py-2 px-4 rounded-xl text-white text-sm font-medium bg-gradient-to-r 
                from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-all duration-200 transform hover:-translate-y-1"
              aria-label={t('auth.backToSignIn')}
            >
              {t('auth.backToSignIn')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('auth.passwordResetTitle')}</h3>
            <p className="text-gray-600 mb-4">
              {t('auth.passwordResetDescription')}
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reset-email">
                {t('auth.email')}
              </label>
              <div className="relative">
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all duration-200"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-xl text-white text-sm font-medium bg-gradient-to-r 
                from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 transform hover:-translate-y-1 flex items-center 
                justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true" />
                  <span>{t('auth.sending')}</span>
                </>
              ) : (
                t('auth.sendResetLink')
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full py-2 px-4 rounded-xl text-gray-700 text-sm font-medium 
                border border-gray-300 hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                transition-all duration-200"
            >
              {t('auth.backToSignIn')}
            </button>
          </form>
        )}
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className="space-y-6">
        <p className="text-center text-gray-600 mb-4">
          {t('auth.verificationCodeSentMessage')}
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="verification-code">
            {t('auth.verificationCode')}
          </label>
          <input
            id="verification-code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all duration-200"
            placeholder={t('auth.enterCode')}
          />
        </div>
        <button
          onClick={handleVerificationSubmit}
          className="w-full py-3 px-6 rounded-xl text-white font-medium
            bg-gradient-to-r from-blue-600 to-purple-600 
            hover:from-blue-700 hover:to-purple-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            transition-all duration-200 transform hover:-translate-y-1"
        >
          {t('auth.verifyButton')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSignUp && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="first-name">
              {t('auth.firstName')}
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="last-name">
              {t('auth.lastName')}
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                transition-all duration-200"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
          {t('auth.email')}
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all duration-200"
          />
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
          {t('auth.password')}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-gray-300 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all duration-200"
          />
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              rounded transition-colors"
            aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {!isSignUp && (
        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:text-blue-800 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              rounded font-medium"
          >
            {t('auth.forgotPassword')}
          </button>
        </div>
      )}

      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-6 rounded-xl font-medium text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-all duration-200 transform hover:-translate-y-1
          ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" aria-hidden="true" />
            {t('auth.loading')}
          </div>
        ) : (
          isSignUp ? t('auth.signUp') : t('auth.signIn')
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{t('auth.or')}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-xl font-medium text-gray-700
          bg-white border-2 border-gray-200 hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
          transition-all duration-200 transform hover:-translate-y-1
          flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700 mr-3" aria-hidden="true" />
            {t('auth.signingIn')}
          </div>
        ) : (
          <>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt=""
              className="w-5 h-5 mr-2"
            />
            {t('auth.continueWithGoogle')}
          </>
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-blue-600 hover:text-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            rounded font-medium"
        >
          {isSignUp
            ? t('auth.alreadyHaveAccount')
            : t('auth.noAccountYet')}
        </button>
      </div>
    </form>
  );
}

export default function AuthButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = location.pathname.startsWith('/en') ? 'en' : 'fr';
  
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.signOut();
      }
      setShowMenu(false);
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="relative">
      {user ? (
        <>
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full text-gray-700 hover:text-blue-600 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200"
              aria-label={t('auth.userMenu', { name: user?.user_metadata?.first_name || t('auth.user') })}
              aria-expanded={showMenu}
              aria-haspopup="true"
            >
              <UserCircle2 className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-xs text-gray-600">{t('auth.profile')}</span>
          </div>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg 
              border border-gray-100 py-1 z-50" role="menu">
              <Link
                to={`/${currentLang === 'en' ? 'en/' : ''}dashboard`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 
                  focus:bg-gray-50 focus:outline-none
                  transition-colors duration-200"
                onClick={() => setShowMenu(false)}
                role="menuitem"
              >
                <div className="flex items-center">
                  <LayoutDashboard className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t('auth.dashboard')}
                </div>
              </Link>
              <Link
                to={`/${currentLang === 'en' ? 'en/' : ''}settings`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 
                  focus:bg-gray-50 focus:outline-none
                  transition-colors duration-200"
                onClick={() => setShowMenu(false)}
                role="menuitem"
              >
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t('auth.settings')}
                </div>
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 
                  hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                  transition-colors duration-200"
                role="menuitem"
              >
                <div className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t('auth.signOut')}
                </div>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={onClick}
            className="p-2 rounded-full text-gray-700 hover:text-blue-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transition-colors duration-200"
            aria-label={t('auth.signIn')}
          >
            <UserCircle2 className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="text-xs text-gray-600">{t('auth.profile')}</span>
        </div>
      )}
    </div>
  );
}