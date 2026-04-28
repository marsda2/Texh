import React from 'react';
import { MapPin } from 'lucide-react';
import ServicePage from '../ServicePage';

const LocalSEOPage = () => (
    <ServicePage
        slug="local-seo"
        titleEn="Local SEO for Small Businesses That Need More Calls"
        titleEs="SEO Local para Negocios que Necesitan Más Llamadas"
        descEn="We structure your business so Google, Maps, and AI search engines understand your services, find your location, and recommend you to nearby customers."
        descEs="Estructuramos tu negocio para que Google, Maps y los buscadores con IA entiendan tus servicios, encuentren tu ubicación y te recomienden a clientes cercanos."
        metaTitleEn="Local SEO for Small Businesses"
        metaTitleEs="SEO Local para Negocios Pequeños"
        metaDescEn="Local SEO strategy to rank in Google Maps and local search results for service-based businesses. Serving NJ, NY and beyond."
        metaDescEs="Estrategia de SEO local para posicionar en Google Maps y resultados locales para negocios de servicios."
        icon={MapPin}
        features={[
            { en: "Google Business Profile optimization and management", es: "Optimización y gestión de Google Business Profile" },
            { en: "Local keyword research and on-page SEO", es: "Investigación de keywords locales y SEO on-page" },
            { en: "NAP consistency across all directories", es: "Consistencia de NAP en todos los directorios" },
            { en: "Content structured for AI Overviews and voice search", es: "Contenido estructurado para AI Overviews y búsqueda por voz" },
            { en: "Review management strategy", es: "Estrategia de gestión de reseñas" },
            { en: "Monthly ranking reports and recommendations", es: "Informes mensuales de posicionamiento y recomendaciones" },
        ]}
        faqs={[
            {
                questionEn: "How long does it take to see results with local SEO?",
                questionEs: "¿Cuánto tiempo tarda en verse resultados con SEO local?",
                answerEn: "Most local businesses start seeing measurable improvements in Google Maps visibility within 60-90 days of consistent optimization. Some competitive markets may take longer.",
                answerEs: "La mayoría de negocios locales empiezan a ver mejoras medibles en visibilidad de Google Maps en 60-90 días de optimización consistente. Algunos mercados más competitivos pueden tardar más."
            },
            {
                questionEn: "How do I get more calls from Google Maps?",
                questionEs: "¿Cómo consigo más llamadas desde Google Maps?",
                answerEn: "By optimizing your Google Business Profile with accurate categories, complete services, regular posts, quality photos, and a consistent review strategy. We handle all of this as part of our Local Growth System.",
                answerEs: "Optimizando tu perfil de Google Business con categorías precisas, servicios completos, publicaciones regulares, fotos de calidad y una estrategia consistente de reseñas. Nosotros gestionamos todo esto como parte de nuestro Sistema de Crecimiento Local."
            },
            {
                questionEn: "What is local SEO and how is it different from regular SEO?",
                questionEs: "¿Qué es el SEO local y en qué se diferencia del SEO normal?",
                answerEn: "Local SEO focuses on ranking your business for searches with local intent — like 'plumber near me' or 'best barbershop in Bergen County'. It involves Google Maps, local directories, reviews, and location-specific content, rather than just website keywords.",
                answerEs: "El SEO local se enfoca en posicionar tu negocio para búsquedas con intención local — como 'fontanero cerca de mí' o 'mejor peluquería en Bergen County'. Incluye Google Maps, directorios locales, reseñas y contenido específico de ubicación, no solo palabras clave en la web."
            },
            {
                questionEn: "Do I need a website for local SEO to work?",
                questionEs: "¿Necesito una web para que funcione el SEO local?",
                answerEn: "A Google Business Profile alone can get you some visibility, but a website dramatically increases your chances of ranking. Google cross-references your website content with your Business Profile to validate relevance and authority.",
                answerEs: "Solo un perfil de Google Business puede darte algo de visibilidad, pero una web aumenta dramáticamente tus posibilidades de posicionar. Google cruza el contenido de tu web con tu perfil de Business para validar relevancia y autoridad."
            },
        ]}
    />
);

export default LocalSEOPage;
