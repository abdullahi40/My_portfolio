import React from "react";
import "./TestimonialSection.css";

const clientLogos = [
  "google",
  "dribbble",
  "linkedin",
  "amazon",
  "medium",
  "spotify",
];

const TestimonialSection = () => {
  return (
    <section className="testimonial-wrapper">
      {/* Clients */}
      <div className="clients">
        <h2>Happy Clients</h2>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration.
        </p>
        <div className="logos">
          {clientLogos.map((name, index) => (
            <img
              key={index}
              src={`/${name}.png`} // Make sure to place logos in public/ folder
              alt={`${name} logo`}
              className="client-logo"
            />
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="testimonial">
        <h2>Testimonial</h2>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration.
        </p>
        <blockquote>
          “Nulla efficitur nibh sit amet velit malesuada dapibus. Duis mollis
          felis turpis, nec semper odio convallis at. Curabitur imperdiet semper
          eros, a finibus arcu suscipit in. Donec quis placerat nibh. Maecenas
          et purus, eleifend a cursus odio, tincidunt ut sapien. Morbi ornare
          elit at libero suscipit porta.”
        </blockquote>
        <div className="author">
          <strong>Esther Howard</strong>
          <span>Managing Director, ABC company</span>
        </div>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dott"></span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
