import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/siteConfig';

interface ArticleSchemaProps {
  title: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}

export default function ArticleSchema({
  title,
  description,
  imageUrl,
  datePublished,
  dateModified,
  authorName
}: ArticleSchemaProps) {
  const { organization, socialLinks, seo } = siteConfig;
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': window.location.href,
    headline: title,
    description: description,
    image: imageUrl,
    thumbnailUrl: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
    wordCount: description.split(' ').length * 10, // Estimation basée sur la description
    timeRequired: `PT${Math.ceil(description.split(' ').length / 200)}M`, // Temps de lecture estimé
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href
    },
    author: {
      '@type': 'Person',
      name: authorName,
      url: `${organization.url}team`,
      sameAs: [
        socialLinks.x,
        socialLinks.youtube,
        socialLinks.instagram,
        socialLinks.telegram
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: organization.name,
      url: organization.url,
      sameAs: [
        socialLinks.x,
        socialLinks.youtube,
        socialLinks.instagram,
        socialLinks.threads,
        socialLinks.linkedin,
        socialLinks.tiktok,
        socialLinks.telegram
      ],
      logo: {
        '@type': 'ImageObject',
        url: seo.favicon,
        width: 512,
        height: 512
      }
    },
    isPartOf: {
      '@type': 'Blog',
      name: `Blog ${organization.name}`,
      url: `${organization.url}articles`
    },
    inLanguage: 'fr-FR',
    about: {
      '@type': 'Thing',
      name: 'Cryptomonnaies',
      description: 'Investissement et trading en cryptomonnaies'
    },
    mentions: [
      {
        '@type': 'Thing',
        name: 'Bitcoin',
        sameAs: 'https://fr.wikipedia.org/wiki/Bitcoin'
      },
      {
        '@type': 'Thing',
        name: 'Ethereum',
        sameAs: 'https://fr.wikipedia.org/wiki/Ethereum'
      },
      {
        '@type': 'Thing',
        name: 'Blockchain',
        sameAs: 'https://fr.wikipedia.org/wiki/Blockchain'
      }
    ],
    keywords: 'crypto, bitcoin, ethereum, blockchain, trading, investissement',
    articleSection: 'Finance et Cryptomonnaies',
    genre: 'Éducation financière',
    audience: {
      '@type': 'Audience',
      audienceType: 'Investisseurs en cryptomonnaies'
    }
  };

  // Schema pour les articles recommandés (BreadcrumbList)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://alyah-knowledge.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://alyah-knowledge.com/articles'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: window.location.href
      }
    ]
  };
  
  return (
    <Helmet>
      {/* Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Additional SEO meta tags */}
      <meta name="article:author" content={authorName} />
      <meta name="article:published_time" content={datePublished} />
      <meta name="article:modified_time" content={dateModified} />
      <meta name="article:section" content="Finance et Cryptomonnaies" />
      <meta name="article:tag" content="crypto, bitcoin, ethereum, blockchain, trading, investissement" />
    </Helmet>
  );
}