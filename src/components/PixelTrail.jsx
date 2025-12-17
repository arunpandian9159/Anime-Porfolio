import { useEffect, useRef, useCallback } from 'react';
import './PixelTrail.css';

const PixelTrail = ({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  color = '#e63946',
  className = ''
}) => {
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);

  const initPixels = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    pixelsRef.current = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        pixelsRef.current.push({
          x: x * cellWidth + cellWidth / 2,
          y: y * cellHeight + cellHeight / 2,
          opacity: 0,
          age: 0,
          active: false
        });
      }
    }
  }, [gridSize]);

  const updatePixels = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;
    const trailRadius = Math.max(cellWidth, cellHeight) * trailSize * 10;

    ctx.clearRect(0, 0, width, height);

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;

    pixelsRef.current.forEach((pixel, index) => {
      const distance = Math.sqrt(
        Math.pow(pixel.x - mouseX, 2) + Math.pow(pixel.y - mouseY, 2)
      );

      if (distance < trailRadius) {
        pixel.active = true;
        pixel.age = 0;
        pixel.opacity = 1 - (distance / trailRadius);
      } else if (pixel.active) {
        pixel.age += 16;
        pixel.opacity = Math.max(0, 1 - (pixel.age / maxAge));
        if (pixel.opacity <= 0) {
          pixel.active = false;
        }
      }

      if (pixel.opacity > 0) {
        const size = cellWidth * 0.8 * pixel.opacity;
        ctx.fillStyle = color;
        ctx.globalAlpha = pixel.opacity * 0.8;
        ctx.fillRect(
          pixel.x - size / 2,
          pixel.y - size / 2,
          size,
          size
        );
      }
    });

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(updatePixels);
  }, [gridSize, trailSize, maxAge, color]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    initPixels();
  }, [initPixels]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    
    rafRef.current = requestAnimationFrame(updatePixels);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleResize, updatePixels, handleMouseMove]);

  return (
    <div className={`pixel-trail-container ${className}`}>
      <canvas ref={canvasRef} className="pixel-trail-canvas" />
    </div>
  );
};

export default PixelTrail;
