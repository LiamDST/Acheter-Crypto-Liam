import React from 'react';
import { Helmet } from 'react-helmet-async';

interface CourseSchemaProps {
  name: string;
  description: string;
  isAccessibleForFree?: boolean;
  cssSelector?: string;
}

export default function CourseSchema({
  name,
  description,
  isAccessibleForFree = false,
  cssSelector = ".contenu-module-payant"
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Alyah Knowledge"
    },
    "isAccessibleForFree": isAccessibleForFree.toString(),
    "hasPart": {
      "@type": "WebPageElement",
      "isAccessibleForFree": isAccessibleForFree.toString(),
      "cssSelector": cssSelector
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}