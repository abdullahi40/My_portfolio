import React from "react";
import "./WhatIDo.css";

const services = [
  {
    title: "User Experience (UX)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu, varius eget velit non, laoreet imperdiet orci. Mauris ultrices eget lorem ac vestibulum.",
  },
  {
    title: "User Interface (UI)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu, varius eget velit non, laoreet imperdiet orci. Mauris ultrices eget lorem ac vestibulum.",
  },
  {
    title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu, varius eget velit non, laoreet imperdiet orci. Mauris ultrices eget lorem ac vestibulum.",
  },
];

const WhatIDo = () => {
  return (
    <section className="what-i-do">
      <div className="left">
        <h2>What I do?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus
          arcu, varius eget velit non, laoreet imperdiet orci. Mauris ultrices
          eget lorem ac vestibulum. Suspendis imperdiet,
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus
          arcu, varius eget velit non.
        </p>
        <button className="say-hello-btn">Say Hello!</button>
      </div>

      <div className="right">
        {services.map((service, index) => (
          <div key={index} className={`card ${index === 0 ? "active" : ""}`}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
