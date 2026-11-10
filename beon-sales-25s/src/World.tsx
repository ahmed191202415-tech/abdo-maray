import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  continueRender,
  delayRender,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ExtrudeGeometry,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  Vector3,
} from "three";
import { ASSETS, BRAND } from "./config";
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.45, 0, 0.2, 1),
} as const;
const k = (f: number, t: number[], v: number[]) => interpolate(f, t, v, clamp);
const vector = (
  f: number,
  t: number[],
  v: number[][],
): [number, number, number] => [
  k(
    f,
    t,
    v.map((n) => n[0]),
  ),
  k(
    f,
    t,
    v.map((n) => n[1]),
  ),
  k(
    f,
    t,
    v.map((n) => n[2]),
  ),
];

function useLocalTexture(file: string) {
  const [texture, setTexture] = useState<Texture | null>(null);
  const [handle] = useState(() => delayRender("Loading local device screen"));
  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      staticFile(file),
      (t) => {
        t.colorSpace = SRGBColorSpace;
        t.anisotropy = 8;
        setTexture(t);
      },
      undefined,
      (e) => {
        console.error(e);
        continueRender(handle);
      },
    );
  }, [file, handle]);
  useEffect(() => {
    if (texture) continueRender(handle);
  }, [texture, handle]);
  return texture;
}
const Screen = ({
  w,
  h,
  r = 0.08,
  texture,
}: {
  w: number;
  h: number;
  r?: number;
  texture: Texture;
}) => {
  const geometry = useMemo(() => {
    const s = new Shape();
    s.moveTo(-w / 2 + r, -h / 2);
    s.lineTo(w / 2 - r, -h / 2);
    s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    s.lineTo(w / 2, h / 2 - r);
    s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    s.lineTo(-w / 2 + r, h / 2);
    s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    s.lineTo(-w / 2, -h / 2 + r);
    s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const g = new ShapeGeometry(s, 24);
    const p = g.attributes.position;
    const uv = g.attributes.uv;
    for (let i = 0; i < p.count; i++)
      uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
    return g;
  }, [w, h, r]);
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

// Rounded silhouettes extruded through a thin chassis; corner radius is independent of thickness.
const Plate = ({
  w,
  h,
  depth,
  r,
  color,
  metalness = 0.6,
  roughness = 0.3,
  position = [0, 0, 0],
}: {
  w: number;
  h: number;
  depth: number;
  r: number;
  color: string;
  metalness?: number;
  roughness?: number;
  position?: [number, number, number];
}) => {
  const geometry = useMemo(() => {
    const q = new Shape();
    q.moveTo(-w / 2 + r, -h / 2);
    q.lineTo(w / 2 - r, -h / 2);
    q.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    q.lineTo(w / 2, h / 2 - r);
    q.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    q.lineTo(-w / 2 + r, h / 2);
    q.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    q.lineTo(-w / 2, -h / 2 + r);
    q.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    const g = new ExtrudeGeometry(q, {
      depth,
      bevelEnabled: true,
      bevelThickness: Math.min(depth * 0.08, 0.015),
      bevelSize: Math.min(r * 0.1, 0.015),
      bevelSegments: 3,
      curveSegments: 20,
      steps: 1,
    });
    g.translate(0, 0, -depth / 2);
    return g;
  }, [w, h, depth, r]);
  return (
    <mesh geometry={geometry} position={position} castShadow>
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
};

const Laptop = ({ texture, frame }: { texture: Texture; frame: number }) => (
  <group
    position={[-2.3, 0.13, 0]}
    rotation={[
      0,
      k(frame, [0, 110, 210, 570, 650, 749], [-0.12, 0.04, 0, 0, 0.08, 0.08]),
      0,
    ]}
  >
    <RoundedBox
      args={[6.35, 0.22, 4.25]}
      radius={0.1}
      smoothness={5}
      castShadow
      receiveShadow
      position={[0, 0.12, 0.2]}
    >
      <meshStandardMaterial color="#C0CCD3" metalness={0.75} roughness={0.3} />
    </RoundedBox>
    <RoundedBox
      args={[1.8, 0.015, 0.83]}
      radius={0.006}
      position={[0, 0.24, 1.33]}
    >
      <meshStandardMaterial color="#A5B6BF" metalness={0.55} roughness={0.36} />
    </RoundedBox>
    {Array.from({ length: 60 }, (_, i) => (
      <RoundedBox
        key={i}
        args={[0.39, 0.018, 0.25]}
        radius={0.006}
        position={[
          ((i % 12) - 5.5) * 0.46,
          0.25,
          -0.93 + Math.floor(i / 12) * 0.34,
        ]}
      >
        <meshStandardMaterial
          color="#344650"
          metalness={0.25}
          roughness={0.5}
        />
      </RoundedBox>
    ))}
    <group position={[0, 0.27, -1.65]} rotation={[-0.12, 0, 0]}>
      <Plate
        w={6.06}
        h={3.83}
        depth={0.15}
        r={0.14}
        color="#718996"
        metalness={0.8}
        roughness={0.25}
        position={[0, 1.91, 0]}
      />
      <Plate
        w={5.91}
        h={3.69}
        depth={0.06}
        r={0.12}
        color="#10232E"
        metalness={0.45}
        roughness={0.25}
        position={[0, 1.91, 0.088]}
      />
      <group position={[0, 1.91, 0.124]}>
        <Screen w={5.67} h={3.54} r={0.07} texture={texture} />
      </group>
      <mesh position={[0, 3.72, 0.13]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#030C12" />
      </mesh>
    </group>
  </group>
);
const Phone = ({ texture, frame }: { texture: Texture; frame: number }) => {
  const enter = k(frame, [375, 435], [0, 1]);
  return (
    <group
      visible={frame >= 375}
      position={[
        k(frame, [375, 435, 570, 650], [4.8, 1.8, 1.8, 0.8]),
        k(frame, [375, 435], [0.4, 2.04]),
        2.8,
      ]}
      rotation={[
        k(frame, [375, 430, 570, 650], [0.15, 0.02, 0.02, 0]),
        k(frame, [375, 440, 570, 650], [-0.35, -0.06, -0.06, -0.1]),
        k(frame, [375, 435], [-0.2, 0]),
      ]}
      scale={enter}
    >
      <Plate
        w={1.88}
        h={3.96}
        depth={0.19}
        r={0.22}
        color="#90A7B4"
        metalness={0.85}
        roughness={0.23}
      />
      <Plate
        w={1.77}
        h={3.86}
        depth={0.055}
        r={0.18}
        color="#0B202D"
        metalness={0.45}
        roughness={0.3}
        position={[0, 0, 0.108]}
      />
      <group position={[0, 0, 0.143]}>
        <Screen w={1.64} h={3.72} r={0.13} texture={texture} />
      </group>
      <RoundedBox
        args={[0.025, 0.48, 0.045]}
        radius={0.01}
        position={[0.95, 0.6, 0]}
      >
        <meshStandardMaterial color="#6D8796" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {frame >= 427 && frame < 450 ? (
        <mesh
          position={[0, 0.58, 0.17]}
          scale={k(frame, [427, 450], [0.45, 1.5])}
        >
          <ringGeometry args={[0.14, 0.16, 40]} />
          <meshBasicMaterial
            color={BRAND.green}
            transparent
            opacity={k(frame, [427, 434, 450], [0, 0.8, 0])}
          />
        </mesh>
      ) : null}
    </group>
  );
};
const MessageCard = ({
  frame,
  index,
  texture,
}: {
  frame: number;
  index: number;
  texture: Texture;
}) => {
  const starts = [8, 36, 62, 83];
  const appear = k(frame, [starts[index], starts[index] + 24], [0, 1]);
  const gather = k(frame, [150 + index * 5, 190 + index * 5], [0, 1]);
  const positions = [
    [-1.7, 2.5, 3.2],
    [-3.7, 3.6, 3.7],
    [-0.4, 3.3, 4.2],
    [-2.5, 1.6, 4.6],
  ];
  const pos = positions[index];
  return (
    <group
      visible={frame < 225}
      scale={appear * (1 - gather * 0.87)}
      position={[
        pos[0] * (1 - gather) + -2.9 * gather,
        pos[1] * (1 - gather) + 2.7 * gather + (1 - appear) * 0.5,
        pos[2] * (1 - gather) - 1.28 * gather,
      ]}
      rotation={[
        0,
        0.08 * (index - 1) * (1 - gather),
        0.07 * (index - 1) * (1 - gather),
      ]}
    >
      <Plate
        w={2.8}
        h={0.94}
        depth={0.07}
        r={0.08}
        color={index === 0 ? "#FFFFFF" : "#D8E8F0"}
        metalness={0.1}
        roughness={0.33}
      />
      <group position={[0, 0, 0.042]}>
        <Screen w={2.75} h={0.915} r={0.07} texture={texture} />
      </group>
    </group>
  );
};
const Office = ({ dark }: { dark: boolean }) => (
  <group>
    <RoundedBox
      args={[14, 0.34, 8]}
      radius={0.14}
      position={[-0.8, -0.14, 0.2]}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial
        color={dark ? "#153C56" : "#F3F6F7"}
        roughness={0.65}
        metalness={0.04}
      />
    </RoundedBox>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color={dark ? "#071F33" : "#E6EFF4"}
        roughness={0.8}
      />
    </mesh>
    <group position={[-5.7, 0.1, 0.8]} rotation={[0, 0.18, 0]}>
      <RoundedBox args={[1.4, 0.12, 2.1]} radius={0.04} castShadow>
        <meshStandardMaterial color="#FFFFFF" roughness={0.55} />
      </RoundedBox>
      <RoundedBox
        args={[1.35, 0.07, 2.06]}
        radius={0.025}
        position={[0, 0.09, 0]}
      >
        <meshStandardMaterial color="#D7E8EF" />
      </RoundedBox>
      <mesh position={[0.5, 0.15, 0]}>
        <boxGeometry args={[0.06, 0.01, 2.06]} />
        <meshStandardMaterial color={BRAND.green} />
      </mesh>
    </group>
    <group position={[-5.3, 0.1, -2.3]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.55, 0.57, 0.09, 48]} />
        <meshStandardMaterial
          color="#B7C9D4"
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.75, 16]} />
        <meshStandardMaterial
          color="#B7C9D4"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0.17, 1.85, 0]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.53, 0.56, 48, 1, true]} />
        <meshStandardMaterial
          color={BRAND.blue}
          metalness={0.35}
          roughness={0.36}
          side={2}
        />
      </mesh>
    </group>
    <group position={[1.1, 0.22, -2.8]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.36, 0.3, 0.5, 40]} />
        <meshStandardMaterial color="#F7FAFC" roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.26, 0]}>
        <ringGeometry args={[0.28, 0.36, 40]} />
        <meshStandardMaterial color="#CADDE7" />
      </mesh>
      <mesh position={[0.38, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.17, 0.045, 12, 32]} />
        <meshStandardMaterial color="#DCEAF1" />
      </mesh>
    </group>
  </group>
);
const ShotCamera = ({ frame }: { frame: number }) => {
  const { camera } = useThree();
  useLayoutEffect(() => {
    const times = [
      0, 60, 120, 150, 210, 270, 340, 390, 435, 510, 570, 630, 660, 749,
    ];
    const pos = vector(frame, times, [
      [7, 5.3, 12],
      [6.4, 4.8, 11],
      [5.8, 4.4, 10.5],
      [1, 3.6, 10],
      [0.5, 3.3, 9.8],
      [-1, 2.8, 8.6],
      [-1, 2.8, 8.6],
      [3.7, 3.5, 9.8],
      [3, 3, 9.7],
      [3, 3, 10.8],
      [5, 4.5, 13.7],
      [4.5, 3.8, 14.5],
      [4.5, 3.8, 14.5],
      [4.5, 3.8, 14.5],
    ]);
    const look = vector(frame, times, [
      [0.2, 1.7, 0],
      [0.3, 1.9, 0.2],
      [0.3, 1.8, 0.4],
      [-0.6, 1.8, -0.5],
      [-0.6, 1.8, -0.5],
      [-1.3, 2, -1.1],
      [-1.3, 2, -1.1],
      [0.9, 1.9, 0.8],
      [2.8, 2, 2.8],
      [2.9, 2, 2.8],
      [0.1, 1.6, 0],
      [0.4, 1.6, 0],
      [0.4, 1.6, 0],
      [0.4, 1.6, 0],
    ]);
    camera.position.set(...pos);
    camera.lookAt(new Vector3(...look));
    camera.updateProjectionMatrix();
  }, [camera, frame]);
  return null;
};
export const World = ({ offset = 0 }: { offset?: number }) => {
  const local = useCurrentFrame();
  const frame = local + offset;
  const { width, height } = useVideoConfig();
  const browser = useLocalTexture(ASSETS.browser);
  const mobile = useLocalTexture(ASSETS.mobile);
  const message = useLocalTexture("screens/message.png");
  const secondary = useLocalTexture("screens/message-secondary.png");
  const dark = frame < 150 || (frame >= 390 && frame < 570);
  if (!browser || !mobile || !message || !secondary) return null;
  return (
    <ThreeCanvas
      width={width}
      height={height}
      shadows
      camera={{ fov: 39, near: 0.1, far: 150, position: [7, 5.3, 12] }}
      gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
    >
      <color attach="background" args={[dark ? BRAND.dark : "#F4F8FA"]} />
      <fog attach="fog" args={[dark ? BRAND.dark : "#F4F8FA", 24, 75]} />
      <ShotCamera frame={frame} />
      <ambientLight intensity={1.6} />
      <hemisphereLight args={["#E4F2FF", "#7A98AB", 2]} />
      <directionalLight
        position={[0, 10, 8]}
        intensity={3.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0002}
        shadow-normalBias={0.035}
      />
      <directionalLight
        position={[-7, 4, -5]}
        intensity={3.2}
        color="#83B9DE"
      />
      <pointLight position={[6, 5, 3]} intensity={60} color="#BFE4D1" />
      <Office dark={dark} />
      <group position={[-3, 2, -4.2]} rotation={[0, 0.05, 0.28]}>
        <mesh castShadow>
          <torusGeometry args={[3.7, 0.1, 16, 100, Math.PI * 1.6]} />
          <meshStandardMaterial
            color={BRAND.blue}
            metalness={0.3}
            roughness={0.33}
          />
        </mesh>
      </group>
      <group position={[-2.5, 1.2, -3.3]} rotation={[0.1, 0, -0.32]}>
        <mesh castShadow>
          <torusGeometry args={[2.5, 0.07, 12, 90, Math.PI * 1.2]} />
          <meshStandardMaterial
            color={BRAND.green}
            metalness={0.25}
            roughness={0.4}
          />
        </mesh>
      </group>
      <Laptop frame={frame} texture={browser} />
      <Phone frame={frame} texture={mobile} />
      <MessageCard frame={frame} index={0} texture={message} />
      <MessageCard frame={frame} index={1} texture={secondary} />
      <MessageCard frame={frame} index={2} texture={secondary} />
      <MessageCard frame={frame} index={3} texture={secondary} />
    </ThreeCanvas>
  );
};
