// Import React library to create the component
import React from "react";

// Import motion from framer-motion for animation support
import { motion } from "framer-motion";

// Import icons from react-icons for visual tech stack representation
import {
  FaCss3Alt,
  FaDatabase,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { SiExpress, SiPostgresql, SiTailwindcss } from "react-icons/si";

// Import component-specific CSS styles
import "./WorkProcess.css";

// Array of work steps describing the developer's process
const workSteps = [
  {
    id: 1,
    title: "Understanding the Problem",
    description:
      "Deeply understand client needs and the problem to guide decisions.",
    icon: "🔍", // Emoji icon representing this step
  },
  {
    id: 2,
    title: "Planning & Architecture",
    description:
      "Map out app structure with scalable, clear logic and user flows.",
    icon: "🧠",
  },
  {
    id: 3,
    title: "UI/UX & Frontend",
    description:
      "Build modern, responsive, and accessible interfaces with React and Tailwind.",
    icon: "🎨",
  },
  {
    id: 4,
    title: "Backend & Integration",
    description:
      "Develop secure APIs and backend logic, then integrate all parts.",
    icon: "🛠️",
  },
  {
    id: 5,
    title: "Testing & Optimization",
    description: "Test, fix bugs, and optimize speed and UX before launch.",
    icon: "🧪",
  },
  {
    id: 6,
    title: "Launch & Maintenance",
    description:
      "Deploy, monitor, and provide continuous support and improvements.",
    icon: "🚀",
  },
];

// Main WorkProcess component
const WorkProcess = () => {
  return (
    // Section container with unique ID for navigation
    <section className="work-process" id="work-process">
      <div className="wp-container">
        {/* Left panel: description and technology icons with animation */}
        <motion.div
          className="wp-left"
          initial={{ x: -100, opacity: 0 }} // Slide in from left and fade in
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }} // Trigger when 50% visible, only once
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>Work Process</h2>
          <p>
            As a <strong>Full-Stack JavaScript Developer</strong>, my work
            process revolves around <strong>clarity</strong>,{" "}
            <strong>efficiency</strong>, and{" "}
            <strong>user-centric design</strong>. From understanding the core
            problem to deploying a polished solution, I follow a step-by-step
            approach that ensures quality and performance.
          </p>
          <p>
            I leverage powerful tools like <strong>React.js</strong> for
            frontend, <strong>Node.js</strong> and <strong>Express</strong> for
            backend APIs, <strong>PostgreSQL</strong> for database management,
            and <strong>Tailwind CSS</strong> to build clean, responsive UIs. My
            goal is to create fast, scalable, and maintainable applications that
            deliver real value.
          </p>

          {/* Technology stack icons with links and styling */}
          <div className="wp-icons">
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
              title="Node.js"
            >
              <FaNodeJs
                size={24}
                style={{
                  color: "#68A063",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              title="React.js"
            >
              <FaReact
                size={24}
                style={{
                  color: "#61DBFB",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              target="_blank"
              rel="noopener noreferrer"
              title="HTML5"
            >
              <FaHtml5
                size={24}
                style={{
                  color: "#E44D26",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank"
              rel="noopener noreferrer"
              title="CSS3"
            >
              <FaCss3Alt
                size={24}
                style={{
                  color: "#264de4",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://expressjs.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Express.js"
            >
              <SiExpress
                size={24}
                style={{
                  color: "#000000",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://www.postgresql.org"
              target="_blank"
              rel="noopener noreferrer"
              title="PostgreSQL"
            >
              <SiPostgresql
                size={24}
                style={{
                  color: "#336791",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Tailwind CSS"
            >
              <SiTailwindcss
                size={24}
                style={{
                  color: "#38B2AC",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
            <a
              href="https://www.postgresql.org"
              target="_blank"
              rel="noopener noreferrer"
              title="Database"
            >
              <FaDatabase
                size={24}
                style={{
                  color: "#336791",
                  margin: "0 8px",
                  verticalAlign: "middle",
                }}
              />
            </a>
          </div>
        </motion.div>

        {/* Right panel: animated cards describing each step in the process */}
        <div className="wp-right">
          {workSteps.map((step, index) => (
            <motion.div
              className="wp-card"
              key={step.id} // Unique key for each step
              initial={{ y: 50, opacity: 0 }} // Start shifted down and invisible
              whileInView={{ y: 0, opacity: 1 }} // Animate into place and visible
              viewport={{ once: true, amount: 0.5 }} // Animate once when half visible
              transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger animation by index
            >
              <div className="wp-icon">{step.icon}</div> {/* Step icon */}
              <h3>
                {step.id}. {step.title} {/* Step number and title */}
              </h3>
              <p>{step.description}</p> {/* Step description */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Export component for use in other parts of the app
export default WorkProcess;
