'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNavigation } from '@/components/app/BottomNavigation';
import { VehicleDashboard } from '@/components/views/VehicleDashboard';
import { MyDock } from '@/components/views/MyDock';
import { EnergyDelivery } from '@/components/views/EnergyDelivery';
import { ProfileWallet } from '@/components/views/ProfileWallet';
import { CarProvider } from '@/context/CarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { DockProvider } from '@/context/DockContext';
import { Toast } from '@/components/app/Toast';

type TabType = 'vehicle' | 'dock' | 'delivery' | 'profile';

const tabVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

function AppContent() {
    const [activeTab, setActiveTab] = useState<TabType>('vehicle');

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'vehicle':
                return <VehicleDashboard />;
            case 'dock':
                return <MyDock />;
            case 'delivery':
                return <EnergyDelivery />;
            case 'profile':
                return <ProfileWallet />;
            default:
                return <VehicleDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] relative">
            {/* Toast notifications */}
            <Toast />

            {/* Main content area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    variants={tabVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="main-content-scroll pb-20"
                    style={{ minHeight: 'calc(100vh - 80px)' }}
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>

            {/* Bottom Navigation */}
            <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
    );
}

export default function AppPage() {
    return (
        <ThemeProvider>
            <CarProvider>
                <DockProvider>
                    <AppContent />
                </DockProvider>
            </CarProvider>
        </ThemeProvider>
    );
}

