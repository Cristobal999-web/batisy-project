'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Thermometer, Battery, Zap, AlertTriangle, Sun, Car, ChevronDown } from 'lucide-react';
import { HoldToConfirmButton } from '../app/HoldToConfirmButton';
import { ModelSelector } from '../app/ModelSelector';
import { useCarModel } from '@/context/CarContext';

export function VehicleDashboard() {
    const { selectedModel } = useCarModel();
    const [isLocked, setIsLocked] = useState(true);
    const [climateActive, setClimateActive] = useState(false);
    const [showModelSelector, setShowModelSelector] = useState(false);

    // Simulate current charge (65% of max range)
    const chargePercentage = 65;
    const currentRange = Math.round((selectedModel.range * chargePercentage) / 100);
    const batteryHealth = 98;
    const fixedBatteryCharge = 80; // Simulated fixed battery charge

    // Generate 8 module data
    const modules = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        charge: i < 3 ? 100 : i < 5 ? 85 : i < 6 ? 50 : 20,
        status: (i < 3 ? 100 : i < 5 ? 85 : i < 6 ? 50 : 20) <= 30 ? 'low' : 'ready',
    }));

    const lowModules = modules.filter(m => m.charge <= 30).length;
    const rangePercentage = (currentRange / selectedModel.range) * 100;

    return (
        <div className="min-h-screen bg-background pb-24 transition-colors duration-500">
            {/* Header with Model Selector */}
            <header className="px-4 pt-4 pb-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowModelSelector(true)}
                        className="flex items-center gap-2 group"
                    >
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{selectedModel.name}</h1>
                            <p className="text-foreground/40 text-sm">{selectedModel.trim}</p>
                        </div>
                        <ChevronDown size={20} className="text-foreground/40 group-hover:text-primary transition-colors" />
                    </button>

                    <motion.div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${isLocked ? 'bg-foreground/10' : 'bg-primary/20'
                            }`}
                    >
                        {isLocked ? (
                            <Lock size={14} className="text-foreground/60" />
                        ) : (
                            <Unlock size={14} className="text-primary" />
                        )}
                        <span className={`text-xs font-medium ${isLocked ? 'text-foreground/60' : 'text-primary'}`}>
                            {isLocked ? 'Bloqueado' : 'Desbloqueado'}
                        </span>
                    </motion.div>
                </div>
            </header>

            <div className="px-4 space-y-6">
                {/* Central Range Ring */}
                <motion.div
                    className="flex flex-col items-center py-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={selectedModel.id} // Re-animate on model change
                >
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="84"
                                fill="none"
                                stroke="currentColor"
                                className="text-foreground/5"
                                strokeWidth="12"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="84"
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 84}
                                initial={{ strokeDashoffset: 2 * Math.PI * 84 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 84 * (1 - rangePercentage / 100) }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                style={{ filter: 'drop-shadow(0 0 8px var(--primary-glow, rgba(0, 210, 255, 0.4)))' }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                className="text-5xl font-light text-foreground"
                                key={currentRange}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {currentRange}
                            </motion.span>
                            <span className="text-lg text-foreground/50">km</span>
                            <span className="text-xs text-foreground/30 mt-1">de {selectedModel.range} km máx</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="p-4 rounded-2xl bg-surface-light border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Battery size={20} className="text-primary" />
                            <span className="text-foreground/50 text-sm">Carga total</span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{chargePercentage}%</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-light border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={20} className="text-secondary" />
                            <span className="text-foreground/50 text-sm">Salud batería</span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{batteryHealth}%</p>
                    </div>
                </motion.div>

                {/* Fixed Battery (only for One and Signature) */}
                {selectedModel.fixedBattery > 0 ? (
                    <motion.div
                        className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Battery size={20} className="text-secondary" />
                                <span className="text-foreground font-medium">Batería fija LFP</span>
                            </div>
                            <span className="text-xs text-foreground/50">{selectedModel.fixedBattery} kWh</span>
                        </div>
                        <div className="h-3 rounded-full bg-foreground/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-secondary"
                                initial={{ width: 0 }}
                                animate={{ width: `${fixedBatteryCharge}%` }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ boxShadow: '0 0 10px var(--secondary-glow, rgba(57, 255, 20, 0.4))' }}
                            />
                        </div>
                        <p className="text-xs text-foreground/40 mt-2">{fixedBatteryCharge}% cargada • Reserva de emergencia</p>
                    </motion.div>
                ) : (
                    <motion.div
                        className="p-4 rounded-2xl bg-surface-light border border-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-2 text-foreground/40">
                            <Battery size={20} />
                            <span className="text-sm">Batería fija: No instalada</span>
                        </div>
                        <p className="text-xs text-foreground/30 mt-1">Disponible en BATISY One y Signature</p>
                    </motion.div>
                )}

                {/* Solar Status (only for One and Signature) */}
                {selectedModel.solarRoof && (
                    <motion.div
                        className="p-4 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sun size={20} className="text-[#FFD700]" />
                                <span className="text-foreground font-medium">Techo solar</span>
                            </div>
                            <span className="text-[#FFD700] text-sm font-medium">+8.5 kWh hoy</span>
                        </div>
                        <p className="text-xs text-foreground/40 mt-1">Generando • Pico solar: 12:00-14:00</p>
                    </motion.div>
                )}

                <motion.div
                    className="p-4 rounded-2xl bg-surface-light border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-foreground font-semibold">Módulos intercambiables</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-foreground/50">8 × 3 kWh</span>
                            {lowModules > 0 && (
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffae00]/20">
                                    <AlertTriangle size={10} className="text-[#ffae00]" />
                                    <span className="text-xs text-[#ffae00]">{lowModules}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-8 gap-1.5">
                        {modules.map((module, i) => (
                            <motion.div
                                key={module.id}
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.05 }}
                            >
                                <div
                                    className="w-full h-16 rounded-lg relative overflow-hidden border"
                                    style={{
                                        background: 'linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface) 100%)',
                                        borderColor: 'var(--glass-border)',
                                    }}
                                >
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${module.charge}%` }}
                                        transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}
                                        style={{
                                            background: module.charge > 50 ? 'var(--secondary)' : module.charge > 25 ? 'var(--primary)' : 'var(--warning)',
                                        }}
                                    />
                                </div>
                                <span className="text-[10px] text-foreground/30 mt-1">{module.charge}%</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <HoldToConfirmButton
                        onConfirm={() => setIsLocked(!isLocked)}
                        icon={isLocked ? Lock : Unlock}
                        label={isLocked ? 'Desbloquear' : 'Bloquear'}
                        sublabel="Mantén presionado"
                        variant={isLocked ? 'primary' : 'warning'}
                    />

                    <motion.button
                        onClick={() => setClimateActive(!climateActive)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${climateActive
                                ? 'bg-[#ff6b6b]/15 border-[#ff6b6b]/30'
                                : 'bg-surface-light border-white/5'
                            }`}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${climateActive ? 'bg-[#ff6b6b]/20' : 'bg-foreground/10'
                            }`}>
                            <Thermometer size={20} className={climateActive ? 'text-[#ff6b6b]' : 'text-foreground/50'} />
                        </div>
                        <div className="text-left">
                            <p className={`font-medium ${climateActive ? 'text-[#ff6b6b]' : 'text-foreground'}`}>
                                {climateActive ? 'Calentando...' : 'Climatización'}
                            </p>
                            <p className="text-foreground/40 text-xs">
                                {climateActive ? '22°C • 8 min' : 'Pre-acondicionar'}
                            </p>
                        </div>
                    </motion.button>
                </motion.div>
            </div>

            {/* Model Selector Modal */}
            <ModelSelector isOpen={showModelSelector} onClose={() => setShowModelSelector(false)} />
        </div>
    );
}
