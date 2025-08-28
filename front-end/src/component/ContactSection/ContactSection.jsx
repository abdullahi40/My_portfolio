// Importing React and useState hook
import React, { useState } from "react";

// Importing component-specific CSS
import "./ContactSection.css";

// Importing Framer Motion for animations
import { motion } from "framer-motion";

// Importing Axios for HTTP requests
import Axios from "axios";

// Importing phone input component and its style
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Importing contact-related icons
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

// Importing API base URL and contact endpoint
import { API_URL, CONATACT } from "../Api/Api";

// Animation variant for headings and elements with fade-in and slight scale-up
const fadeUpScale = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation for form inputs (with staggered effect)
const inputMotion = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

// Animation for submit button
const buttonMotion = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5, duration: 0.4 },
  },
  whileHover: {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  },
};

const ContactSection = () => {
  // State to handle form data inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    budget: "",
    subject: "",
    message: "",
    phone: "",
  });

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending contact data to backend API
      await Axios.post(`${API_URL}/${CONATACT}`, formData);
      alert(`Message sent successfully! Thank you, ${formData.name}`);

      // Resetting the form after successful submission
      setFormData({
        name: "",
        email: "",
        location: "",
        budget: "",
        subject: "",
        message: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-box">
        {/* LEFT SIDE: Contact info & social icons */}
        <motion.div
          className="left-contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
          style={{ width: "100%" }}
        >
          {/* Title */}
          <motion.h2 variants={fadeUpScale}>
            Let’s discuss your Project
          </motion.h2>

          {/* Description text */}
          <motion.p variants={fadeUpScale}>
            Whether you have a fresh idea or need help improving an existing
            project...
          </motion.p>

          {/* Contact information cards */}
          <motion.div className="contact-info" variants={fadeUpScale}>
            {[FaMapMarkerAlt, FaEnvelope, FaPhoneAlt].map((Icon, i) => (
              <motion.div
                className="info-box"
                key={i}
                variants={fadeUpScale}
                whileHover={{ scale: 1.03 }}
              >
                <Icon className="icon" />
                <div>
                  {/* Contact title and value */}
                  <h4>{["Address", "Email", "Phone"][i]}</h4>
                  <p>
                    {
                      [
                        "Qardho, Somalia ",
                        "abdullahisuleiman6683@gmail.com",
                        "+252906080614",
                      ][i]
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social media icons */}
          {/* Social media icons */}
          <motion.div
            className="social-icons"
            variants={fadeUpScale}
            style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}
          >
            {/* Facebook */}
            <a
              href="https://www.facebook.com/AbdullahiSuleiman44/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: "#1877F2" }}
            >
              <FaFacebookF />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/apdalla-suleiman-5a993037b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: "#0A66C2" }}
            >
              <FaLinkedinIn />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/abdullahi40"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: "#333" }}
            >
              <FaGithub />
            </a>

            {/* Twitter */}
            <a
              href="https://x.com/ABDULLAHIS68744"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              style={{ color: "#1DA1F2" }}
            >
              <FaTwitter />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Contact form */}
        <motion.div
          className="right-contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          layout
          style={{ width: "100%" }}
        >
          {/* Motivation message */}
          <motion.p variants={fadeUpScale}>
            There are many unique project ideas waiting to be turned into
            reality...
          </motion.p>

          {/* Contact form starts here */}
          <motion.form className="contact-form" onSubmit={handleSubmit}>
            {/* Name, Email, Location inputs */}
            {["name", "email", "location"].map((name, i) => (
              <motion.input
                key={i}
                type="text"
                name={name}
                placeholder={
                  name.charAt(0).toUpperCase() +
                  name.slice(1) +
                  (name !== "location" ? "*" : "")
                }
                required={name !== "location"}
                value={formData[name]}
                onChange={handleChange}
                variants={inputMotion}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileFocus={{ scale: 1.02 }}
              />
            ))}

            {/* International phone input field */}
            <PhoneInput
              defaultCountry="us"
              value={formData.phone}
              onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
              inputStyle={{ marginBottom: "16px" }}
              className="phone-input"
              required
            />

            {/* Budget and Subject fields (2-column layout) */}
            <div className="half-inputs">
              {["budget", "subject"].map((name, i) => (
                <motion.input
                  key={i}
                  type="text"
                  name={name}
                  placeholder={
                    name.charAt(0).toUpperCase() + name.slice(1) + "*"
                  }
                  required
                  value={formData[name]}
                  onChange={handleChange}
                  variants={inputMotion}
                  custom={i + 3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileFocus={{ scale: 1.02 }}
                />
              ))}
            </div>

            {/* Message textarea */}
            <motion.textarea
              name="message"
              placeholder="Message*"
              required
              value={formData.message}
              onChange={handleChange}
              variants={inputMotion}
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileFocus={{ scale: 1.02 }}
            />

            {/* Submit button */}
            <motion.button
              type="submit"
              variants={buttonMotion}
              initial="hidden"
              whileInView="visible"
              whileHover="whileHover"
              viewport={{ once: true }}
              style={{ backgroundColor: "#00e6c7", color: "#000" }}
            >
              Submit
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
