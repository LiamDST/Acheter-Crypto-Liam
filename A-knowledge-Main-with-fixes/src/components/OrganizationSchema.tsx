import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/siteConfig';

export default function OrganizationSchema() {
  const { organization, socialLinks, contact } = siteConfig;
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organization.name,
    "legalName": organization.legalName,
    "url": organization.url,
    "description": organization.description,
    "sameAs": [
      socialLinks.linkedin,
      socialLinks.x,
      socialLinks.youtube,
      socialLinks.instagram,
      socialLinks.threads,
      socialLinks.tiktok,
      socialLinks.telegram
    ],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": contact.email,
      "url": contact.supportUrl,
      "availableLanguage": contact.availableLanguages
    }],
    "foundingDate": organization.foundingDate,
    "founder": {
      "@type": "Person",
      "name": organization.founderName
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": organization.addressCountry
    },
    "areaServed": {
      "@type": "Country",
      "name": organization.areaServedName
    },
    "knowsAbout": organization.knowsAbout,
    "serviceType": organization.serviceType,
    "logo": {
      "@type": "ImageObject",
      "url": organization.logo,
      "width": 512,
      "height": 512
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
}