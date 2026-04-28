import React from 'react';
import { Cpu } from 'lucide-react';
import ServicePage from '../ServicePage';

const BusinessAutomationPage = () => (
    <ServicePage
        slug="business-automation"
        titleEn="Business Automation That Saves You Time and Closes More Sales"
        titleEs="Automatización de Negocio que Te Ahorra Tiempo y Cierra Más Ventas"
        descEn="From automated booking systems to lead capture, email sequences and admin panels — we build the operational backbone so your business runs while you sleep."
        descEs="Desde sistemas de reservas automatizados hasta captación de leads, secuencias de email y paneles de administración — construimos la columna vertebral operativa para que tu negocio funcione mientras duermes."
        metaTitleEn="Business Automation for Local Businesses"
        metaTitleEs="Automatización de Negocio para Negocios Locales"
        metaDescEn="Booking systems, lead capture, CRM, automated emails and admin panels for local businesses. Save time, close more sales."
        metaDescEs="Sistemas de reservas, captación de leads, CRM, emails automatizados y paneles de administración para negocios locales."
        icon={Cpu}
        features={[
            { en: "Automated booking & scheduling systems", es: "Sistemas de reservas y agendamiento automatizados" },
            { en: "Lead capture forms with instant email response", es: "Formularios de captación de leads con respuesta automática por email" },
            { en: "Admin panels to update prices, services, and content", es: "Paneles de administración para actualizar precios, servicios y contenido" },
            { en: "Client portal with real-time project tracking", es: "Portal de cliente con seguimiento de proyecto en tiempo real" },
            { en: "Automated review request sequences", es: "Secuencias automatizadas de solicitud de reseñas" },
            { en: "Payment integration with Stripe", es: "Integración de pagos con Stripe" },
        ]}
        faqs={[
            {
                questionEn: "What kind of tasks can you automate for my business?",
                questionEs: "¿Qué tipo de tareas pueden automatizar para mi negocio?",
                answerEn: "We automate repetitive processes like appointment booking, lead follow-ups, email confirmations, invoice generation, review requests, and content updates. If you're doing it manually every day, we can probably automate it.",
                answerEs: "Automatizamos procesos repetitivos como reservas de citas, seguimiento de leads, confirmaciones por email, generación de facturas, solicitud de reseñas y actualizaciones de contenido. Si lo haces manualmente cada día, probablemente podemos automatizarlo."
            },
            {
                questionEn: "Do I need technical knowledge to use the admin panel?",
                questionEs: "¿Necesito conocimientos técnicos para usar el panel de administración?",
                answerEn: "Not at all. Our admin panels are designed for business owners, not developers. You can update prices, upload photos, change your menu or service list, and manage bookings with a few clicks.",
                answerEs: "Para nada. Nuestros paneles de administración están diseñados para dueños de negocios, no desarrolladores. Puedes actualizar precios, subir fotos, cambiar tu menú o lista de servicios, y gestionar reservas con unos pocos clics."
            },
            {
                questionEn: "How does the booking system work?",
                questionEs: "¿Cómo funciona el sistema de reservas?",
                answerEn: "Clients book directly from your website. They select a date and time, enter their info, and both you and the client receive an automatic email confirmation with a calendar invite. No phone tag required.",
                answerEs: "Los clientes reservan directamente desde tu web. Seleccionan fecha y hora, introducen sus datos, y tanto tú como el cliente recibís una confirmación automática por email con invitación de calendario. Sin necesidad de jugar al teléfono."
            },
            {
                questionEn: "Can you connect with tools I already use?",
                questionEs: "¿Pueden conectarse con herramientas que ya uso?",
                answerEn: "Yes. We integrate with Google Calendar, Stripe, WhatsApp, email providers, and most CRM/scheduling tools via APIs or webhooks. Our systems are built to plug into your existing workflow.",
                answerEs: "Sí. Nos integramos con Google Calendar, Stripe, WhatsApp, proveedores de email, y la mayoría de herramientas de CRM/agendamiento vía APIs o webhooks. Nuestros sistemas están diseñados para encajar en tu flujo de trabajo existente."
            },
        ]}
    />
);

export default BusinessAutomationPage;
