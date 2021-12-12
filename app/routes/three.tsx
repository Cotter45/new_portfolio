import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
      if (ref.current) {
          ref.current.rotation.x += 0.01
      }
    });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
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

function Text(props: any) {

  const mesh = useRef(null)

//   useFrame(() => {
//     if (mesh.current as any !== null) {
//         mesh.current.rotation.x += 0.01
//         mesh.current.rotation.y += 0.01
//         mesh.current.rotation.z += 0.01
//         mesh.current.geometry.center()
//     }
//   })

  // parse JSON file with Three
//   const font = new THREE.FontLoader().parse();

  // configure font geometry
  const textOptions = {
    size: 10,
    height: 1
  };

  const three_texture = new THREE.TextureLoader().load(props.image);
  three_texture.wrapS = THREE.RepeatWrapping
  three_texture.wrapT = THREE.RepeatWrapping
  three_texture.repeat.set(0.1, 0.1);

  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <textGeometry attach='geometry' args={['three.js', textOptions]} />
      <meshBasicMaterial attach='material' />
    </mesh>
  )
}


export default function ThreeD() {
    
    const images = [
        '/images/thumbs/css.png',
        '/images/thumbs/docker.png',
        '/images/thumbs/express.png',
        '/images/thumbs/git.png',
        '/images/thumbs/html.png',
        '/images/thumbs/js.png',
        '/images/thumbs/node.png',
        '/images/thumbs/python.png',
        '/images/thumbs/react.png',
        '/images/thumbs/sequelize.png',
        '/images/thumbs/sqlalchemy.png'
    ]

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
        camera={{ position: [0, 0, 10] }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <Suspense fallback={null}>
          {/* <Box position={[-1.5, -2, 0]} /> 
            <Box position={[1.5, 2, 0]} /> */}
          {images.map((image, index) => (
            <Icons
              key={index}
              position={[
                index - 5,
                index - 5,
                0,
              ]}
              image={image}
            />
            ))}
            <Text props={{ text: 'Hello', color: '#fff', position: [0, 0, 0] }} />
        </Suspense>
        <ambientLight intensity={0.5} />
      </Canvas>
    );
}