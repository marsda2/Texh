import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../lib/i18n';

/**
 * SEO component — injects unique <title>, <meta>, Open Graph, Twitter Cards,
 * canonical URL, hreflang, and JSON-LD Schema per route.
 *
 * Usage:
 *   <SEO />                             → Home defaults
 *   <SEO title="Local SEO" ... />       → Custom page
 *   <SEO schema={[schema1, schema2]} /> → Multiple schemas
 */
export const SEO = ({
    title,
    description,
    url,
    image = "https://texhco.com/android-chrome-512x512.png",
    schema,
    noindex = false,
}) => {
    const { language } = useLanguage();
    const es = language === 'es';

    // ── Defaults ──────────────────────────────────────────────
    const defaultTitle = es
        ? "Texh Co. | Sistemas de Crecimiento Digital para Negocios Locales"
        : "Texh Co. | Digital Growth Systems for Local Businesses";
    const defaultDescription = es
        ? "Construimos ecosistemas digitales que combinan diseño web premium, SEO local, automatización y captación de leads para hacer crecer tu negocio."
        : "We build digital ecosystems combining premium web design, local SEO, automation and lead capture to grow your local business.";

    const metaTitle = title ? `${title} | Texh Co.` : defaultTitle;
    const metaDesc = description || defaultDescription;
    const canonicalUrl = url || "https://texhco.com";

    // ── Organization Schema (always present) ──────────────────
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Texh Co.",
        "url": "https://texhco.com",
        "logo": "https://texhco.com/android-chrome-512x512.png",
        "image": "https://texhco.com/android-chrome-512x512.png",
        "description": "Local Growth Systems: premium web design, local SEO, automation and lead capture for local businesses and contractors.",
        "areaServed": [
            { "@type": "State", "name": "New Jersey" },
            { "@type": "State", "name": "New York" },
            { "@type": "AdministrativeArea", "name": "Bergen County, NJ" }
        ],
        "serviceType": [
            "Web Design",
            "Local SEO",
            "Google Business Optimization",
            "Business Automation",
            "Booking & Lead Systems",
            "Client Portal"
        ],
        "email": "hello@texhco.com",
        "sameAs": [
            "https://www.linkedin.com/company/texhco",
            "https://www.instagram.com/texhco"
        ],
        "knowsLanguage": ["en", "es"]
    };

    // Build schema array: always include org schema, plus any page-specific schemas
    const schemas = [];
    schemas.push(organizationSchema);
    if (schema) {
        if (Array.isArray(schema)) {
            schemas.push(...schema);
        } else {
            schemas.push(schema);
        }
    }

    return (
        <Helmet>
            {/* Primary */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDesc} />
            <link rel="canonical" href={canonicalUrl} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="Texh Co." />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content={es ? "es_US" : "en_US"} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={image} />

            {/* Language */}
            <html lang={language} />

            {/* JSON-LD — one script block per schema */}
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
};
