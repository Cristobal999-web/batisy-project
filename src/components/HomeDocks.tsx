'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Home, Battery, Zap, Check } from 'lucide-react';

interface DockModel {
    name: string;
    slots: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
}

const dockModels: DockModel[] = [
    {
        name: 'BATISY Dock "Duo"',
        slots: '2 Huecos',
        price: '599',
        description: 'Diseño Premium con pantalla OLED. Ideal para recibidor.',
        features: ['Pantalla OLED', 'Diseño compacto', 'Ideal para hogar'],
    },
    {
        name: 'BATISY Dock "Quattro"',
        slots: '4 Huecos',
        price: '1.049',
        description: 'Torre inteligente silenciosa con ventilación Noctua.',
        features: ['Ventilación silenciosa', 'Torre vertical', 'Smart charging'],
        highlighted: true,
        badge: 'Recomendado',
    },
    {
        name: 'BATISY Dock "Octo-Wall"',
        slots: '8 Huecos',
        price: '1.949',
        description: 'Instalación en pared tipo Powerwall. Acero reforzado.',
        features: ['Montaje en pared', 'Acero reforzado', 'Para familias'],
    },
    {
        name: 'BATISY Dock "Pro-16"',
        slots: '16 Huecos',
        price: '3.990',
        description: 'Grado Industrial (IP54). Para comunidades y flotas.',
        features: ['Grado industrial IP54', 'Para comunidades', 'Máxima capacidad'],
        badge: 'Empresas',
    },
];

export default function HomeDocks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredDock, setHoveredDock] = useState<number | null>(null);

    return (
        <section ref={ref} className="section" id="docks">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
                        Carga en Casa
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        BATISY <span className="gradient-text">Home Docks</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Estaciones de carga domésticas para tus baterías modulares.
                        Carga mientras duermes, sin cables ni complicaciones.
                    </p>
                </motion.div>

                {/* Docks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dockModels.map((dock, index) => (
                        <motion.div
                            key={dock.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredDock(index)}
                            onMouseLeave={() => setHoveredDock(null)}
                            className="relative group"
                        >
                            {/* Glow Effect for highlighted */}
                            {dock.highlighted && (
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                            )}

                            <div className={`card h-full p-6 relative flex flex-col ${dock.highlighted
                                    ? 'border-amber-500/30 bg-gradient-to-b from-amber-500/5 to-surface'
                                    : ''
                                }`}>
                                {/* Badge */}
                                {dock.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${dock.highlighted
                                                ? 'bg-amber-500 text-background'
                                                : 'bg-surface-light text-muted'
                                            }`}>
                                            {dock.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mt-2 ${dock.highlighted ? 'bg-amber-500/10' : 'bg-surface-light'
                                    }`}>
                                    <Home className={`w-7 h-7 ${dock.highlighted ? 'text-amber-500' : 'text-muted'}`} />
                                </div>

                                {/* Dock Name */}
                                <h4 className="text-lg font-bold mb-1">{dock.name}</h4>

                                {/* Slots */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Battery className={`w-4 h-4 ${dock.highlighted ? 'text-amber-500' : 'text-primary'}`} />
                                    <span className={`text-sm font-semibold ${dock.highlighted ? 'text-amber-500' : 'text-primary'}`}>
                                        {dock.slots}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted mb-4 flex-grow">
                                    {dock.description}
                                </p>

                                {/* Price */}
                                <div className="p-4 rounded-xl bg-surface-light/50 mb-4">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-3xl font-bold ${dock.highlighted ? 'text-amber-500' : ''}`}>
                                            {dock.price}
                                        </span>
                                        <span className="text-lg text-muted">€</span>
                                    </div>
                                    <span className="text-xs text-muted">IVA incluido</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-4">
                                    {dock.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted">
                                            <Check className={`w-4 h-4 flex-shrink-0 ${dock.highlighted ? 'text-amber-500' : 'text-primary'
                                                }`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${dock.highlighted
                                            ? 'bg-amber-500 hover:bg-amber-400 text-background'
                                            : 'bg-surface-light hover:bg-surface-light/80 text-foreground border border-white/10'
                                        }`}
                                >
                                    Comprar Dock
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center text-muted text-sm mt-10"
                >
                    Todos los Docks incluyen instalación básica y garantía de 3 años. Compatible con paneles solares.
                </motion.p>
            </div>
        </section>
    );
}
