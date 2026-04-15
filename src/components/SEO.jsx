import { useEffect } from 'react';

export default function SEO({ title, description, keywords, schemaType = "Website" }) {
  useEffect(() => {
    // Update Title - Avoid doubling the brand name if it's already in the prop
    const baseTitle = "Republic Printing";
    const fullTitle = title && title.includes(baseTitle) ? title : (title ? `${title} | ${baseTitle}` : baseTitle);
    document.title = fullTitle;

    // Update Description
    const metaDescription = document.querySelector('meta[name="description"]');
    const defaultDesc = "Republic Printing is located in Ashburn, Virginia, offering high-performance printers, ink, toner, and nationwide shipping.";
    const finalDesc = description || defaultDesc;
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDesc);
    }

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || "Business Printers, Ink, Printer Service, Ashburn Virginia");

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    // Add Schema.org JSON-LD
    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": schemaType === "Product" ? "Product" : "Organization",
      "name": "Republic Printing",
      "url": "https://republicprinting.shop",
      "logo": "https://republicprinting.shop/logo/logo.png",
      "description": finalDesc,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1710 2nd Ave N",
        "addressLocality": "Birmingham",
        "addressRegion": "AL",
        "postalCode": "35203",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@republicprinting.shop"
      }
    };

    script.text = JSON.stringify(schemaData);

  }, [title, description, keywords, schemaType]);

  return null;
}

