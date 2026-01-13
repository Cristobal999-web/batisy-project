'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Dock models based on the price list
export const DOCK_MODELS = {
    duo: {
        id: 'duo',
        name: 'BATISY Dock',
        model: 'Duo',
        slots: 2,
        description: 'Diseño Premium, pantalla OLED. Ideal recibidor.',
        price: 599,
        features: ['Pantalla OLED', 'Diseño compacto', 'Instalación sencilla'],
    },
    quattro: {
        id: 'quattro',
        name: 'BATISY Dock',
        model: 'Quattro',
        slots: 4,
        description: 'Torre inteligente silenciosa (Ventilación Noctua).',
        price: 1049,
        features: ['Ventilación Noctua', 'Torre vertical', 'Silencioso'],
    },
    octowall: {
        id: 'octowall',
        name: 'BATISY Dock',
        model: 'Octo-Wall',
        slots: 8,
        description: 'Instalación seria (Tipo Powerwall). Acero reforzado.',
        price: 1949,
        features: ['Montaje en pared', 'Acero reforzado', 'Alta capacidad'],
    },
    pro16: {
        id: 'pro16',
        name: 'BATISY Dock',
        model: 'Pro-16',
        slots: 16,
        description: 'Grado Industrial (IP54). Para comunidades.',
        price: 3990,
        features: ['Grado industrial', 'IP54', 'Para comunidades'],
    },
} as const;

export type DockModelId = keyof typeof DOCK_MODELS;
export type DockModel = typeof DOCK_MODELS[DockModelId];

interface DockContextType {
    selectedDock: DockModel;
    setSelectedDock: (id: DockModelId) => void;
}

const DockContext = createContext<DockContextType | undefined>(undefined);

export function DockProvider({ children }: { children: ReactNode }) {
    const [selectedDockId, setSelectedDockId] = useState<DockModelId>('quattro');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('batisy-dock');
        if (saved && saved in DOCK_MODELS) {
            setSelectedDockId(saved as DockModelId);
        }
    }, []);

    const setSelectedDock = (id: DockModelId) => {
        setSelectedDockId(id);
        localStorage.setItem('batisy-dock', id);
    };

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <DockContext.Provider value={{
            selectedDock: DOCK_MODELS[selectedDockId],
            setSelectedDock
        }}>
            {children}
        </DockContext.Provider>
    );
}

export function useDock() {
    const context = useContext(DockContext);
    if (!context) {
        throw new Error('useDock must be used within a DockProvider');
    }
    return context;
}
