'use client';

import { motion } from 'framer-motion';
import { Car, Home, MapPin, User } from 'lucide-react';

type TabType = 'vehicle' | 'dock' | 'delivery' | 'profile';

interface BottomNavigationProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const tabs = [
    { id: 'vehicle' as TabType, label: 'Vehículo', icon: Car },
    { id: 'dock' as TabType, label: 'Mi Dock', icon: Home },
    { id: 'delivery' as TabType, label: 'Entregas', icon: MapPin },
    { id: 'profile' as TabType, label: 'Perfil', icon: User },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass-heavy mobile-safe-area">
            <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="relative flex flex-col items-center justify-center w-full h-full touch-feedback"
                        >
                            <motion.div
                                className="relative flex flex-col items-center gap-1"
                                animate={{
                                    scale: isActive ? 1 : 0.9,
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                {/* Active indicator glow */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabGlow"
                                        className="absolute -inset-3 rounded-2xl bg-primary/10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}

                                <Icon
                                    size={24}
                                    className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted'
                                        }`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />

                                <span
                                    className={`relative z-10 text-xs font-medium transition-colors duration-200 ${isActive ? 'text-primary' : 'text-muted'
                                        }`}
                                >
                                    {tab.label}
                                </span>

                                {/* Active dot indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabDot"
                                        className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </button>
                    );
                })}
            </div>

            {/* Bottom safe area fill */}
            <div className="h-[env(safe-area-inset-bottom,0)]" />
        </nav>
    );
}
