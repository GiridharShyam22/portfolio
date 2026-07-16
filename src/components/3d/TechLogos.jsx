import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, Sphere, Torus, Cylinder, Icosahedron } from "@react-three/drei";

// 3D React Logo
function ReactLogo(props) {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group ref={group} {...props}>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.5} toneMapped={false} />
      </Sphere>
      <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#61dafb" />
      </Torus>
      <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, Math.PI / 3]}>
        <meshStandardMaterial color="#61dafb" />
      </Torus>
      <Torus args={[0.8, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, -Math.PI / 3]}>
        <meshStandardMaterial color="#61dafb" />
      </Torus>
    </group>
  );
}

// 3D AI/ML Node (Abstract Icosahedron)
function AILogo(props) {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.x = state.clock.elapsedTime * 0.3;
    group.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <group ref={group} {...props}>
      <Icosahedron args={[0.7, 1]}>
        <meshStandardMaterial color="#10b981" wireframe emissive="#10b981" emissiveIntensity={0.8} toneMapped={false} />
      </Icosahedron>
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </Sphere>
    </group>
  );
}

// 3D Database Stack
function DBLogo(props) {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.y = -state.clock.elapsedTime * 0.2;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group ref={group} {...props}>
      <Cylinder args={[0.6, 0.6, 0.3, 32]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </Cylinder>
      <Cylinder args={[0.6, 0.6, 0.3, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </Cylinder>
      <Cylinder args={[0.6, 0.6, 0.3, 32]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </Cylinder>
    </group>
  );
}

// 3D Python Logo (Stylized interlocking rings)
function PythonLogo(props) {
  const group = useRef();
  useFrame((state) => {
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    group.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group ref={group} {...props}>
      <Torus args={[0.5, 0.2, 16, 50]} position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#3776AB" />
      </Torus>
      <Torus args={[0.5, 0.2, 16, 50]} position={[0.2, -0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#FFD43B" />
      </Torus>
    </group>
  );
}

export default function TechLogos() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[-4, 2, -2]}>
          <ReactLogo scale={1.2} />
        </Float>
        
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[4, -1, -3]}>
          <AILogo scale={1.5} />
        </Float>
        
        <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} position={[-3, -2, -4]}>
          <DBLogo scale={1} />
        </Float>

        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8} position={[3, 2.5, -5]}>
          <PythonLogo scale={1.2} />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
