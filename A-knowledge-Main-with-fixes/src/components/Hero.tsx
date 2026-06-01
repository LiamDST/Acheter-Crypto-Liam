import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Mission from './Mission';
import ParticleBackground from './ParticleBackground';
import iPhone from './iPhone';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  
  const getCurrentLang = () => {
    const pathLang = location.pathname.match(/^\/(fr|en)/)?.[1];
    return pathLang || (i18n.language?.startsWith('fr') ? 'fr' : 'en');
  };
  
  const currentLang = getCurrentLang();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <>
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <ParticleBackground />
        <iPhone position="left" />
        <iPhone position="right" delay={0.2} />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        
        <motion.div
          style={{ y: springY, opacity: springOpacity, scale: springScale }}
          className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24"
        >
          <div className="relative z-10 max-w-4xl mx-auto">
            <main className="text-center">
              <div className="space-y-12 md:space-y-16 lg:space-y-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                    tracking-tight text-gray-900 animate-fade-in-up"
                  >
                    {t('hero.title')}
                    <span className="block bg-gradient-to-r from-pink-600 via-orange-600 to-yellow-600 
                      bg-clip-text text-transparent animate-pulse">
                      {t('hero.titleHighlight')}
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl sm:text-2xl text-gray-500 max-w-3xl mx-auto"
                >
                  {t('hero.subtitle')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row justify-center items-center gap-4 
                    sm:gap-8 animate-fade-in-up delay-150"
                >
                  <Link
                    to={`/${currentLang}/solutions/formation-cryptomonnaie/tarification`}
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center 
                      px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 
                      to-purple-600 rounded-4xl overflow-hidden transition-all duration-300 
                      hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 
                      shadow-lg hover:shadow-xl active:translate-y-0 active:shadow-md"
                  >
                    <span className="relative z-10 flex items-center justify-center w-full">
                      {t('hero.discoverSolutions')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform 
                        group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <Link
                    to={`/${currentLang}/formation/comprendre-la-crypto`}
                    className="w-full sm:w-auto group relative inline-flex items-center justify-center 
                      px-8 py-4 text-lg font-medium text-gray-800 bg-white border-2 
                      border-gray-200 rounded-4xl hover:border-blue-500 transform 
                      hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl 
                      active:translate-y-0 active:shadow-md"
                  >
                    <span className="relative z-10 flex items-center justify-center w-full 
                      bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {t('hero.tradingTraining')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform 
                        group-hover:translate-x-1 text-gray-800" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>

      <Mission />
    </>
  );
}