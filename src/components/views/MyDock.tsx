'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, Clock, Battery, Check, ChevronDown } from 'lucide-react';
import { CardSkeleton } from '../app/SkeletonLoader';
import { DockSelector } from '../app/DockSelector';
import { useDock } from '@/context/DockContext';

// Generate dynamic slot data based on dock slots count
function generateSlots(count: number) {
    return Array.from({ length: count }, (_, i) => {
        // Simulate different states
        const rand = Math.random();
        if (rand > 0.7) {
            return { id: i + 1, occupied: false, chargeLevel: 0, status: 'empty' as const };
        } else if (rand > 0.3) {
            return { id: i + 1, occupied: true, chargeLevel: 100, status: 'ready' as const };
        } else {
            const charge = Math.floor(Math.random() * 70) + 20;
            return { id: i + 1, occupied: true, chargeLevel: charge, status: 'charging' as const };
        }
    });
}

export function MyDock() {
    const { selectedDock } = useDock();
    const [isLoading, setIsLoading] = useState(true);
    const [showDockSelector, setShowDockSelector] = useState(false);

    // Generate slots based on selected dock
    const slots = useMemo(() => generateSlots(selectedDock.slots), [selectedDock.id]);

    // Calculate stats from slots
    const readyModules = slots.filter(s => s.status === 'ready').length;
    const chargingModules = slots.filter(s => s.status === 'charging').length;
    const emptySlots = slots.filter(s => s.status === 'empty').length;
    const averageCharge = slots.filter(s => s.occupied).length > 0
        ? Math.round(slots.filter(s => s.occupied).reduce((acc, s) => acc + s.chargeLevel, 0) / slots.filter(s => s.occupied).length)
        : 0;
    const timeToReady = chargingModules > 0 ? Math.round(chargingModules * 15) : 0;

    // Solar data scales with dock size
    const solarToday = Math.round((selectedDock.slots / 4) * 8.5 * 10) / 10;
    const solarPeak = Math.round((selectedDock.slots / 4) * 12.3 * 10) / 10;

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [selectedDock.id]);

    const getSlotColor = (status: string, chargeLevel: number) => {
        if (status === 'empty') return 'var(--foreground-5, rgba(128, 128, 128, 0.1))';
        if (chargeLevel >= 100) return 'var(--secondary)';
        if (status === 'charging') return 'var(--primary)';
        return 'var(--warning)';
    };

    // Calculate dock visualization dimensions based on slots
    const getDockLayout = () => {
        if (selectedDock.slots <= 2) return { cols: 1, rows: 2, width: 'w-20', height: 'h-32' };
        if (selectedDock.slots <= 4) return { cols: 1, rows: 4, width: 'w-24', height: 'h-48' };
        if (selectedDock.slots <= 8) return { cols: 2, rows: 4, width: 'w-40', height: 'h-48' };
        return { cols: 4, rows: 4, width: 'w-64', height: 'h-48' };
    };

    const dockLayout = getDockLayout();

    return (
        <div className="min-h-screen bg-background pb-24 overflow-y-auto">
            {/* Header with Dock Selector */}
            <header className="sticky top-0 z-40 glass px-4 py-3">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowDockSelector(true)}
                        className="flex items-center gap-2 group"
                    >
                        <div>
                            <h1 className="text-lg font-bold text-foreground">
                                {selectedDock.name} "{selectedDock.model}"
                            </h1>
                            <p className="text-xs text-muted">Garaje Casa • {selectedDock.slots} huecos</p>
                        </div>
                        <ChevronDown size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </button>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-xs text-secondary font-medium">En línea</span>
                    </div>
                </div>
            </header>

            <div className="px-4 py-4 space-y-6">
                {/* Dock Visualization */}
                {isLoading ? (
                    <div className="p-6 rounded-3xl bg-surface border border-white/5" style={{ minHeight: '300px' }}>
                        <div className="flex justify-center mb-6">
                            <div className={`${dockLayout.width} ${dockLayout.height} rounded-2xl bg-surface-light animate-pulse`} />
                        </div>
                        <div className={`grid grid-cols-${Math.min(selectedDock.slots, 8)} gap-2`}>
                            {Array.from({ length: Math.min(selectedDock.slots, 8) }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-3 rounded bg-surface-light animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        className="relative p-6 rounded-3xl bg-surface border border-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={selectedDock.id}
                    >
                        {/* Dock visualization */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                {/* Dock frame */}
                                <div className={`${dockLayout.width} ${dockLayout.height} rounded-2xl bg-gradient-to-b from-surface-elevated to-surface border border-white/10 p-2 grid gap-1.5`}
                                    style={{ gridTemplateColumns: `repeat(${dockLayout.cols}, 1fr)` }}
                                >
                                    {slots.map((slot, index) => {
                                        const color = getSlotColor(slot.status, slot.chargeLevel);
                                        return (
                                            <motion.div
                                                key={slot.id}
                                                className="rounded-lg relative overflow-hidden min-h-[20px]"
                                                style={{
                                                    background: slot.occupied
                                                        ? 'linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface) 100%)'
                                                        : 'var(--foreground-opacity-5, rgba(128, 128, 128, 0.05))',
                                                    border: slot.occupied ? `1px solid ${color}` : '1px dashed var(--foreground-opacity-10, rgba(128, 128, 128, 0.1))',
                                                }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                            >
                                                {slot.occupied && (
                                                    <>
                                                        <motion.div
                                                            className="absolute bottom-0 left-0 right-0"
                                                            initial={{ height: 0 }}
                                                            animate={{ height: `${slot.chargeLevel}%` }}
                                                            transition={{ delay: 0.2 + index * 0.03, duration: 0.6 }}
                                                            style={{
                                                                background: `linear-gradient(180deg, ${color} 0%, ${color}60 100%)`,
                                                                boxShadow: `0 0 8px ${color}40`,
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            {slot.status === 'ready' ? (
                                                                <Check size={12} className="text-secondary" />
                                                            ) : (
                                                                <Zap size={12} className="text-primary animate-pulse" />
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Dock label */}
                                <div className="text-center mt-2">
                                    <span className="text-xs text-muted">{selectedDock.model.toUpperCase()}</span>
                                </div>

                                {/* Glow effect */}
                                <div
                                    className="absolute -inset-4 -z-10 blur-2xl opacity-30"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Slot status summary */}
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-2 rounded-xl bg-secondary/10">
                                <p className="text-lg font-bold text-secondary">{readyModules}</p>
                                <p className="text-[10px] text-muted">Listos</p>
                            </div>
                            <div className="p-2 rounded-xl bg-primary/10">
                                <p className="text-lg font-bold text-primary">{chargingModules}</p>
                                <p className="text-[10px] text-muted">Cargando</p>
                            </div>
                            <div className="p-2 rounded-xl bg-foreground/5">
                                <p className="text-lg font-bold text-foreground/50">{emptySlots}</p>
                                <p className="text-[10px] text-muted">Vacíos</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Smart Status */}
                {chargingModules > 0 && (
                    <motion.div
                        className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3">
                            <Clock size={24} className="text-primary" />
                            <div>
                                <p className="text-lg font-bold text-primary">
                                    Listo en {timeToReady} min
                                </p>
                                <p className="text-xs text-muted">
                                    {chargingModules} módulos cargándose • {averageCharge}% promedio
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Dock specs card */}
                <motion.div
                    className="p-4 rounded-2xl bg-surface-light border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <h3 className="text-sm font-semibold text-foreground mb-3">Especificaciones</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                            <Battery size={16} className="text-primary" />
                            <span className="text-sm text-foreground/70">{selectedDock.slots} huecos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={16} className="text-secondary" />
                            <span className="text-sm text-foreground/70">{selectedDock.slots * 3} kWh máx</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedDock.features.map((feature) => (
                            <span
                                key={feature}
                                className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Solar Integration */}
                <motion.div
                    className="p-4 rounded-2xl bg-surface border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Sun size={20} className="text-warning" />
                        <h2 className="text-sm font-semibold text-foreground">Energía Solar</h2>
                    </div>

                    {/* Solar graph placeholder */}
                    <div className="h-24 mb-4 rounded-xl bg-surface-light/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent" />
                        <svg className="absolute inset-0 w-full h-full">
                            <motion.path
                                d="M0 80 Q30 70 60 50 T120 30 T180 25 T240 35 T300 60 T360 75"
                                fill="none"
                                stroke="var(--secondary)"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                style={{ filter: 'drop-shadow(0 0 4px var(--secondary))' }}
                            />
                            <motion.path
                                d="M0 80 Q30 70 60 50 T120 30 T180 25 T240 35 T300 60 T360 75 V100 H0 Z"
                                fill="url(#solarGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                            <defs>
                                <linearGradient id="solarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                        <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2">
                            <span className="text-[10px] text-muted">6:00</span>
                            <span className="text-[10px] text-muted">12:00</span>
                            <span className="text-[10px] text-muted">18:00</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-xl bg-surface-light/50">
                            <div className="flex items-center gap-2 mb-1">
                                <Battery size={14} className="text-secondary" />
                                <span className="text-xs text-muted">Generado Hoy</span>
                            </div>
                            <p className="text-xl font-bold text-secondary">{solarToday} kWh</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-light/50">
                            <div className="flex items-center gap-2 mb-1">
                                <Sun size={14} className="text-warning" />
                                <span className="text-xs text-muted">Pico Solar</span>
                            </div>
                            <p className="text-xl font-bold text-warning">{solarPeak} kW</p>
                        </div>
                    </div>
                </motion.div>

                {/* Monthly savings */}
                <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted">Ahorro este mes</p>
                            <p className="text-2xl font-bold text-secondary">
                                {Math.round(selectedDock.slots * 12)}€
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted">vs. Red eléctrica</p>
                            <p className="text-sm font-medium text-primary">-68%</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Dock Selector Modal */}
            <DockSelector isOpen={showDockSelector} onClose={() => setShowDockSelector(false)} />
        </div>
    );
}
