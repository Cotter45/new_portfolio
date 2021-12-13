import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

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
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 10;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (state.mouse.x - particle.mx) * 0.01;
      particle.my += (state.mouse.y * -1 - particle.my) * 0.01;
      // Update the dode object
      dode.position.set(
        particle.mx * xFactor,
        particle.my * yFactor,
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
    <>
      <pointLight ref={light} distance={100} intensity={1} color="white" />
      <instancedMesh receiveShadow ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[.15, 0]} />
        <meshPhongMaterial color="aquamarine" />
      </instancedMesh>
    </>
  );
}

function Icons( props: any) {

    const [texture1] = useLoader(THREE.TextureLoader, [props.image]);
    
    return (
        <mesh position={props.position}>
            <planeBufferGeometry attach="geometry" args={[1, 1]} />
            <meshStandardMaterial attach="material" map={texture1} />
        </mesh>
    )
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
      >
        <Suspense fallback={null}>
            <Particles count={3500} />
        </Suspense>
        <ambientLight intensity={.2} />
      </Canvas>
    );
}