'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Eye } from 'lucide-react';

interface BatteryData {
    id: number;
    chargeLevel: number;
}

interface Car3DViewerProps {
    batteries: BatteryData[];
    onBatteryClick?: (battery: BatteryData) => void;
    className?: string;
}

// Battery cylinder component
function BatteryCylinder({
    position,
    chargeLevel,
    isVisible
}: {
    position: [number, number, number];
    chargeLevel: number;
    isVisible: boolean;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    const getColor = () => {
        if (chargeLevel <= 20) return '#ffae00';
        if (chargeLevel <= 50) return '#00D2FF';
        return '#39ff14';
    };

    useFrame((state) => {
        if (meshRef.current && isVisible) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    if (!isVisible) return null;

    return (
        <group position={position}>
            {/* Battery cylinder */}
            <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.35, 32]} />
                <meshStandardMaterial
                    color={getColor()}
                    emissive={getColor()}
                    emissiveIntensity={0.4}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            {/* Battery cap */}
            <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}

// Trunk lid component
function TrunkLid({ isOpen }: { isOpen: boolean }) {
    const lidRef = useRef<THREE.Group>(null);
    const targetRotation = isOpen ? -1.2 : 0;

    useFrame(() => {
        if (lidRef.current) {
            lidRef.current.rotation.x += (targetRotation - lidRef.current.rotation.x) * 0.08;
        }
    });

    return (
        <group ref={lidRef} position={[0.85, 0.35, 0]}>
            {/* Trunk lid */}
            <mesh position={[0.08, 0, 0]}>
                <boxGeometry args={[0.18, 0.02, 0.75]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.9}
                    roughness={0.15}
                    envMapIntensity={1.2}
                />
            </mesh>
            {/* Trunk lid glass */}
            <mesh position={[0.08, 0.02, 0]}>
                <boxGeometry args={[0.15, 0.01, 0.6]} />
                <meshPhysicalMaterial
                    color="#111"
                    metalness={0}
                    roughness={0}
                    transmission={0.6}
                    thickness={0.5}
                />
            </mesh>
        </group>
    );
}

// Premium Mini Cooper-style car body
function CarBody({ trunkOpen, batteries }: { trunkOpen: boolean; batteries: BatteryData[] }) {
    const bodyRef = useRef<THREE.Group>(null);

    // Glossy dark paint material
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: '#0a0a0a',
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.5,
    });

    // Chrome trim material
    const chromeMaterial = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        metalness: 1,
        roughness: 0.05,
    });

    // Glass material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: '#88ccff',
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        thickness: 0.2,
        envMapIntensity: 0.5,
    });

    // Battery positions in trunk
    const batteryPositions: [number, number, number][] = [
        [0.75, 0.12, -0.24],
        [0.75, 0.12, -0.12],
        [0.75, 0.12, 0],
        [0.75, 0.12, 0.12],
        [0.75, 0.12, 0.24],
    ];

    return (
        <group ref={bodyRef}>
            {/* Main body - lower section */}
            <mesh position={[0, 0.15, 0]} material={bodyMaterial}>
                <boxGeometry args={[2, 0.28, 0.9]} />
            </mesh>

            {/* Body side curves (fenders) */}
            <mesh position={[-0.6, 0.22, 0]} material={bodyMaterial}>
                <boxGeometry args={[0.5, 0.12, 0.95]} />
            </mesh>
            <mesh position={[0.6, 0.22, 0]} material={bodyMaterial}>
                <boxGeometry args={[0.5, 0.12, 0.95]} />
            </mesh>

            {/* Cabin section */}
            <mesh position={[0, 0.42, 0]} material={bodyMaterial}>
                <boxGeometry args={[1.1, 0.28, 0.82]} />
            </mesh>

            {/* Roof */}
            <mesh position={[0.05, 0.58, 0]} material={bodyMaterial}>
                <boxGeometry args={[0.85, 0.08, 0.78]} />
            </mesh>

            {/* Hood (front) */}
            <mesh position={[-0.7, 0.32, 0]} rotation={[0, 0, 0.1]} material={bodyMaterial}>
                <boxGeometry args={[0.45, 0.06, 0.8]} />
            </mesh>

            {/* Rear deck */}
            <mesh position={[0.7, 0.32, 0]} rotation={[0, 0, -0.05]} material={bodyMaterial}>
                <boxGeometry args={[0.35, 0.05, 0.78]} />
            </mesh>

            {/* Windshield front */}
            <mesh position={[-0.38, 0.48, 0]} rotation={[0, 0, 0.5]} material={glassMaterial}>
                <boxGeometry args={[0.35, 0.02, 0.7]} />
            </mesh>

            {/* Windshield rear */}
            <mesh position={[0.45, 0.48, 0]} rotation={[0, 0, -0.4]} material={glassMaterial}>
                <boxGeometry args={[0.3, 0.02, 0.65]} />
            </mesh>

            {/* Side windows */}
            <mesh position={[0.05, 0.45, 0.415]} material={glassMaterial}>
                <boxGeometry args={[0.7, 0.18, 0.02]} />
            </mesh>
            <mesh position={[0.05, 0.45, -0.415]} material={glassMaterial}>
                <boxGeometry args={[0.7, 0.18, 0.02]} />
            </mesh>

            {/* Chrome window trim */}
            <mesh position={[0.05, 0.38, 0.42]} material={chromeMaterial}>
                <boxGeometry args={[0.75, 0.02, 0.01]} />
            </mesh>
            <mesh position={[0.05, 0.38, -0.42]} material={chromeMaterial}>
                <boxGeometry args={[0.75, 0.02, 0.01]} />
            </mesh>

            {/* Headlights (circular Mini-style) */}
            <mesh position={[-0.95, 0.22, 0.28]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00D2FF"
                    emissiveIntensity={0.8}
                />
            </mesh>
            <mesh position={[-0.95, 0.22, -0.28]} rotation={[0, Math.PI / 2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#00D2FF"
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Headlight chrome rings */}
            <mesh position={[-0.93, 0.22, 0.28]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.11, 0.015, 16, 32]} />
                <meshStandardMaterial {...chromeMaterial} />
            </mesh>
            <mesh position={[-0.93, 0.22, -0.28]} rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[0.11, 0.015, 16, 32]} />
                <meshStandardMaterial {...chromeMaterial} />
            </mesh>

            {/* Tail lights */}
            <mesh position={[0.98, 0.25, 0.32]}>
                <boxGeometry args={[0.03, 0.08, 0.1]} />
                <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0.98, 0.25, -0.32]}>
                <boxGeometry args={[0.03, 0.08, 0.1]} />
                <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.6} />
            </mesh>

            {/* Wheels */}
            {[
                [-0.6, 0.08, 0.48],
                [-0.6, 0.08, -0.48],
                [0.6, 0.08, 0.48],
                [0.6, 0.08, -0.48],
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    {/* Tire */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.13, 0.05, 16, 32]} />
                        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                    </mesh>
                    {/* Wheel rim */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.09, 0.09, 0.08, 24]} />
                        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Center cap */}
                    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, i % 2 === 0 ? 0.045 : -0.045, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
                        <meshStandardMaterial color="#00D2FF" metalness={0.8} emissive="#00D2FF" emissiveIntensity={0.3} />
                    </mesh>
                </group>
            ))}

            {/* Front grille with BATISY vertical bars */}
            <mesh position={[-0.98, 0.18, 0]}>
                <boxGeometry args={[0.02, 0.1, 0.35]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
            {[-0.12, -0.04, 0.04, 0.12].map((z, i) => (
                <mesh key={i} position={[-0.97, 0.18, z]}>
                    <boxGeometry args={[0.01, 0.08, 0.015]} />
                    <meshStandardMaterial color="#00D2FF" emissive="#00D2FF" emissiveIntensity={0.5} />
                </mesh>
            ))}

            {/* Door handles (chrome) */}
            <mesh position={[-0.1, 0.35, 0.46]} material={chromeMaterial}>
                <boxGeometry args={[0.08, 0.015, 0.01]} />
            </mesh>
            <mesh position={[-0.1, 0.35, -0.46]} material={chromeMaterial}>
                <boxGeometry args={[0.08, 0.015, 0.01]} />
            </mesh>

            {/* BATISY logo on side (simplified) */}
            <mesh position={[0.2, 0.3, 0.455]}>
                <boxGeometry args={[0.2, 0.04, 0.005]} />
                <meshStandardMaterial color="#00D2FF" emissive="#00D2FF" emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[0.2, 0.3, -0.455]}>
                <boxGeometry args={[0.2, 0.04, 0.005]} />
                <meshStandardMaterial color="#00D2FF" emissive="#00D2FF" emissiveIntensity={0.4} />
            </mesh>

            {/* Trunk with opening animation */}
            <TrunkLid isOpen={trunkOpen} />

            {/* Battery compartment (visible when trunk open) */}
            <mesh position={[0.78, 0.1, 0]}>
                <boxGeometry args={[0.2, 0.12, 0.65]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Battery cylinders */}
            {batteries.map((battery, index) => (
                <BatteryCylinder
                    key={battery.id}
                    position={batteryPositions[index]}
                    chargeLevel={battery.chargeLevel}
                    isVisible={trunkOpen}
                />
            ))}
        </group>
    );
}

// Turntable rotation
function Turntable({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return <group ref={groupRef}>{children}</group>;
}

// Loading component
function LoadingCar() {
    return (
        <mesh>
            <boxGeometry args={[1.5, 0.4, 0.7]} />
            <meshStandardMaterial color="#1a1a1a" />
        </mesh>
    );
}

export function Car3DViewer({ batteries, onBatteryClick, className = '' }: Car3DViewerProps) {
    const [trunkOpen, setTrunkOpen] = useState(false);

    return (
        <div className={`relative ${className}`}>
            {/* 3D Canvas */}
            <div className="w-full h-72 rounded-2xl overflow-hidden">
                <Canvas
                    camera={{ position: [3, 1.5, 3], fov: 40 }}
                    style={{ touchAction: 'none' }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <color attach="background" args={['#050505']} />

                    {/* Lighting */}
                    <ambientLight intensity={0.2} />
                    <spotLight
                        position={[5, 8, 5]}
                        intensity={1.5}
                        angle={0.4}
                        penumbra={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />
                    <spotLight
                        position={[-5, 5, -5]}
                        intensity={0.8}
                        angle={0.5}
                        penumbra={1}
                        color="#00D2FF"
                    />
                    <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffffff" />

                    <Suspense fallback={<LoadingCar />}>
                        <Float speed={0.5} rotationIntensity={0} floatIntensity={0.2}>
                            <Turntable>
                                <CarBody trunkOpen={trunkOpen} batteries={batteries} />
                            </Turntable>
                        </Float>

                        <ContactShadows
                            position={[0, -0.15, 0]}
                            opacity={0.6}
                            scale={5}
                            blur={2}
                            far={3}
                        />
                    </Suspense>

                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        minPolarAngle={Math.PI / 3.5}
                        maxPolarAngle={Math.PI / 2.2}
                        rotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            {/* Inspect Modules button */}
            <motion.button
                onClick={() => setTrunkOpen(!trunkOpen)}
                className={`
          absolute bottom-4 right-4 px-4 py-2 rounded-xl
          flex items-center gap-2 font-medium text-sm
          transition-all duration-300 touch-feedback
          ${trunkOpen
                        ? 'bg-[#00D2FF] text-[#050505]'
                        : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'}
        `}
                whileTap={{ scale: 0.95 }}
            >
                {trunkOpen ? (
                    <>
                        <Eye size={16} />
                        Close Trunk
                    </>
                ) : (
                    <>
                        <Battery size={16} />
                        Inspect Modules
                    </>
                )}
            </motion.button>

            {/* Battery status when trunk is open */}
            <AnimatePresence>
                {trunkOpen && (
                    <motion.div
                        className="absolute top-4 left-4 p-3 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <p className="text-xs text-white/60 mb-2">Battery Modules</p>
                        <div className="flex gap-1">
                            {batteries.map((b) => (
                                <div
                                    key={b.id}
                                    className={`w-6 h-8 rounded flex items-end justify-center overflow-hidden
                    ${b.chargeLevel <= 20 ? 'bg-[#ffae00]/20' :
                                            b.chargeLevel >= 80 ? 'bg-[#39ff14]/20' : 'bg-[#00D2FF]/20'}`}
                                >
                                    <motion.div
                                        className={`w-full ${b.chargeLevel <= 20 ? 'bg-[#ffae00]' :
                                                b.chargeLevel >= 80 ? 'bg-[#39ff14]' : 'bg-[#00D2FF]'}`}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${b.chargeLevel}%` }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint */}
            <div className="absolute bottom-4 left-4 text-xs text-white/40">
                Drag to rotate
            </div>
        </div>
    );
}
