import React, { createContext, useState, useContext } from 'react';

const translations = {
  es: {
    nav: {
      home: "Inicio",
      team: "El Equipo",
      services: "Servicios",
      portfolio: "Portafolio",
      contact: "Contacto",
    },
    hero: {
      tagline1: "Tu negocio online,",
      tagline2: "sin complicaciones.",
      cardHeading: "Tu Socio Digital.",
      cardDesc: <><span className="text-white font-semibold">Texh Co</span> te acompaña paso a paso para tener una web profesional y conseguir más clientes en internet.</>,
      clients: "Clientes",
    },
    ai: {
      titleStart: "Cuentanos tu",
      titleIdea: "idea",
      titleEnd: ".",
      desc: "Habla y nuestro sistema transcribirá inmediatamente las necesidades exactas de tu negocio para generar una propuesta a medida.",
      inputPlaceholder: "Pulsa para contar tu idea...",
      inputRecording: "Escuchando tu visión...",
      dashboard: "Panel",
    },
    reviews: {
      titleStart: "Lo que dicen de",
      titleAccent: "nosotros",
    },
    services: {
      titleStart: "Cómo te",
      titleAccent: "Ayudamos",
      titleEnd: ".",
      desc: "Nos convertimos en tu equipo tecnológico de confianza para que tu negocio crezca sin complicaciones.",
      category1: "Desarrollo y Tecnología",
      category2: "Diseño y Redes Sociales",
      webDesign: "Diseño Web a Medida",
      webDesignDesc: "Creamos páginas rápidas, seguras y diseñadas para que tus visitas se conviertan en clientes reales.",
      apps: "Aplicaciones Móviles",
      appsDesc: "Lleva tu negocio al bolsillo de tus clientes con una app fácil de usar y muy atractiva.",
      maintenance: "Mantenimiento y Soporte",
      maintenanceDesc: "Nos ocupamos de que tu web nunca se caiga y esté siempre actualizada sin que tengas que preocuparte.",
      social: "Gestión de Redes Sociales",
      socialDesc: "Creamos contenido atractivo para tus redes mientras tú te enfocas al 100% en tu negocio.",
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
      titleStart: "Impulsados por la",
      titleAccent: "Excelencia",
      titleEnd: ". Liderados por Visión.",
      desc1: "En Texh Co., somos un colectivo de ",
      descBold1: "desarrolladores y diseñadores full-stack",
      desc2: " con años de experiencia probada. Nos especializamos en crear e implementar ecosistemas omnicanal premium para ",
      descBold2: "empresas y fundadores visionarios",
      descEnd: ".",
      pmTitle: "Lead Project Manager",
      pmDesc: "Nuestra misión es conectar tu visión de negocio con la infraestructura técnica exacta que demanda el futuro. Orquestamos la complejidad técnica para entregar productos impecables.",
      capability: "Capacidad Full-Stack",
      capabilityDesc: "Desde infraestructuras de backend escalables hasta interfaces frontend con reaccón instantánea.",
      b2b: "Soluciones B2B & B2C",
      b2bDesc: "Ingeniería versátil capaz de soportar desde el lanzamiento ágil de MVPs hasta el requerimiento de infraestructuras corporativas.",
    },
    philosophy: {
      title: "Nuestra Filosofía",
      desc: "Creemos que cada desafío técnico es una oportunidad para crear algo extraordinario. Nuestro equipo no solo escribe código; forjamos las soluciones digitales que potenciarán la próxima generación de ideas locales.",
    },
    footer: {
      ideaStart: "¿Tienes una",
      ideaAccent: "Idea?",
      ideaEnd: "Vamos a Construirla.",
      desc: "Creamos obras maestras digitales. Contáctanos para discutir el inicio de tu ecosistema omnicanal.",
      accept: "Aceptar Propuesta",
      writeUs: "Escríbenos",
      schedule: "Agendar llamada",
      socials: "Socials",
      privacy: "Privacidad",
      terms: "Términos",
      rights: "Ingeniería + Diseño.",
      comingSoon: "¡Próximamente! / Coming soon",
    },
    carouselItems: [
      {
        title: "Ana López",
        description: '"Desde que renovaron nuestra web, las reservas se han duplicado. ¡Un equipo increíble que entiende lo que necesitas!"',
      },
      {
        title: "Carlos Méndez",
        description: '"No sabíamos nada de tecnología, y nos explicaron todo paso a paso. Ahora tenemos una tienda online que vende sola."',
      },
      {
        title: "Laura Gómez",
        description: '"El diseño es espectacular y nuestros clientes siempre nos felicitan. Fue la mejor inversión para nuestro negocio."',
      }
    ],
    projects: [
      { description: "Web y portafolio visual dinámico para una maquilladora profesional." },
      { description: "Plataforma de venta de canciones personalizadas creadas con inteligencia artificial." },
      { description: "Sistema paso a paso interactivo diseñado para retener clientes." },
      { description: "Tienda online y plataforma integral de salud diseñada para hombres." }
    ]
  },
  en: {
    nav: {
      home: "Home",
      team: "The Team",
      services: "Services",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      tagline1: "Your online business,",
      tagline2: "without the hassle.",
      cardHeading: "Your Digital Partner.",
      cardDesc: <><span className="text-white font-semibold">Texh Co</span> guides you step-by-step to build a professional website and attract more online clients.</>,
      clients: "Clients",
    },
    ai: {
      titleStart: "Tell us your",
      titleIdea: "idea",
      titleEnd: ".",
      desc: "Speak and our system will immediately transcribe your exact business needs to generate a custom proposal.",
      inputPlaceholder: "Tap to share your idea...",
      inputRecording: "Listening to your vision...",
      dashboard: "Dashboard",
    },
    reviews: {
      titleStart: "What they say about",
      titleAccent: "us",
    },
    services: {
      titleStart: "How we",
      titleAccent: "Help",
      titleEnd: ".",
      desc: "We become your trusted tech team so your business can grow without complications.",
      category1: "Development & Tech",
      category2: "Design & Socials",
      webDesign: "Custom Web Design",
      webDesignDesc: "We create fast, secure websites designed to convert visitors into real clients.",
      apps: "Mobile Apps",
      appsDesc: "Put your business in your clients' pockets with an easy-to-use, highly attractive app.",
      maintenance: "Maintenance & Support",
      maintenanceDesc: "We ensure your website never goes down and is always up to date so you don't have to worry.",
      social: "Social Media Management",
      socialDesc: "We create engaging content for your social channels while you focus 100% on your business.",
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
      titleStart: "Driven by",
      titleAccent: "Excellence",
      titleEnd: ". Led by Vision.",
      desc1: "At Texh Co., we are a collective of ",
      descBold1: "full-stack developers and designers",
      desc2: " with years of proven experience. We specialize in building and deploying premium omnichannel ecosystems for ",
      descBold2: "visionary founders and enterprises",
      descEnd: ".",
      pmTitle: "Lead Project Manager",
      pmDesc: "Our mission is to bridge your business vision with the exact technical infrastructure the future demands. We orchestrate technical complexity to deliver flawless products.",
      capability: "Full-Stack Capability",
      capabilityDesc: "From scalable backend infrastructures to instantly reactive frontend interfaces.",
      b2b: "B2B & B2C Solutions",
      b2bDesc: "Versatile engineering capable of supporting everything from agile MVP launches to enterprise infrastructure requirements.",
    },
    philosophy: {
      title: "Our Philosophy",
      desc: "We believe every technical challenge is an opportunity to create something extraordinary. Our team doesn't just write code; we forge the digital solutions that will power the next generation of local ideas.",
    },
    footer: {
      ideaStart: "Have an",
      ideaAccent: "Idea?",
      ideaEnd: "Let's Build It.",
      desc: "We craft digital masterpieces. Contact us to discuss kickstarting your omnichannel ecosystem.",
      accept: "Accept Proposal",
      writeUs: "Email Us",
      schedule: "Schedule Call",
      socials: "Socials",
      privacy: "Privacy",
      terms: "Terms",
      rights: "Engineering + Design.",
      comingSoon: "Coming soon!",
    },
    carouselItems: [
      {
        title: "Ana López",
        description: '"Since they revamped our website, bookings have doubled. An incredible team that truly understands what you need!"',
      },
      {
        title: "Carlos Méndez",
        description: '"We knew nothing about tech, and they explained everything step by step. Now we have an online store that sells on autopilot."',
      },
      {
        title: "Laura Gómez",
        description: '"The design is spectacular and our clients always compliment us. It was the best investment for our business."',
      }
    ],
    projects: [
      { description: "Dynamic visual portfolio and website for a professional makeup artist." },
      { description: "E-commerce platform for personalized songs created with artificial intelligence." },
      { description: "Interactive step-by-step system designed for customer retention." },
      { description: "Online store and comprehensive health platform designed for men." }
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
