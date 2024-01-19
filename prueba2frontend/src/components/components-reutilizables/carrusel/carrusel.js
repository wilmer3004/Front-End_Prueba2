import React, { useState, useEffect } from 'react';
import './Carousel.css';
import img1 from '../../../assets/img/img1.png';
import img2 from '../../../assets/img/img2.png';
import img3 from '../../../assets/img/img3.png';
import img4 from '../../../assets/img/img4.png';
import img5 from '../../../assets/img/img5.png';
import img6 from '../../../assets/img/img6.png';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            opacity: index === currentIndex ? 1 : 0.5, // Ajusta la opacidad según la imagen activa o inactiva
          }}
        >
          <img src={image} alt={`slide-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;