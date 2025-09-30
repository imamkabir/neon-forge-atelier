import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import Footer from "@/components/Footer";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // White dot completes headline animation
    const timer = setTimeout(() => {
      setHeadlineComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/4 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          ref={heroRef}
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-foreground leading-[0.9] tracking-tight"
              style={{ fontFeatureSettings: '"ss01", "ss02"' }}
            >
              Digital{" "}
              <span className="relative inline-block">
                <span className="text-luxury">Fingerprints</span>
                <AnimatePresence>
                  {headlineComplete && (
                    <motion.div
                      className="absolute -right-4 top-1/2 w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 1], 
                        opacity: [0, 1, 0.8],
                      }}
                      transition={{ 
                        duration: 1.2,
                        ease: "easeOut"
                      }}
                    />
                  )}
                </AnimatePresence>
              </span>
              <br />
              <span className="text-primary">Built for Velocity</span>
            </motion.h1>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Where precision meets artistry in the digital realm. 
            Create, connect, and command respect with luxury digital experiences.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="btn-neon text-lg px-12 py-5 magnetic">
                Enter the Atelier
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/services" className="btn-glass text-lg px-12 py-5 magnetic">
                <Play className="w-5 h-5 mr-2" />
                Watch the Story
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
            whileHover={{ borderColor: "rgba(140, 197, 255, 0.5)" }}
          >
            <motion.div
              className="w-1 h-3 bg-white/40 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/50 mb-8 font-light tracking-wide">
              Trusted by visionaries worldwide
            </p>
            <div className="flex justify-center items-center space-x-16 opacity-30">
              {["APEX", "LUXE", "VERTEX", "PRIME", "ZENITH"].map((logo, index) => (
                <motion.div
                  key={index}
                  className="text-xl font-serif font-bold text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.3, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ opacity: 0.6, scale: 1.1 }}
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-8 px-6 py-3 glass rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">The Philosophy</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
              Excellence is never{" "}
              <span className="text-luxury">an accident</span>
            </h2>
            
            <p className="text-xl text-foreground/70 leading-relaxed font-light max-w-3xl mx-auto">
              It is always the result of high intention, sincere effort, and intelligent execution. 
              It represents the wise choice of many alternatives.
            </p>
            
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <cite className="text-foreground/50 font-light italic">— Aristotle</cite>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Teaser Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              The Neon Tech{" "}
              <span className="text-luxury">Experience</span>
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Social Fingerprints",
                description: "Connect with creators, share your journey, build your digital presence",
                icon: "👥",
                link: "/feed"
              },
              {
                title: "Luxury Templates",
                description: "Seven curated templates crafted for discerning brands",
                icon: "✨",
                link: "/templates"
              },
              {
                title: "Bespoke Builder",
                description: "Create custom digital experiences with precision and elegance",
                icon: "🎨",
                link: "/builder"
              },
              {
                title: "Digital Concierge",
                description: "AI-powered insights and recommendations for your digital presence",
                icon: "🤖",
                link: "/dashboard"
              },
              {
                title: "Community",
                description: "Join an exclusive network of digital craftspeople and visionaries",
                icon: "🌟",
                link: "/leaderboard"
              },
              {
                title: "Analytics",
                description: "Deep insights into your digital fingerprint's performance and reach",
                icon: "📊",
                link: "/dashboard"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-violet/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
              Ready to look{" "}
              <span className="text-luxury">untouchable?</span>
            </h2>
            
            <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Join the exclusive circle of those who refuse to settle for ordinary
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="btn-neon text-lg px-12 py-5 magnetic">
                  Begin Your Journey
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact" className="btn-glass text-lg px-12 py-5 magnetic">
                  Schedule Consultation
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </AuraBackground>
  );
};

export default Index;