import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { LoaderFunction } from "remix";
import * as THREE from "three";
import { ImageLoader } from "three";

function Moon() {
  const moonTexture = useLoader(ImageLoader, "/images/weather/moon_texture.jpeg");
  const moon = useRef<any>();

  const [scale, setScale] = useState(.6);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotation = time * 0.1;
    if (moon.current) {
      moon.current.rotation.set(rotation, 0, 0);
    }
  });

  return (
    <mesh onClick={() => {
      if (scale === 1) {
        setScale(.6);
      } else {
        setScale(1);
      }
    }} ref={moon} rotation={[0, 0, 0]} receiveShadow position={[-5, -5, -10]} scale={scale}>
      <sphereBufferGeometry attach="geometry" args={[.5]} />
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

function Sun() {
  const sunTexture = useLoader(ImageLoader, "/images/weather/sun_texture.webp");
  const sun = useRef<any>();

  const [scale, setScale] = useState(.6);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotation = time * 0.1;
    if (sun.current) {
      sun.current.rotation.set(rotation - 1, 0, 1);
    }
  });

  return (
    <mesh onClick={() => {
      if (scale === 1) {
        setScale(.6);
      } else {
        setScale(1);
      }
    }} ref={sun} rotation={[0, 0, 0]} receiveShadow position={[0, -2, -10]} scale={scale}>
      <sphereBufferGeometry attach="geometry" args={[2]} />
      <meshBasicMaterial attach="material">
        <texture
          attach="map"
          image={sunTexture}
          onUpdate={(self) => sunTexture && (self.needsUpdate = true)}
        />
      </meshBasicMaterial>
    </mesh>
  );
}

function Earth() {
  const earthTexture = useLoader(ImageLoader, "/images/weather/earth_texture.jpeg");
  const earth = useRef<any>();

  const [posX, setPosX] = useState(-2);
  const [posY, setPosY] = useState(-2);
  const [posZ, setPosZ] = useState(-10);

  const earthDistance = 2;
  let earthRadians = 0;
  const earthSpeed = 0.01;

  const [scale, setScale] = useState(.6);
  

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotation = time * 0.1;
    if (earth.current) {
      earth.current.rotation.set(0, rotation, 0);
      
      if (earthRadians < Math.PI * 2) earthRadians += earthSpeed;
      else earthRadians = 0;

      function setEarthPosition() {
        const x = 0 + Math.cos(earthRadians) * earthDistance;
        const y = -10 + Math.sin(earthRadians) * earthDistance;

        earth.current.position.x = x;
        earth.current.position.z = y;
      }

      setEarthPosition();
    }
  });

  return (
    <mesh onClick={() => {
      if (scale === 1) {
        setScale(.6);
      } else {
        setScale(1);
      }
    }} ref={earth} rotation={[0, 0, 0]} receiveShadow position={[-2, -2.5, -10]} scale={scale}>
      <sphereBufferGeometry attach="geometry" args={[1]} />
      <meshBasicMaterial attach="material">
        <texture
          attach="map"
          image={earthTexture}
          onUpdate={(self) => earthTexture && (self.needsUpdate = true)}
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

const parameters = {
  size: 0.01,
  count: 100000,
  radius: 5,
  branches: 3,
  spin: 1.25,
  randomness: 0.3,
  randomnessPower: 3,
  colorIn: "gray",
  colorOut: "darkgreen",
};

const Galaxy = () => {
  const particles = useRef<any>();
  const clock = new THREE.Clock();

  useEffect(() => {
    generateGalaxy();
  });

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    if (particles.current) {
      particles.current.rotation.y = elapsedTime * 0.02;
    }
  });

  const generateGalaxy = () => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(parameters.colorIn);
    const colorOutside = new THREE.Color(parameters.colorOut);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particles.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particles.current.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  };

  return (
    <points ref={particles}>
      <bufferGeometry />
      <pointsMaterial
        size={parameters.size}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

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
        camera={{ position: [0, 2, 5] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
        style={{ position: "absolute" }}
      >
        <fog attach="fog" args={["white", 40, 190]} />
        <Suspense
          fallback={<img id="selfie" src="/images/linkedin_pic.jpg" alt="me" />}
        >
          {/* <Particles count={200} />
          <Moon />
          <Sun />
          <Earth /> */}
          <Galaxy />
        </Suspense>
        {/* <ambientLight intensity={0.1} /> */}
        {/* <pointLight castShadow intensity={.1} position={[0, 0, -2]} /> */}
      </Canvas>
    );
}