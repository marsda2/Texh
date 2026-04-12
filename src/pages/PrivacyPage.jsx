import React from 'react';
import { useLanguage } from '../lib/i18n';

const PrivacyPage = () => {
    const { language } = useLanguage();

    const isEs = language === 'es';

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto font-body text-obsidian selection:bg-chartreuse selection:text-obsidian animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-black mb-8 tracking-tight">
                {isEs ? 'Política de Privacidad' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-medium mb-12 uppercase tracking-widest text-sm font-bold">
                {isEs ? 'Última actualización: Abril 2026' : 'Last updated: April 2026'}
            </p>

            <div className="space-y-8 text-gray-dark text-lg leading-relaxed">
                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '1. Información que recopilamos' : '1. Information We Collect'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'Al utilizar los servicios de Texh Co., ya sea al navegar por nuestro sitio web, enviar consultas a través de nuestros formularios ("Estimator", "Contact Card", o pie de página), interactuar con nuestras campañas comerciales, o contratar nuestros servicios, recopilamos información personal (como nombre, correo electrónico y número de teléfono proporcionados voluntariamente) e información de uso (mediante Google Analytics, píxeles de seguimiento y cookies).'
                            : 'When you use Texh Co. services, whether by browsing our website, submitting inquiries through our forms ("Estimator", "Contact Card", or footer), interacting with our commercial campaigns, or hiring our services, we collect personal information (such as name, email, and phone number voluntarily provided) and usage information (through Google Analytics, tracking pixels, and cookies).'}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '2. Uso de la información' : '2. How We Use the Information'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'Utilizamos la información recopilada exclusivamente para comunicarnos contigo sobre tus proyectos o cotizaciones, proveer soporte técnico, personalizar la experiencia del usuario de forma anónima a través de etiquetas geográficas en Analytics, medir tasas de conversión de nuestras afiliaciones publicitarias, y para mejorar nuestro diseño y procesos de entrega.'
                            : 'We use the collected information exclusively to communicate with you regarding your projects or quotes, provide technical support, anonymously personalize the user experience through geo-tags in Analytics, measure conversion rates from our advertising affiliations, and to improve our design and delivery processes.'}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '3. Gestión de Datos y Terceros' : '3. Data Management and Third Parties'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'No vendemos, comercializamos ni transferimos a terceros tu información personal identificable. Esto no incluye a los socios de alojamiento web (ej. Vercel) y bases de datos seguras (Supabase) que nos asisten en la operación profunda de nuestra infraestructura digital, siempre que dichas partes expongan confidencialidad absoluta y protocolos de cifrado.'
                            : 'We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include web hosting partners (e.g., Vercel) and secure databases (Supabase) who assist us in operating our deep digital infrastructure, as long as those parties enforce absolute confidentiality and encryption protocols.'}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '4. Tus Derechos' : '4. Your Rights'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'Tienes derecho a acceder, rectificar o eliminar tu información confidencial almacenada en nuestros ecosistemas en cualquier momento. Puedes enviar una solicitud a hello@texhco.com para que tu expediente sea destruido por completo de nuestras bases de datos comerciales.'
                            : 'You have the right to access, rectify, or erase your confidential information stored in our ecosystems at any time. You can send a request to hello@texhco.com to have your file completely destroyed from our commercial databases.'}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;
