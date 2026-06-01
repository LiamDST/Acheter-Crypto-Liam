import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  BarChart3, 
  Bell, 
  Settings, 
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ArrowRight,
  ChevronRight,
  Wallet
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import ProgressTracker from '../components/ProgressTracker';
import UserSubscriptionInfo from '../components/UserSubscriptionInfo';
import SEOHead from '../components/SEOHead';

interface UserProgress {
  id: string;
  module_name: string;
  module_id: string;
  progress_percentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
  last_activity: string;
}

interface UserStats {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  totalTimeSpent: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  is_read: boolean;
  created_at: string;
}

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  pair: string;
  entry_price: number;
  target_price: number;
  stop_loss: number;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  completed_at?: string;
  profit_loss?: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalModules: 0,
    completedModules: 0,
    inProgressModules: 0,
    totalTimeSpent: 0
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a hash in the URL to set the active tab
    if (location.hash) {
      const tab = location.hash.replace('#', '');
      setActiveTab(tab);
    }
    
    fetchUserData();
    fetchUserProgress();
    fetchNotifications();
    fetchTrades();
  }, [location.hash]);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchUserProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: progressData, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('module_id', { ascending: true });

      if (error) throw error;

      setProgress(progressData || []);
      
      // Calculate stats
      const totalModules = 20; // Total number of modules in the course
      const completedModules = progressData?.filter(p => p.status === 'completed').length || 0;
      const inProgressModules = progressData?.filter(p => p.status === 'in_progress').length || 0;
      
      setStats({
        totalModules,
        completedModules,
        inProgressModules,
        totalTimeSpent: completedModules * 15 // Estimate 15 minutes per completed module
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchTrades = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setTrades(data || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, is_read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
        title="Tableau de Bord"
        description="Gérez vos abonnements, suivez votre progression et accédez à vos signaux de trading."
        canonicalUrl="https://alyah-knowledge.com/dashboard"
        noIndex
      />
      
      <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="mt-2 text-gray-600">
              Bienvenue {user?.user_metadata?.first_name || user?.email}, suivez votre progression et gérez votre compte
            </p>
          </div>
          {/* Tabs */}
          <div className="mt-4 border-b border-gray-200 overflow-x-auto pb-1 scrollbar-thin">
            <style>{`
              .scrollbar-thin::-webkit-scrollbar {
                height: 4px;
              }
              .scrollbar-thin::-webkit-scrollbar-track {
                background: #f3f4f6;
                border-radius: 2px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 2px;
              }
              .scrollbar-thin::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}</style>
            <nav className="-mb-px flex space-x-8 min-w-max">
              <button
                onClick={() => {
                  setActiveTab('overview');
                  navigate('#overview');
                }}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => {
                  setActiveTab('subscription');
                  navigate('#subscription');
                }}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'subscription'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Abonnement
              </button>
              <button
                onClick={() => {
                  setActiveTab('progress');
                  navigate('#progress');
                }}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'progress'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Progression
              </button>
              <button
                onClick={() => {
                  setActiveTab('signals');
                  navigate('#signals');
                }}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'signals'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Signaux Trading
              </button>
              <button
                onClick={() => {
                  setActiveTab('notifications');
                  navigate('#notifications');
                }}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notifications
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-xl mr-3">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Modules complétés</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.completedModules}/{stats.totalModules}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-xl mr-3">
                        <Award className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Progression</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {stats.totalModules > 0 ? Math.round((stats.completedModules / stats.totalModules) * 100) : 0}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-xl mr-3">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Signaux actifs</p>
                        <p className="text-2xl font-semibold text-gray-900">{trades.filter(t => t.status === 'active').length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-100 rounded-xl mr-3">
                        <Bell className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Notifications</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {notifications.filter(n => !n.is_read).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Subscription Info */}
                  <div className="lg:col-span-1">
                    <UserSubscriptionInfo />
                    
                    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                      <div className="space-y-3">
                        <Link
                          to="/formation/comprendre-la-crypto"
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="text-gray-700">Continuer la formation</span>
                        </Link>
                        <Link
                          to="/signaux-trading"
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                          <span className="text-gray-700">Voir les signaux</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="h-5 w-5 text-gray-600 mr-3" />
                          <span className="text-gray-700">Paramètres du compte</span>
                        </Link>
                        <Link
                          to="/support"
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-5 w-5 text-purple-600 mr-3" />
                          <span className="text-gray-700">Contacter le support</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Progress and Notifications */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Progress */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Progression de la formation</h3>
                        <Link to="#progress" onClick={() => setActiveTab('progress')} className="text-sm text-blue-600 hover:text-blue-800">
                          Voir tout
                        </Link>
                      </div>
                      
                      <ProgressTracker maxModules={3} />
                      
                      <div className="mt-4 text-center">
                        <Link
                          to="/formation/comprendre-la-crypto"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Continuer la formation
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Recent Notifications */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Notifications récentes</h3>
                        <Link to="#notifications" onClick={() => setActiveTab('notifications')} className="text-sm text-blue-600 hover:text-blue-800">
                          Voir tout
                        </Link>
                      </div>
                      
                      {notifications.length === 0 ? (
                        <div className="text-center py-8">
                          <Bell className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-2 text-lg font-medium text-gray-900">Aucune notification</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vous n'avez pas de notifications pour le moment.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {notifications.slice(0, 3).map((notification) => (
                            <div 
                              key={notification.id} 
                              className={`p-4 rounded-lg ${
                                notification.is_read ? 'bg-gray-50' : 'bg-blue-50'
                              }`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start">
                                <div className={`p-2 rounded-full mr-3 ${
                                  notification.type === 'success' ? 'bg-green-100' :
                                  notification.type === 'warning' ? 'bg-yellow-100' :
                                  'bg-blue-100'
                                }`}>
                                  {notification.type === 'success' ? (
                                    <CheckCircle className={`h-5 w-5 ${
                                      notification.type === 'success' ? 'text-green-600' :
                                      notification.type === 'warning' ? 'text-yellow-600' :
                                      'text-blue-600'
                                    }`} />
                                  ) : notification.type === 'warning' ? (
                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                  ) : (
                                    <Bell className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</p>
                                </div>
                                {!notification.is_read && (
                                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Recent Trades */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Signaux récents</h3>
                        <Link to="#signals" onClick={() => setActiveTab('signals')} className="text-sm text-blue-600 hover:text-blue-800">
                          Voir tout
                        </Link>
                      </div>
                      
                      {trades.length === 0 ? (
                        <div className="text-center py-8">
                          <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-2 text-lg font-medium text-gray-900">Aucun signal</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vous n'avez pas encore reçu de signaux de trading.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {trades.slice(0, 3).map((trade) => (
                            <div key={trade.id} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <div className={`p-2 rounded-full mr-3 ${
                                    trade.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                                  }`}>
                                    <TrendingUp className={`h-5 w-5 ${
                                      trade.type === 'buy' ? 'text-green-600' : 'text-red-600'
                                    }`} />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {trade.type === 'buy' ? 'ACHAT' : 'VENTE'} {trade.pair}
                                    </h4>
                                    <p className="text-xs text-gray-500">{formatDate(trade.created_at)}</p>
                                  </div>
                                </div>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                  trade.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                  trade.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {trade.status === 'active' ? 'Actif' :
                                   trade.status === 'completed' ? 'Complété' :
                                   'Annulé'}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div>
                                  <p className="text-gray-500">Prix d'entrée</p>
                                  <p className="font-medium text-gray-900">{trade.entry_price}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Objectif</p>
                                  <p className="font-medium text-gray-900">{trade.target_price}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Stop Loss</p>
                                  <p className="font-medium text-gray-900">{trade.stop_loss}</p>
                                </div>
                              </div>
                              {trade.status === 'completed' && trade.profit_loss !== undefined && (
                                <div className={`mt-2 text-sm font-medium ${
                                  trade.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {trade.profit_loss >= 0 ? '+' : ''}{trade.profit_loss}%
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <UserSubscriptionInfo />
                    
                    {/* Payment History */}
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-6">Historique des paiements</h3>
                      
                      <div className="overflow-x-auto scrollbar-thin">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Facture</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(new Date().toISOString())}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">349,99 €</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Payé
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Carte bancaire</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-600 hover:text-blue-900">Télécharger</a>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">349,99 €</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Payé
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Carte bancaire</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-blue-600 hover:text-blue-900">Télécharger</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Billing Information */}
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-6">Informations de facturation</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Méthode de paiement</h4>
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">Carte bancaire</p>
                              <p className="text-sm text-gray-500">**** **** **** 4242</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Prochain paiement</h4>
                          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Calendar className="h-6 w-6 text-gray-400 mr-3" />
                            <div>
                              <p className="font-medium text-gray-900">{formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())}</p>
                              <p className="text-sm text-gray-500">Renouvellement automatique</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                          Annuler l'abonnement
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Besoin d'aide ?</h3>
                      <p className="text-gray-600 mb-6">
                        Notre équipe est disponible pour répondre à toutes vos questions concernant votre abonnement.
                      </p>
                      <Link
                        to="/support"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Contacter le support
                      </Link>
                    </div>
                    
                    <div className="mt-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                      <h3 className="font-semibold mb-4">Recommandez-nous</h3>
                      <p className="mb-6 text-white/90">
                        Partagez Alyah Knowledge avec vos amis et bénéficiez d'avantages exclusifs.
                      </p>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                        Obtenir mon lien de parrainage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    {/* Progress Overview */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Vue d'ensemble</h3>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progression globale</span>
                          <span className="text-sm font-medium text-gray-700">
                            {stats.totalModules > 0 ? Math.round((stats.completedModules / stats.totalModules) * 100) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${stats.totalModules > 0 ? Math.round((stats.completedModules / stats.totalModules) * 100) : 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-full mr-3">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-700">Modules complétés</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{stats.completedModules}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full mr-3">
                              <Clock className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">Modules en cours</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{stats.inProgressModules}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-full mr-3">
                              <BookOpen className="h-4 w-4 text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-700">Modules restants</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {stats.totalModules - stats.completedModules - stats.inProgressModules}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-full mr-3">
                              <Clock className="h-4 w-4 text-purple-600" />
                            </div>
                            <span className="text-sm text-gray-700">Temps d'apprentissage</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{stats.totalTimeSpent} min</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Link
                          to="/formation/comprendre-la-crypto"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Continuer la formation
                        </Link>
                      </div>
                    </div>
                    
                    {/* Achievements */}
                    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Réalisations</h3>
                      
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${stats.completedModules >= 1 ? 'bg-green-50' : 'bg-gray-50 opacity-50'}`}>
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${stats.completedModules >= 1 ? 'bg-green-100' : 'bg-gray-200'}`}>
                              <Award className={`h-4 w-4 ${stats.completedModules >= 1 ? 'text-green-600' : 'text-gray-400'}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Premier pas</h4>
                              <p className="text-xs text-gray-500">Terminer votre première leçon</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${stats.completedModules >= 5 ? 'bg-blue-50' : 'bg-gray-50 opacity-50'}`}>
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${stats.completedModules >= 5 ? 'bg-blue-100' : 'bg-gray-200'}`}>
                              <Award className={`h-4 w-4 ${stats.completedModules >= 5 ? 'text-blue-600' : 'text-gray-400'}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Explorateur</h4>
                              <p className="text-xs text-gray-500">Terminer 5 leçons</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${stats.completedModules >= 20 ? 'bg-purple-50' : 'bg-gray-50 opacity-50'}`}>
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${stats.completedModules >= 20 ? 'bg-purple-100' : 'bg-gray-200'}`}>
                              <Award className={`h-4 w-4 ${stats.completedModules >= 20 ? 'text-purple-600' : 'text-gray-400'}`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Expert Crypto</h4>
                              <p className="text-xs text-gray-500">Terminer toute la formation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    {/* Detailed Progress */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-6">Progression détaillée</h3>
                      
                      <ProgressTracker showDetailedView={true} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Signals Tab */}
            {activeTab === 'signals' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {/* Active Signals */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-6">Signaux actifs</h3>
                      
                      {trades.filter(t => t.status === 'active').length === 0 ? (
                        <div className="text-center py-8">
                          <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-2 text-lg font-medium text-gray-900">Aucun signal actif</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vous n'avez pas de signaux de trading actifs pour le moment.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {trades.filter(t => t.status === 'active').map((trade) => (
                            <div key={trade.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center">
                                  <div className={`p-2 rounded-full mr-3 ${
                                    trade.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                                  }`}>
                                    <TrendingUp className={`h-5 w-5 ${
                                      trade.type === 'buy' ? 'text-green-600' : 'text-red-600'
                                    }`} />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {trade.type === 'buy' ? 'ACHAT' : 'VENTE'} {trade.pair}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                      {formatDate(trade.created_at)} à {formatTime(trade.created_at)}
                                    </p>
                                  </div>
                                </div>
                                <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                  Actif
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div className="p-3 bg-white rounded-lg">
                                  <p className="text-xs text-gray-500">Prix d'entrée</p>
                                  <p className="font-medium text-gray-900">{trade.entry_price}</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                  <p className="text-xs text-gray-500">Objectif</p>
                                  <p className="font-medium text-green-600">{trade.target_price}</p>
                                </div>
                                <div className="p-3 bg-white rounded-lg">
                                  <p className="text-xs text-gray-500">Stop Loss</p>
                                  <p className="font-medium text-red-600">{trade.stop_loss}</p>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                  Potentiel: {trade.type === 'buy' 
                                    ? ((trade.target_price - trade.entry_price) / trade.entry_price * 100).toFixed(2)
                                    : ((trade.entry_price - trade.target_price) / trade.entry_price * 100).toFixed(2)
                                  }%
                                </div>
                                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                                  Fermer la position
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Signal History */}
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-6">Historique des signaux</h3>
                      
                      {trades.filter(t => t.status !== 'active').length === 0 ? (
                        <div className="text-center py-8">
                          <Clock className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-2 text-lg font-medium text-gray-900">Aucun historique</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Votre historique de signaux apparaîtra ici.
                          </p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto scrollbar-thin">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paire</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix d'entrée</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">P&L</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {trades.filter(t => t.status !== 'active').map((trade) => (
                                <tr key={trade.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(trade.created_at)}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trade.pair}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {trade.type === 'buy' ? 'ACHAT' : 'VENTE'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.entry_price}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      trade.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {trade.status === 'completed' ? 'Complété' : 'Annulé'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {trade.profit_loss !== undefined && (
                                      <span className={trade.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'}>
                                        {trade.profit_loss >= 0 ? '+' : ''}{trade.profit_loss}%
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    {/* Signal Stats */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Statistiques</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Signaux totaux</span>
                          <span className="font-medium text-gray-900">{trades.length}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Signaux actifs</span>
                          <span className="font-medium text-gray-900">{trades.filter(t => t.status === 'active').length}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Signaux complétés</span>
                          <span className="font-medium text-gray-900">{trades.filter(t => t.status === 'completed').length}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Taux de réussite</span>
                          <span className="font-medium text-green-600">
                            {trades.filter(t => t.status === 'completed').length > 0 
                              ? Math.round(trades.filter(t => t.status === 'completed' && (t.profit_loss || 0) > 0).length / trades.filter(t => t.status === 'completed').length * 100)
                              : 0}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Gain moyen</span>
                          <span className="font-medium text-green-600">
                            {trades.filter(t => t.status === 'completed' && t.profit_loss !== undefined).length > 0
                              ? (trades.filter(t => t.status === 'completed' && t.profit_loss !== undefined)
                                  .reduce((sum, trade) => sum + (trade.profit_loss || 0), 0) / 
                                  trades.filter(t => t.status === 'completed' && t.profit_loss !== undefined).length).toFixed(2)
                              : 0}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-4">Répartition par paires</h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">BTC/USDT</span>
                            <span className="text-sm font-medium text-gray-900">
                              {trades.filter(t => t.pair === 'BTC/USDT').length}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">ETH/USDT</span>
                            <span className="text-sm font-medium text-gray-900">
                              {trades.filter(t => t.pair === 'ETH/USDT').length}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">SOL/USDT</span>
                            <span className="text-sm font-medium text-gray-900">
                              {trades.filter(t => t.pair === 'SOL/USDT').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Signal Settings */}
                    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Paramètres des signaux</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Notifications par email</span>
                          </label>
                        </div>
                        
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Notifications push</span>
                          </label>
                        </div>
                        
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Exécution automatique</span>
                          </label>
                          <p className="text-xs text-gray-500 ml-6 mt-1">
                            Nécessite une configuration avec votre exchange
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Link
                          to="/signaux-trading"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          En savoir plus sur les signaux
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {/* All Notifications */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-gray-900">Toutes les notifications</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Marquer tout comme lu
                        </button>
                      </div>
                      
                      {notifications.length === 0 ? (
                        <div className="text-center py-12">
                          <Bell className="mx-auto h-12 w-12 text-gray-400" />
                          <h4 className="mt-2 text-lg font-medium text-gray-900">Aucune notification</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vous n'avez pas de notifications pour le moment.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id} 
                              className={`p-4 rounded-lg ${
                                notification.is_read ? 'bg-gray-50' : 'bg-blue-50'
                              }`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start">
                                <div className={`p-2 rounded-full mr-3 ${
                                  notification.type === 'success' ? 'bg-green-100' :
                                  notification.type === 'warning' ? 'bg-yellow-100' :
                                  'bg-blue-100'
                                }`}>
                                  {notification.type === 'success' ? (
                                    <CheckCircle className={`h-5 w-5 ${
                                      notification.type === 'success' ? 'text-green-600' :
                                      notification.type === 'warning' ? 'text-yellow-600' :
                                      'text-blue-600'
                                    }`} />
                                  ) : notification.type === 'warning' ? (
                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                  ) : (
                                    <Bell className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(notification.created_at)} à {formatTime(notification.created_at)}
                                  </p>
                                </div>
                                {!notification.is_read && (
                                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    {/* Notification Settings */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Paramètres de notification</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Bell className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm text-gray-700">Signaux de trading</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BarChart3 className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm text-gray-700">Mises à jour du marché</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm text-gray-700">Nouveaux articles</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-sm text-gray-700">Facturation</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-4">Canaux de notification</h4>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Email</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Notifications push</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connect Wallet */}
                    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Connecter un wallet</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Connectez votre wallet pour recevoir des notifications directement sur votre appareil mobile.
                      </p>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Wallet className="h-5 w-5 mr-2 text-gray-500" />
                        Connecter un wallet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}