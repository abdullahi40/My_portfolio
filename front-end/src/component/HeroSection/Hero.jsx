import React, { Suspense, useEffect, useState } from "react";
import "./Hero.css";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";

// 3D Model
function Model({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
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

  return <primitive object={scene} scale={3.5} position={[0, -1.7, 0]} />;
}

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 990);
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-inner-wrapper">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Text */}
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
              I’m a passionate Front-End & Full-Stack Developer building modern,
              fast, interactive websites and apps using React.js, Node.js,
              Express, and PostgreSQL.
            </p>

            {/* Buttons */}
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.a
                href="/Abdullahi_Fullstack_Developer_CV.pdf"
                download
                className="btn primary"
                whileHover={{ scale: 1.05 }}
              >
                Download CV
              </motion.a>
              <motion.a
                href="mailto:abdullahisuleiman6683@gmail.com?subject=Hello%20Abdullahi"
                className="btn outline"
                whileHover={{ scale: 1.05 }}
              >
                Say Hello
              </motion.a>
            </motion.div>

            {/* Stats boxes (qari mobile) */}
            {!isMobile && (
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
            )}
          </motion.div>

          {/* 3D Model (qari mobile) */}
          {!isMobile && (
            <motion.div
              className="image-content"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="model-wrapper">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                  <ambientLight intensity={0.3} />
                  <directionalLight
                    position={[2, 5, 2]}
                    intensity={2}
                    castShadow
                  />
                  <Suspense fallback={null}>
                    <Model url="/abdullahi.glb" />
                    <OrbitControls
                      enableZoom={false}
                      autoRotate
                      autoRotateSpeed={2}
                    />
                    <Environment preset="night" background={false} />
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
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
