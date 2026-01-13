'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Car Models Data from Engineering Specs
export const CAR_MODELS = {
    city: {
        id: 'city',
        name: 'BATISY City',
        trim: 'Urban Entry',
        range: 180,
        swappableModules: 8,
        fixedBattery: 0,
        solarRoof: false,
        image: '/car-city.png',
        color: '#00D2FF',
    },
    one: {
        id: 'one',
        name: 'BATISY One',
        trim: 'Balanced Edition',
        range: 210,
        swappableModules: 8,
        fixedBattery: 8,
        solarRoof: true,
        image: '/car-one.png',
        color: '#39ff14',
    },
    signature: {
        id: 'signature',
        name: 'BATISY Signature',
        trim: 'Performance AWD',
        range: 270,
        swappableModules: 8,
        fixedBattery: 14,
        solarRoof: true,
        image: '/car-signature.png',
        color: '#FFD700',
    },
} as const;

export type CarModelId = keyof typeof CAR_MODELS;
export type CarModel = typeof CAR_MODELS[CarModelId];

interface CarContextType {
    selectedModel: CarModel;
    setSelectedModel: (id: CarModelId) => void;
    showToast: boolean;
    toastMessage: string;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export function CarProvider({ children }: { children: ReactNode }) {
    const [selectedModelId, setSelectedModelId] = useState<CarModelId>('one');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const setSelectedModel = (id: CarModelId) => {
        setSelectedModelId(id);
        setToastMessage(`Conectado a ${CAR_MODELS[id].name}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <CarContext.Provider
            value={{
                selectedModel: CAR_MODELS[selectedModelId],
                setSelectedModel,
                showToast,
                toastMessage,
            }}
        >
            {children}
        </CarContext.Provider>
    );
}

export function useCarModel() {
    const context = useContext(CarContext);
    if (!context) {
        throw new Error('useCarModel must be used within CarProvider');
    }
    return context;
}
