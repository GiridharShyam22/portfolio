import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import {
  SiPython, SiTensorflow, SiOpencv, SiPytorch, SiScikitlearn,
  SiReact, SiNextdotjs, SiNodedotjs, SiFastapi, SiFlutter,
  SiMongodb, SiPostgresql, SiDocker, SiSocketdotio, SiWebrtc,
  SiFirebase, SiJsonwebtokens
} from 'react-icons/si';

const SKILLS = [
  { name: 'Python', icon: SiPython },
  { name: 'TensorFlow', icon: SiTensorflow },
  { name: 'OpenCV', icon: SiOpencv },
  { name: 'PyTorch', icon: SiPytorch },
  { name: 'Scikit-Learn', icon: SiScikitlearn },
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Docker', icon: SiDocker },
  { name: 'Socket.io', icon: SiSocketdotio },
  { name: 'WebRTC', icon: SiWebrtc },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'JWT', icon: SiJsonwebtokens }
];

function Node({ position, skill }) {
  const [hovered, setHovered] = useState(false);
  const Icon = skill.icon;
  
  return (
    <group position={position}>
      <mesh 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.3 : 0.15, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : '#737373'} />
      </mesh>
      
      {/* Halo effect */}
      <mesh>
        <sphereGeometry args={[hovered ? 0.5 : 0.25, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : '#404040'} transparent opacity={0.3} />
      </mesh>

      <Html
        position={[0, 0.4, 0]}
        center
        className={`transition-opacity duration-300 pointer-events-none ${hovered ? 'opacity-100' : 'opacity-0'}`}
        zIndexRange={[100, 0]}
      >
        <div className="flex flex-col items-center bg-[#0b0b0b]/90 border border-[#404040] px-3 py-2 rounded-xl backdrop-blur-sm shadow-xl">
          <Icon size={24} className="text-white mb-1" />
          <span className="text-white font-mono text-sm whitespace-nowrap">{skill.name}</span>
        </div>
      </Html>
    </group>
  );
}

function Network() {
  const groupRef = useRef();
  const { mouse, viewport } = useThree();
  
  // Generate stable random positions on a sphere
  const nodes = useMemo(() => {
    return SKILLS.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
      // Multiply by radius (3.5)
      const r = 3.5;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      return { position: new THREE.Vector3(x, y, z), skill };
    });
  }, []);

  // Generate lines between nodes that are close to each other
  const lines = useMemo(() => {
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 4.5) { // Connection threshold
          connections.push([nodes[i].position, nodes[j].position]);
        }
      }
    }
    return connections;
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Auto-rotation
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
      
      // Interactive mouse follow (subtle)
      const targetX = (mouse.x * viewport.width) / 20;
      const targetY = (mouse.y * viewport.height) / 20;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line 
          key={i} 
          points={line} 
          color="#333333" 
          lineWidth={1} 
          transparent 
          opacity={0.4} 
        />
      ))}
      {nodes.map((node, i) => (
        <Node key={i} position={node.position} skill={node.skill} />
      ))}
    </group>
  );
}

export default function SkillGraph() {
  return (
    <div className="w-full h-[500px] md:h-[600px] cursor-crosshair">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#0b0b0b', 5, 15]} />
        <Network />
        {/* We disable zoom so it doesn't interrupt page scrolling */}
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
