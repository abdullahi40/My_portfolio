// Import core React functionality and useEffect for handling resize logic
import React, { Suspense, useEffect } from "react";

// Import component-specific styling
import "./Hero.css";

// Import Framer Motion for animation effects
import { motion } from "framer-motion";

// Import 3D rendering tools from @react-three/fiber and drei
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";

// 3D Model component that loads and prepares the GLB model
function Model({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    // Enhance materials and enable shadows for realism
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.metalness = 0.8;
          child.material.roughness = 0.2;
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  // Return the 3D model
  return <primitive object={scene} scale={3.5} position={[0, -1.7, 0]} />;
}

// Hero section component
const Hero = () => {
  useEffect(() => {
    // Handle viewport height (vh) unit to support mobile browsers correctly
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH(); // Set on initial load
    window.addEventListener("resize", setVH); // Update on resize
    return () => window.removeEventListener("resize", setVH); // Cleanup
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-inner-wrapper">
        {/* Main hero content with entrance animation */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Text introduction block */}
          <motion.div
            className="text-content"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1>
              Hello, I’m{" "}
              <strong style={{ color: "#00ffd9" }}>Abdullahi Suleiman</strong>
            </h1>
            <p>
              I’m a passionate Front-End & Full-Stack Developer who builds
              modern, fast, and interactive websites and apps using React.js,
              Node.js, Express, and PostgreSQL. I turn ideas into clean,
              responsive user experiences.
            </p>

            {/* Buttons for CV download and contact */}
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Download CV */}
              <motion.a
                href="/Abdullahi_Fullstack_Developer_CV.pdf"
                download
                className="btn primary"
                whileHover={{ scale: 1.05 }}
              >
                Download CV
              </motion.a>

              {/* Email contact */}
              <motion.a
                href="mailto:abdullahisuleiman6683@gmail.com?subject=Hello%20Abdullahi&body=I%20just%20wanted%20to%20say%20hi!"
                className="btn outline"
                whileHover={{ scale: 1.05 }}
              >
                Say Hello
              </motion.a>
            </motion.div>

            {/* Developer stats section */}
            <motion.div
              className="stats"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.3 } },
                hidden: {},
              }}
            >
              {/* Years of Experience */}
              <motion.div
                className="stat-box"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <h2>2+</h2>
                <p>Years Experience</p>
              </motion.div>

              {/* Completed Projects */}
              <motion.div
                className="stat-box"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <h2>10+</h2>
                <p>Completed Projects</p>
              </motion.div>

              {/* Full Stack Projects */}
              <motion.div
                className="stat-box"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <h2>4</h2>
                <p>Full stack Projects</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3D Model block with animation */}
          <motion.div
            className="image-content"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="model-wrapper">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                {/* Basic lighting setup */}
                <ambientLight intensity={0.3} />
                <directionalLight
                  position={[2, 5, 2]}
                  intensity={2}
                  castShadow
                />

                {/* 3D Content with lazy loading */}
                <Suspense fallback={null}>
                  {/* Render GLB model */}
                  <Model url="/abdullahi.glb" />

                  {/* Enable model rotation interaction */}
                  <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />

                  {/* Add night-style environmental lighting */}
                  <Environment preset="night" background={false} />

                  {/* Background stars for space effect */}
                  <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                  />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Export Hero section for use in the main layout
export default Hero;
