'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation2, Compass, Locate, X, Star, Battery, Clock, Phone, MessageCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic imports for Leaflet
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Polyline = dynamic(
    () => import('react-leaflet').then((mod) => mod.Polyline),
    { ssr: false }
);

// Madrid coordinates - C. de Sta. Cruz de Marcenado, 27, Centro, 28015 Madrid
const USER_LOCATION: [number, number] = [40.4296, -3.7103];
const RIDER_START: [number, number] = [40.4350, -3.7180];

interface DeliveryMapProps {
    onRequestSwap?: () => void;
}

// Animated rider position hook
function useAnimatedRider(isOrdering: boolean) {
    const [position, setPosition] = useState<[number, number]>(RIDER_START);

    useEffect(() => {
        if (!isOrdering) {
            setPosition(RIDER_START);
            return;
        }

        const steps = [
            [40.4340, -3.7160],
            [40.4330, -3.7140],
            [40.4320, -3.7120],
            [40.4310, -3.7110],
            [40.4300, -3.7105],
        ];

        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                setPosition(steps[stepIndex] as [number, number]);
                stepIndex++;
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isOrdering]);

    return position;
}

// Route coordinates
const ROUTE_COORDS: [number, number][] = [
    RIDER_START,
    [40.4340, -3.7160],
    [40.4330, -3.7140],
    [40.4320, -3.7120],
    [40.4310, -3.7110],
    [40.4300, -3.7105],
    USER_LOCATION,
];

export function GoogleMapsDelivery({ onRequestSwap }: DeliveryMapProps) {
    const [isClient, setIsClient] = useState(false);
    const [L, setL] = useState<typeof import('leaflet') | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [isOrdering, setIsOrdering] = useState(false);
    const [eta, setEta] = useState(8);

    const riderPosition = useAnimatedRider(isOrdering);

    useEffect(() => {
        setIsClient(true);
        import('leaflet').then(setL);
    }, []);

    useEffect(() => {
        if (isClient) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
            return () => { document.head.removeChild(link); };
        }
    }, [isClient]);

    useEffect(() => {
        if (!isOrdering) return;
        const interval = setInterval(() => {
            setEta(prev => Math.max(1, prev - 1));
        }, 30000);
        return () => clearInterval(interval);
    }, [isOrdering]);

    const handleRequestSwap = () => {
        setIsOrdering(true);
        onRequestSwap?.();
    };

    if (!isClient || !L) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-gray-500">Cargando mapa...</div>
            </div>
        );
    }

    // Custom markers with shadows for light map
    const userIcon = L.divIcon({
        className: '',
        html: `
      <div class="relative flex items-center justify-center" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
        <div class="absolute w-16 h-16 rounded-full bg-blue-500/20 animate-ping"></div>
        <div class="absolute w-10 h-10 rounded-full bg-blue-500/30"></div>
        <div class="w-4 h-4 rounded-full bg-blue-500 border-3 border-white shadow-lg"></div>
      </div>
    `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });

    const riderIcon = L.divIcon({
        className: '',
        html: `
      <div class="w-12 h-12 rounded-full bg-[#00D2FF] flex items-center justify-center shadow-xl" style="filter: drop-shadow(0 4px 8px rgba(0,210,255,0.4));">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#050505" stroke-width="2.5">
          <circle cx="18.5" cy="17.5" r="3.5"/>
          <circle cx="5.5" cy="17.5" r="3.5"/>
          <circle cx="15" cy="5" r="1"/>
          <path d="m12 17.5 6-4.5-3-5"/>
          <path d="M4 17.5 9 6h4"/>
        </svg>
      </div>
    `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    });

    return (
        <div className="w-full h-full relative">
            {/* Map - Light Theme (Google Maps style) */}
            <MapContainer
                center={USER_LOCATION}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
                attributionControl={false}
            >
                {/* Light theme tiles - CartoDB Positron (Google Maps-like) */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* User location */}
                <Marker position={USER_LOCATION} icon={userIcon} />

                {/* Rider marker */}
                {isOrdering && (
                    <Marker position={riderPosition} icon={riderIcon} />
                )}

                {/* Route polyline */}
                {isOrdering && (
                    <Polyline
                        positions={ROUTE_COORDS}
                        pathOptions={{
                            color: '#4285F4',
                            weight: 5,
                            opacity: 0.9,
                        }}
                    />
                )}
            </MapContainer>

            {/* Dark Glassmorphism Search Bar */}
            <div className="absolute top-4 left-4 right-4 z-[1000]">
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <Search size={20} className="text-white/60" />
                    <input
                        type="text"
                        placeholder="¿A dónde?"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-base"
                    />
                    {searchValue && (
                        <button onClick={() => setSearchValue('')}>
                            <X size={18} className="text-white/40" />
                        </button>
                    )}
                </div>
            </div>

            {/* Floating action buttons (right side) - Dark style */}
            <div className="absolute right-4 top-24 z-[1000] flex flex-col gap-2">
                <motion.button
                    className="w-11 h-11 rounded-full bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl"
                    whileTap={{ scale: 0.9 }}
                >
                    <Compass size={20} className="text-white" />
                </motion.button>
                <motion.button
                    className="w-11 h-11 rounded-full bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-xl"
                    whileTap={{ scale: 0.9 }}
                >
                    <Locate size={20} className="text-white" />
                </motion.button>
            </div>

            {/* Bottom UI - Dark Glassmorphism Cards */}
            <AnimatePresence mode="wait">
                {!isOrdering ? (
                    /* Request Swap Card */
                    <motion.div
                        key="request"
                        className="absolute bottom-6 left-4 right-4 z-[1000]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                    >
                        <div className="p-5 rounded-3xl bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#00D2FF]/20 flex items-center justify-center">
                                    <Battery size={28} className="text-[#00D2FF]" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">Intercambio de Energía</p>
                                    <p className="text-white/50 text-sm">Recibe baterías cargadas a domicilio</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-4 p-3.5 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-[#00D2FF]" />
                                    <span className="text-white/70">Llegada est.</span>
                                </div>
                                <span className="text-white font-bold text-lg">8-12 min</span>
                            </div>

                            <motion.button
                                onClick={handleRequestSwap}
                                className="w-full py-4 rounded-xl bg-[#00D2FF] text-[#050505] font-bold text-base shadow-lg shadow-[#00D2FF]/30"
                                whileTap={{ scale: 0.98 }}
                            >
                                Solicitar Intercambio
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    /* Driver Bottom Sheet */
                    <motion.div
                        key="driver"
                        className="absolute bottom-6 left-4 right-4 z-[1000]"
                        initial={{ y: 300 }}
                        animate={{ y: 0 }}
                        exit={{ y: 300 }}
                    >
                        <div className="p-5 rounded-3xl bg-[#1a1a1a]/98 backdrop-blur-2xl border border-white/10 shadow-2xl">
                            {/* Handle */}
                            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

                            {/* ETA Header */}
                            <div className="text-center mb-5">
                                <motion.p
                                    className="text-5xl font-bold text-white"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {eta} min
                                </motion.p>
                                <p className="text-white/50 text-sm">Llegando a tu ubicación</p>
                            </div>

                            {/* Driver Card */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 mb-4">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#0066ff] flex items-center justify-center text-white font-bold text-xl">
                                        CR
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#39ff14] border-2 border-[#1a1a1a] flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold">Carlos Rodríguez</p>
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="text-[#FFD700] fill-[#FFD700]" />
                                        <span className="text-white/70 text-sm">4.9</span>
                                        <span className="text-white/30 text-sm">• 847 intercambios</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <motion.button
                                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Phone size={18} className="text-white" />
                                    </motion.button>
                                    <motion.button
                                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MessageCircle size={18} className="text-white" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Battery Status */}
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/20">
                                <Battery size={24} className="text-[#00D2FF]" />
                                <div className="flex-1">
                                    <p className="text-white font-medium">Trae 2 Módulos</p>
                                    <p className="text-[#39ff14] text-sm font-semibold">100% Cargados</p>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-4 h-8 rounded bg-[#39ff14]" />
                                    <div className="w-4 h-8 rounded bg-[#39ff14]" />
                                </div>
                            </div>

                            {/* Vehicle info */}
                            <div className="mt-4 flex items-center justify-between text-white/40 text-xs">
                                <span>Honda PCX Electric • Blanco</span>
                                <span>Matrícula: 4521 GHT</span>
                            </div>

                            {/* Cancel button */}
                            <button
                                onClick={() => setIsOrdering(false)}
                                className="mt-4 w-full py-3 text-center text-white/50 text-sm"
                            >
                                Cancelar solicitud
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
