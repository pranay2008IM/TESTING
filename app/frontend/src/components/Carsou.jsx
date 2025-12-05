import { useState, useCallback } from 'react';
import data from "../data/images.json";
import '../styling/c.css';
function Carsou() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = data.length;

  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  // Function to move to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = data[currentIndex];

  // Inline SVG for the left arrow icon
  const LeftArrowIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );

  // Inline SVG for the right arrow icon
  const RightArrowIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  return (
      <div className="carousel-container">
        {/* Slide Container */}
        <div 
          className="slide"
          style={{ backgroundColor: currentSlide.color }}
        >

          {/* Slide Content */}
          <div className="slide-text-content">
              <h2 className="slide-title">
                  {currentSlide.title}
              </h2>
              <p className="slide-description">
                  {currentSlide.description}
              </p>
          </div>
          
          {/* Placeholder Image (for visual context) */}
          <div className="image-overlay">
              {/* Using a background image style for better containment */}
              <div
                  style={{ backgroundImage: `url(${currentSlide.imageUrl.replace(' ', '%20')})` }}
                  className="image-bg"
                  role="img"
                  aria-label={currentSlide.title}
              ></div>
          </div>
        </div>

        {/* Navigation Controls - Left */}
        <div className="nav-controls nav-left">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="nav-button"
          >
            <LeftArrowIcon />
          </button>
        </div>

        {/* Navigation Controls - Right */}
        <div className="nav-controls nav-right">
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="nav-button"
          >
            <RightArrowIcon />
          </button>
        </div>

        {/* Indicators */}
        <div className="indicators">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`indicator-button ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
  );
};
export default Carsou;