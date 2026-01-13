'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
    width?: string | number;
    height?: string | number;
    className?: string;
    variant?: 'rect' | 'circle' | 'text';
}

export function SkeletonLoader({
    width = '100%',
    height = 20,
    className = '',
    variant = 'rect',
}: SkeletonLoaderProps) {
    const baseClasses = `
    relative overflow-hidden
    bg-surface-light
    ${variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'rounded' : 'rounded-lg'}
    ${className}
  `;

    return (
        <div
            className={baseClasses}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
                }}
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    );
}

// Pre-built skeleton layouts for common use cases
export function BatteryModuleSkeleton() {
    return (
        <div className="flex flex-col items-center">
            <SkeletonLoader width={32} height={12} variant="text" className="mb-1" />
            <SkeletonLoader width={40} height={80} className="mb-1" />
            <SkeletonLoader width={28} height={12} variant="text" />
        </div>
    );
}

export function GaugeSkeleton() {
    return (
        <div className="flex flex-col items-center">
            <SkeletonLoader width={220} height={220} variant="circle" />
        </div>
    );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
    return (
        <div className="p-4 rounded-2xl bg-surface">
            <SkeletonLoader width="60%" height={20} className="mb-4" />
            {Array.from({ length: lines }).map((_, i) => (
                <SkeletonLoader
                    key={i}
                    width={i === lines - 1 ? '40%' : '100%'}
                    height={16}
                    variant="text"
                    className="mt-2"
                />
            ))}
        </div>
    );
}
