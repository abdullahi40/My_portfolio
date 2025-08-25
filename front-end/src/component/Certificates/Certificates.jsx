import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Certificates.css";
import { CERTIFICATES } from "./CertificatesDetails.jsx";

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  // Detect mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="certificates-section" id="certificates">
      <h1 className="certificates-title">My Certificates</h1>

      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        slidesPerView={1}
        loop={true}
        autoplay={
          !isMobile ? { delay: 5000, disableOnInteraction: false } : false
        }
        modules={[Autoplay, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="certificates-swiper"
        grabCursor={true}
      >
        {CERTIFICATES.map((cert) => (
          <SwiperSlide key={cert.name}>
            <div className="certificate-card" onClick={() => setSelected(cert)}>
              <div className="certificate-preview-wrapper">
                <img
                  src={cert.img}
                  alt={cert.name}
                  className="certificate-preview"
                />
              </div>
              <h2 className="certificate-name">{cert.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selected && (
        <div className="certificate-modal" onClick={() => setSelected(null)}>
          <div
            className="certificate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.img}
              alt={selected.name}
              className="certificate-modal-preview"
            />
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
