'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface CarTurntableProps {
    onBatteryInspect?: () => void;
    className?: string;
}

// High-quality car image URLs from Unsplash (Modern EV style)
// Using a single high-quality image and simulating rotation with CSS transforms
const CAR_BASE_IMAGE = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=90';
const CAR_FRONT_IMAGE = 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=90';
const CAR_REAR_IMAGE = 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=90';

// Number of frames in the turntable
const TOTAL_FRAMES = 36;

export function CarTurntable({ onBatteryInspect, className = '' }: CarTurntableProps) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showTrunk, setShowTrunk] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const lastX = useRef(0);
    const dragStartFrame = useRef(0);

    // Handle drag start
    const handleDragStart = useCallback((clientX: number) => {
        setIsDragging(true);
        lastX.current = clientX;
        dragStartFrame.current = currentFrame;
    }, [currentFrame]);

    // Handle drag move
    const handleDragMove = useCallback((clientX: number) => {
        if (!isDragging || !containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const deltaX = clientX - lastX.current;
        const sensitivity = containerWidth / TOTAL_FRAMES;

        // Calculate new frame based on drag distance
        const frameDelta = Math.round(deltaX / sensitivity);
        let newFrame = (dragStartFrame.current - frameDelta) % TOTAL_FRAMES;
        if (newFrame < 0) newFrame += TOTAL_FRAMES;

        setCurrentFrame(newFrame);
    }, [isDragging]);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Pointer event handlers
    const onPointerDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        handleDragStart(e.clientX);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        handleDragMove(e.clientX);
    };

    const onPointerUp = (e: React.PointerEvent) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        handleDragEnd();
    };

    // Calculate rotation angle based on frame
    const rotationAngle = (currentFrame / TOTAL_FRAMES) * 360;

    // Choose image based on rotation angle
    const getCarImage = () => {
        const angle = rotationAngle % 360;
        if (angle > 315 || angle <= 45) return CAR_FRONT_IMAGE;
        if (angle > 135 && angle <= 225) return CAR_REAR_IMAGE;
        return CAR_BASE_IMAGE;
    };

    const handleInspectClick = () => {
        setShowTrunk(true);
        onBatteryInspect?.();
    };

    return (
        <div className={`relative ${className}`}>
            {/* Main viewer container */}
            <div
                ref={containerRef}
                className="relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505]"
            >
                <AnimatePresence mode="wait">
                    {!showTrunk ? (
                        /* Turntable view */
                        <motion.div
                            key="turntable"
                            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerLeave={handleDragEnd}
                            style={{ touchAction: 'none' }}
                        >
                            {/* Studio lighting effect */}
                            <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />

                            {/* Floor reflection */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-20"
                                style={{
                                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,210,255,0.1) 100%)',
                                }}
                            />

                            {/* Car image with rotation simulation */}
                            <motion.div
                                className="relative w-full h-full flex items-center justify-center"
                                animate={{
                                    rotateY: 0,
                                    scaleX: Math.cos(rotationAngle * Math.PI / 180) > 0 ? 1 : -1,
                                }}
                                transition={{ duration: 0.1 }}
                            >
                                <img
                                    src={getCarImage()}
                                    alt="BATISY Mini Electric"
                                    className="h-48 object-contain select-none pointer-events-none"
                                    style={{
                                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                                    }}
                                    draggable={false}
                                />
                            </motion.div>

                            {/* Rotation indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <div className="w-20 h-1 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#00D2FF]"
                                        style={{ width: `${(currentFrame / TOTAL_FRAMES) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs text-white/40">{Math.round(rotationAngle)}°</span>
                            </div>

                            {/* Drag hint */}
                            {!isDragging && (
                                <motion.div
                                    className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <RotateCcw size={14} className="text-white/50" />
                                    <span className="text-xs text-white/50">Drag to rotate</span>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        /* Trunk open view */
                        <motion.div
                            key="trunk"
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Trunk open image with battery modules */}
                            <div className="relative w-full h-full">
                                {/* Background car rear */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img
                                        src={CAR_REAR_IMAGE}
                                        alt="BATISY Mini Trunk Open"
                                        className="h-44 object-contain opacity-60"
                                        style={{
                                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
                                        }}
                                    />
                                </div>

                                {/* Battery modules overlay */}
                                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 px-6 py-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
                                    <div className="text-center">
                                        <p className="text-xs text-white/50 mb-2">Battery Modules</p>
                                        <div className="flex gap-1.5">
                                            {[100, 100, 85, 20, 20].map((level, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="relative w-8 h-16 rounded-lg overflow-hidden"
                                                    style={{
                                                        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                                                        border: `1px solid ${level > 50 ? '#39ff14' : level > 20 ? '#00D2FF' : '#ffae00'}40`,
                                                    }}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 + i * 0.1 }}
                                                >
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0"
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${level}%` }}
                                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                                        style={{
                                                            background: level > 50 ? '#39ff14' : level > 20 ? '#00D2FF' : '#ffae00',
                                                            boxShadow: `0 0 10px ${level > 50 ? '#39ff14' : level > 20 ? '#00D2FF' : '#ffae00'}60`,
                                                        }}
                                                    />
                                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80">
                                                        {level}%
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-white/40 mt-2">3 modules ready for swap</p>
                                    </div>
                                </div>

                                {/* Trunk open label */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF]/30">
                                    <span className="text-sm font-medium text-[#00D2FF]">Trunk Open - Battery Bay</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Inspect / Close button */}
            <motion.button
                onClick={() => showTrunk ? setShowTrunk(false) : handleInspectClick()}
                className={`
          mt-4 w-full py-4 rounded-xl font-medium
          flex items-center justify-center gap-3
          transition-all duration-300
          ${showTrunk
                        ? 'bg-white/10 text-white border border-white/10'
                        : 'bg-[#00D2FF] text-[#050505]'
                    }
        `}
                whileTap={{ scale: 0.98 }}
            >
                {showTrunk ? (
                    <>
                        <EyeOff size={20} />
                        Close Trunk View
                    </>
                ) : (
                    <>
                        <Battery size={20} />
                        Inspect Battery Modules
                    </>
                )}
            </motion.button>

            {/* BATISY branding */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-bold text-[#00D2FF]">BATISY</span>
                <span className="text-xs text-white/50 ml-1">Mini</span>
            </div>
        </div>
    );
}
