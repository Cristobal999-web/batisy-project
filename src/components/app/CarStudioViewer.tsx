'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Car, ArrowLeft, ArrowRight, Battery } from 'lucide-react';

type ViewType = 'front' | 'side' | 'rear' | 'open';

interface ViewConfig {
    id: ViewType;
    label: string;
    image: string;
    icon: React.ReactNode;
}

const VIEWS: ViewConfig[] = [
    { id: 'front', label: 'Front', image: '/car-front.png', icon: <Car size={16} /> },
    { id: 'side', label: 'Side', image: '/car-side.png', icon: <ArrowRight size={16} /> },
    { id: 'rear', label: 'Rear', image: '/car-rear.png', icon: <ArrowLeft size={16} /> },
    { id: 'open', label: 'Batteries', image: '/car-open.png', icon: <Battery size={16} /> },
];

interface CarStudioViewerProps {
    className?: string;
}

export function CarStudioViewer({ className = '' }: CarStudioViewerProps) {
    const [currentView, setCurrentView] = useState<ViewType>('front');
    const [showTooltip, setShowTooltip] = useState(false);

    const currentViewConfig = VIEWS.find(v => v.id === currentView)!;

    return (
        <div className={`relative ${className}`}>
            {/* Image container with radial gradient background */}
            <div
                className="relative w-full h-72 rounded-2xl overflow-hidden"
                style={{
                    background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 50%, #050505 100%)',
                }}
            >
                {/* Crossfade image viewer */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentView}
                        className="absolute inset-0 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <img
                            src={currentViewConfig.image}
                            alt={`BATISY Mini - ${currentViewConfig.label} view`}
                            className="max-w-full max-h-full object-contain"
                            style={{
                                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Battery hotspot (only visible on open view) */}
                <AnimatePresence>
                    {currentView === 'open' && (
                        <motion.div
                            className="absolute"
                            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -10%)' }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                        >
                            {/* Pulsing hotspot */}
                            <button
                                className="relative w-8 h-8 flex items-center justify-center"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                                onClick={() => setShowTooltip(!showTooltip)}
                            >
                                {/* Pulse rings */}
                                <span className="absolute w-8 h-8 rounded-full bg-[#00D2FF]/30 animate-ping" />
                                <span className="absolute w-6 h-6 rounded-full bg-[#00D2FF]/50 animate-pulse" />
                                <span className="relative w-3 h-3 rounded-full bg-[#00D2FF] shadow-lg shadow-[#00D2FF]/50" />
                            </button>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {showTooltip && (
                                    <motion.div
                                        className="absolute left-1/2 -translate-x-1/2 bottom-12 w-48 px-4 py-3 rounded-xl bg-black/80 backdrop-blur-xl border border-[#00D2FF]/30 shadow-xl"
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Battery size={14} className="text-[#00D2FF]" />
                                            <span className="text-xs font-bold text-[#00D2FF]">BATISY Modules</span>
                                        </div>
                                        <p className="text-white text-sm font-medium">5 × BATISY Modules</p>
                                        <p className="text-white/50 text-xs">15kg each • 75kg total</p>
                                        {/* Arrow */}
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-black/80 border-r border-b border-[#00D2FF]/30 rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* View label */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
                    <span className="text-xs text-white/70">{currentViewConfig.label} View</span>
                </div>

                {/* BATISY branding */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10">
                    <span className="text-xs font-bold text-[#00D2FF]">BATISY</span>
                    <span className="text-xs text-white/50 ml-1">Mini</span>
                </div>
            </div>

            {/* View switcher buttons */}
            <div className="flex gap-2 mt-4">
                {VIEWS.map((view) => (
                    <motion.button
                        key={view.id}
                        onClick={() => setCurrentView(view.id)}
                        className={`
              flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
              font-medium text-sm transition-all duration-300
              ${currentView === view.id
                                ? view.id === 'open'
                                    ? 'bg-[#39ff14] text-[#050505]'
                                    : 'bg-[#00D2FF] text-[#050505]'
                                : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                            }
            `}
                        whileTap={{ scale: 0.97 }}
                    >
                        {view.icon}
                        <span className="hidden sm:inline">{view.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Battery info panel (visible in open view) */}
            <AnimatePresence>
                {currentView === 'open' && (
                    <motion.div
                        className="mt-4 p-4 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#39ff14]/20 flex items-center justify-center">
                                    <Battery size={20} className="text-[#39ff14]" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">Battery Bay Open</p>
                                    <p className="text-xs text-white/50">5 modules • 3 ready for swap</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[100, 100, 85, 20, 20].map((level, i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-6 rounded-sm"
                                        style={{
                                            background: level > 50 ? '#39ff14' : level > 20 ? '#00D2FF' : '#ffae00',
                                            opacity: level / 100,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
