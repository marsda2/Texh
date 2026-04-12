import React from 'react';
import { useLanguage } from '../lib/i18n';

const TermsPage = () => {
    const { language } = useLanguage();

    const isEs = language === 'es';

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto font-body text-obsidian selection:bg-chartreuse selection:text-obsidian animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-black mb-8 tracking-tight">
                {isEs ? 'Términos y Condiciones' : 'Terms and Conditions'}
            </h1>
            <p className="text-gray-medium mb-12 uppercase tracking-widest text-sm font-bold">
                {isEs ? 'Vigente desde: Abril 2026' : 'Effective: April 2026'}
            </p>

            <div className="space-y-8 text-gray-dark text-lg leading-relaxed">
                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '1. Propósito de Nuestros Servicios' : '1. Purpose of Our Services'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'Texh Co. provee servicios profesionales de desarrollo web moderno, arquitectura de ecosistemas digitales, desarrollo de aplicaciones móviles (iOS/Android), gestión de redes sociales y mantenimiento general para la optimización de negocios en la era digital.'
                            : 'Texh Co. provides professional services for modern web development, digital ecosystem architecture, mobile application development (iOS/Android), social media management, and general maintenance for business optimization in the digital era.'}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '2. Propiedad Intelectual' : '2. Intellectual Property'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'A menos que se especifique contractualmente lo contrario, todo el código fuente, los manuales de marca, activos gráficos (UI/UX) y arquitecturas backend desarrolladas por Texh Co. siguen siendo propiedad de la agencia hasta la cancelación total de los honorarios del proyecto, tras lo cual la licencia comercial se transfiere por completo al cliente.'
                            : 'Unless contractually stated otherwise, all source code, brand manuals, graphic assets (UI/UX), and backend architectures developed by Texh Co. remain the property of the agency until the project fees are paid in full, following which the commercial license is entirely transferred to the client.'}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '3. Estimaciones y Facturación' : '3. Estimates and Billing'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'Los precios mostrados en nuestro "Estimator Quiz" y catálogos online son referencias de presupuesto comercial y no sustituyen un contrato formal o cotización directa vinculante. Cualquier inicio de proyecto corporativo requerirá la firma de un acuerdo final (Statement of Work) con pautas definidas de progreso de pagos.'
                            : 'The prices shown in our "Estimator Quiz" and online catalogs are commercial budget references and do not replace a formal contract or binding direct quote. Any commencement of a corporate project will require the signing of a final agreement (Statement of Work) with defined payment progress guidelines.'}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-heading font-bold text-obsidian mb-4">
                        {isEs ? '4. Modificaciones' : '4. Modifications'}
                    </h2>
                    <p>
                        {isEs 
                            ? 'Nos reservamos el derecho de modificar estos términos comerciales así como la estructura técnica de nuestros portales, en cualquier momento, siempre garantizando notificar retroactivamente en un margen de 30 días.'
                            : 'We reserve the right to modify these commercial terms as well as the technical structure of our portals at any time, always guaranteeing to notify retroactively within a 30-day margin.'}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;
