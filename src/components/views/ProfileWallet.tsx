'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    CreditCard,
    Leaf,
    Clock,
    Battery,
    ChevronRight,
    Settings,
    Award,
    Wallet,
    TrendingUp
} from 'lucide-react';
import { FitnessRing, TripleRing } from '../app/FitnessRing';
import { ThemeToggle } from '../app/ThemeToggle';

// User data
const userData = {
    name: 'Carlos García',
    email: 'carlos@email.com',
    plan: 'Urban',
    planStatus: 'active',
    memberSince: 'Marzo 2025',
    stats: {
        co2Saved: 847,
        co2Goal: 1000,
        moneySaved: 234,
        moneyGoal: 500,
        timeSaved: 32,
        timeGoal: 50,
        swapsCompleted: 28,
        totalKwh: 420,
    },
};

export function ProfileWallet() {
    const ringData = [
        { value: userData.stats.co2Saved, maxValue: userData.stats.co2Goal, color: '#39ff14', label: 'CO₂' },
        { value: userData.stats.moneySaved, maxValue: userData.stats.moneyGoal, color: '#00D2FF', label: 'Money' },
        { value: userData.stats.timeSaved, maxValue: userData.stats.timeGoal, color: '#ff6b6b', label: 'Time' },
    ];

    return (
        <div className="min-h-screen bg-background pb-24 transition-colors duration-500">
            {/* Header */}
            <header className="px-4 pt-4 pb-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center border border-white/5">
                            <Settings size={20} className="text-foreground/70" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="px-4 space-y-6">
                {/* User Card */}
                <motion.div
                    className="flex items-center gap-4 p-4 rounded-2xl bg-surface-light border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D2FF] to-[#0066ff] flex items-center justify-center text-white font-bold text-xl">
                        CG
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-foreground">{userData.name}</h2>
                        <p className="text-sm text-foreground/50">{userData.email}</p>
                    </div>
                </motion.div>

                {/* Apple Fitness-style Rings */}
                <motion.div
                    className="p-6 rounded-3xl bg-surface-light border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="text-sm font-semibold text-foreground/70 mb-6">Tu Impacto</h3>

                    <div className="flex items-center justify-center mb-6">
                        <TripleRing rings={ringData} size={180} />
                    </div>

                    {/* Ring labels */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#39ff14]" />
                                <span className="text-foreground font-bold">{userData.stats.co2Saved}</span>
                            </div>
                            <p className="text-xs text-foreground/50">kg CO₂ ahorrado</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00D2FF]" />
                                <span className="text-foreground font-bold">€{userData.stats.moneySaved}</span>
                            </div>
                            <p className="text-xs text-foreground/50">Dinero ahorrado</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b]" />
                                <span className="text-foreground font-bold">{userData.stats.timeSaved}h</span>
                            </div>
                            <p className="text-xs text-foreground/50">Tiempo ahorrado</p>
                        </div>
                    </div>
                </motion.div>

                {/* Subscription */}
                <motion.div
                    className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Award size={20} className="text-primary" />
                            <span className="font-bold text-foreground">Plan {userData.plan}</span>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                            Activo
                        </span>
                    </div>
                    <p className="text-foreground/50 text-sm mb-3">8 intercambios incluidos • Próxima facturación: 12 Feb</p>
                    <button className="w-full py-2.5 rounded-xl bg-surface-elevated text-foreground font-medium text-sm border border-white/5">
                        Gestionar suscripción
                    </button>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="p-4 rounded-2xl bg-surface-light border border-white/5 text-center">
                        <p className="text-3xl font-bold text-foreground">{userData.stats.swapsCompleted}</p>
                        <p className="text-xs text-foreground/50 mt-1">Intercambios totales</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-light border border-white/5 text-center">
                        <p className="text-3xl font-bold text-primary">{userData.stats.totalKwh}</p>
                        <p className="text-xs text-foreground/50 mt-1">kWh Consumidos</p>
                    </div>
                </motion.div>

                {/* Quick Links */}
                <div className="space-y-2">
                    {[
                        { icon: Wallet, label: 'Métodos de pago' },
                        { icon: Clock, label: 'Historial de actividad' },
                        { icon: Battery, label: 'Mis Baterías' },
                    ].map((item, i) => (
                        <motion.button
                            key={item.label}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-light border border-white/5"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className="text-foreground/50" />
                                <span className="text-foreground">{item.label}</span>
                            </div>
                            <ChevronRight size={18} className="text-foreground/30" />
                        </motion.button>
                    ))}
                </div>

                <p className="text-center text-xs text-foreground/30 pt-4">
                    BATISY App v3.0.0
                </p>
            </div>
        </div>
    );
}
