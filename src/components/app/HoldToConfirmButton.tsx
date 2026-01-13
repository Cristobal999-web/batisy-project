'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface HoldToConfirmButtonProps {
    onConfirm: () => void;
    holdDuration?: number; // in milliseconds
    icon?: LucideIcon;
    label: string;
    sublabel?: string;
    variant?: 'primary' | 'warning' | 'danger';
    disabled?: boolean;
}

export function HoldToConfirmButton({
    onConfirm,
    holdDuration = 2000,
    icon: Icon,
    label,
    sublabel,
    variant = 'primary',
    disabled = false,
}: HoldToConfirmButtonProps) {
    const [isHolding, setIsHolding] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    const getVariantColors = () => {
        switch (variant) {
            case 'warning':
                return {
                    bg: 'rgba(255, 174, 0, 0.1)',
                    border: 'rgba(255, 174, 0, 0.3)',
                    ring: '#ffae00',
                    text: '#ffae00',
                };
            case 'danger':
                return {
                    bg: 'rgba(255, 60, 60, 0.1)',
                    border: 'rgba(255, 60, 60, 0.3)',
                    ring: '#ff3c3c',
                    text: '#ff3c3c',
                };
            default:
                return {
                    bg: 'rgba(0, 240, 255, 0.1)',
                    border: 'rgba(0, 240, 255, 0.3)',
                    ring: '#00f0ff',
                    text: '#00f0ff',
                };
        }
    };

    const colors = getVariantColors();
    const circumference = 2 * Math.PI * 40;

    const handlePointerDown = useCallback(() => {
        if (disabled) return;

        setIsHolding(true);
        setIsComplete(false);
        startTimeRef.current = Date.now();

        holdTimeoutRef.current = setTimeout(() => {
            setIsComplete(true);
            setIsHolding(false);
            onConfirm();

            // Reset after visual feedback
            setTimeout(() => setIsComplete(false), 500);
        }, holdDuration);
    }, [disabled, holdDuration, onConfirm]);

    const handlePointerUp = useCallback(() => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
        setIsHolding(false);
    }, []);

    return (
        <motion.button
            className={`
        relative flex flex-col items-center justify-center
        w-full py-4 px-6 rounded-2xl
        touch-feedback transition-all duration-200
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
            style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            disabled={disabled}
        >
            {/* Hold progress ring */}
            <div className="relative w-24 h-24 mb-3">
                <svg width="96" height="96" className="absolute -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="4"
                    />

                    {/* Progress circle */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke={isComplete ? '#39ff14' : colors.ring}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{
                            strokeDashoffset: isHolding ? 0 : circumference,
                        }}
                        transition={{
                            duration: isHolding ? holdDuration / 1000 : 0.3,
                            ease: 'linear',
                        }}
                        style={{
                            filter: `drop-shadow(0 0 6px ${colors.ring}80)`,
                        }}
                    />
                </svg>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{
                            scale: isHolding ? 0.9 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        {Icon && (
                            <Icon
                                size={32}
                                style={{ color: isComplete ? '#39ff14' : colors.text }}
                                strokeWidth={2}
                            />
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Labels */}
            <span
                className="font-semibold text-lg"
                style={{ color: isComplete ? '#39ff14' : colors.text }}
            >
                {isComplete ? '¡Confirmado!' : label}
            </span>

            {sublabel && !isComplete && (
                <span className="text-xs text-muted mt-1">
                    {sublabel}
                </span>
            )}

            {!isComplete && !isHolding && (
                <span className="text-xs text-muted/60 mt-2">
                    Mantén presionado {holdDuration / 1000}s para confirmar
                </span>
            )}
        </motion.button>
    );
}
