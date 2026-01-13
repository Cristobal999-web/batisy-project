'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Truck, Battery, ArrowRight, Repeat, Plug, Sparkles, Check, Zap } from 'lucide-react';

interface SubscriptionPlan {
    name: string;
    monthlyFee: string;
    pricePerKwh: string;
    highlighted?: boolean;
    badge?: string;
    features: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
    {
        name: 'ON THE GO',
        monthlyFee: '0 €',
        pricePerKwh: '0,45 €/kWh',
        features: ['Sin cuota mensual', 'Pago por uso', 'Ideal para uso ocasional'],
    },
    {
        name: 'ESSENTIAL',
        monthlyFee: '9,90 €',
        pricePerKwh: '0,25 €/kWh',
        features: ['Reserva desde 1,99€', 'Ahorro del 44%', 'Para uso regular'],
    },
    {
        name: 'COMMUTER',
        monthlyFee: '19,90 €',
        pricePerKwh: '0,15 €/kWh',
        highlighted: true,
        badge: 'Más Popular',
        features: ['Ahorro del 67%', 'Prioridad en swap', 'Para conductores diarios'],
    },
    {
        name: 'PRO FLEX',
        monthlyFee: '39,90 €',
        pricePerKwh: '0,10 €/kWh',
        features: ['Máximo ahorro (78%)', 'Swap ilimitado', 'Para flotas y profesionales'],
    },
];

export default function Subscription() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

    const steps = [
        {
            icon: Battery,
            title: 'Solicita',
            description: 'Batería baja. Pide un swap desde la app.',
        },
        {
            icon: Truck,
            title: 'Recogemos',
            description: 'Nuestro equipo recoge tu batería vacía.',
        },
        {
            icon: Sparkles,
            title: 'Entregamos',
            description: 'Te entregamos baterías 100% cargadas.',
        },
        {
            icon: Repeat,
            title: 'Repite',
            description: 'Sin límites. Energía infinita.',
        },
    ];

    return (
        <section ref={ref} className="section bg-surface/30" id="subscription">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                        Energy as a Service
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Suscríbete a la <span className="gradient-text">energía</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Olvídate de cargar. Nosotros nos encargamos de todo con nuestro servicio &quot;Última Milla&quot;.
                    </p>
                </motion.div>

                {/* Process Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mb-20"
                >
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="relative"
                            >
                                <div className="card p-6 text-center relative z-10">
                                    {/* Step Number */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-background rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <step.icon className="w-8 h-8 text-primary" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted">{step.description}</p>
                                </div>

                                {/* Arrow (not on last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 z-20 -translate-y-1/2">
                                        <ArrowRight className="w-6 h-6 text-primary/50" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Subscription Plans Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
                        Planes de Suscripción
                    </h3>
                    <p className="text-muted text-center mb-10 max-w-xl mx-auto">
                        Solo pagas por la energía. Sin sorpresas. Sin complicaciones.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {subscriptionPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                onMouseEnter={() => setHoveredPlan(index)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                className="relative group"
                            >
                                {/* Glow Effect for highlighted */}
                                {plan.highlighted && (
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                                )}

                                <div className={`card h-full p-6 relative flex flex-col ${plan.highlighted
                                        ? 'border-primary/30 bg-gradient-to-b from-primary/5 to-surface'
                                        : ''
                                    }`}>
                                    {/* Badge */}
                                    {plan.badge && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-background">
                                                {plan.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Plan Name */}
                                    <h4 className={`text-lg font-bold mb-4 pt-2 ${plan.highlighted ? 'text-primary' : ''}`}>
                                        {plan.name}
                                    </h4>

                                    {/* Monthly Fee */}
                                    <div className="mb-4">
                                        <span className="text-xs text-muted">Cuota mensual</span>
                                        <div className="text-2xl font-bold">{plan.monthlyFee}</div>
                                    </div>

                                    {/* Price per kWh */}
                                    <div className="p-3 rounded-xl bg-surface-light/50 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Zap className={`w-4 h-4 ${plan.highlighted ? 'text-secondary' : 'text-primary'}`} />
                                            <span className={`text-lg font-bold ${plan.highlighted ? 'text-secondary' : 'text-primary'}`}>
                                                {plan.pricePerKwh}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2 flex-grow">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted">
                                                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-secondary' : 'text-primary'
                                                    }`} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full py-3 mt-4 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.highlighted
                                                ? 'btn-primary'
                                                : 'bg-surface-light hover:bg-surface-light/80 text-foreground border border-white/10'
                                            }`}
                                    >
                                        Elegir Plan
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-wrap justify-center gap-8"
                >
                    {[
                        'Sin permanencia',
                        'Cancelación inmediata',
                        'Facturación transparente',
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted">
                            <div className="w-2 h-2 bg-secondary rounded-full" />
                            {badge}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
