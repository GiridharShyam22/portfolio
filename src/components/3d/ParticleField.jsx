import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 120;
const CONNECTION_THRESHOLD = 0.28; // fraction of scene size

function Nodes() {
  const meshRef = useRef();
  const linesRef = useRef();

  // Generate node positions
  const positions = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  // Build line segments between nearby nodes
  const linePositions = useMemo(() => {
    const pts = [];
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push([positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]]);
    }
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 5.5) {
          pts.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    return new Float32Array(pts);
  }, [positions]);

  // Node velocities for drift animation
  const velocities = useMemo(() => {
    const vel = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      vel.push(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001,
        (Math.random() - 0.5) * 0.001
      );
    }
    return vel;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.02;
      meshRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.02;
      linesRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
    }
  });

  return (
    <>
      {/* Glowing nodes */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#4f6ef7"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#1d2066"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
}

function FloatingRings() {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.y = t * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.2;
      ring2.current.rotation.z = t * 0.25;
    }
  });

  return (
    <>
      <mesh ref={ring1} position={[6, 2, -4]}>
        <torusGeometry args={[1.2, 0.015, 8, 80]} />
        <meshBasicMaterial color="#4f6ef7" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2} position={[-7, -1, -3]}>
        <torusGeometry args={[0.9, 0.012, 8, 60]} />
        <meshBasicMaterial color="#00b4ff" transparent opacity={0.2} />
      </mesh>
      <mesh position={[2, -3, -5]}>
        <torusGeometry args={[0.6, 0.01, 6, 40]} />
        <meshBasicMaterial color="#7c4fff" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function ParticleField({ className = '' }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <Nodes />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
