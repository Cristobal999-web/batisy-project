'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Battery, Car, Home, Sun, Cpu, Leaf } from 'lucide-react';

export default function ProductShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="section bg-surface/50">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Un ecosistema <span className="gradient-text">completo</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Batería, vehículo y estación de carga diseñados para funcionar en perfecta armonía.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 - The Battery (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0 }}
                        className="lg:row-span-2 group"
                    >
                        <div className="card h-full p-8 relative overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-500" />

                            <div className="relative z-10 h-full flex flex-col">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                    <Battery className="w-7 h-7 text-primary" />
                                </div>

                                {/* Label */}
                                <span className="text-sm text-primary font-medium mb-2">LA BATERÍA</span>

                                {/* Title */}
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    Solo 15kg. Potencia sin límites.
                                </h3>

                                {/* Description */}
                                <p className="text-muted mb-6 flex-grow">
                                    Celdas NMC 21700 de alto rendimiento. 3kWh por módulo con gestión térmica inteligente.
                                </p>

                                {/* Specs Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {[
                                        { value: '3 kWh', label: 'Capacidad' },
                                        { value: '15 kg', label: 'Peso' },
                                        { value: '2000+', label: 'Ciclos' },
                                        { value: '10 años', label: 'Garantía' },
                                    ].map((spec, i) => (
                                        <div key={i} className="bg-surface-light/50 rounded-xl p-3">
                                            <div className="text-lg font-bold text-primary">{spec.value}</div>
                                            <div className="text-xs text-muted">{spec.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Visual - Battery Module */}
                                <div className="relative h-48 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent overflow-hidden">
                                    <motion.div
                                        animate={{ y: [5, -5, 5] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="w-32 h-40 rounded-2xl bg-gradient-to-b from-surface-light to-surface border border-primary/30 flex flex-col items-center justify-center shadow-2xl">
                                            <div className="w-16 h-4 bg-primary/50 rounded-full mb-4" />
                                            <Battery className="w-12 h-12 text-primary" />
                                            <span className="text-xs text-muted mt-2">BATISY Core</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2 - The Car */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-2 group"
                    >
                        <div className="card h-full p-8 relative overflow-hidden">
                            {/* Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                                        <Car className="w-7 h-7 text-secondary" />
                                    </div>

                                    {/* Label */}
                                    <span className="text-sm text-secondary font-medium mb-2">BATISY ONE</span>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                        Diseño Urbano Premium.
                                    </h3>

                                    {/* Description */}
                                    <p className="text-muted mb-6">
                                        Pensado para la ciudad. Compacto por fuera, espacioso por dentro.
                                        Con techo solar integrado que alimenta tus sistemas auxiliares.
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-3">
                                        {['Techo Solar', 'Pantalla 12"', '4 Plazas', 'Maletero 280L'].map((feature, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-surface-light/50 rounded-full text-sm text-muted flex items-center gap-2"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Visual - Car Silhouette */}
                                <div className="flex-1 relative min-h-[200px]">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            {/* Car body shape */}
                                            <div className="w-64 h-24 bg-gradient-to-r from-surface-light to-surface rounded-t-[60px] relative">
                                                {/* Windshield */}
                                                <div className="absolute top-2 left-8 right-8 h-12 bg-primary/10 rounded-t-[40px]" />
                                                {/* Roof highlight */}
                                                <div className="absolute top-0 left-12 right-12 h-1 bg-secondary/50 rounded-full" />
                                            </div>
                                            {/* Car bottom */}
                                            <div className="w-72 h-12 bg-surface-light -ml-4 rounded-b-lg flex items-end justify-between px-8">
                                                {/* Wheels */}
                                                <div className="w-10 h-10 bg-surface rounded-full border-4 border-muted/50 -mb-4" />
                                                <div className="w-10 h-10 bg-surface rounded-full border-4 border-muted/50 -mb-4" />
                                            </div>
                                            {/* Glow underneath */}
                                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-primary/20 blur-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3 - Home Dock */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="group"
                    >
                        <div className="card h-full p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                                    <Home className="w-7 h-7 text-amber-500" />
                                </div>

                                {/* Label */}
                                <span className="text-sm text-amber-500 font-medium mb-2">HOME DOCK</span>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3">
                                    Carga en tu salón. Energía inteligente.
                                </h3>

                                {/* Description */}
                                <p className="text-muted text-sm mb-6">
                                    Estación de carga doméstica que se integra con tu hogar. Compatible con paneles solares.
                                </p>

                                {/* Visual - Dock */}
                                <div className="h-32 rounded-xl bg-gradient-to-b from-amber-500/5 to-transparent flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-16 h-24 bg-surface-light rounded-lg border border-amber-500/30 flex flex-col items-center justify-center gap-2"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                            <Sun className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div className="w-8 h-1 bg-amber-500/50 rounded-full" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4 - Smart Tech */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.45 }}
                        className="group"
                    >
                        <div className="card h-full p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                                    <Cpu className="w-7 h-7 text-purple-500" />
                                </div>

                                {/* Label */}
                                <span className="text-sm text-purple-500 font-medium mb-2">SMART BMS</span>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3">
                                    Inteligencia en cada celda.
                                </h3>

                                {/* Description */}
                                <p className="text-muted text-sm">
                                    Sistema de gestión de batería con IA predictiva. Monitorización 24/7 desde tu app.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 5 - Sustainability */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="group"
                    >
                        <div className="card h-full p-8 relative overflow-hidden bg-gradient-to-br from-secondary/5 to-transparent">
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                                    <Leaf className="w-7 h-7 text-secondary" />
                                </div>

                                {/* Label */}
                                <span className="text-sm text-secondary font-medium mb-2">ECO FRIENDLY</span>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3">
                                    100% reciclable. Segunda vida garantizada.
                                </h3>

                                {/* Description */}
                                <p className="text-muted text-sm">
                                    Nuestras baterías tienen múltiples vidas: vehículo, almacenamiento estático, y reciclaje total.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
