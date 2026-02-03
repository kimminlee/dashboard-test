import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 1. 홀로그램 코어 (다이아몬드 형태)
function HologramCore() {
  // 초기값을 null!로 주어 TS 에러 방지
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
      <group>
        {/* 외부 와이어프레임 */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>
        {/* 내부 발광체 */}
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// 2. 주변을 감싸는 링 (안정적인 TorusGeometry 사용)
function HologramRing({ radius, color, speed, rotation }: { radius: number, color: string, speed: number, rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += speed;
    }
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

export const BuildingScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black/90">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Fog: 안개 효과로 깊이감 조성 */}
        <fog attach="fog" args={['#030014', 5, 20]} />
        <ambientLight intensity={0.5} />
        
        {/* 배경 효과 */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={50} scale={5} size={4} speed={0.4} opacity={0.4} color="#bd00ff" />

        {/* 메인 오브젝트 */}
        <HologramCore />
        
        {/* 사이버 링 (각도와 크기를 다르게 배치) */}
        <HologramRing radius={2.2} color="#00f3ff" speed={0.01} rotation={[1.5, 0, 0]} />
        <HologramRing radius={2.8} color="#bd00ff" speed={-0.005} rotation={[1.2, 0.5, 0]} />
        <HologramRing radius={3.2} color="#00f3ff" speed={0.002} rotation={[1.8, -0.5, 0]} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
};