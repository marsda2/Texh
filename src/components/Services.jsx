import React from 'react';
import { Smartphone, Code, Cpu, Megaphone } from 'lucide-react';

const services = [
    {
        category: "Desarrollo y Tecnología",
        items: [
            {
                icon: <Code size={28} className="text-obsidian" />,
                title: "Diseño Web a Medida",
                description: "Creamos páginas rápidas, seguras y diseñadas para que tus visitas se conviertan en clientes reales.",
            },
            {
                icon: <Smartphone size={28} className="text-obsidian" />,
                title: "Aplicaciones Móviles",
                description: "Lleva tu negocio al bolsillo de tus clientes con una app fácil de usar y muy atractiva.",
            },
            {
                icon: <Cpu size={28} className="text-chartreuse" />,
                title: "Mantenimiento y Soporte",
                description: "Nos ocupamos de que tu web nunca se caiga y esté siempre actualizada sin que tengas que preocuparte.",
            }
        ]
    },
    {
        category: "Diseño y Redes Sociales",
        items: [
            {
                icon: <Megaphone size={28} className="text-obsidian" />,
                title: "Gestión de Redes Sociales",
                description: "Creamos contenido atractivo para tus redes mientras tú te enfocas al 100% en tu negocio.",
            }
        ]
    }
];

const Services = () => {
    return (
        <section id="services" className="relative section-padding bg-white">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-up">
                    <div className="max-w-3xl">
                        <h2 className="mb-6 leading-tight">
                            Cómo te <span className="text-accent underline decoration-chartreuse decoration-8 underline-offset-8">Ayudamos</span>.
                        </h2>
                        <p className="text-gray-dark text-xl font-light font-body">
                            Nos convertimos en tu equipo tecnológico de confianza para que tu negocio crezca sin complicaciones.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-16">
                    {services.map((section, idx) => (
                        <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                            {/* Section Header */}
                            <h3 className={`text-2xl mb-8 border-b-2 border-obsidian pb-4 ${idx === 0 ? 'font-body font-bold tracking-tight' : 'font-heading font-medium'}`}>
                                {section.category}
                            </h3>

                            {/* Service Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {section.items.map((service, index) => (
                                    <div
                                        key={index}
                                        className="p-10 relative overflow-hidden group border border-gray-light bg-neutral radius-extreme transition-all duration-500 hover:border-obsidian hover:shadow-xl"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-8 border border-gray-light group-hover:scale-110 transition-transform duration-500">
                                            {service.icon}
                                        </div>

                                        <div className="relative z-10">
                                            <h4 className={`text-xl mb-3 text-obsidian ${idx === 0 ? 'font-body font-semibold' : 'font-heading font-bold'}`}>
                                                {service.title}
                                            </h4>
                                            <p className="text-gray-dark font-body font-light leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
