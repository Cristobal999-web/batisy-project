'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Zap, XCircle, CheckCircle } from 'lucide-react';

export default function ProblemSolution() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="section relative overflow-hidden" id="technology">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Reinventamos la <span className="gradient-text">recarga</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Mientras otros esperan, los conductores de BATISY siguen adelante.
                    </p>
                </motion.div>

                {/* Split View */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* The Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="card p-8 md:p-10 h-full bg-gradient-to-br from-red-950/20 to-surface border-red-900/20">
                            {/* Dark overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                                    <XCircle className="w-8 h-8 text-red-400" />
                                </div>

                                {/* Badge */}
                                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full mb-4">
                                    El problema actual
                                </span>

                                {/* Content */}
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-red-100">
                                    4 horas esperando en un cargador.
                                </h3>
                                <p className="text-muted mb-6">
                                    Largas colas, cables enredados, y tu tiempo desperdiciado mientras
                                    tu coche está enchufado a la pared.
                                </p>

                                {/* Pain Points */}
                                <ul className="space-y-3">
                                    {[
                                        'Cargadores ocupados o fuera de servicio',
                                        'Ansiedad por la autonomía',
                                        'Planificar rutas según los cargadores',
                                    ].map((point, i) => (
                                        <li key={i} className="flex items-center gap-3 text-red-200/80">
                                            <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                                            <span className="text-sm">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Visual Element - Charging Cable Illustration */}
                                <div className="mt-8 h-40 rounded-2xl bg-gradient-to-br from-red-950/40 to-black/40 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20">
                                        <svg viewBox="0 0 200 100" className="w-full h-full">
                                            <path
                                                d="M20,50 Q60,20 100,50 T180,50"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                className="text-red-400"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-6xl font-bold text-red-500/20">4h+</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* The Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative group"
                    >
                        <div className="card p-8 md:p-10 h-full bg-gradient-to-br from-emerald-950/20 to-surface border-primary/20">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                    <CheckCircle className="w-8 h-8 text-primary" />
                                </div>

                                {/* Badge */}
                                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
                                    La solución BATISY
                                </span>

                                {/* Content */}
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    Sistema Click & Go: <span className="text-primary">30s por módulo</span>
                                </h3>
                                <p className="text-muted mb-6">
                                    Saca tu batería agotada, coloca una cargada.
                                    Tan fácil como cambiar las pilas de un mando.
                                </p>

                                {/* Benefits */}
                                <ul className="space-y-3">
                                    {[
                                        'Click & Go: Sin cables, sin esperas',
                                        'Baterías siempre cargadas al 100%',
                                        'Red de swap stations en tu ciudad',
                                    ].map((point, i) => (
                                        <li key={i} className="flex items-center gap-3 text-foreground/80">
                                            <Zap className="w-4 h-4 text-secondary flex-shrink-0" />
                                            <span className="text-sm">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Visual Element - Battery Module Illustration */}
                                <div className="mt-8 h-40 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center relative overflow-hidden border border-primary/10">
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="relative"
                                    >
                                        <div className="w-24 h-32 rounded-xl bg-gradient-to-b from-primary/30 to-primary/10 border-2 border-primary/50 flex flex-col items-center justify-center">
                                            <Zap className="w-10 h-10 text-primary mb-2" />
                                            <span className="text-xs text-primary font-medium">3 kWh</span>
                                        </div>
                                        {/* Glow */}
                                        <div className="absolute inset-0 blur-xl bg-primary/20" />
                                    </motion.div>
                                    <span className="absolute bottom-3 right-3 text-5xl font-bold text-primary/10">30s</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
