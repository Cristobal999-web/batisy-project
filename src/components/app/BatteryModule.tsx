'use client';

import { motion } from 'framer-motion';
import { Battery, Lock, Unlock } from 'lucide-react';

interface BatteryModuleProps {
    id: number;
    chargeLevel: number; // 0-100
    isFixed?: boolean; // Fixed reserve battery vs swappable
    isLocked?: boolean;
    isEmpty?: boolean;
    animationDelay?: number;
}

export function BatteryModule({
    id,
    chargeLevel,
    isFixed = false,
    isLocked = true,
    isEmpty = false,
    animationDelay = 0,
}: BatteryModuleProps) {
    // Color based on charge level
    const getColor = () => {
        if (isEmpty) return 'rgba(255, 255, 255, 0.1)';
        if (chargeLevel <= 20) return '#ffae00'; // Warning orange
        if (chargeLevel <= 50) return '#00f0ff'; // Cyan
        return '#39ff14'; // Green for high charge
    };

    const color = getColor();

    return (
        <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animationDelay, duration: 0.4 }}
        >
            {/* Module label */}
            <span className="text-xs text-muted mb-1">
                {isFixed ? 'RES' : `M${id}`}
            </span>

            {/* Battery container */}
            <div
                className={`
          relative w-10 h-20 rounded-lg overflow-hidden
          ${isFixed ? 'border-2 border-dashed border-muted/30' : 'battery-module'}
        `}
                style={{
                    background: isEmpty
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'linear-gradient(180deg, rgba(26, 26, 26, 1) 0%, rgba(12, 12, 12, 1) 100%)',
                }}
            >
                {/* Charge fill */}
                {!isEmpty && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0"
                        initial={{ height: 0 }}
                        animate={{ height: `${chargeLevel}%` }}
                        transition={{
                            delay: animationDelay + 0.2,
                            duration: 0.8,
                            ease: 'easeOut'
                        }}
                        style={{
                            background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                            boxShadow: chargeLevel > 0 ? `0 0 15px ${color}60` : 'none',
                        }}
                    />
                )}

                {/* Battery icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {isEmpty ? (
                        <span className="text-muted/40 text-xs">—</span>
                    ) : (
                        <Battery
                            size={16}
                            className="text-white/20 rotate-90"
                        />
                    )}
                </div>

                {/* Lock indicator for swappable modules */}
                {!isFixed && !isEmpty && (
                    <div className="absolute top-1 right-1">
                        {isLocked ? (
                            <Lock size={8} className="text-muted/40" />
                        ) : (
                            <Unlock size={8} className="text-primary/60" />
                        )}
                    </div>
                )}

                {/* Fixed indicator */}
                {isFixed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] text-muted/60 font-bold">FIJO</span>
                    </div>
                )}
            </div>

            {/* Charge percentage */}
            <motion.span
                className={`text-xs mt-1 font-medium ${isEmpty ? 'text-muted/40' : chargeLevel <= 20 ? 'text-warning' : 'text-foreground'
                    }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animationDelay + 0.4 }}
            >
                {isEmpty ? 'Vacío' : `${chargeLevel}%`}
            </motion.span>
        </motion.div>
    );
}
