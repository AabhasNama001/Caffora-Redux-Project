// CoffeeCup3D.jsx
import React, { forwardRef, Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

/* Model component — applies motion.current values to the loaded object
 */
const Model = ({ motionRef }) => {
  const group = useRef(); // local ref for the 3D object
  const obj = useLoader(OBJLoader, "/Coffe cupobj.obj");

  useFrame(() => {
    if (!group.current || !motionRef?.current) return;

    const m = motionRef.current;
    group.current.position.y = m.y ?? 0;
    group.current.rotation.y = m.rotY ?? 0;
    group.current.rotation.z = m.tiltZ ?? 0;
    const s = m.scale ?? 1;
    group.current.scale.setScalar(s);
  });

  return <primitive ref={group} object={obj} />;
};

/* CoffeeCup3D wrapper.
 * - motion: ref object with { x,y,rotY,tiltZ,scale }
 * - fillParent (boolean): if true, canvas will expand to fill parent placeholder
 */
const CoffeeCup3D = ({ motion, fillParent = false }) => {
  const wrapperStyle = fillParent
    ? { width: "100%", height: "100%" }
    : { width: "20rem", height: "20rem" };

  return (
    <div style={wrapperStyle} className="cup-3d-wrapper">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <spotLight
          position={[-5, 10, 5]}
          angle={0.25}
          penumbra={0.5}
          intensity={1}
          castShadow
        />
        <pointLight position={[0, -3, -5]} intensity={0.4} />

        <Suspense fallback={null}>
          <Model motionRef={motion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CoffeeCup3D;