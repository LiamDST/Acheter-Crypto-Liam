import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, BookOpen, ArrowUpRight, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { checkModuleAccess } from '../lib/moduleAccess';
import { getQuestionsByModule, getModuleSpecificMessages } from '../data/quizQuestions';

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ModuleQuizProps {
  onComplete: (score: number) => void;
  onRetry: () => void;
  onBack: () => void;
  nextModuleId?: string;
  currentModuleId?: string;
}

// Mapping des anciens IDs de module vers les nouvelles URLs
const moduleIdToUrlMap: Record<string, string> = {
  'module-1': '/fr/formation/comprendre-la-crypto/fondamentaux-blockchain',
  'module-2': '/fr/formation/comprendre-la-crypto/principes-decentralisation',
  'module-3': '/fr/formation/comprendre-la-crypto/cryptographie-securite',
  'module-4': '/fr/formation/comprendre-la-crypto/types-blockchain',
  'module-5': '/fr/formation/comprendre-la-crypto/bitcoin-histoire',
  'module-6': '/fr/formation/comprendre-la-crypto/ethereum-smart-contracts',
  'module-7': '/fr/formation/comprendre-la-crypto/types-tokens',
  'module-8': '/fr/formation/comprendre-la-crypto/securite-wallets',
  'module-9': '/fr/formation/comprendre-la-crypto/indicateurs-techniques',
  'module-10': '/fr/formation/comprendre-la-crypto/analyse-graphiques',
  'module-11': '/fr/formation/comprendre-la-crypto/patterns-trading',
  'module-12': '/fr/formation/comprendre-la-crypto/gestion-risque',
  'module-13': '/fr/formation/comprendre-la-crypto/protocoles-defi',
  'module-14': '/fr/formation/comprendre-la-crypto/yield-farming',
  'module-15': '/fr/formation/comprendre-la-crypto/pools-liquidite',
  'module-16': '/fr/formation/comprendre-la-crypto/stablecoins',
  'module-17': '/fr/formation/comprendre-la-crypto/securisation-wallets',
  'module-18': '/fr/formation/comprendre-la-crypto/arnaques-crypto',
  'module-19': '/fr/formation/comprendre-la-crypto/gestion-portfolio',
  'module-20': '/fr/formation/comprendre-la-crypto/strategies-avancees',
};

export default function ModuleQuiz({ onComplete, onRetry, onBack, nextModuleId = '', currentModuleId = '' }: ModuleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [hasAccessToNextModule, setHasAccessToNextModule] = useState<boolean | null>(null);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get module-specific questions and messages
  const moduleId = currentModuleId || (nextModuleId ? `module-${parseInt(nextModuleId.split('-')[1] || '1') - 1}` : 'module-1');
  const questions = getQuestionsByModule(moduleId);
  const messages = getModuleSpecificMessages(moduleId);

  useEffect(() => {
    if (quizComplete && nextModuleId) {
      checkNextModuleAccess();
      updateUserProgress();
    }
  }, [quizComplete, nextModuleId]);

  const checkNextModuleAccess = async () => {
    try {
      setLoading(true);
      
      // Check if user has access to next module
      const hasAccess = await checkModuleAccess(nextModuleId);
      setHasAccessToNextModule(hasAccess);
      
      // If user has access, navigate directly to next module
      if (hasAccess) {
        const nextModuleUrl = moduleIdToUrlMap[nextModuleId] || `/knowledge/crypto/${nextModuleId}`;
        navigate(nextModuleUrl);
      } else {
        // If it's not the free module, show subscription popup
        if (nextModuleId !== 'module-1') {
          setShowSubscriptionPopup(true);
        }
      }
    } catch (error) {
      console.error('Error checking next module access:', error);
      setHasAccessToNextModule(false);
      setShowSubscriptionPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProgress = async () => {
    if (!nextModuleId) return;
    
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const userId = session.user.id;
      const moduleId = nextModuleId.split('-')[1] ? `module-${parseInt(nextModuleId.split('-')[1]) - 1}` : 'module-1';
      const moduleName = getModuleName(moduleId);
      
      // Check if progress record exists
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .maybeSingle();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking progress:', error);
        return;
      }
      
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
      const progressPercentage = Math.round((finalScore / questions.length) * 100);
      const status = progressPercentage >= 80 ? 'completed' : 'in_progress';
      
      if (data) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            status,
            progress_percentage: progressPercentage,
            last_activity: new Date().toISOString()
          })
          .eq('id', data.id);
          
        if (updateError) {
          console.error('Error updating progress:', updateError);
        }
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            module_id: moduleId,
            module_name: moduleName,
            status,
            progress_percentage: progressPercentage,
            last_activity: new Date().toISOString()
          });
          
        if (insertError) {
          console.error('Error inserting progress:', insertError);
        }
      }
      
      // If this module is completed, create a record for the next module if it doesn't exist
      if (status === 'completed' && nextModuleId) {
        const nextModuleName = getModuleName(nextModuleId);
        
        // Check if next module record exists
        const { data: nextModuleProgress, error: nextCheckError } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('module_id', nextModuleId)
          .single();
          
        if (nextCheckError && nextCheckError.code === 'PGRST116') {
          // Create record for next module
          const { error: nextInsertError } = await supabase
            .from('user_progress')
            .insert({
              user_id: userId,
              module_id: nextModuleId,
              module_name: nextModuleName,
              status: 'not_started',
              progress_percentage: 0,
              last_activity: new Date().toISOString()
            });
            
          if (nextInsertError) {
            console.error('Error inserting next module progress:', nextInsertError);
          }
        }
      }
    } catch (error) {
      console.error('Error updating user progress:', error);
      if (nextModuleId !== 'module-1') {
        setShowSubscriptionPopup(true);
      }
    }
  };

  const getModuleName = (moduleId: string): string => {
    const moduleNumber = moduleId.split('-')[1];
    switch (moduleNumber) {
      case '1': return 'Les Fondamentaux de la Blockchain';
      case '2': return 'Les Principes de la Décentralisation';
      case '3': return 'La Cryptographie et la Sécurité';
      case '4': return 'Les Différents Types de Blockchain';
      case '5': return 'Bitcoin et son Histoire';
      case '6': return 'Ethereum et les Smart Contracts';
      case '7': return 'Les Différents Types de Tokens';
      case '8': return 'Sécurité des Wallets';
      case '9': return 'Les Indicateurs Techniques';
      case '10': return 'L\'Analyse des Graphiques';
      case '11': return 'Les Patterns de Trading';
      case '12': return 'La Gestion du Risque';
      case '13': return 'Les Protocoles DeFi';
      case '14': return 'Le Yield Farming';
      case '15': return 'Les Pools de Liquidité';
      case '16': return 'Les Stablecoins';
      case '17': return 'Sécurisation des Wallets';
      case '18': return 'Les Arnaques en Crypto';
      case '19': return 'Gestion de Portfolio';
      case '20': return 'Stratégies Avancées de Trading';
      default: return `Module ${moduleNumber}`;
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizComplete(true);
        const finalScore = score + (answerIndex === questions[currentQuestion].correctAnswer ? 1 : 0);
        onComplete(finalScore);
      }
    }, 2000);
  };

  const handleCloseSubscriptionPopup = () => {
    setShowSubscriptionPopup(false);
  };

  if (showSubscriptionPopup) {
    return (
      <div className="text-center space-y-6">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Prêt à maîtriser pleinement la blockchain ? 🚀
              </h3>
              <p className="text-gray-600">
                Accédez à l'intégralité de nos formations exclusives et transformez votre expertise. 
                Choisissez l'abonnement qui vous correspond dès maintenant !
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleCloseSubscriptionPopup}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Plus tard
              </button>
              <button
                onClick={() => navigate('/solutions/formation-cryptomonnaie/tarification')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-1"
              >
                Découvrir nos solutions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {messages.title}
        </h2>
        <p className="text-gray-600">
          {messages.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500">
              Score : {score}/{currentQuestion}
            </span>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            📌 {questions[currentQuestion]?.text}
          </h3>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                ${selectedAnswer === null
                  ? 'hover:border-blue-500 border-gray-200'
                  : index === questions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : selectedAnswer === index
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 opacity-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                {selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`mt-6 p-4 rounded-xl ${
            selectedAnswer === questions[currentQuestion].correctAnswer
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${
              selectedAnswer === questions[currentQuestion].correctAnswer
                ? 'text-green-700'
                : 'text-red-700'
            }`}>
              {selectedAnswer === questions[currentQuestion].correctAnswer ? '✔️' : '❌'}{' '}
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Sélectionnez une réponse pour continuer</span>
        <div className="flex items-center">
          <ArrowRight className="h-4 w-4 mr-1" />
          <span>{questions.length - currentQuestion - 1} questions restantes</span>
        </div>
      </div>
    </div>
  );
}