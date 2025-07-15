import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Certificates.css";

const CERTIFICATES = [
  // Array of certificate objects
  { name: "HTML _Codecademy", file: "certivicates/HTML _ Codecademy.pdf" },
  { name: "Css3 _ Codecademy", file: "certivicates/Css3 _ Codecademy.pdf" },
  { name: "Metta javascript", file: "certivicates/Coursera javascript.pdf" },
  {
    name: "Introduction Front-End",
    file: "certivicates/Introduction to Front- End Development.pdf",
  },
  {
    name: "Coursera version control ",
    file: "certivicates/Coursera version control pdf.pdf",
  },
  {
    name: "Metta React Basic",
    file: "certivicates/Coursera React Besic pdf.pdf ",
  },
  {
    name: "Metta React Advanced",
    file: "certivicates/Coursera react advanced metta.pdf",
  },
  {
    name: "Introduction Software Engineering",
    file: "certivicates/Introduction to Software Engineering.pdf",
  },
  {
    name: "Udemy full istack web",
    file: "certivicates/full istack web.pdf",
  },
];

export default function Certificates() {
  // State to manage selected certificate for modal
  const [selected, setSelected] = useState(null);

  return (
    <div className="certificates-section" id="certificates">
      <h1 className="certificates-title">My Certificates</h1>
      <Swiper // Swiper component for displaying certificates
        spaceBetween={30}
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="certificates-swiper"
      >
        {/* Map through certificates and create a slide for each */}
        {CERTIFICATES.map((cert, index) => (
          <SwiperSlide key={index}>
            <div className="certificate-card" onClick={() => setSelected(cert)}>
              <div className="certificate-preview-wrapper">
                <iframe // Display certificate preview in an iframe
                  src={cert.file}
                  title={cert.name}
                  className="certificate-preview"
                  style={{ pointerEvents: "none" }} // Disable pointer events to prevent interaction
                ></iframe>
              </div>
              <h2 className="certificate-name">{cert.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal to display selected certificate details */}
      {selected && (
        <div className="certificate-modal" onClick={() => setSelected(null)}>
          <div
            className="certificate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={selected.file}
              title={selected.name}
              className="certificate-modal-preview"
            ></iframe>
            <div className="modal-buttons">
              <a href={selected.file} download className="download-btn">
                Download PDF
              </a>
              <button onClick={() => setSelected(null)} className="close-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
