'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

function ToggleSwitch({ isDark }: { isDark: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const knobRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (knobRef.current) {
            const targetX = isDark ? 0.5 : -0.5;

            // Smooth interpolation (premium feel)
            knobRef.current.position.x = THREE.MathUtils.lerp(
                knobRef.current.position.x,
                targetX,
                0.1
            );

            // Subtle floating motion
            knobRef.current.position.y =
                Math.sin(state.clock.elapsedTime * 2) * 0.015;

            // Very subtle rotation
            knobRef.current.rotation.y += 0.01;
        }
    });

    const trackColor = isDark ? '#0f172a' : '#e5e7eb';
    const knobColor = isDark ? '#6366f1' : '#facc15';

    return (
        <group ref={groupRef} scale={0.85}>
            {/* Track (Soft / Inflated) */}
            <mesh>
                <capsuleGeometry args={[0.5, -5 ,6, 35, 32]} />
                <meshStandardMaterial
                    color={trackColor}
                    roughness={0.9}
                    metalness={0}
                />
            <mesh position={[0, -0.12, 0.05]}>
                <circleGeometry args={[0.25, 32]} />
                <meshBasicMaterial
                    color="black"
                    transparent
                    opacity={0.08}
                />
            </mesh>
            </mesh>

            {/* Fake soft shadow under knob */}

            {/* Knob (Floating soft object) */}
            <mesh
                ref={knobRef}
                position={[isDark ? 0.5 : -0.5, 0, 0.25]}
            >
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshStandardMaterial
                    color={knobColor}
                    roughness={0.8}
                    metalness={0}
                    emissive={knobColor}
                    emissiveIntensity={isDark ? 0.2 : 0.1}
                />
            </mesh>
        </group>
    );
}

export default function ThemeToggle3D() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            onClick={toggleTheme}
            style={{
                width: '70px',
                height: '36px',
                cursor: 'pointer',
                borderRadius: '20px',
                overflow: 'hidden',
            }}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                {/* Soft lighting setup */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 2]} intensity={0.6} />
                <directionalLight position={[-2, -1, 2]} intensity={0.3} />

                <ToggleSwitch isDark={isDark} />
            </Canvas>
        </div>
    );
}