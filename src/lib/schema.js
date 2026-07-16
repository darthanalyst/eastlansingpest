import { site } from "../data/site.js";

const BASE = site.url;

export function orgNode() {
  return {
    "@context": "https://schema.org",
    "@type": "PestControlBusiness",
    "@id": `${BASE}/#business`,
    name: site.brand,
    image: `${BASE}/images/hero.jpg`,
    url: `${BASE}/`,
    telephone: site.phoneE164,
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "East Lansing" },
      { "@type": "AdministrativeArea", name: site.county },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.centroid.lat,
      longitude: site.centroid.lng,
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "21:00",
    }],
  };
}

export function websiteNode() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: `${BASE}/`,
    name: site.brand,
    publisher: { "@id": `${BASE}/#business` },
  };
}

export function itemListNode(items) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${BASE}${it.path}`,
    })),
  };
}

export function serviceNode({ name, serviceType, description, path, cities }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: serviceType || "Pest control",
    description,
    url: `${BASE}${path}`,
    provider: { "@id": `${BASE}/#business` },
    areaServed: (cities && cities.length ? cities : ["East Lansing"]).map((c) => ({ "@type": "City", name: c })),
  };
}

export function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}

export function faqNode(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
