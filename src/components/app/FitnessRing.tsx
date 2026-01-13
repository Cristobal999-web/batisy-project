'use client';

import { motion } from 'framer-motion';

interface FitnessRingProps {
    value: number; // 0-100 percentage
    maxValue: number;
    color: string;
    size?: number;
    strokeWidth?: number;
    label: string;
    unit: string;
    icon?: React.ReactNode;
}

export function FitnessRing({
    value,
    maxValue,
    color,
    size = 100,
    strokeWidth = 8,
    label,
    unit,
    icon,
}: FitnessRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min((value / maxValue) * 100, 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background ring */}
                <svg width={size} height={size} className="absolute -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={`${color}20`}
                        strokeWidth={strokeWidth}
                    />
                </svg>

                {/* Progress ring */}
                <svg width={size} height={size} className="absolute -rotate-90">
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
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                        style={{
                            filter: `drop-shadow(0 0 6px ${color}60)`,
                        }}
                    />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {icon && <div className="mb-0.5" style={{ color }}>{icon}</div>}
                    <motion.span
                        className="text-lg font-bold text-white"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {value.toLocaleString()}
                    </motion.span>
                    <span className="text-xs text-white/50">{unit}</span>
                </div>
            </div>
            <span className="mt-2 text-xs text-white/70 font-medium">{label}</span>
        </div>
    );
}

// Triple ring display like Apple Fitness
interface TripleRingProps {
    rings: {
        value: number;
        maxValue: number;
        color: string;
        label: string;
    }[];
    size?: number;
}

export function TripleRing({ rings, size = 160 }: TripleRingProps) {
    const strokeWidth = 12;
    const gap = 14;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            {rings.map((ring, index) => {
                const ringRadius = (size / 2) - (index * gap) - strokeWidth / 2;
                const circumference = 2 * Math.PI * ringRadius;
                const percentage = Math.min((ring.value / ring.maxValue) * 100, 100);
                const strokeDashoffset = circumference - (percentage / 100) * circumference;

                return (
                    <svg
                        key={index}
                        width={size}
                        height={size}
                        className="absolute inset-0 -rotate-90"
                    >
                        {/* Background */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={ringRadius}
                            fill="none"
                            stroke={`${ring.color}20`}
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress */}
                        <motion.circle
                            cx={size / 2}
                            cy={size / 2}
                            r={ringRadius}
                            fill="none"
                            stroke={ring.color}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + index * 0.15 }}
                            style={{
                                filter: `drop-shadow(0 0 4px ${ring.color}50)`,
                            }}
                        />
                    </svg>
                );
            })}
        </div>
    );
}
