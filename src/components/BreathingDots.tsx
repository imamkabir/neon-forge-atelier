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
        scale: "random(0.6, 1.2)",
        opacity: "random(0.2, 0.6)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.05
      });

      // Slow floating movement
      gsap.to(dot, {
        x: "random(-30, 30)",
        y: "random(-30, 30)",
        duration: "random(25, 45)",
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: "random(0, 15)"
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
          className="breathing-dot absolute w-1 h-1 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.3px)',
          }}
        />
      ))}
    </div>
  );
};

export default BreathingDots;