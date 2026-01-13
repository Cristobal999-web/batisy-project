'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Video Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background z-10" />
                {/* Video placeholder - gradient background simulating car scene */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1520] to-[#0a0a0a]"
                    style={{
                        backgroundImage: `
              radial-gradient(ellipse at 30% 40%, rgba(0, 240, 255, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(57, 255, 20, 0.05) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, rgba(0, 153, 255, 0.06) 0%, transparent 50%)
            `
                    }}
                />
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="container relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-muted">El futuro de la movilidad urbana</span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                        <span className="block">BATISY:</span>
                        <span className="gradient-text">Autonomía Infinita.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12">
                        El primer coche urbano con baterías modulares extraíbles.
                        <br className="hidden md:block" />
                        Olvida los cargadores públicos.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary text-lg px-8 py-4 animate-pulse-glow"
                        >
                            Reservar BATISY One
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
                        >
                            <Play className="w-5 h-5" />
                            Ver Tecnología
                        </motion.button>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
                >
                    {[
                        { value: '30s', label: 'Cambio de batería' },
                        { value: '210km', label: 'Autonomía máxima' },
                        { value: '15kg', label: 'Peso por módulo' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                            <div className="text-sm text-muted">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                >
                    <span className="text-xs text-muted">Descubre más</span>
                    <ChevronDown className="w-5 h-5 text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
}
