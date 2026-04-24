import React, { createContext, useState, useContext } from 'react';

const translations = {
  es: {
    nav: {
      home: "Inicio",
      team: "El Equipo",
      services: "Servicios",
      portfolio: "Portafolio",
      contact: "Auditoría Gratis",
    },
    hero: {
      tagline1: "Construido para atraer clientes.",
      tagline2: "Web. IA. Marketing.",
      cardHeading: "Sistemas Digitales.",
      cardDesc: <><span className="text-white font-semibold">Texh Co</span> construye sistemas web, de IA y marketing. Del tipo que generan clientes mientras diriges tu negocio.</>,
      clients: "Sistemas Live",
      badgeTitle: "Sistemas Activos",
      badgeSubtitle: "Clientes Generados Diario",
    },
    ai: {
      titleStart: "Cuéntanos sobre tu",
      titleIdea: "negocio",
      titleEnd: ".",
      desc: "Cuéntanos los problemas de tu negocio. Nuestro sistema analizará tu caso para sugerir el Sistema de Crecimiento adecuado.",
      inputPlaceholder: "Pulsa para describir tu negocio...",
      inputRecording: "Analizando tu caso...",
      dashboard: "Panel",
    },
    reviews: {
      titleStart: "Lo que dicen de",
      titleAccent: "nosotros",
    },
    services: {
      titleStart: "Nuestro",
      titleAccent: "Sistema",
      titleEnd: ".",
      desc: "Construimos Sistemas de Crecimiento Local para que tu negocio atraiga más clientes y opere con menos fricción.",
      category1: "Presencia y Visibilidad",
      category2: "Conversión y Automatización",
      webDesign: "Web Premium & UX",
      webDesignDesc: "Plataformas rápidas y mobile-first que proyectan la calidad real de tu negocio offline.",
      apps: "SEO Local & Google",
      appsDesc: "Estructuramos tu negocio para que Google, Maps y las IA entiendan tus servicios y te recomienden.",
      maintenance: "Sistemas de Reservas y Leads",
      maintenanceDesc: "Convierte visitas en llamadas, presupuestos o reservas de forma automatizada y sin esfuerzo.",
      social: "Paneles de Administración",
      socialDesc: "Autonomía total. Cambia precios, servicios o menús en segundos, sin tocar una sola línea de código.",
    },
    portfolio: {
      titleStart: "Casos de",
      titleAccent: "Éxito",
      titleEnd: ".",
      desc: "Explora algunos de los negocios que han confiado en nosotros para lanzar o mejorar su presencia digital y conseguir más ventas.",
      visit: "Visitar Sitio",
    },
    about: {
      whoWeAre: "Quiénes Somos",
      titleStart: "Tu Socio Tecnológico",
      titleAccent: "Estratégico",
      titleEnd: ".",
      desc1: "En Texh Co., somos tu ",
      descBold1: "socio tecnológico estratégico",
      desc2: " con enfoque local. Nos especializamos en crear e implementar Sistemas de Crecimiento para ",
      descBold2: "negocios tradicionales y marcas",
      descEnd: ".",
      pmTitle: "Lead Project Manager",
      pmDesc: "Nuestra misión es conectar tu reputación offline con un sistema digital que genere crecimiento medible. Traducimos la tecnología compleja en resultados simples para el dueño del negocio.",
      seTitle: "Lead Software Engineer",
      seDesc: "Arquitectura técnica y desarrollo de ecosistemas escalables. Transformamos los problemas de tu negocio en código eficiente, automatizando procesos para que puedas escalar sin fricción.",
      capability: "Enfoque Business-First",
      capabilityDesc: "La tecnología no sirve si no genera ingresos. Optimizamos para que ahorres tiempo y cierres más ventas.",
      b2b: "Autonomía Absoluta",
      b2bDesc: "Te entregamos el control total de tu ecosistema para que tu presencia digital cambie al ritmo de tu negocio.",
    },
    philosophy: {
      title: "Nuestra Filosofía",
      desc: "Creemos que cada negocio local merece herramientas de nivel corporativo. Nuestro equipo no diseña webs decorativas; forjamos la infraestructura digital que tu empresa necesita para dominar el mercado.",
    },
    footer: {
      ideaStart: "Tecnología ",
      ideaAccent: "compleja.",
      ideaEnd: "Resultados simples.",
      desc: "No diseñamos webs decorativas. Construimos presencia digital que trabaja.",
      accept: "Solicitar Auditoría Local",
      writeUs: "Escríbenos",
      schedule: "Agendar Sesión Estratégica",
      socials: "Socials",
      privacy: "Privacidad",
      terms: "Términos",
      rights: "Ingeniería + Diseño.",
      comingSoon: "¡Próximamente! / Coming soon",
    },
    carouselItems: [
      {
        title: "Valeria Ríos",
        description: '"Sinceramente, superaron nuestras expectativas. Desde el lanzamiento de la nueva web hemos notado un aumento constante en las reservas directas. Son muy resolutivos, captaron lo que queríamos transmitir desde la primera reunión y cumplieron con las fechas."',
      },
      {
        title: "Darío Montenegro",
        description: '"Teníamos muchas dudas sobre dar el salto digital porque no somos para nada técnicos. Tuvieron mucha paciencia para explicarnos todo el proceso y nos armaron una tienda muy fácil de gestionar. La verdad es que ahora la página es nuestro principal canal de ventas."',
      },
      {
        title: "Inés Salgado",
        description: '"Buscábamos un cambio de imagen que se viera premium y moderno, y el resultado ha sido impecable. Ya van varios clientes que nos escriben para felicitarnos por lo bien que se ve la nueva página. Fue un gran acierto confiar en ellos, la web por fin refleja la calidad de nuestro trabajo."',
      }
    ],
    projects: [
      { description: "Web y portafolio visual dinámico para una maquilladora profesional." },
      { description: "Plataforma de venta de canciones personalizadas creadas con inteligencia artificial." },
      { description: "Sistema paso a paso interactivo diseñado para retener clientes." },
      { description: "Tienda online y plataforma integral de salud diseñada para hombres." },
      { description: "Aplicación web moderna y elegante para centro estético, ofreciendo una experiencia premium." },
      { description: "Experiencia web inmersiva para una cafetería de especialidad, enfocada en la calma y conexión." }
    ]
  },
  en: {
    nav: {
      home: "Home",
      team: "The Team",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Request Free Audit",
    },
    hero: {
      tagline1: "Built to bring clients in.",
      tagline2: "Web. AI. Marketing.",
      cardHeading: "Digital Systems.",
      cardDesc: <><span className="text-white font-semibold">Texh Co</span> builds web, AI, and marketing systems. The kind that generate clients while you run your business.</>,
      clients: "Systems Live",
      badgeTitle: "Systems Running",
      badgeSubtitle: "Clients Generated Daily",
    },
    ai: {
      titleStart: "Tell us about your",
      titleIdea: "business",
      titleEnd: ".",
      desc: "Tell us your business challenges. Our system will analyze your case to suggest the right Local Growth System.",
      inputPlaceholder: "Tap to describe your business...",
      inputRecording: "Analyzing your case...",
      dashboard: "Dashboard",
    },
    reviews: {
      titleStart: "What they say about",
      titleAccent: "us",
    },
    services: {
      titleStart: "Our",
      titleAccent: "System",
      titleEnd: ".",
      desc: "We build Local Growth Systems so your business attracts more clients and operates with less friction.",
      category1: "Presence & Visibility",
      category2: "Conversion & Automation",
      webDesign: "Premium Web & UX",
      webDesignDesc: "Fast, mobile-first platforms that project the true quality of your offline business.",
      apps: "Local SEO & Google",
      appsDesc: "We structure your business so Google, Maps, and AI understand your services and recommend you.",
      maintenance: "Booking & Lead Systems",
      maintenanceDesc: "Convert visitors into calls, quotes, or bookings automatically and effortlessly.",
      social: "Admin Panels",
      socialDesc: "Absolute autonomy. Update prices, services, or menus in seconds without touching code.",
    },
    portfolio: {
      titleStart: "Success",
      titleAccent: "Cases",
      titleEnd: ".",
      desc: "Explore some of the businesses that have trusted us to launch or elevate their digital presence and drive more sales.",
      visit: "Visit Site",
    },
    about: {
      whoWeAre: "Who We Are",
      titleStart: "Your Strategic",
      titleAccent: "Tech Partner",
      titleEnd: ".",
      desc1: "At Texh Co., we are your ",
      descBold1: "strategic technology partner",
      desc2: " with a local focus. We specialize in building and deploying Local Growth Systems for ",
      descBold2: "traditional businesses and brands",
      descEnd: ".",
      pmTitle: "Lead Project Manager",
      pmDesc: "Our mission is to connect your offline reputation with a digital system that generates measurable growth. We translate complex tech into simple results for business owners.",
      seTitle: "Lead Software Engineer",
      seDesc: "Technical architecture and scalable ecosystem development. We transform your business challenges into efficient code, automating processes so you can scale frictionlessly.",
      capability: "Business-First Approach",
      capabilityDesc: "Technology is useless if it doesn't generate revenue. We optimize so you save time and close more sales.",
      b2b: "Absolute Autonomy",
      b2bDesc: "We give you full control of your system so your digital presence adapts at the pace of your business.",
    },
    philosophy: {
      title: "Our Philosophy",
      desc: "We believe every local business deserves enterprise-level tools. Our team doesn't design decorative websites; we forge the digital infrastructure your business needs to dominate the market.",
    },
    footer: {
      ideaStart: "Complex ",
      ideaAccent: "technology.",
      ideaEnd: "Simple results.",
      desc: "We don't build static websites. We construct digital ecosystems that make your business grow.",
      accept: "Request Local Audit",
      writeUs: "Email Us",
      schedule: "Strategic Session",
      socials: "Socials",
      privacy: "Privacy",
      terms: "Terms",
      rights: "Engineering + Design.",
      comingSoon: "Coming soon!",
    },
    carouselItems: [
      {
        title: "Clara Thorne",
        description: '"Honestly, they exceeded our expectations. Since launching the new site, we\'ve seen a steady increase in direct bookings. They are highly proactive, grasped exactly what we wanted to convey from the very first meeting, and delivered right on schedule."',
      },
      {
        title: "Julian Mercer",
        description: '"We were pretty hesitant about making the digital leap because we aren\'t tech-savvy at all. They were incredibly patient in explaining the whole process and built us a store that\'s surprisingly easy to manage. To be honest, the website is now our main sales channel."',
      },
      {
        title: "Hazel Brooks",
        description: '"We were looking for a rebrand that felt premium and modern, and the result is flawless. We\'ve actually had several clients reach out just to compliment the new website. Trusting them was absolutely the right call; the site finally reflects the true quality of our work."',
      }
    ],
    projects: [
      { description: "Dynamic visual portfolio and website for a professional makeup artist." },
      { description: "E-commerce platform for personalized songs created with artificial intelligence." },
      { description: "Interactive step-by-step system designed for customer retention." },
      { description: "Online store and comprehensive health platform designed for men." },
      { description: "Modern and elegant web application for an aesthetic center, offering a premium experience." },
      { description: "Immersive web experience for a specialty coffee shop, focused on calm and connection." }
    ]
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  // Helper to get nested translation keys safely (e.g., 'nav.home')
  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (result === undefined) return key;
      result = result[k];
    }
    
    return result !== undefined ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
