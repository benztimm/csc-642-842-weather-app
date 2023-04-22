import React, { useState, useEffect, useRef } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import './animate.css';

const ScrollAnimation = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const animatedElement = useRef(null);

  const onEnterViewport = () => {
    setIsVisible(true);
  };

  const onExitViewport = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      animatedElement.current.classList.add('visible');
      animatedElement.current.classList.remove('hidden');
    } else {
      animatedElement.current.classList.add('hidden');
      animatedElement.current.classList.remove('visible');
    }
  }, [isVisible]);

  return (
    <ScrollTrigger onEnter={onEnterViewport} onExit={onExitViewport}>
      <div ref={animatedElement} className="element-to-animate">
        {children}
      </div>
    </ScrollTrigger>
  );
};

export default ScrollAnimation;
