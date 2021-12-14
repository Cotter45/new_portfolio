import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { ImageLoader } from "three";

function Moon() {
  const moonTexture = useLoader(ImageLoader, "/images/linkedin_pic.jpg");
  const moon = useRef<any>();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotation = time * 0.1;
    if (moon.current) {
      moon.current.rotation.set(rotation - 1, 0, 1);
    }
  });

  return (
    <mesh ref={moon} rotation={[0, 0, 0]} receiveShadow position={[20, 18, 0]} scale={.6}>
      <boxBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshBasicMaterial attach="material">
        <texture
          attach="map"
          image={moonTexture}
          onUpdate={(self) => moonTexture && (self.needsUpdate = true)}
        />
      </meshBasicMaterial>
    </mesh>
  );
}


type Props = {
    count: number;
};

function Particles({ count }: Props) {
  const mesh = useRef<any>();
  const light = useRef<any>();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dode = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse
    if (light.current) {
        light.current.position.set(
        state.mouse.x / aspect,
        -state.mouse.y / aspect,
        0
        );
    }
    if (state.mouse.x === 0 && state.mouse.y === 0) {
        return;
    }
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 10;
      const s = Math.cos(t);
      particle.mx += (state.mouse.x - particle.mx) * 0.01;
      particle.my += (state.mouse.y * -1 - particle.my) * 0.01;
      // Update the dode object
      dode.position.set(
        particle.mx * xFactor - s,
        particle.my * yFactor - s,
        s * zFactor
      );
      dode.scale.set(s, s, s);
      dode.rotation.set(s * 5, s * 5, s * 5);
      dode.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current && mesh.current.setMatrixAt(i, dode.matrix);
    });
    if (mesh.current) {
        mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  return (
      <instancedMesh receiveShadow ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[.2, 0]} />
        <meshPhongMaterial color="#3eb08f" />
      </instancedMesh>
  );
}

export default function ThreeD() {

    return (
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          stencil: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [25, 25, 0] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
        style={{ position: "absolute" }}
      >
        {/* <fog attach="fog" args={["#49bf9d", 10, 0]} /> */}
        <Suspense fallback={null}>
          {/* <Particles count={3500} /> */}
          <Moon />
        </Suspense>
        <spotLight castShadow intensity={1} position={[25, 25, 0]} />
        <ambientLight intensity={0.5} />
      </Canvas>
    );
}