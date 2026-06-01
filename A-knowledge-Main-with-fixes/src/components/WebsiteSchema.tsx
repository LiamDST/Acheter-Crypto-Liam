import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://alyah-knowledge.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://alyah-knowledge.com/search?q={query}",
      "query-input": "required name=query"
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
