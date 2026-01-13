'use client';

import { motion } from 'framer-motion';

interface CircularGaugeProps {
    value: number; // 0-100 percentage
    maxValue: number; // e.g., 350 km
    currentValue: number; // e.g., 210 km
    label?: string;
    size?: number;
    strokeWidth?: number;
    showWarning?: boolean;
}

export function CircularGauge({
    value,
    maxValue,
    currentValue,
    label = 'km',
    size = 220,
    strokeWidth = 12,
    showWarning = false,
}: CircularGaugeProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    // Color based on charge level
    const getColor = () => {
        if (value <= 20) return '#ffae00'; // Warning orange
        if (value <= 50) return '#00f0ff'; // Cyan
        return '#39ff14'; // Green for high charge
    };

    const color = showWarning ? '#ffae00' : getColor();

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Outer glow effect */}
            <div
                className="absolute inset-0 rounded-full opacity-30 blur-xl"
                style={{
                    background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`
                }}
            />

            {/* Background circle */}
            <svg width={size} height={size} className="absolute transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth={strokeWidth}
                />

                {/* Progress arc */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{
                        filter: `drop-shadow(0 0 8px ${color}80)`,
                    }}
                />
            </svg>

            {/* Inner circle with value */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                <motion.span
                    className="text-5xl font-bold text-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {currentValue}
                </motion.span>
                <span className="text-lg text-muted mt-1">{label}</span>

                {/* Max range indicator */}
                <span className="text-xs text-muted/60 mt-2">
                    de {maxValue} {label} máx
                </span>
            </div>

            {/* Tick marks around the circle */}
            <svg width={size} height={size} className="absolute">
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * 360 - 90;
                    const x1 = size / 2 + (radius + 8) * Math.cos((angle * Math.PI) / 180);
                    const y1 = size / 2 + (radius + 8) * Math.sin((angle * Math.PI) / 180);
                    const x2 = size / 2 + (radius + 4) * Math.cos((angle * Math.PI) / 180);
                    const y2 = size / 2 + (radius + 4) * Math.sin((angle * Math.PI) / 180);

                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth={1}
                        />
                    );
                })}
            </svg>
        </div>
    );
}
