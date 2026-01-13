'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Check, X, Zap, Sun, Battery } from 'lucide-react';
import { CAR_MODELS, CarModelId, useCarModel } from '@/context/CarContext';

interface ModelSelectorProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ModelSelector({ isOpen, onClose }: ModelSelectorProps) {
    const { selectedModel, setSelectedModel } = useCarModel();

    const handleSelect = (id: CarModelId) => {
        setSelectedModel(id);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
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
                                    <Car size={20} className="text-primary" />
                                    <h2 className="text-lg font-bold text-foreground">Mi Garaje</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center"
                                >
                                    <X size={18} className="text-foreground/60" />
                                </button>
                            </div>

                            {/* Models list */}
                            <div className="p-4 space-y-3">
                                {(Object.keys(CAR_MODELS) as CarModelId[]).map((id) => {
                                    const model = CAR_MODELS[id];
                                    const isSelected = selectedModel.id === id;

                                    return (
                                        <motion.button
                                            key={id}
                                            onClick={() => handleSelect(id)}
                                            className={`w-full p-4 rounded-2xl border text-left transition-all ${isSelected
                                                ? 'bg-primary/10 border-primary/50 text-primary'
                                                : 'bg-surface-light border-white/5 hover:bg-foreground/5 text-foreground'
                                                }`}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="font-bold">{model.name}</p>
                                                    <p className={`text-xs ${isSelected ? 'opacity-80' : 'opacity-50'}`}>{model.trim}</p>
                                                </div>
                                                {isSelected && (
                                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                                        <Check size={14} className="text-background" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Specs */}
                                            <div className="flex gap-4 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <Zap size={12} className={isSelected ? 'text-primary' : 'text-primary/70'} />
                                                    <span className={isSelected ? 'opacity-90' : 'opacity-70'}>{model.range} km</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Battery size={12} className="text-secondary" />
                                                    <span className={isSelected ? 'opacity-90' : 'opacity-70'}>
                                                        {model.fixedBattery > 0 ? `${model.fixedBattery} kWh fija` : 'Sin fija'}
                                                    </span>
                                                </div>
                                                {model.solarRoof && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Sun size={12} className="text-[#FFD700]" />
                                                        <span className={isSelected ? 'opacity-90' : 'opacity-70'}>Solar</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Footer hint */}
                            <div className="px-4 pb-4">
                                <p className="text-xs text-foreground/30 text-center">
                                    Todos los modelos usan 8 módulos intercambiables (24 kWh)
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
