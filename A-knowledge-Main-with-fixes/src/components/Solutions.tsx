import React, { useState, useEffect, useRef } from 'react';
import { Check, Shield, LineChart, Lock, ArrowRight, Sparkles, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQ from '../components/FAQ';
import SubscriptionModal from '../components/SubscriptionModal';


const cryptoList = "BTC — ETH — BNB — SOL — XRP — USDC — ADA — DOGE — AVAX — TRX — TON — SHIB — DOT — LINK — MATIC — WBTC — LTC — BCH — DAI — ICP — ETC — ATOM — LEO — UNI — XMR — OKB — FIL — STX — APT — NEAR — INJ — LDO — OP — CRO — ARB — XLM — HBAR — VET — MKR — QNT — RUNE — GRT — SUI — ENS — FLOW — MNT — AAVE — SNX — IMX — EGLD — THETA — ALGO — BIT — FTM — AXS — SAND — CFX — XTZ — MANA — APE — GALA — CHZ — KAS — PEPE — HNT — KAVA — RPL — GT — CRV — CAKE — MINA — XDC — BAT — ZEC — GMX — PAXG — LUNC — DYDX — LPT — KLAY — OCEAN — 1INCH — AR — CELO — ENJ — ROSE — DASH — QTUM — IOTA — WAVES — AMP — LSK — CSPR — COMP — NEXO — ZIL — YFI — BAND — OMG — FXS";

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';
  const languagePrefix = isEnglish ? '/en' : '';

  // Create FAQ items from translations
  const faqItems = [
    {
      question: t('solutions.faq.items.security.question'),
      answer: t('solutions.faq.items.security.answer')
    },
    {
      question: t('solutions.faq.items.signals.question'),
      answer: t('solutions.faq.items.signals.answer')
    },
    {
      question: t('solutions.faq.items.beginners.question'),
      answer: t('solutions.faq.items.beginners.answer')
    },
    {
      question: t('solutions.faq.items.plans.question'),
      answer: t('solutions.faq.items.plans.answer')
    },
    {
      question: t('solutions.faq.items.support.question'),
      answer: t('solutions.faq.items.support.answer')
    }
  ];

  // Create subscription plans from translations
  const subscriptions = [
    {
      title: t('solutions.subscriptions.formationSeule.title'),
      price: t('solutions.subscriptions.formationSeule.price'),
      period: t('solutions.subscriptions.formationSeule.period'),
      features: [
        { 
          text: t('solutions.subscriptions.formationSeule.features.fullAccess.text'), 
          highlight: t('solutions.subscriptions.formationSeule.features.fullAccess.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationSeule.features.resources.text'), 
          highlight: t('solutions.subscriptions.formationSeule.features.resources.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationSeule.features.community.text'), 
          highlight: t('solutions.subscriptions.formationSeule.features.community.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationSeule.features.support.text'), 
          highlight: t('solutions.subscriptions.formationSeule.features.support.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationSeule.features.updates.text'), 
          highlight: t('solutions.subscriptions.formationSeule.features.updates.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationSeule.features.tradingSignals.text'), 
          highlight: t('solutions.subscriptions.formationSeule.features.tradingSignals.highlight'), 
          disabled: true 
        }
      ],
      description: t('solutions.subscriptions.formationSeule.description'),
      buttonText: t('solutions.subscriptions.formationSeule.buttonText'),
      plan: 'formation'
    },
    {
      title: t('solutions.subscriptions.formationEtSignaux.title'),
      price: t('solutions.subscriptions.formationEtSignaux.price'),
      period: t('solutions.subscriptions.formationEtSignaux.period'),
      features: [
        { 
          text: t('solutions.subscriptions.formationEtSignaux.features.included.text'), 
          highlight: t('solutions.subscriptions.formationEtSignaux.features.included.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationEtSignaux.features.tradingSignals.text'), 
          highlight: t('solutions.subscriptions.formationEtSignaux.features.tradingSignals.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationEtSignaux.features.marketCoverage.text'), 
          highlight: t('solutions.subscriptions.formationEtSignaux.features.marketCoverage.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationEtSignaux.features.prioritySupport.text'), 
          highlight: t('solutions.subscriptions.formationEtSignaux.features.prioritySupport.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationEtSignaux.features.marketAnalysis.text'), 
          highlight: t('solutions.subscriptions.formationEtSignaux.features.marketAnalysis.highlight') 
        },
        { 
          text: t('solutions.subscriptions.formationEtSignaux.features.advancedStrategies.text'), 
          highlight: t('solutions.subscriptions.formationEtSignaux.features.advancedStrategies.highlight') 
        }
      ],
      description: t('solutions.subscriptions.formationEtSignaux.description'),
      buttonText: t('solutions.subscriptions.formationEtSignaux.buttonText'),
      highlighted: true,
      plan: 'formationEtSignaux'
    }
  ];
  const [selectedPlan, setSelectedPlan] = useState<typeof subscriptions[0] | null>(null);
  const cryptoScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animation for crypto list
    const scrollElement = cryptoScrollRef.current;
    if (!scrollElement) return;

    const scrollWidth = scrollElement.scrollWidth;
    const clientWidth = scrollElement.clientWidth;
    
    if (scrollWidth <= clientWidth) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through the entire content
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      if (scrollElement) {
        scrollElement.scrollLeft = scrollPosition;
      }
      
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('solutions.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('solutions.description')}
          </p>
        </div>

        {/* Cartes d'abonnement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.title}
              id={subscription.plan}
              className={`group relative bg-white rounded-2xl p-8
                transition-all duration-300 hover:shadow-xl hover:-translate-y-2
                flex flex-col h-[700px] border border-gray-100
                ${subscription.highlighted ? 'ring-2 ring-indigo-500/20 shadow-lg' : 'shadow-sm'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-white
                rounded-2xl transition-opacity opacity-0 group-hover:opacity-100" />

              {subscription.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold
                    tracking-wide uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                    shadow-lg">
                    {t('solutions.subscriptions.formationEtSignaux.recommended')}
                  </span>
                </div>
              )}

              <div className="relative flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-violet-600
                    transition-colors duration-300">
                    {subscription.title}
                  </h2>
                  {subscription.highlighted && (
                    <Star className="h-5 w-5 text-violet-500 animate-pulse" aria-hidden="true" />
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-4xl font-bold ${
                      subscription.highlighted 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                        : 'text-gray-900 group-hover:text-violet-600'
                    } transition-colors duration-300`}>
                      {subscription.price}
                    </span>
                    <span className="text-gray-600 ml-2">{subscription.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2 group-hover:text-violet-600
                    transition-colors duration-300">
                    {subscription.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className={`flex items-start group-hover:transform 
                      group-hover:translate-x-1 transition-transform duration-200
                      ${feature.disabled ? 'text-gray-400' : ''}`}>
                      {feature.disabled ? (
                        <X className="h-6 w-6 text-gray-400 flex-shrink-0 mr-3" aria-hidden="true" />
                      ) : (
                        <Check className="h-6 w-6 text-green-500 flex-shrink-0 mr-3 
                          group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                      )}
                      <span>
                        <span className="text-gray-600">{feature.text}</span>
                        <span className={`font-medium ${feature.disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                          {feature.highlight}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {subscription.highlighted && (
                  <div className="relative mb-6 overflow-hidden">
                    <div className="text-xs text-gray-500 mb-1">{t('solutions.subscriptions.formationEtSignaux.marketCoverage.title')}</div>
                    <div 
                      ref={cryptoScrollRef}
                      className="whitespace-nowrap overflow-hidden text-sm text-blue-600 py-2 bg-blue-50 rounded-lg px-3"
                    >
                      {cryptoList} — {cryptoList}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative mt-auto">
                <button
                  onClick={() => setSelectedPlan(subscription)}
                  className={`relative w-full py-3 px-6 rounded-xl font-medium 
                    transition-all duration-300 flex items-center justify-center
                    shadow-lg overflow-hidden ${
                    subscription.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-white border-2 border-violet-600 text-violet-600'
                  }`}
                  aria-label={t('solutions.subscribeAriaLabel', { planName: subscription.title })}
                >
                  {!subscription.highlighted && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <span className={`relative z-10 flex items-center ${
                    !subscription.highlighted ? 'group-hover:text-white' : ''
                  }`}>
                    {subscription.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-blue-100 rounded-xl inline-block mb-4">
              <Shield className="h-6 w-6 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('solutions.features.security.title')}</h3>
            <p className="text-gray-600">
              {t('solutions.features.security.description')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-purple-100 rounded-xl inline-block mb-4">
              <LineChart className="h-6 w-6 text-purple-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('solutions.features.performance.title')}</h3>
            <p className="text-gray-600">
              {t('solutions.features.performance.description')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-3 bg-green-100 rounded-xl inline-block mb-4">
              <Lock className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('solutions.features.control.title')}</h3>
            <p className="text-gray-600">
              {t('solutions.features.control.description')}
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ items={faqItems} />
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        plan={selectedPlan || subscriptions[0]}
      />
    </div>
  );
}