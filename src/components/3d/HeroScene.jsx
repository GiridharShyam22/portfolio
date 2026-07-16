import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function LiquidPlane() {
  const meshRef = useRef();

  // Create a plane with high segment count for smooth waves
  const geometry = useMemo(() => new THREE.PlaneGeometry(40, 40, 70, 70), []);
  
  // Store original positions for the wave math
  const originalPositions = useMemo(() => {
    const pos = geometry.attributes.position;
    const orig = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      orig[i] = pos.getZ(i);
    }
    return orig;
  }, [geometry]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pos = geometry.attributes.position;
    
    // Animate vertices to create a liquid/wave effect
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Combine multiple sine waves for organic fluid motion
      const wave1 = 0.4 * Math.sin(x * 0.3 + time * 0.8);
      const wave2 = 0.3 * Math.sin(y * 0.4 + time * 0.5);
      const wave3 = 0.5 * Math.sin((x + y) * 0.15 - time * 0.6);
      const wave4 = 0.15 * Math.sin(Math.sqrt(x*x + y*y) * 0.5 - time * 1.2);
      
      const z = originalPositions[i] + wave1 + wave2 + wave3 + wave4;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
    
    // Slowly rotate the entire liquid plane
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2 + 0.15, 0, 0]} position={[0, -1.5, -3]}>
      {/* Sleek monochrome wireframe reflecting the tech aesthetic */}
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        {/* Aggressive black fog to fade the edges of the liquid plane into the darkness */}
        <fog attach="fog" args={['#000000', 1.5, 10]} />
        <LiquidPlane />
      </Canvas>
    </div>
  );
}
