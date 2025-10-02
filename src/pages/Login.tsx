import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"recognition" | "entry">("recognition");
  const [backgroundTheme, setBackgroundTheme] = useState("");
  const [greeting, setGreeting] = useState("");
  const navigate = useNavigate();

  // Generate background theme from email
  useEffect(() => {
    if (email && email.includes("@")) {
      const hash = email.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      const hue = Math.abs(hash) % 360;
      setBackgroundTheme(`linear-gradient(135deg, hsl(${hue}, 30%, 10%), hsl(${hue + 60}, 25%, 8%))`);
      
      // Generate greeting
      const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1);
      const hour = new Date().getHours();
      const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
      setGreeting(`Good ${timeOfDay}, ${name}.`);
    }
  }, [email]);

  const handleEmailSubmit = () => {
    if (email && email.includes("@")) {
      setCurrentPhase("entry");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            
            {/* Phase 1 - Recognition */}
            {currentPhase === "recognition" && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue/20 to-crimson/20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(140, 197, 255, 0.2)",
                      "0 0 40px rgba(140, 197, 255, 0.4)",
                      "0 0 20px rgba(140, 197, 255, 0.2)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="white-dot" />
                </motion.div>

                <h1 className="text-4xl font-serif font-bold mb-8 text-foreground">
                  The Arrival
                </h1>
                <p className="text-lg text-foreground/60 mb-12">
                  Welcome back. Please identify yourself.
                </p>
                
                <div className="space-y-6">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="glass border-white/20 text-center text-lg py-6 bg-white/5"
                  />
                  
                  {greeting && (
                    <motion.p 
                      className="text-blue font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {greeting}
                    </motion.p>
                  )}
                  
                  {email && email.includes("@") && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Button
                        onClick={handleEmailSubmit}
                        className="btn-neon w-full py-4"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Phase 2 - Entry */}
            {currentPhase === "entry" && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl font-serif font-bold mb-8 text-foreground">
                  Entry Sequence
                </h1>
                <p className="text-lg text-foreground/60 mb-12">
                  Present your personal key.
                </p>
                
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="glass border-white/20 text-center text-lg py-6 bg-white/5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <Button
                    type="submit"
                    className="btn-neon w-full py-4 text-lg"
                    disabled={!password}
                  >
                    Enter the Atelier
                  </Button>
                  
                  <button
                    type="button"
                    className="block mx-auto text-sm text-foreground/50 hover:text-blue transition-colors"
                  >
                    Assistance with your key?
                  </button>
                </form>
              </motion.div>
            )}

            {/* Register Link */}
            <div className="text-center mt-8">
              <p className="text-foreground/50">
                New to Neon Tech?{" "}
                <Link
                  to="/register"
                  className="text-blue hover:text-blue/80 font-medium transition-colors"
                >
                  Request membership
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Login;