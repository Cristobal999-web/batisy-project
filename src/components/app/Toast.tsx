'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Car } from 'lucide-react';
import { useCarModel } from '@/context/CarContext';

export function Toast() {
    const { showToast, toastMessage } = useCarModel();

    return (
        <AnimatePresence>
            {showToast && (
                <motion.div
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                >
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#00D2FF]/30 shadow-lg shadow-[#00D2FF]/10">
                        <div className="w-8 h-8 rounded-full bg-[#00D2FF]/20 flex items-center justify-center">
                            <Car size={16} className="text-[#00D2FF]" />
                        </div>
                        <span className="text-white font-medium">{toastMessage}</span>
                        <Check size={16} className="text-[#39ff14]" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
