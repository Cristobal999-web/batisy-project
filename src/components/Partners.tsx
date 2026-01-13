'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const partners = [
    { name: 'MAGNA', role: 'Manufactura' },
    { name: 'PANASONIC', role: 'Celdas' },
    { name: 'NVIDIA', role: 'Inteligencia Artificial' },
    { name: 'ALLIANZ', role: 'Seguros' },
];

export default function Partners() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section
            ref={ref}
            className="py-16 border-t border-white/5"
            style={{ backgroundColor: '#111111' }}
        >
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <p className="text-muted text-sm mb-10">
                        Tecnología impulsada por líderes mundiales:
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center gap-2 group"
                            >
                                {/* Logo-style text */}
                                <div className="px-6 py-3 rounded-lg bg-white/[0.02] border border-white/5 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-white/[0.04]">
                                    <span className="text-xl md:text-2xl font-bold tracking-widest text-muted/60 group-hover:text-muted transition-colors duration-300">
                                        {partner.name}
                                    </span>
                                </div>
                                <span className="text-xs text-muted/40">
                                    {partner.role}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
