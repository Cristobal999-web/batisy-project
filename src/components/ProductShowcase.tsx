'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Battery, Car, Home, Sun, Cpu, Leaf, Smartphone, Zap, User } from 'lucide-react';

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
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Un ecosistema <span className="gradient-text">completo</span>
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto">
                        Batería, vehículo y estación de carga diseñados para funcionar en perfecta armonía.
                    </p>
                </motion.div>

                {/* Compact 2x3 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Card 1 - The Battery */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0 }}
                        className="group"
                    >
                        <div className="card h-full p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Battery className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-xs text-primary font-medium uppercase">La Batería</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Solo 15kg. Potencia sin límites.</h3>
                                <p className="text-muted text-sm mb-4">Celdas NMC 21700. 3kWh por módulo.</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { value: '3 kWh', label: 'Capacidad' },
                                        { value: '15 kg', label: 'Peso' },
                                        { value: '2000+', label: 'Ciclos' },
                                        { value: '10 años', label: 'Garantía' },
                                    ].map((spec, i) => (
                                        <div key={i} className="bg-surface-light/50 rounded-lg p-2">
                                            <div className="text-sm font-bold text-primary">{spec.value}</div>
                                            <div className="text-[10px] text-muted">{spec.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2 - App Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group"
                    >
                        <div className="card h-full p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                            <div className="relative z-10 flex gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Smartphone className="w-5 h-5 text-primary" />
                                        </div>
                                        <span className="text-xs text-primary font-medium uppercase">BATISY App</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Todo en tu bolsillo</h3>
                                    <p className="text-muted text-xs mb-3">Controla vehículo, baterías y entregas.</p>
                                    <div className="space-y-1.5">
                                        {[
                                            { icon: Car, label: 'Estado vehículo', color: 'text-primary' },
                                            { icon: Battery, label: 'Nivel batería', color: 'text-secondary' },
                                            { icon: Home, label: 'Control Dock', color: 'text-amber-500' },
                                            { icon: Zap, label: 'Solicitar Swap', color: 'text-purple-400' },
                                        ].map((f, i) => (
                                            <div key={i} className="flex items-center gap-1.5 text-xs">
                                                <f.icon className={`w-3 h-3 ${f.color}`} />
                                                <span className="text-muted">{f.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a href="/app" className="inline-block mt-3 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">
                                        Ver Demo
                                    </a>
                                </div>
                                {/* Mini Phone */}
                                <div className="hidden sm:flex items-center">
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="w-24 h-44 bg-surface-light rounded-2xl border border-white/10 p-1 shadow-lg"
                                    >
                                        <div className="w-full h-full bg-[#050505] rounded-xl overflow-hidden relative">
                                            <div className="h-4 bg-surface-light/50 flex items-center justify-center">
                                                <div className="w-8 h-0.5 bg-white/20 rounded-full" />
                                            </div>
                                            <div className="p-2 space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[8px] font-bold text-primary">BATISY One</span>
                                                    <span className="text-[8px] text-secondary">87%</span>
                                                </div>
                                                <div className="h-10 rounded bg-primary/10 flex items-center justify-center">
                                                    <Car className="w-8 h-5 text-primary/50" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-1">
                                                    <div className="bg-surface-light/50 rounded p-1 text-center">
                                                        <div className="text-[8px] font-bold text-primary">156km</div>
                                                    </div>
                                                    <div className="bg-surface-light/50 rounded p-1 text-center">
                                                        <div className="text-[8px] font-bold text-secondary">7/8</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-surface-light/80 flex items-center justify-around">
                                                <Car className="w-3 h-3 text-primary" />
                                                <Home className="w-3 h-3 text-muted" />
                                                <Zap className="w-3 h-3 text-muted" />
                                                <User className="w-3 h-3 text-muted" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3 - Home Dock */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group"
                    >
                        <div className="card h-full p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                        <Home className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <span className="text-xs text-amber-500 font-medium uppercase">Home Dock</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Carga en tu salón</h3>
                                <p className="text-muted text-sm mb-4">Estación doméstica compatible con paneles solares.</p>
                                <div className="h-20 rounded-xl bg-gradient-to-b from-amber-500/5 to-transparent flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.03, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-12 h-16 bg-surface-light rounded-lg border border-amber-500/30 flex flex-col items-center justify-center gap-1"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                                            <Sun className="w-3 h-3 text-amber-500" />
                                        </div>
                                        <div className="w-5 h-0.5 bg-amber-500/50 rounded-full" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4 - Smart BMS */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="group"
                    >
                        <div className="card h-full p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <Cpu className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <span className="text-xs text-purple-500 font-medium uppercase">Smart BMS</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">Inteligencia en cada celda</h3>
                                <p className="text-muted text-sm">Sistema de gestión con IA predictiva. Monitorización 24/7 desde tu app.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 5 - Eco Friendly */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="group"
                    >
                        <div className="card h-full p-6 relative overflow-hidden bg-gradient-to-br from-secondary/5 to-transparent">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                                        <Leaf className="w-5 h-5 text-secondary" />
                                    </div>
                                    <span className="text-xs text-secondary font-medium uppercase">Eco Friendly</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">100% reciclable</h3>
                                <p className="text-muted text-sm">Segunda vida garantizada: vehículo, almacenamiento estático, y reciclaje total.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 6 - Swap Network */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="group"
                    >
                        <div className="card h-full p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="text-xs text-blue-400 font-medium uppercase">Click & Go</span>
                                </div>
                                <h3 className="text-lg font-bold mb-2">30 segundos por módulo</h3>
                                <p className="text-muted text-sm">Intercambio ultrarrápido. Sin esperas, sin cables, sin complicaciones.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
