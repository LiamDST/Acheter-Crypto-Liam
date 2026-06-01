import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { siteConfig } from '../config/siteConfig';

export default function TermsOfService() {
  return (
    <>
      <SEOHead 
        title="Conditions d'Utilisation"
        description="Consultez les conditions générales d'utilisation d'Alyah Knowledge pour nos services de formation crypto et signaux de trading."
        canonicalUrl="https://alyah-knowledge.com/conditions-utilisation"
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
                <h1 className="text-4xl font-bold text-gray-900">Conditions d'Utilisation</h1>
                <FileText className="h-12 w-12 text-blue-600" />
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Préambule</h2>
                <p className="text-gray-600 leading-relaxed">
                  Les présentes conditions générales d'utilisation (ci-après les « CGU ») régissent l'accès et l'utilisation du site internet alyah-knowledge.com (ci-après le « Site ») ainsi que l'ensemble des services proposés par Alyah Knowledge (ci-après « nous », « notre » ou « nos »).
                </p>
                <p className="text-gray-600 leading-relaxed">
                  En accédant au Site et en utilisant nos services, vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Site ni nos services.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. Objet et description des services</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">1.1 Nature des services</h3>
                <p className="text-gray-600 mb-6">
                  Alyah Knowledge propose des services de formation et d'information dans le domaine des cryptomonnaies, de la blockchain et du trading, comprenant notamment :
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Des contenus éducatifs sur les cryptomonnaies et la technologie blockchain ;</li>
                  <li>Des formations en ligne sur le trading et l'investissement en cryptoactifs ;</li>
                  <li>Des signaux de trading à titre informatif et éducatif ;</li>
                  <li>Des analyses de marché et des actualités du secteur crypto ;</li>
                  <li>Un espace communautaire pour échanger sur ces thématiques.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">1.2 Avertissement sur les risques</h3>
                <div className="bg-red-50 p-6 rounded-xl mb-8 border border-red-200">
                  <h4 className="text-lg font-bold text-red-800 mb-4">⚠️ AVERTISSEMENT IMPORTANT</h4>
                  <p className="text-red-700">
                    Le trading de cryptomonnaies comporte des risques substantiels et peut entraîner la perte totale de votre capital. Les performances passées ne préjugent pas des performances futures. Les informations fournies sur notre Site ont un caractère strictement éducatif et informatif et ne constituent en aucun cas des conseils en investissement personnalisés.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. Conditions d'accès et d'inscription</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">2.1 Capacité juridique</h3>
                <p className="text-gray-600 mb-6">
                  L'utilisation de nos services est réservée aux personnes physiques ou morales ayant la capacité juridique de contracter. Les mineurs de moins de 18 ans ne sont pas autorisés à utiliser nos services sans l'autorisation et la supervision d'un parent ou tuteur légal.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">2.2 Création de compte</h3>
                <p className="text-gray-600 mb-4">
                  L'accès à certains services nécessite la création d'un compte utilisateur. Lors de votre inscription, vous vous engagez à :
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Fournir des informations exactes, complètes et à jour ;</li>
                  <li>Maintenir la confidentialité de vos identifiants de connexion ;</li>
                  <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte ;</li>
                  <li>Assumer la responsabilité de toutes les activités effectuées sous votre compte.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">2.3 Vérification d'identité</h3>
                <p className="text-gray-600 mb-6">
                  Nous nous réservons le droit de demander des documents supplémentaires pour vérifier votre identité, notamment dans le cadre de la lutte contre le blanchiment d'argent et le financement du terrorisme (LCB-FT).
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. Utilisation des services</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">3.1 Utilisations autorisées</h3>
                <p className="text-gray-600 mb-6">
                  Vous vous engagez à utiliser nos services de manière licite et conforme aux présentes CGU. L'utilisation de nos services est strictement personnelle et non commerciale, sauf accord écrit préalable de notre part.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">3.2 Utilisations interdites</h3>
                <p className="text-gray-600 mb-4">Il est strictement interdit de :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Reproduire, copier ou redistribuer nos contenus sans autorisation ;</li>
                  <li>Revendre ou commercialiser nos formations ou signaux de trading ;</li>
                  <li>Utiliser nos services à des fins illégales ou frauduleuses ;</li>
                  <li>Manipuler ou perturber le fonctionnement du Site ;</li>
                  <li>Tenter d'accéder de manière non autorisée à nos systèmes ;</li>
                  <li>Usurper l'identité d'une autre personne ou entité ;</li>
                  <li>Diffuser des contenus illicites, diffamatoires ou portant atteinte aux droits de tiers ;</li>
                  <li>Utiliser des robots, scripts ou autres moyens automatisés pour accéder au Site.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Propriété intellectuelle</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">4.1 Droits de propriété</h3>
                <p className="text-gray-600 mb-6">
                  L'ensemble des contenus présents sur le Site (textes, images, vidéos, logos, marques, logiciels, bases de données, etc.) sont protégés par les droits de propriété intellectuelle et appartiennent à Alyah Knowledge ou à ses partenaires.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">4.2 Licence d'utilisation</h3>
                <p className="text-gray-600 mb-6">
                  Nous vous accordons une licence personnelle, non exclusive, non transférable et révocable pour accéder et utiliser nos contenus à des fins personnelles et non commerciales, sous réserve du respect des présentes CGU.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">4.3 Restrictions</h3>
                <p className="text-gray-600 mb-6">
                  Toute reproduction, représentation, modification, distribution ou exploitation commerciale de nos contenus, en tout ou partie, est strictement interdite sans notre autorisation écrite préalable.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Services de formation et signaux de trading</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">5.1 Nature des informations fournies</h3>
                <p className="text-gray-600 mb-4">
                  Les formations, analyses et signaux de trading fournis sur notre Site sont de nature éducative et informative. Ils ne constituent pas :
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Des conseils en investissement personnalisés ;</li>
                  <li>Des recommandations d'achat ou de vente ;</li>
                  <li>Des garanties de performance ou de résultats.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">5.2 Responsabilité de l'utilisateur</h3>
                <p className="text-gray-600 mb-4">Vous reconnaissez que :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Vous êtes seul responsable de vos décisions d'investissement ;</li>
                  <li>Vous devez effectuer vos propres recherches avant toute prise de décision ;</li>
                  <li>Les marchés des cryptomonnaies sont extrêmement volatils ;</li>
                  <li>Vous ne devez investir que ce que vous pouvez vous permettre de perdre.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">5.3 Performances passées</h3>
                <p className="text-gray-600 mb-6">
                  Les performances passées, réelles ou simulées, ne garantissent en aucun cas les résultats futurs. Les exemples de gains présentés sont donnés à titre illustratif uniquement.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Tarifs et modalités de paiement</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">6.1 Prix des services</h3>
                <p className="text-gray-600 mb-6">
                  Les prix de nos services sont indiqués en euros (EUR) et incluent toutes les taxes applicables. Nous nous réservons le droit de modifier nos tarifs à tout moment, les modifications ne s'appliquant qu'aux nouvelles commandes.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">6.2 Moyens de paiement</h3>
                <p className="text-gray-600 mb-4">Les paiements peuvent être effectués par :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Carte bancaire (Visa, Mastercard) ;</li>
                  <li>Virement bancaire ;</li>
                  <li>PayPal ou autres solutions de paiement en ligne ;</li>
                  <li>Cryptomonnaies (Bitcoin, Ethereum, USDT) selon disponibilité.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">6.3 Abonnements</h3>
                <p className="text-gray-600 mb-4">Pour les services par abonnement :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Le paiement est prélevé automatiquement à chaque échéance ;</li>
                  <li>Vous pouvez résilier votre abonnement à tout moment ;</li>
                  <li>Aucun remboursement n'est accordé pour la période en cours.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. Droit de rétractation et remboursement</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">7.1 Droit de rétractation</h3>
                <p className="text-gray-600 mb-6">
                  Conformément au Code de la consommation français, vous disposez d'un délai de 14 jours à compter de la souscription pour exercer votre droit de rétractation, sauf si vous avez expressément renoncé à ce droit pour accéder immédiatement aux contenus numériques.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">7.2 Conditions de remboursement</h3>
                <p className="text-gray-600 mb-4">Le remboursement n'est possible que si :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Le droit de rétractation est exercé dans les délais légaux ;</li>
                  <li>Les contenus numériques n'ont pas été téléchargés ou consultés ;</li>
                  <li>Aucun signal de trading n'a été utilisé.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">7.3 Garantie satisfait ou remboursé</h3>
                <p className="text-gray-600 mb-6">
                  Certaines formations peuvent bénéficier d'une garantie satisfait ou remboursé de 30 jours. Les conditions spécifiques sont précisées sur la page de chaque formation concernée.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. Responsabilité et limitations</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">8.1 Limitation de responsabilité</h3>
                <p className="text-gray-600 mb-4">Dans les limites autorisées par la loi, nous déclinons toute responsabilité pour :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Les pertes financières résultant de l'utilisation de nos services ;</li>
                  <li>Les erreurs ou omissions dans les informations fournies ;</li>
                  <li>Les interruptions ou dysfonctionnements du Site ;</li>
                  <li>Les dommages indirects de quelque nature que ce soit ;</li>
                  <li>Les actions de tiers ou cas de force majeure.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">8.2 Indemnisation</h3>
                <p className="text-gray-600 mb-6">
                  Vous acceptez de nous indemniser et de nous dégager de toute responsabilité en cas de réclamation résultant de votre utilisation non conforme de nos services ou de votre violation des présentes CGU.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. Données personnelles et confidentialité</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">9.1 Protection des données</h3>
                <p className="text-gray-600 mb-6">
                  La collecte et le traitement de vos données personnelles sont régis par notre <Link to="/politique-de-confidentialite" className="text-blue-600 hover:text-blue-800">Politique de Confidentialité</Link>, que nous vous invitons à consulter.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">9.2 Confidentialité des contenus</h3>
                <p className="text-gray-600 mb-6">
                  Vous vous engagez à maintenir la confidentialité des contenus exclusifs auxquels vous avez accès (formations premium, signaux VIP, etc.) et à ne pas les partager avec des tiers.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">10. Communauté et contenus utilisateurs</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">10.1 Règles de la communauté</h3>
                <p className="text-gray-600 mb-4">En participant à notre communauté (forums, chats, commentaires), vous vous engagez à :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Respecter les autres membres ;</li>
                  <li>Ne pas publier de contenus offensants ou inappropriés ;</li>
                  <li>Ne pas faire de publicité non autorisée ;</li>
                  <li>Ne pas diffuser de fausses informations.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4">10.2 Modération</h3>
                <p className="text-gray-600 mb-6">
                  Nous nous réservons le droit de modérer, modifier ou supprimer tout contenu qui violerait nos règles communautaires, sans préavis ni justification.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">11. Modifications et résiliation</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">11.1 Modifications des CGU</h3>
                <p className="text-gray-600 mb-6">
                  Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le Site. Votre utilisation continue des services après modification vaut acceptation des nouvelles conditions.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">11.2 Résiliation</h3>
                <p className="text-gray-600 mb-4">Nous pouvons suspendre ou résilier votre accès à nos services en cas de :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Violation des présentes CGU ;</li>
                  <li>Comportement frauduleux ou illégal ;</li>
                  <li>Non-paiement des services souscrits ;</li>
                  <li>Atteinte à la sécurité ou à l'intégrité de nos systèmes.</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">12. Dispositions générales</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">12.1 Intégralité de l'accord</h3>
                <p className="text-gray-600 mb-6">
                  Les présentes CGU constituent l'intégralité de l'accord entre vous et Alyah Knowledge concernant l'utilisation de nos services.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">12.2 Divisibilité</h3>
                <p className="text-gray-600 mb-6">
                  Si une disposition des présentes CGU est jugée invalide ou inapplicable, les autres dispositions resteront en vigueur.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">12.3 Non-renonciation</h3>
                <p className="text-gray-600 mb-6">
                  Le fait de ne pas exercer un droit ou de ne pas exiger l'exécution d'une obligation ne constitue pas une renonciation à ce droit ou à cette obligation.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">13. Loi applicable et juridiction</h2>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">13.1 Loi applicable</h3>
                <p className="text-gray-600 mb-6">
                  Les présentes CGU sont régies par le droit français, sans préjudice des dispositions impératives de protection des consommateurs applicables dans votre pays de résidence.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">13.2 Règlement des litiges</h3>
                <p className="text-gray-600 mb-4">En cas de litige :</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Nous privilégions d'abord une résolution amiable ;</li>
                  <li>Vous pouvez recourir à une médiation conformément aux dispositions du Code de la consommation ;</li>
                  <li>À défaut d'accord, les tribunaux français seront compétents.</li>
                </ul>

                <div className="bg-blue-50 p-6 rounded-xl mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Plateforme de médiation :</h4>
                  <p className="text-gray-700 mb-4">
                    Conformément à l'article L.616-1 du Code de la consommation, vous pouvez recourir gratuitement au service de médiation MEDICYS dont nous relevons :
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Site internet :</strong> www.medicys.fr</li>
                    <li><strong>Par voie postale :</strong> MEDICYS - 73 Boulevard de Clichy, 75009 Paris</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">14. Contact</h2>
                <p className="text-gray-600 mb-6">
                  Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter :
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6 my-6">
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      📧 <strong>Email</strong> : <a href={`mailto:${siteConfig.contact.email}`} 
                      className="text-blue-600 hover:text-blue-800">{siteConfig.contact.email}</a>
                    </p>
                    <p className="text-gray-900">
                      📱 <strong>Instagram</strong> : <a href={siteConfig.socialLinks.instagram} 
                      target="_blank\" rel="noopener noreferrer\" className="text-blue-600 hover:text-blue-800">
                        alyah.knowledge
                      </a>
                    </p>
                    <p className="text-gray-900">
                      🌐 <strong>Site web</strong> : <a href={siteConfig.organization.url} 
                      className="text-blue-600 hover:text-blue-800">{siteConfig.organization.url}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}