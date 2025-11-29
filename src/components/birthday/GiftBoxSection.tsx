import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const GiftBox3D = ({ opened, onOpen }: any) => {
  const boxRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (boxRef.current && !opened) {
      boxRef.current.rotation.y += 0.005;
      boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
    
    if (lidRef.current && opened) {
      lidRef.current.position.y = Math.min(lidRef.current.position.y + 0.03, 2.5);
      lidRef.current.rotation.x = Math.min(lidRef.current.rotation.x + 0.03, Math.PI * 0.4);
    }
  });

  return (
    <group ref={boxRef} onClick={onOpen}>
      {/* Gift box base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshPhysicalMaterial
          color="#FF1493"
          roughness={0.2}
          metalness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Box edges highlight */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.2, 2.2, 2.2)]} />
        <lineBasicMaterial color="#FF69B4" linewidth={2} />
      </lineSegments>

      {/* Gift box lid */}
      <group ref={lidRef} position={[0, 1.15, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.3, 2.4]} />
          <meshPhysicalMaterial
            color="#FFB6C1"
            roughness={0.2}
            metalness={0.3}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Lid top decoration */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <boxGeometry args={[2.4, 0.02, 2.4]} />
          <meshPhysicalMaterial
            color="#FFD700"
            roughness={0.1}
            metalness={0.8}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Ribbon vertical */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 2.8, 0.25]} />
        <meshPhysicalMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>

      {/* Ribbon horizontal - front to back */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 2.8, 0.25]} />
        <meshPhysicalMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>

      {/* Ribbon horizontal - left to right */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.25, 2.8, 0.25]} />
        <meshPhysicalMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>

      {/* Bow - more realistic */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[0, 1.5, 0]}>
          {/* Left loop */}
          <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
            <torusGeometry args={[0.3, 0.12, 16, 32]} />
            <meshPhysicalMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              roughness={0.1}
              metalness={0.7}
              clearcoat={1}
            />
          </mesh>
          {/* Right loop */}
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
            <torusGeometry args={[0.3, 0.12, 16, 32]} />
            <meshPhysicalMaterial
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={0.3}
              roughness={0.1}
              metalness={0.7}
              clearcoat={1}
            />
          </mesh>
          {/* Center knot */}
          <mesh castShadow>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshPhysicalMaterial
              color="#FFA500"
              emissive="#FFA500"
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.8}
              clearcoat={1}
            />
          </mesh>
          {/* Ribbon tails */}
          <mesh position={[-0.2, -0.4, 0]} rotation={[0, 0, 0.3]} castShadow>
            <boxGeometry args={[0.15, 0.6, 0.05]} />
            <meshPhysicalMaterial
              color="#FFD700"
              roughness={0.2}
              metalness={0.7}
              clearcoat={0.8}
            />
          </mesh>
          <mesh position={[0.2, -0.4, 0]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.15, 0.6, 0.05]} />
            <meshPhysicalMaterial
              color="#FFD700"
              roughness={0.2}
              metalness={0.7}
              clearcoat={0.8}
            />
          </mesh>
        </group>
      </Float>

      {/* Sparkles around the box */}
      {[...Array(12)].map((_, i) => (
        <Float key={i} speed={3 + i * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            position={[
              Math.cos((i * Math.PI * 2) / 12) * 2,
              Math.sin((i * Math.PI * 2) / 12) * 0.8,
              Math.sin((i * Math.PI * 2) / 12) * 2,
            ]}
          >
            <octahedronGeometry args={[0.08, 0]} />
            <meshPhysicalMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const GiftBoxSection = () => {
  const [opened, setOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleOpen = () => {
    if (!opened) {
      setOpened(true);
      setTimeout(() => setShowMessage(true), 500);
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <motion.h2
        className="text-5xl md:text-6xl font-display font-bold text-center mb-8 text-gradient"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        A Special Gift for You 🎁
      </motion.h2>

      <motion.p
        className="text-center text-lg text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Click the gift box to open your surprise!
      </motion.p>

      <div className="max-w-4xl mx-auto h-[600px] glass-card relative">
        <Canvas shadows camera={{ position: [0, 2, 7], fov: 50 }}>
          <OrbitControls 
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1.5} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.8} color="#FFD700" />
          <pointLight position={[5, 3, 5]} intensity={0.6} color="#FF69B4" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.5}
            penumbra={1}
            intensity={2}
            color="#FFB6C1"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Ground plane for shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.4} />
          </mesh>

          <GiftBox3D opened={opened} onOpen={handleOpen} />
        </Canvas>

        {/* Sparkle burst when opened */}
        {opened && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: '50%',
                  top: '40%',
                  background: `hsl(${45 + Math.random() * 30}, 100%, 60%)`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Gift message appearing from box */}
      {showMessage && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: -50 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.34, 1.56, 0.64, 1],
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div
            className="glass-card text-center p-8 max-w-md"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 215, 0, 0.5)',
                '0 0 40px rgba(255, 105, 180, 0.7)',
                '0 0 20px rgba(255, 215, 0, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💝
            </motion.div>
            <motion.h3 
              className="text-3xl font-display font-bold mb-4 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              My Gift to You
            </motion.h3>
            <motion.p 
              className="text-lg text-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              The best gift I can give you is my friendship, my support, and all the amazing
              memories we'll continue to create together. ✨
            </motion.p>
          </motion.div>

          {/* Magical particles around the message */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                background: `hsl(${Math.random() * 360}, 100%, 70%)`,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default GiftBoxSection;
