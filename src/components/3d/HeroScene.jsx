import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Animated glowing core sphere ── */
function CoreSphere() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.18;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.06;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 3]} />
      <MeshDistortMaterial
        color="#727272"
        emissive="#424242"
        emissiveIntensity={0.6}
        wireframe={false}
        distort={0.35}
        speed={2}
        roughness={0.1}
        metalness={0.7}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ── Wireframe shell ── */
function WireShell() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05;
    }
  });
  return (
    <mesh ref={meshRef} scale={1.55}>
      <icosahedronGeometry args={[1.3, 1]} />
      <meshBasicMaterial color="#727272" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* ── Orbiting ring ── */
function OrbitRing({ radius = 2.2, speed = 0.4, tilt = 0, color = '#727272' }) {
  const groupRef = useRef();
  const dotRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (groupRef.current) groupRef.current.rotation.z = t;
    if (dotRef.current) {
      dotRef.current.position.x = Math.cos(t) * radius;
      dotRef.current.position.y = Math.sin(t) * radius * 0.3;
    }
  });
  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {/* Ring geometry */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>
      {/* Orbiting dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* ── Floating data nodes ── */
function DataNodes() {
  const nodes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      const theta = (i / 12) * Math.PI * 2;
      const r = 2.8 + Math.random() * 0.8;
      items.push({
        x: Math.cos(theta) * r,
        y: (Math.random() - 0.5) * 2.5,
        z: Math.sin(theta) * r,
        size: 0.03 + Math.random() * 0.04,
        color: ['#727272', '#171717', '#727272'][Math.floor(Math.random() * 3)],
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <Float key={i} speed={n.speed} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[n.x, n.y, n.z]}>
            <sphereGeometry args={[n.size, 6, 6]} />
            <meshBasicMaterial color={n.color} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ── Exported Scene ── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#727272" />
      <pointLight position={[-5, -3, -3]} intensity={0.6} color="#171717" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#727272" />

      <Stars radius={30} depth={10} count={800} factor={2} saturation={0.8} fade speed={0.5} />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <CoreSphere />
        <WireShell />
      </Float>

      <OrbitRing radius={2.1} speed={0.35} tilt={0.3} color="#727272" />
      <OrbitRing radius={2.6} speed={-0.22} tilt={-0.5} color="#171717" />
      <OrbitRing radius={2.0} speed={0.5} tilt={1.0} color="#727272" />

      <DataNodes />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />
    </Canvas>
  );
}
