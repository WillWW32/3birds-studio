/**
 * LocalBusiness JSON-LD structured data for 3 Birds Studio.
 * Helps Google render rich snippets in Local Pack + Knowledge Graph.
 * Drop on the home page (and optionally landing pages).
 */
export default function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    // LocalBusiness must LEAD: parsers and AI assistants key on the primary
    // @type to confirm who and where the business is. With "Photograph" as
    // the primary type this read as a creative work, not a business.
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": "https://3birdsstudio.com/#organization",
    additionalType: "Photograph",
    name: "3 Birds Studio",
    image: [
      "https://3birdsstudio.com/images/summer-banner.jpg",
      "https://3birdsstudio.com/images/hero-portrait.jpg",
    ],
    description:
      "Fine art portrait photography in Missoula, Montana. Outdoor sessions at Council Grove State Park and Legacy studio sessions.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "6850 Mullan Way",
      addressLocality: "Missoula",
      addressRegion: "MT",
      postalCode: "59808",
      addressCountry: "US",
    },
    telephone: "+1-406-239-3442",
    url: "https://3birdsstudio.com",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/3birdsstudio",
      "https://www.instagram.com/3.birds.studio",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "100",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
