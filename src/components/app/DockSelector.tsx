'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, Check, X, Zap, Shield, Cpu } from 'lucide-react';
import { DOCK_MODELS, DockModelId, useDock } from '@/context/DockContext';

interface DockSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DockSelector({ isOpen, onClose }: DockSelectorProps) {
    const { selectedDock, setSelectedDock } = useDock();

    const handleSelect = (id: DockModelId) => {
        setSelectedDock(id);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed bottom-24 left-0 right-0 z-[60] p-4"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className="bg-surface-elevated rounded-3xl border border-white/5 overflow-hidden max-w-lg mx-auto shadow-2xl max-h-[70vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <Home size={20} className="text-primary" />
                                    <h2 className="text-lg font-bold text-foreground">Mis Docks</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center"
                                >
                                    <X size={18} className="text-foreground/60" />
                                </button>
                            </div>

                            {/* Docks list */}
                            <div className="p-4 space-y-3">
                                {(Object.keys(DOCK_MODELS) as DockModelId[]).map((id) => {
                                    const dock = DOCK_MODELS[id];
                                    const isSelected = selectedDock.id === id;

                                    return (
                                        <motion.button
                                            key={id}
                                            onClick={() => handleSelect(id)}
                                            className={`w-full p-4 rounded-2xl border text-left transition-all ${isSelected
                                                ? 'bg-primary/10 border-primary/50'
                                                : 'bg-surface-light border-white/5 hover:bg-foreground/5'
                                                }`}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className={`font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                        {dock.name} "{dock.model}"
                                                    </p>
                                                    <p className={`text-xs ${isSelected ? 'text-primary/70' : 'text-foreground/50'}`}>
                                                        {dock.description}
                                                    </p>
                                                </div>
                                                {isSelected && (
                                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                        <Check size={14} className="text-background" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Specs */}
                                            <div className="flex flex-wrap gap-3 text-xs mt-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Zap size={12} className={isSelected ? 'text-primary' : 'text-primary/70'} />
                                                    <span className={isSelected ? 'text-primary/90' : 'text-foreground/70'}>
                                                        {dock.slots} huecos
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Cpu size={12} className="text-secondary" />
                                                    <span className={isSelected ? 'text-primary/90' : 'text-foreground/70'}>
                                                        {dock.slots * 3} kWh máx
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Shield size={12} className="text-[#FFD700]" />
                                                    <span className={isSelected ? 'text-primary/90' : 'text-foreground/70'}>
                                                        {dock.price} €
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Features tags */}
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {dock.features.map((feature) => (
                                                    <span
                                                        key={feature}
                                                        className={`px-2 py-0.5 rounded-full text-[10px] ${isSelected
                                                                ? 'bg-primary/20 text-primary'
                                                                : 'bg-foreground/5 text-foreground/50'
                                                            }`}
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Footer hint */}
                            <div className="px-4 pb-4">
                                <p className="text-xs text-foreground/30 text-center">
                                    Cada hueco carga un módulo de 3 kWh
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
