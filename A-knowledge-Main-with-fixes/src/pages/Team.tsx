import React from 'react';
import { Shield, LineChart, Lock, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

// Images depuis le stockage Supabase ou URLs externes
const jordanImage = "https://zythhpgukkgavtgsudqe.supabase.co/storage/v1/object/public/images-public/Jordan-chekroun-CEO-AlyahKnowledge-crpypto-formation-investissement-plateforme.jpg";
const yoannImage = "https://zythhpgukkgavtgsudqe.supabase.co/storage/v1/object/public/images-public/Yoann-hadjadj.jpg";

const getValuesArray = (t: (key: string) => string) => [
  { id: 1, text: t('team.values.integrity'), gradient: "from-blue-600 via-cyan-600 to-teal-600" },
  { id: 2, text: t('team.values.excellence'), gradient: "from-purple-600 via-pink-600 to-red-600" },
  { id: 3, text: t('team.values.innovation'), gradient: "from-orange-600 via-amber-600 to-yellow-600" },
  { id: 4, text: t('team.values.transparency'), gradient: "from-emerald-600 via-green-600 to-lime-600" },
  { id: 5, text: t('team.values.trust'), gradient: "from-indigo-600 via-violet-600 to-purple-600" },
  { id: 6, text: t('team.values.performance'), gradient: "from-rose-600 via-pink-600 to-fuchsia-600" },
  { id: 7, text: t('team.values.expertise'), gradient: "from-cyan-600 via-blue-600 to-indigo-600" },
  { id: 8, text: t('team.values.kindness'), gradient: "from-violet-600 via-purple-600 to-fuchsia-600" },
  { id: 9, text: t('team.values.commitment'), gradient: "from-amber-600 via-orange-600 to-red-600" },
  { id: 10, text: t('team.values.collaboration'), gradient: "from-teal-600 via-emerald-600 to-green-600" },
  { id: 11, text: t('team.values.adaptability'), gradient: "from-blue-600 via-indigo-600 to-violet-600" },
  { id: 12, text: t('team.values.resilience'), gradient: "from-pink-600 via-rose-600 to-red-600" },
  { id: 13, text: t('team.values.proactivity'), gradient: "from-green-600 via-emerald-600 to-teal-600" },
  { id: 14, text: t('team.values.authenticity'), gradient: "from-purple-600 via-violet-600 to-indigo-600" },
  { id: 15, text: t('team.values.responsibility'), gradient: "from-red-600 via-orange-600 to-amber-600" },
  { id: 16, text: t('team.values.creativity'), gradient: "from-fuchsia-600 via-pink-600 to-rose-600" },
  { id: 17, text: t('team.values.determination'), gradient: "from-cyan-600 via-teal-600 to-emerald-600" },
  { id: 18, text: t('team.values.passion'), gradient: "from-violet-600 via-purple-600 to-pink-600" },
  { id: 19, text: t('team.values.ambition'), gradient: "from-amber-600 via-yellow-600 to-lime-600" },
  { id: 20, text: t('team.values.leadership'), gradient: "from-indigo-600 via-blue-600 to-cyan-600" },
  { id: 21, text: t('team.values.synergy'), gradient: "from-rose-600 via-red-600 to-orange-600" },
  { id: 22, text: t('team.values.dynamism'), gradient: "from-emerald-600 via-teal-600 to-cyan-600" },
  { id: 23, text: t('team.values.perseverance'), gradient: "from-purple-600 via-indigo-600 to-blue-600" },
  { id: 24, text: t('team.values.vision'), gradient: "from-orange-600 via-amber-600 to-yellow-600" },
  { id: 25, text: t('team.values.boldness'), gradient: "from-fuchsia-600 via-purple-600 to-violet-600" },
  { id: 26, text: t('team.values.ethics'), gradient: "from-teal-600 via-green-600 to-emerald-600" },
  { id: 27, text: t('team.values.agility'), gradient: "from-pink-600 via-fuchsia-600 to-purple-600" },
  { id: 28, text: t('team.values.cohesion'), gradient: "from-blue-600 via-cyan-600 to-teal-600" },
  { id: 29, text: t('team.values.growth'), gradient: "from-violet-600 via-indigo-600 to-blue-600" },
  { id: 30, text: t('team.values.professional_excellence'), gradient: "from-red-600 via-orange-600 to-amber-600" }
];

export default function Team() {
  const { t } = useTranslation();
  const location = useLocation();

  // Helper function to get current language from URL
  const getCurrentLang = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    return pathSegments[0] === 'en' ? 'en' : 'fr';
  };

  const currentLang = getCurrentLang();
  const langPrefix = currentLang === 'en' ? '/en' : '';

  // Get translated values array
  const values = getValuesArray(t);

  return (
    <>
      <SEOHead
        path="/team"
        title={t('team.seo.title')}
        description={t('team.seo.description')}
      />
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Jordan Chekroun Section */}
        <div className="text-center mb-20">
          <div className="mb-8 relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full shadow-xl border-4 border-white overflow-hidden">
              <img
                src={jordanImage}
                alt="Jordan Chekroun"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jordan Chekroun</h1>
          <p className="text-xl text-blue-600 font-semibold mb-6">{t('team.jordan.title')}</p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('team.jordan.intro')}
          </p>
        </div>

        {/* Jordan's Parcours Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('team.jordan.journey.title')}</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              {t('team.jordan.journey.paragraph1')}
            </p>
            <p className="mb-6">
              {t('team.jordan.journey.paragraph2')}
            </p>
            <p className="mb-6">
              {t('team.jordan.journey.paragraph3')}
            </p>
            <p className="mb-6">
              {t('team.jordan.journey.paragraph4')}
            </p>
            <p className="mb-6">
              {t('team.jordan.journey.paragraph5')}
            </p>
            <p>
              {t('team.jordan.journey.paragraph6')}
            </p>
          </div>
        </div>

        {/* Yoann Hadjadj Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="mb-8">
              <img
                src={yoannImage}
                alt="Yoann Hadjadj"
                className="w-48 h-48 rounded-full mx-auto object-cover shadow-xl border-4 border-white"
              />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Yoann Hadjadj</h2>
            <p className="text-xl text-blue-600 font-semibold mb-6">
              {t('team.yoann.title')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                {t('team.yoann.bio.paragraph1')}
              </p>
              <p className="mb-6">
                {t('team.yoann.bio.paragraph2')}
              </p>
              <p className="mb-6">
                {t('team.yoann.bio.paragraph3')}
              </p>
              <p className="mb-6 font-semibold">
                {t('team.yoann.bio.paragraph4')}
              </p>
              <p className="mb-6">
                {t('team.yoann.bio.paragraph5')}
              </p>
              <p className="mb-6 font-semibold">
                {t('team.yoann.bio.paragraph6')}
              </p>
              <p className="mb-6 font-semibold">
                {t('team.yoann.bio.paragraph7')}
              </p>
              <p className="font-semibold">
                {t('team.yoann.bio.paragraph8')}
              </p>
            </div>
          </div>
        </div>

        {/* Julien Ribardière Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="mb-8">
              <div className="w-48 h-48 rounded-full mx-auto bg-gradient-to-br from-purple-100 to-pink-100 
                flex items-center justify-center shadow-xl border-4 border-white">
                <MessageSquare className="w-24 h-24 text-purple-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Julien Ribardière</h2>
            <p className="text-xl text-purple-600 font-semibold mb-6">
              {t('team.julien.title')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                {t('team.julien.bio.paragraph1')}
              </p>
              <p className="mb-6">
                {t('team.julien.bio.paragraph2')}
              </p>
              <p className="mb-6">
                {t('team.julien.bio.paragraph3')}
              </p>
              <p className="mb-8">
                {t('team.julien.bio.paragraph4')}
              </p>
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700 mb-16">
                {t('team.julien.quote')}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Values Display */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 mb-16">
          <div className="flex flex-wrap justify-center gap-6">
            {values.map((value) => (
              <span
                key={value.id}
                className={`text-xl font-semibold bg-gradient-to-r ${value.gradient} 
                  bg-clip-text text-transparent transition-all duration-300 hover:scale-110`}
              >
                {value.text}
              </span>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('team.vision.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-blue-600">
                  {t('team.vision.security.title')}
                </h3>
              </div>
              <p className="text-gray-600">
                {t('team.vision.security.description')}
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <LineChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-purple-600">
                  {t('team.vision.performance.title')}
                </h3>
              </div>
              <p className="text-gray-600">
                {t('team.vision.performance.description')}
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-xl mr-4 
                  transition-transform duration-300 group-hover:scale-110">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 
                  transition-colors duration-300 group-hover:text-green-600">
                  {t('team.vision.transparency.title')}
                </h3>
              </div>
              <p className="text-gray-600">
                {t('team.vision.transparency.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}