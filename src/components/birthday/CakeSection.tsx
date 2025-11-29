import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Candle = ({ position, blown }: { position: [number, number, number]; blown: boolean }) => {
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flameRef.current && !blown) {
      flameRef.current.position.y = position[1] + 0.1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Candle stick */}
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
        <meshStandardMaterial color="#FFFACD" />
      </mesh>
      
      {/* Flame */}
      {!blown && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
          <mesh ref={flameRef} position={[0, 0.3, 0]}>
            <coneGeometry args={[0.08, 0.2, 8]} />
            <meshStandardMaterial
              color="#FFA500"
              emissive="#FF4500"
              emissiveIntensity={2}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      )}
      
      {/* Smoke when blown */}
      {blown && (
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#CCCCCC"
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

const Cake3D = ({ onSlice, sliced, blown, onBlow }: any) => {
  const cakeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cakeRef.current && !sliced) {
      cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handlePointerOver = () => {
    if (!blown) {
      onBlow();
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    // On mobile, first click blows candles, second click slices
    if (!blown) {
      onBlow();
    } else {
      onSlice();
    }
  };

  return (
    <group ref={cakeRef} onClick={handleClick}>
      {/* Bottom layer - Pink */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.8, 64]} />
        <meshPhysicalMaterial
          color="#FFB6C1"
          roughness={0.2}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Bottom layer frosting edge */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <torusGeometry args={[1.5, 0.08, 16, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.1}
          clearcoat={0.5}
        />
      </mesh>

      {/* Middle layer - Purple */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.6, 64]} />
        <meshPhysicalMaterial
          color="#DDA0DD"
          roughness={0.2}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Middle layer frosting edge */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <torusGeometry args={[1.2, 0.08, 16, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.1}
          clearcoat={0.5}
        />
      </mesh>

      {/* Top layer - Blue */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.5, 64]} />
        <meshPhysicalMaterial
          color="#87CEEB"
          roughness={0.2}
          metalness={0.05}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Top layer frosting edge */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <torusGeometry args={[0.9, 0.08, 16, 64]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.1}
          clearcoat={0.5}
        />
      </mesh>

      {/* Frosting decorations - bottom layer */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <mesh
          key={`bottom-${i}`}
          position={[
            Math.cos((angle * Math.PI) / 180) * 1.5,
            -0.5,
            Math.sin((angle * Math.PI) / 180) * 1.5,
          ]}
          castShadow
        >
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshPhysicalMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.6}
            clearcoat={0.8}
          />
        </mesh>
      ))}

      {/* Frosting decorations - middle layer */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <mesh
          key={`middle-${i}`}
          position={[
            Math.cos((angle * Math.PI) / 180) * 1.2,
            0,
            Math.sin((angle * Math.PI) / 180) * 1.2,
          ]}
          castShadow
        >
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshPhysicalMaterial 
            color="#FF69B4" 
            emissive="#FF69B4" 
            emissiveIntensity={0.2}
            roughness={0.2}
            metalness={0.5}
            clearcoat={0.8}
          />
        </mesh>
      ))}

      {/* Candles */}
      <group onPointerOver={handlePointerOver}>
        <Candle position={[0.5, 0.8, 0]} blown={blown} />
        <Candle position={[-0.5, 0.8, 0]} blown={blown} />
        <Candle position={[0, 0.8, 0.5]} blown={blown} />
        <Candle position={[0, 0.8, -0.5]} blown={blown} />
      </group>

      {/* Cake slice opening effect */}
      {sliced && (
        <group position={[2.5, -0.2, 0]} rotation={[0, -0.5, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 1.5, 0.9]} />
            <meshPhysicalMaterial 
              color="#FFB6C1"
              roughness={0.3}
              clearcoat={0.2}
            />
          </mesh>
          {/* Slice layers */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.9]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.9]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}
    </group>
  );
};

const CakeSection = () => {
  const [sliced, setSliced] = useState(false);
  const [blown, setBlown] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const handleSlice = () => {
    setSliced(true);
    setShowMessage(true);
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3000);
  };

  const handleBlow = () => {
    setBlown(true);
  };

  return (
    <section className="py-20 px-4 relative">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center mb-6 md:mb-8 text-gradient px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Make a Wish! 🎂
      </motion.h2>

      <motion.p
        className="text-center text-base sm:text-lg text-muted-foreground mb-4 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {!blown ? (
          <>
            <span className="hidden md:inline">Hover over the candles to blow them out!</span>
            <span className="md:hidden">Tap the cake to blow the candles!</span>
          </>
        ) : !sliced ? (
          'Now click the cake to slice it!'
        ) : (
          'Enjoy! 🎉'
        )}
      </motion.p>

      {/* Mobile-friendly buttons */}
      <div className="flex justify-center gap-4 mb-4 md:hidden">
        {!blown && (
          <motion.button
            className="magic-button text-sm px-6 py-3"
            onClick={handleBlow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Blow Candles 🕯️
          </motion.button>
        )}
        {blown && !sliced && (
          <motion.button
            className="magic-button text-sm px-6 py-3"
            onClick={handleSlice}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Slice Cake 🍰
          </motion.button>
        )}
      </div>

      <div className="max-w-4xl mx-auto h-[400px] sm:h-[500px] md:h-[600px] glass-card relative">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 2, 6]} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1.2} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.6} color="#FFB6C1" />
          <pointLight position={[5, 3, -5]} intensity={0.5} color="#FFD700" />
          <spotLight
            position={[0, 8, 0]}
            angle={0.4}
            penumbra={1}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Ground plane for shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.3} />
          </mesh>

          <Cake3D onSlice={handleSlice} sliced={sliced} blown={blown} onBlow={handleBlow} />
        </Canvas>

        {/* Fireworks overlay */}
        {showFireworks && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Birthday message */}
      {showMessage && (
        <motion.div
          className="mt-6 md:mt-8 glass-card max-w-2xl mx-auto text-center p-6 md:p-8"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-2xl sm:text-3xl font-display font-bold mb-3 md:mb-4 text-gradient"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Happy Birthday, Shreyashi Pandey ❤️
          </motion.h3>
          <p className="text-base sm:text-lg text-foreground">
            You deserve all the happiness and love today and always.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default CakeSection;
