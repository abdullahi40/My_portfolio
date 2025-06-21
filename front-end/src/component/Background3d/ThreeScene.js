// Import React and Suspense for lazy loading
import React, { Suspense } from "react";

// Import Canvas from @react-three/fiber to render a 3D scene
import { Canvas } from "@react-three/fiber";

// Import useful helpers from @react-three/drei for 3D functionality
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

// This component loads and returns a 3D model from a GLTF file
function Model({ url }) {
  const { scene } = useGLTF(url); // Load the 3D model
  return (
    <primitive
      object={scene} // Render the model as a primitive object
      scale={2.5} // Scale the model
      position={[0, -1.2, 0]} // Position it inside the scene
    />
  );
}

// Main 3D scene component
const ThreeScene = () => {
  // Check if the page is in dark mode by checking the body class
  const isDarkMode = document.body.classList.contains("dark");

  return (
    // Create a 3D canvas with camera and lighting
    <Canvas
      shadows // Enable shadows
      camera={{ position: [0, 0, 5], fov: 60 }} // Camera settings
      style={{ width: "100%", height: "100%" }} // Make canvas full size
      gl={{ preserveDrawingBuffer: true }} // Preserve canvas for screenshots or effects
    >
      <Suspense fallback={null}>
        {/* Add ambient light to the scene */}
        <ambientLight intensity={1.2} />

        {/* Add directional light (like sunlight) */}
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {/* Render the 3D model using the URL */}
        <Model url="/models/abdullahi.glb" />

        {/* Allow mouse controls: rotate only, no zoom */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />

        {/* Use a preset lighting environment (sunset) */}
        <Environment preset="sunset" background />

        {/* Change background color based on light/dark mode */}
        <color
          attach="background"
          args={[isDarkMode ? "#0d0d0d" : "#ffffff"]}
        />
      </Suspense>
    </Canvas>
  );
};

// Export the component for use in other parts of the app
export default ThreeScene;
