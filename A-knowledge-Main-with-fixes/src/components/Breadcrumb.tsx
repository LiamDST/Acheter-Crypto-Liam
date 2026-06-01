import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function segmentToName(segment: string, t: any) {
  const nameMap: Record<string, string> = {
    '': t('breadcrumb.home'),
    about: t('breadcrumb.about'),
    team: t('breadcrumb.team'),
    support: t('breadcrumb.support'),
    values: t('breadcrumb.values'),
    solutions: t('breadcrumb.solutions'),
    'marche-cryptomonnaies-temps-reel': t('breadcrumb.market'),
    dictionnaire: t('breadcrumb.dictionary'),
    'dictionnaire-crypto': t('breadcrumb.dictionary'),
    articles: t('breadcrumb.articles'),
    formation: t('breadcrumb.training'),
    'comprendre-la-crypto': t('breadcrumb.understandCrypto')
  };
  return nameMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();
  const pathSegments = location.pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);

  const items = pathSegments.map((segment, index) => {
    const url = '/' + pathSegments.slice(0, index + 1).join('/');
    return {
      name: segmentToName(segment, t),
      url
    };
  });

  // Prepend home
  const breadcrumbItems = [{ name: t('breadcrumb.home'), url: '/' }, ...items];

  // Hide breadcrumb completely on all pages
  return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://alyah-knowledge.com${item.url}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="text-sm mb-4">
        <ol className="flex flex-wrap gap-1">
          {breadcrumbItems.map((item, index) => (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 && <span>/</span>}
              {index < breadcrumbItems.length - 1 ? (
                <Link to={item.url} className="text-blue-600 hover:underline">
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-gray-500">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
