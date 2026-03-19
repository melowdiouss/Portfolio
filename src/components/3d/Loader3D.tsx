'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Icosahedron() {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireframeRef = useRef<THREE.LineSegments>(null);
    const mouse = useRef({ x: 0, y: 0 });

    const { viewport } = useThree();

    const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), []);
    const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.15;
            meshRef.current.rotation.y += delta * 0.2;

            // Mouse interaction - subtle tilt
            meshRef.current.rotation.x += (mouse.current.y * 0.3 - meshRef.current.rotation.x) * 0.02;
            meshRef.current.rotation.y += (mouse.current.x * 0.3 - meshRef.current.rotation.y) * 0.02;
        }
        if (wireframeRef.current) {
            wireframeRef.current.rotation.copy(meshRef.current!.rotation);
        }
    });

    return (
        <group>
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial
                    color="#818cf8"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <lineSegments ref={wireframeRef} geometry={edges}>
                <lineBasicMaterial color="#818cf8" transparent opacity={0.6} />
            </lineSegments>
        </group>
    );
}

function FloatingParticles() {
    const points = useRef<THREE.Points>(null);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.y += delta * 0.02;
            points.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#818cf8"
                size={0.02}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export default function Loader3D() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#818cf8" />
                <pointLight position={[-5, -5, -5]} intensity={0.4} color="#c084fc" />
                <Icosahedron />
                <FloatingParticles />
            </Canvas>
        </div>
    );
}
