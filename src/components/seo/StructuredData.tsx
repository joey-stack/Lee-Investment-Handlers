import React from "react";

export const StructuredData: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "LEE Investment Handlers",
    "alternateName": "Lee Wealth Management",
    "url": "https://www.leeinvestmenthandlers.com",
    "logo": "https://www.leeinvestmenthandlers.com/icon.png",
    "image": "https://www.leeinvestmenthandlers.com/og-image.png",
    "description": "Disciplined wealth management and portfolio management strategies operating across Lagos, Nigeria and Venice, Italy.",
    "telephone": "+2349129243211",
    "email": "info@leeinvestmenthandlers.com",
    "priceRange": "$$$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "#12B Obadare Close, Santos Estate, Akowonjo",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Via Belfiore 23A",
        "postalCode": "30020",
        "addressLocality": "Venice",
        "addressCountry": "IT"
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/lee-investment-handlers",
      "https://x.com/lee_investments",
      "https://instagram.com/lee_investments"
    ],
    "knowsAbout": [
      "Wealth Management",
      "Portfolio Management",
      "Retirement Planning",
      "Alternative Investments",
      "Institutional Investments",
      "Capital Preservation"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
