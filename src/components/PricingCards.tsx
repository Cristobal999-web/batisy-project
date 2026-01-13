'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Zap, Car, Star } from 'lucide-react';

interface PricingTier {
    name: string;
    tagline: string;
    price: string;
    range: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
}

const pricingTiers: PricingTier[] = [
    {
        name: 'BATISY City',
        tagline: 'Ideal para flotas',
        price: '29.950',
        range: '180 km',
        features: [
            '8 Módulos Extraíbles (24 kWh)',
            'Sin Batería de Reserva',
            'Motor Eficiente 90 CV',
            'Interior Resistente',
        ],
    },
    {
        name: 'BATISY One',
        tagline: 'El equilibrio perfecto',
        price: '37.900',
        range: '210 km',
        features: [
            '8 Módulos Extraíbles (24 kWh)',
            '+8 kWh Batería Fija (Reserva)',
            'Motor Sport 184 CV (135 kW)',
            'Techo Solar Integrado',
        ],
        highlighted: true,
        badge: 'Best Seller',
    },
    {
        name: 'BATISY Signature',
        tagline: 'Máximo lujo y potencia',
        price: '44.750',
        range: '270 km',
        features: [
            '8 Módulos Extraíbles (24 kWh)',
            '+14 kWh Long Range Fija',
            'Doble Motor AWD (4x4)',
            'Techo Solar Inteligente',
        ],
        badge: 'Premium',
    },
];

export default function PricingCards() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section ref={ref} className="section" id="models">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Elige tu <span className="gradient-text">BATISY</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Tres modelos diseñados para diferentes estilos de vida. Todos con la tecnología de baterías intercambiables.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="relative group"
                        >
                            {/* Glow Effect for highlighted card */}
                            {tier.highlighted && (
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                            )}

                            <div
                                className={`card h-full p-8 relative flex flex-col ${tier.highlighted
                                    ? 'border-primary/30 bg-gradient-to-b from-primary/5 to-surface'
                                    : ''
                                    }`}
                            >
                                {/* Badge */}
                                {tier.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold ${tier.highlighted
                                            ? 'bg-primary text-background'
                                            : 'bg-surface-light text-muted'
                                            }`}>
                                            {tier.highlighted && <Star className="w-3 h-3 inline mr-1" />}
                                            {tier.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-6 pt-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Car className={`w-6 h-6 ${tier.highlighted ? 'text-primary' : 'text-muted'}`} />
                                        <h3 className="text-xl font-bold">{tier.name}</h3>
                                    </div>
                                    <p className="text-muted text-sm">{tier.tagline}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm text-muted">Desde</span>
                                        <span className={`text-4xl font-bold ${tier.highlighted ? 'text-primary' : ''}`}>
                                            {tier.price}
                                        </span>
                                        <span className="text-lg text-muted">€</span>
                                    </div>
                                </div>

                                {/* Range Highlight */}
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-surface-light/50 mb-6">
                                    <Zap className={`w-5 h-5 ${tier.highlighted ? 'text-secondary' : 'text-primary'}`} />
                                    <div>
                                        <span className="text-2xl font-bold">{tier.range}</span>
                                        <span className="text-sm text-muted ml-2">autonomía</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 flex-grow mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-secondary' : 'text-primary'
                                                }`} />
                                            <span className="text-sm text-muted">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${tier.highlighted
                                        ? 'btn-primary'
                                        : 'bg-surface-light hover:bg-surface-light/80 text-foreground border border-white/10'
                                        }`}
                                >
                                    Reservar por 100€
                                </motion.button>

                                {/* Refundable note */}
                                <p className="text-xs text-muted text-center mt-3">
                                    Depósito 100% reembolsable
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center text-muted text-sm mt-12"
                >
                    Todos los precios incluyen IVA. Financiación desde 199€/mes disponible.
                </motion.p>
            </div>
        </section>
    );
}
