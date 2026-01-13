'use client';

import { motion } from 'framer-motion';

interface CarVisualizationProps {
    batteryLevels?: number[]; // Array of 5 battery levels (0-100)
    showBatterySlots?: boolean;
    className?: string;
}

export function CarVisualization({
    batteryLevels = [100, 100, 85, 40, 0],
    showBatterySlots = true,
    className = '',
}: CarVisualizationProps) {
    // Calculate average battery color
    const avgLevel = batteryLevels.reduce((a, b) => a + b, 0) / batteryLevels.filter(l => l > 0).length;
    const glowColor = avgLevel <= 20 ? '#ffae00' : avgLevel <= 50 ? '#00f0ff' : '#39ff14';

    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Glow effect beneath car */}
            <div
                className="absolute inset-0 blur-3xl opacity-30"
                style={{
                    background: `radial-gradient(ellipse 80% 50% at center 70%, ${glowColor}40, transparent)`,
                }}
            />

            {/* Car SVG - Top-down futuristic view */}
            <svg
                viewBox="0 0 300 180"
                className="w-full h-auto"
                style={{
                    filter: `drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))`,
                }}
            >
                {/* Car body - main shape */}
                <motion.path
                    d="M60 90
             C60 55 80 35 100 30
             L200 30
             C220 35 240 55 240 90
             C240 125 220 145 200 150
             L100 150
             C80 145 60 125 60 90Z"
                    fill="url(#carBodyGradient)"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />

                {/* Car roof / cabin */}
                <motion.path
                    d="M90 70
             C95 55 105 50 120 50
             L180 50
             C195 50 205 55 210 70
             L220 110
             C215 125 205 130 180 130
             L120 130
             C95 130 85 125 80 110
             Z"
                    fill="url(#cabinGradient)"
                    stroke="rgba(0, 240, 255, 0.3)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                />

                {/* Windshield */}
                <motion.path
                    d="M100 65
             L95 95
             L100 100
             L130 100
             L135 65
             Z"
                    fill="rgba(0, 240, 255, 0.15)"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                />

                {/* Rear window */}
                <path
                    d="M165 65
             L170 100
             L200 100
             L205 95
             L200 65
             Z"
                    fill="rgba(0, 240, 255, 0.15)"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="0.5"
                />

                {/* Headlights */}
                <motion.ellipse
                    cx="80"
                    cy="55"
                    rx="8"
                    ry="4"
                    fill={glowColor}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
                />
                <motion.ellipse
                    cx="80"
                    cy="125"
                    rx="8"
                    ry="4"
                    fill={glowColor}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                    style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
                />

                {/* Tail lights */}
                <ellipse
                    cx="228"
                    cy="60"
                    rx="6"
                    ry="3"
                    fill="#ff3c3c"
                    style={{ filter: 'drop-shadow(0 0 6px #ff3c3c)' }}
                />
                <ellipse
                    cx="228"
                    cy="120"
                    rx="6"
                    ry="3"
                    fill="#ff3c3c"
                    style={{ filter: 'drop-shadow(0 0 6px #ff3c3c)' }}
                />

                {/* Wheels */}
                <circle cx="95" cy="45" r="15" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle cx="95" cy="45" r="8" fill="rgba(255,255,255,0.05)" />

                <circle cx="95" cy="135" r="15" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle cx="95" cy="135" r="8" fill="rgba(255,255,255,0.05)" />

                <circle cx="205" cy="45" r="15" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle cx="205" cy="45" r="8" fill="rgba(255,255,255,0.05)" />

                <circle cx="205" cy="135" r="15" fill="#0a0a0a" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle cx="205" cy="135" r="8" fill="rgba(255,255,255,0.05)" />

                {/* Battery compartment visualization */}
                {showBatterySlots && (
                    <g>
                        {/* Battery slot area */}
                        <rect
                            x="135"
                            y="60"
                            width="40"
                            height="60"
                            rx="4"
                            fill="rgba(0, 0, 0, 0.5)"
                            stroke="rgba(0, 240, 255, 0.2)"
                            strokeWidth="0.5"
                            strokeDasharray="2 2"
                        />

                        {/* Individual battery slots */}
                        {batteryLevels.map((level, i) => {
                            const slotHeight = 10;
                            const y = 65 + i * 11;
                            const fillColor = level <= 0 ? 'rgba(255,255,255,0.05)'
                                : level <= 20 ? '#ffae00'
                                    : level <= 50 ? '#00f0ff'
                                        : '#39ff14';

                            return (
                                <g key={i}>
                                    <rect
                                        x="140"
                                        y={y}
                                        width="30"
                                        height={slotHeight}
                                        rx="2"
                                        fill="rgba(255,255,255,0.05)"
                                    />
                                    <motion.rect
                                        x="140"
                                        y={y}
                                        width={(30 * level) / 100}
                                        height={slotHeight}
                                        rx="2"
                                        fill={fillColor}
                                        initial={{ width: 0 }}
                                        animate={{ width: (30 * level) / 100 }}
                                        transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                        style={{ filter: level > 0 ? `drop-shadow(0 0 3px ${fillColor})` : 'none' }}
                                    />
                                </g>
                            );
                        })}
                    </g>
                )}

                {/* BATISY logo */}
                <text
                    x="150"
                    y="145"
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="8"
                    fontWeight="bold"
                    fontFamily="system-ui"
                >
                    BATISY ONE
                </text>

                {/* Gradients */}
                <defs>
                    <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" />
                        <stop offset="50%" stopColor="#0f0f0f" />
                        <stop offset="100%" stopColor="#1a1a1a" />
                    </linearGradient>

                    <linearGradient id="cabinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#141414" />
                        <stop offset="100%" stopColor="#0a0a0a" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
}
