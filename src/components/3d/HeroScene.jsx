import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 100;
const MAX_DISTANCE = 1.8;

function NeuralConstellation() {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Initialize random particle positions and velocities
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12; // spread X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;  // spread Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;  // spread Z
      vel.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008
      });
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6), 3));
    return geo;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array;

    // Update positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArray[i * 3] += velocities[i].x;
      posArray[i * 3 + 1] += velocities[i].y;
      posArray[i * 3 + 2] += velocities[i].z;

      // Soft boundary bounce
      if (Math.abs(posArray[i * 3]) > 6) velocities[i].x *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 4) velocities[i].y *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 2) velocities[i].z *= -1;
    }
    positionsAttr.needsUpdate = true;

    // Update lines
    let lineIndex = 0;
    const linePosAttr = linesGeometry.attributes.position;
    const lineColorAttr = linesGeometry.attributes.color;
    const linePos = linePosAttr.array;
    const lineColor = lineColorAttr.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
          const alpha = 1.0 - Math.sqrt(distSq) / MAX_DISTANCE;
          const colorIntensity = alpha * 0.25; // Subtle white/gray lines

          linePos[lineIndex * 6] = posArray[i * 3];
          linePos[lineIndex * 6 + 1] = posArray[i * 3 + 1];
          linePos[lineIndex * 6 + 2] = posArray[i * 3 + 2];

          linePos[lineIndex * 6 + 3] = posArray[j * 3];
          linePos[lineIndex * 6 + 4] = posArray[j * 3 + 1];
          linePos[lineIndex * 6 + 5] = posArray[j * 3 + 2];

          lineColor[lineIndex * 6] = colorIntensity;
          lineColor[lineIndex * 6 + 1] = colorIntensity;
          lineColor[lineIndex * 6 + 2] = colorIntensity;
          
          lineColor[lineIndex * 6 + 3] = colorIntensity;
          lineColor[lineIndex * 6 + 4] = colorIntensity;
          lineColor[lineIndex * 6 + 5] = colorIntensity;

          lineIndex++;
        }
      }
    }
    linesGeometry.setDrawRange(0, lineIndex * 2);
    linePosAttr.needsUpdate = true;
    lineColorAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.7} sizeAttenuation={true} />
      </points>

      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial vertexColors={true} transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#000000', 3, 8]} />
        <NeuralConstellation />
      </Canvas>
    </div>
  );
}
