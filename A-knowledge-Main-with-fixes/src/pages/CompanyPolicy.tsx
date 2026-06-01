import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Clock, Users, Heart, Shield, Leaf, Lock } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function CompanyPolicy() {
  return (
    <>
      <SEOHead 
        title="Politique d'Entreprise"
        description="Découvrez la politique d'entreprise d'Alyah Knowledge : télétravail, flexibilité, inclusion, diversité, bien-être au travail, éthique et responsabilité environnementale."
        canonicalUrl="https://alyah-knowledge.com/politique-entreprise"
      />
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 
              transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Politique d'Entreprise</h1>
                <Briefcase className="h-12 w-12 text-blue-600" />
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  Chez Alyah Knowledge, nous croyons que la réussite collective repose sur des valeurs fortes : 
                  flexibilité, innovation, respect, éthique et engagement. Notre politique d'entreprise vise à 
                  créer un environnement professionnel épanouissant, inclusif et responsable, en cohérence avec 
                  notre vision de l'investissement et de la formation dans le secteur digital.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                  1. Flexibilité et organisation du travail
                </h2>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Télétravail prioritaire</h3>
                <p className="text-gray-600 mb-6">
                  En tant que plateforme digitale, Alyah Knowledge privilégie le télétravail et le travail à distance. 
                  Nos équipes opèrent principalement en remote, en France et à l'international, grâce à des outils 
                  collaboratifs modernes et des réunions régulières en visioconférence.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Espaces de coworking</h3>
                <p className="text-gray-600 mb-6">
                  Nous offrons la possibilité d'accéder à des espaces de coworking pour celles et ceux qui le 
                  souhaitent, selon leur lieu de résidence.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Horaires flexibles</h3>
                <p className="text-gray-600 mb-6">
                  Chacun gère son emploi du temps en autonomie, dans le respect des objectifs collectifs et des 
                  besoins de nos clients.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Users className="h-6 w-6 text-purple-600" />
                  2. Inclusion, diversité & égalité des chances
                </h2>

                <p className="text-gray-600 mb-6">
                  Alyah Knowledge s'engage à promouvoir une culture inclusive, ouverte à toutes les origines, 
                  identités et parcours. Nous valorisons la diversité, l'égalité des chances et l'absence de 
                  discrimination à toutes les étapes de la vie professionnelle.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-green-600" />
                  3. Développement professionnel & formation continue
                </h2>

                <p className="text-gray-600 mb-6">
                  Nous encourageons l'apprentissage permanent, en proposant :
                </p>

                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Des formations internes et externes régulières</li>
                  <li>L'accès à des ressources d'auto-formation</li>
                  <li>L'accompagnement dans la montée en compétences de chaque collaborateur</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-600" />
                  4. Bien-être et équilibre vie professionnelle/vie personnelle
                </h2>

                <p className="text-gray-600 mb-6">
                  Le bien-être des membres de notre équipe est une priorité. Nous favorisons l'équilibre entre 
                  vie professionnelle et vie privée, l'écoute et la prévention des situations de surcharge. 
                  Des moments de convivialité, même à distance, sont organisés régulièrement.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-indigo-600" />
                  5. Éthique, transparence & conformité
                </h2>

                <p className="text-gray-600 mb-6">
                  Nous agissons avec intégrité et transparence dans toutes nos relations professionnelles, 
                  en conformité avec la législation et les meilleures pratiques du secteur.
                  Nous veillons à la protection des données, à la confidentialité des informations et au 
                  respect de nos engagements vis-à-vis de nos clients et partenaires.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                  6. Responsabilité environnementale
                </h2>

                <p className="text-gray-600 mb-6">
                  Conscients de notre impact, même en tant qu'acteur digital, nous cherchons à limiter notre empreinte :
                </p>

                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Privilégier les outils numériques écoresponsables</li>
                  <li>Réduire nos déplacements</li>
                  <li>Sensibiliser notre équipe aux bonnes pratiques environnementales</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Lock className="h-6 w-6 text-orange-600" />
                  7. Sécurité & confidentialité
                </h2>

                <p className="text-gray-600 mb-6">
                  La sécurité des données, la confidentialité des échanges et la protection des informations 
                  de nos clients et collaborateurs sont essentielles. Nous appliquons les normes les plus 
                  strictes en la matière, et sensibilisons nos équipes à ces enjeux.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                  En résumé
                </h2>

                <p className="text-gray-600 mb-6">
                  Alyah Knowledge place l'humain, l'éthique et la flexibilité au cœur de sa politique d'entreprise, 
                  afin de bâtir un environnement de travail moderne, responsable et porteur de sens, au service 
                  de la réussite de tous. Pour en savoir plus sur nos valeurs, consultez notre page <Link to="/values" className="text-blue-600 hover:text-blue-800">Nos valeurs</Link>.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-xl mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Découvrez également</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/team" className="text-blue-600 hover:text-blue-800 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Notre équipe et nos experts
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="text-blue-600 hover:text-blue-800 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2" />
                        À propos d'Alyah Knowledge
                      </Link>
                    </li>
                    <li>
                      <Link to="/politique-de-confidentialite" className="text-blue-600 hover:text-blue-800 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Notre politique de confidentialité
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}