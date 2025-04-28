import React, { useRef, useEffect, useState } from 'react';

const CircularText = ({ text = "Your Custom Text Here", fontSize = 14 }) => {
  const textRef = useRef(null);
  const [radius, setRadius] = useState(0);
  const [circumference, setCircumference] = useState(0);

  // 42mm circle dimensions in pixels (assuming 96dpi)
  const containerSizeMM = 45;
  const mmToPx = 3.779527559; // 1mm = ~3.78px
  const containerSizePx = containerSizeMM * mmToPx;

  useEffect(() => {
    if (textRef.current) {
      // Estimate text width (approximation)
      const avgCharWidth = fontSize * 0.6;
      const textWidth = text.length * avgCharWidth;
      
      // Calculate required radius to fit text around circle
      // Subtract 4px to account for border and padding
      const maxRadius = (containerSizePx / 2) - 4;
      const requiredRadius = textWidth / (2 * Math.PI);
      
      // Use the smaller of the two radii
      const newRadius = Math.min(maxRadius, Math.max(10, requiredRadius));
      const newCircumference = 2 * Math.PI * newRadius;
      
      setRadius(newRadius);
      setCircumference(newCircumference);
    }
  }, [text, fontSize, containerSizePx]);

  return (
    <svg 
      viewBox={`0 0 ${containerSizePx} ${containerSizePx}`} 
      width={containerSizePx}
      height={containerSizePx}
      className="absolute inset-0 m-auto"
    >
      <defs>
        <path
          id="curve"
          d={`
            M ${containerSizePx/2},${containerSizePx/2 - radius}
            A ${radius},${radius} 0 1,1 ${containerSizePx/2},${containerSizePx/2 - radius - 0.01}
          `}
        />
      </defs>
      <text 
        ref={textRef}
        fill="black" 
        fontSize={fontSize} 
        fontWeight="bold"
        dominantBaseline="middle"
      >
        <textPath 
          href="#curve" 
          startOffset="50%" 
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CircularText;