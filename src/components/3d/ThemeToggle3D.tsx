'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

function ToggleSwitch({ isDark }: { isDark: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const knobRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.PointLight>(null);

    useFrame((state, delta) => {
        if (knobRef.current) {
            // Smooth position transition
            const targetX = isDark ? 0.5 : -0.5;
            knobRef.current.position.x += (targetX - knobRef.current.position.x) * 0.1;

            // Subtle floating animation
            knobRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
            knobRef.current.rotation.y += delta * 0.5;
        }

        if (glowRef.current) {
            glowRef.current.intensity = isDark ? 2 + Math.sin(state.clock.elapsedTime * 3) * 0.5 : 0;
        }
    });

    const trackColor = isDark ? '#1e1b4b' : '#e0e7ff';
    const knobColor = isDark ? '#818cf8' : '#f59e0b';

    return (
        <group ref={groupRef} scale={0.8}>
            {/* Track */}
            <mesh>
                <capsuleGeometry args={[0.28, 1, 8, 16]} />
                <meshStandardMaterial
                    color={trackColor}
                    roughness={0.3}
                    metalness={0.1}
                />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.28, 1, 8, 16]} />
                <meshStandardMaterial
                    color={trackColor}
                    transparent
                    opacity={0}
                />
            </mesh>

            {/* Knob */}
            <mesh ref={knobRef} position={[isDark ? 0.5 : -0.5, 0, 0.15]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial
                    color={knobColor}
                    roughness={0.2}
                    metalness={0.6}
                    emissive={isDark ? '#818cf8' : '#f59e0b'}
                    emissiveIntensity={isDark ? 0.5 : 0.2}
                />
            </mesh>

            {/* Neon glow for dark mode */}
            {isDark && (
                <pointLight
                    ref={glowRef}
                    position={[0.5, 0, 0.5]}
                    color="#818cf8"
                    intensity={2}
                    distance={3}
                />
            )}
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
                width: '60px',
                height: '30px',
                cursor: 'pointer',
                borderRadius: '15px',
                overflow: 'hidden',
            }}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <Canvas
                camera={{ position: [0, 0, 2.5], fov: 30 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[2, 2, 2]} intensity={0.8} />
                <ToggleSwitch isDark={isDark} />
            </Canvas>
        </div>
    );
}
