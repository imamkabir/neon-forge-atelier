import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BreathingDotsProps {
  count?: number;
  className?: string;
}

const BreathingDots = ({ count = 50, className = "" }: BreathingDotsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const dots = containerRef.current.querySelectorAll('.breathing-dot');
    
    dots.forEach((dot, index) => {
      // Breathing animation
      gsap.to(dot, {
        scale: "random(0.8, 1.4)",
        opacity: "random(0.3, 0.8)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.1
      });

      // Slow floating movement
      gsap.to(dot, {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: "random(20, 40)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: "random(0, 10)"
      });
    });

    return () => {
      gsap.killTweensOf(dots);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="breathing-dot absolute w-2 h-2 bg-white rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

export default BreathingDots;