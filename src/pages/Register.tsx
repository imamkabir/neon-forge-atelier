import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const steps = ["name", "email", "password", "confirmPassword"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Simulate registration
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <AuraBackground variant="blue" intensity="subtle">
        <NavBar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <motion.div
            className="glass-card max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-blue to-crimson rounded-full mx-auto mb-6 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(140, 197, 255, 0.3)",
                  "0 0 40px rgba(140, 197, 255, 0.6)",
                  "0 0 20px rgba(140, 197, 255, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-3xl text-white">✦</span>
            </motion.div>
            <h1 className="text-4xl font-serif font-bold mb-4 text-blue">
              Welcome, {formData.name}
            </h1>
            <p className="text-foreground/60 mb-2">
              Your inscription has been recorded in our ledger.
            </p>
            <p className="text-sm text-foreground/40">
              {new Date().toLocaleString()}
            </p>
            
            <div className="mt-8">
              <Button
                onClick={() => navigate("/dashboard")}
                className="btn-neon"
              >
                Enter the Atelier
              </Button>
            </div>
          </motion.div>
        </div>
      </AuraBackground>
    );
  }

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            
            <motion.div
              className="text-center mb-12"
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
              <h1 className="text-4xl font-serif font-bold mb-4 text-blue">
                Membership Ledger
              </h1>
              <p className="text-foreground/60">
                Become a Member
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Step */}
              {currentStep === 0 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <label className="block text-lg font-medium text-foreground mb-6">
                    Your Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="glass border-white/20 text-center text-lg py-6 bg-white/5"
                  />
                  {formData.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon mt-6"
                      >
                        Continue
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Email Step */}
              {currentStep === 1 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <label className="block text-lg font-medium text-foreground mb-6">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="glass border-white/20 text-center text-lg py-6 bg-white/5"
                  />
                  {formData.email && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon mt-6"
                      >
                        Continue
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Password Step */}
              {currentStep === 2 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <label className="block text-lg font-medium text-foreground mb-6">
                    Personal Key
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Create a secure password"
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
                  <p className="text-sm text-foreground/50 mt-2">
                    Watch the constellation grow as you type
                  </p>
                  {formData.password.length >= 8 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="btn-neon mt-6"
                      >
                        Continue
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Confirm Password Step */}
              {currentStep === 3 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <label className="block text-lg font-medium text-foreground mb-6">
                    Confirm Personal Key
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your password"
                      className="glass border-white/20 text-center text-lg py-6 bg-white/5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Button
                        type="submit"
                        className="btn-neon mt-6 text-lg px-12 py-4"
                      >
                        Inscribe My Name
                      </Button>
                    </motion.div>
                  )}
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-crimson text-sm mt-2">
                      Keys don't match
                    </p>
                  )}
                </motion.div>
              )}
            </form>

            {/* Login Link */}
            <div className="text-center mt-8">
              <p className="text-foreground/50">
                Already a member?{" "}
                <Link
                  to="/login"
                  className="text-blue hover:text-blue/80 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Register;