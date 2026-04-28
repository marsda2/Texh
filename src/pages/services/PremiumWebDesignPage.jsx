import React from 'react';
import { Code } from 'lucide-react';
import ServicePage from '../ServicePage';

const PremiumWebDesignPage = () => (
    <ServicePage
        slug="premium-web-design"
        titleEn="Premium Web Design That Converts Visitors Into Clients"
        titleEs="Diseño Web Premium que Convierte Visitantes en Clientes"
        descEn="Fast, mobile-first websites built to project the true quality of your business and turn traffic into real revenue. No templates. No shortcuts."
        descEs="Webs rápidas y mobile-first construidas para proyectar la calidad real de tu negocio y convertir tráfico en ingresos reales. Sin plantillas. Sin atajos."
        metaTitleEn="Premium Web Design for Local Businesses"
        metaTitleEs="Diseño Web Premium para Negocios Locales"
        metaDescEn="Custom web design and development for local businesses, contractors and service providers. Mobile-first, fast, conversion-optimized. Serving NJ & NY."
        metaDescEs="Diseño y desarrollo web a medida para negocios locales y proveedores de servicios. Mobile-first, rápido, optimizado para conversión."
        icon={Code}
        features={[
            { en: "Custom design aligned with your brand — no templates", es: "Diseño personalizado alineado con tu marca — sin plantillas" },
            { en: "Mobile-first responsive development (90%+ of local searches are mobile)", es: "Desarrollo responsive mobile-first (90%+ de búsquedas locales son móvil)" },
            { en: "Core Web Vitals optimized for Google ranking signals", es: "Core Web Vitals optimizados para señales de ranking de Google" },
            { en: "Conversion-focused UX: calls, bookings, forms built in", es: "UX enfocado en conversión: llamadas, reservas, formularios integrados" },
            { en: "Admin panel so you can update content yourself", es: "Panel de administración para que actualices contenido tú mismo" },
            { en: "SEO-ready structure from day one", es: "Estructura preparada para SEO desde el día uno" },
        ]}
        faqs={[
            {
                questionEn: "How much does a custom website cost for a local business?",
                questionEs: "¿Cuánto cuesta una web a medida para un negocio local?",
                answerEn: "Our Local Growth Systems start at $2,500 for a core website and scale based on the number of pages, integrations (booking, payments, CRM), and automation features needed. Every project includes a free initial audit.",
                answerEs: "Nuestros Sistemas de Crecimiento Local empiezan en $2,500 para una web core y escalan según el número de páginas, integraciones (reservas, pagos, CRM) y funcionalidades de automatización. Todos los proyectos incluyen una auditoría inicial gratuita."
            },
            {
                questionEn: "How long does it take to build a website?",
                questionEs: "¿Cuánto tiempo tarda en construirse una web?",
                answerEn: "Most projects are delivered in 3-6 weeks. We work in phases with clear milestones and a client portal where you can track progress in real time.",
                answerEs: "La mayoría de proyectos se entregan en 3-6 semanas. Trabajamos por fases con hitos claros y un portal de cliente donde puedes seguir el progreso en tiempo real."
            },
            {
                questionEn: "Do I need a website if I already have social media?",
                questionEs: "¿Necesito una web si ya tengo redes sociales?",
                answerEn: "Yes. Social media is rented space — algorithms change, reach drops, and you don't own your audience. A website is your digital headquarters: it ranks in Google, captures leads 24/7, and builds long-term equity for your business.",
                answerEs: "Sí. Las redes sociales son espacio alquilado — los algoritmos cambian, el alcance baja, y no eres dueño de tu audiencia. Una web es tu sede digital: posiciona en Google, capta leads 24/7 y construye valor a largo plazo para tu negocio."
            },
            {
                questionEn: "Will I be able to update the website myself?",
                questionEs: "¿Podré actualizar la web yo mismo?",
                answerEn: "Absolutely. Every site we build includes an admin panel where you can update prices, services, images, and content without touching code. We also offer ongoing maintenance plans.",
                answerEs: "Por supuesto. Cada web que construimos incluye un panel de administración donde puedes actualizar precios, servicios, imágenes y contenido sin tocar código. También ofrecemos planes de mantenimiento continuo."
            },
        ]}
    />
);

export default PremiumWebDesignPage;
