import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AuraBackgroundProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "violet" | "crimson";
  intensity?: "subtle" | "medium" | "strong";
}

const AuraBackground = ({ 
  children, 
  variant = "default", 
  intensity = "subtle" 
}: AuraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create breathing white dots
    if (!dotsRef.current) return;

    const dotCount = 40;
    const dots: HTMLDivElement[] = [];

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'absolute w-1 h-1 bg-white rounded-full animate-pulse-dot';
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 3}s`;
      dot.style.animationDuration = `${3 + Math.random() * 2}s`;
      dot.style.opacity = `${0.2 + Math.random() * 0.3}`;
      
      dotsRef.current.appendChild(dot);
      dots.push(dot);
    }

    return () => {
      dots.forEach(dot => dot.remove());
    };
  }, []);

  const getAuraVariant = () => {
    switch (variant) {
      case "blue":
        return "bg-gradient-radial from-blue-500/5 via-transparent to-transparent";
      case "violet":
        return "bg-gradient-radial from-violet-500/4 via-transparent to-transparent";
      case "crimson":
        return "bg-gradient-radial from-red-500/3 via-transparent to-transparent";
      default:
        return "";
    }
  };

  const getIntensityOpacity = () => {
    switch (intensity) {
      case "strong": return "opacity-80";
      case "medium": return "opacity-60";
      default: return "opacity-40";
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Breathing white dots */}
      <div 
        ref={dotsRef}
        className={`fixed inset-0 pointer-events-none z-0 ${getIntensityOpacity()}`}
      />
      
      {/* Ambient aura gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl aura-blue"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl aura-violet"
          animate={{
            x: [0, -25, 35, 0],
            y: [0, 25, -15, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        {variant === "crimson" && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl aura-crimson"
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.3, 0.7, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuraBackground;