/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { SQUARE_COUNT, Polygons} from '../configs/background';
// import './background.css';
// import { useEffect, useState } from 'react';

// const Background = () => {
//     const [squares, setSquares] = useState<Polygons>();
//     useEffect(() => {
//         const squares = new Polygons();
//         setSquares(squares);
//         const squareElements = document.getElementsByName("square");
//         const interval = setInterval(() => {
//             squares.update(squareElements); 
//             setSquares(squares); 
//         }, 25);
//         return () => clearInterval(interval);
//     }, []);
//     return (
//        <>
//             {(squares && squares.polygons.length == SQUARE_COUNT) && squares.polygons.map(square => {
//                 const {angle, rect, size, id} = square;
//                 const gradient = Math.round(Math.random()) + 1;
//                 return (
//                     <object key={id} className={`square square-gradient-${gradient}`}
//                         style={{
//                             rotate: `${angle}deg`,
//                             height: `${size}vw`,
//                             width: `${size}vw`,
//                             top: `${rect.top}vw`,
//                             left: `${rect.left}vw`
//                         }} name='square' id={id} 
//                     ></object>
//                 )
//             })}
//        </> 
//     )
// }

// export default Background;

import React, { useEffect, useRef } from "react";

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]<>/\\|";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize); // Number of columns
    const drops: number[] = Array(columns).fill(0); // Y positions for each column

    // Function to create a linear gradient for the text
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#00CCC0"); // var(--gradient-1)
      gradient.addColorStop(0.2, "#19A7CE"); // var(--gradient-2)
      gradient.addColorStop(0.4, "#146C94"); // var(--gradient-3)
      gradient.addColorStop(0.6, "#1E6081"); // var(--gradient-4)
      gradient.addColorStop(0.8, "#1E3C83"); // var(--gradient-5)
      gradient.addColorStop(1, "#2952B3"); // var(--gradient-6)
      return gradient;
    };

    // Function to draw the matrix effect
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Fades previous characters
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = createGradient(); // Apply gradient

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop randomly when reaching the bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 75);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        zIndex: -1,
      }}
    />
  );
};

export default MatrixRain;
