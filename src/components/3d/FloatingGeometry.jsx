import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function IcosahedronWire({ position = [0, 0, 0], speed = 0.4, color = '#4f6ef7', scale = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.005;
      meshRef.current.rotation.y += speed * 0.007;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  );
}

function TorusKnot({ position = [0, 0, 0], speed = 0.3, color = '#7c4fff' }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.006;
      meshRef.current.rotation.z += speed * 0.004;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusKnotGeometry args={[0.5, 0.15, 80, 12, 2, 3]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function OctahedronWire({ position = [0, 0, 0], speed = 0.5, color = '#00b4ff', scale = 1 }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.008;
      meshRef.current.rotation.x += speed * 0.004;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.25;
    }
  });
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default function FloatingGeometry({ variant = 'hero' }) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
          <IcosahedronWire position={[5, 1, -2]} speed={0.5} color="#4f6ef7" scale={1.4} />
          <TorusKnot position={[-5, -1, -3]} speed={0.3} color="#7c4fff" />
          <OctahedronWire position={[3, -2.5, -4]} speed={0.6} color="#00b4ff" scale={0.8} />
          <IcosahedronWire position={[-3, 2.5, -5]} speed={0.35} color="#1d2066" scale={2.5} />
        </Canvas>
      </div>
    );
  }
  if (variant === 'about') {
    return (
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
          <TorusKnot position={[4, 0, -2]} speed={0.4} color="#4f6ef7" />
          <OctahedronWire position={[-4, 1, -3]} speed={0.5} color="#7c4fff" scale={1.2} />
        </Canvas>
      </div>
    );
  }
  return null;
}
