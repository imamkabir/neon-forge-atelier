import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Play } from "lucide-react";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import Footer from "@/components/Footer";

interface Discipline {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  why: string;
  process: string[];
  caseStudy: {
    title: string;
    description: string;
    result: string;
    quote: string;
    author: string;
    video: string;
  };
  visual: string;
}

const Services = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const disciplines: Discipline[] = [
    {
      id: "identity",
      title: "Identity & Soul",
      subtitle: "Brand Architecture",
      description: "We don't create logos; we architect identities that command respect and inspire loyalty.",
      problem: "Most brands look and sound like everyone else. In a world of infinite choice, being forgettable is fatal.",
      why: "Your identity isn't just what you look like—it's how you make people feel. We craft the emotional architecture that turns strangers into advocates.",
      process: [
        "Deep brand archaeology to uncover your authentic voice",
        "Strategic positioning that differentiates from competitors",
        "Visual identity system that scales across all touchpoints"
      ],
      caseStudy: {
        title: "Meridian Watches",
        description: "Transformed a traditional Swiss watchmaker into a modern luxury icon",
        result: "300% increase in brand recognition, 150% growth in premium sales",
        quote: "Neon Tech didn't just redesign our brand—they revealed who we truly are.",
        author: "Klaus Zimmermann, CEO",
        video: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
      },
      visual: "crystal-refraction"
    },
    {
      id: "flagship",
      title: "Digital Flagships",
      subtitle: "Web Experiences",
      description: "Your website isn't just a digital brochure—it's your most important sales representative, working 24/7.",
      problem: "Beautiful websites that don't convert are expensive art projects. Functional websites that aren't beautiful are missed opportunities.",
      why: "Every pixel, every interaction, every moment of loading time either builds trust or erodes it. We obsess over both form and function.",
      process: [
        "User journey mapping to optimize conversion paths",
        "Custom design systems that reflect brand sophistication",
        "Performance optimization for lightning-fast experiences"
      ],
      caseStudy: {
        title: "Apex Real Estate",
        description: "Luxury real estate platform that redefined property discovery",
        result: "$50M in property inquiries in first year, 4x industry conversion rates",
        quote: "Our clients now expect this level of digital sophistication from everyone.",
        author: "Sarah Chen, Founder",
        video: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
      },
      visual: "wireframe-architecture"
    },
    {
      id: "bespoke",
      title: "Bespoke Instruments",
      subtitle: "Custom Applications",
      description: "When off-the-shelf solutions fall short, we create competitive advantages tailored to your exact specifications.",
      problem: "Generic software forces you to adapt your business to its limitations. Custom development is often slow, expensive, and unreliable.",
      why: "Your business is unique. Your tools should be too. We build instruments that amplify your team's capabilities and delight your customers.",
      process: [
        "Requirements analysis with focus on business objectives",
        "Rapid prototyping for validation and iteration",
        "Full-stack development with enterprise-grade security"
      ],
      caseStudy: {
        title: "Quantum Capital",
        description: "Wealth management platform for ultra-high-net-worth clients",
        result: "85% improvement in client satisfaction, $2B+ assets under management",
        quote: "This platform doesn't just manage wealth—it creates experiences worthy of our clients.",
        author: "Michael Torres, Managing Partner",
        video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      },
      visual: "watch-gears"
    }
  ];

  return (
    <AuraBackground variant="violet" intensity="medium">
      <NavBar />
      
      <div className="pt-24">
        {/* Hero */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground mb-8 leading-tight">
                The Blueprint{" "}
                <span className="text-luxury">Room</span>
              </h1>
              <p className="text-2xl text-foreground/70 font-light">
                Three disciplines. Infinite possibilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cinematic Filmstrip */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div 
              ref={filmstripRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {disciplines.map((discipline, index) => (
                <motion.div
                  key={discipline.id}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedDiscipline(discipline)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Living Canvas */}
                  <div className="aspect-[4/5] glass-card relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet/10" />
                    
                    {/* Visual Effect Based on Discipline */}
                    {discipline.visual === "crystal-refraction" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-32 h-32 border-2 border-primary/30 transform rotate-45"
                          animate={{ rotate: [45, 90, 45] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                          className="absolute w-24 h-24 border border-violet/40 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                      </div>
                    )}
                    
                    {discipline.visual === "wireframe-architecture" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div className="space-y-2">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="h-2 bg-primary/20 rounded"
                              style={{ width: `${100 - i * 15}px` }}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ 
                                delay: i * 0.3, 
                                duration: 1.5, 
                                repeat: Infinity, 
                                repeatDelay: 3 
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>
                    )}
                    
                    {discipline.visual === "watch-gears" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-20 h-20 border-2 border-primary/30 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute w-12 h-12 border border-violet/40 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute w-6 h-6 border border-crimson/50 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="w-12 h-12 text-white mb-4 mx-auto" />
                        <p className="text-white font-medium">Explore Discipline</p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Discipline Info */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                      {discipline.title}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {discipline.subtitle}
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      {discipline.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Discipline Deep Dive Modal */}
      <AnimatePresence>
        {selectedDiscipline && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDiscipline(null)}
          >
            <motion.div
              className="glass-strong max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 glass-strong p-8 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-serif font-bold text-primary mb-2">
                    {selectedDiscipline.title}
                  </h2>
                  <p className="text-foreground/70">{selectedDiscipline.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedDiscipline(null)}
                  className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="p-8 space-y-12">
                {/* Problem */}
                <motion.section
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-crimson mb-6">
                    The Problem
                  </h3>
                  <p className="text-xl text-foreground/80 leading-relaxed">
                    {selectedDiscipline.problem}
                  </p>
                </motion.section>

                {/* Why */}
                <motion.section
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-primary mb-6">
                    Why It Matters
                  </h3>
                  <p className="text-xl text-foreground/80 leading-relaxed">
                    {selectedDiscipline.why}
                  </p>
                </motion.section>

                {/* Process */}
                <motion.section
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-serif font-bold text-violet mb-6">
                    Our Process
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedDiscipline.process.map((step, index) => (
                      <motion.div
                        key={index}
                        className="glass p-6 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      >
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Case Study */}
                <motion.section
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="glass-strong p-8 rounded-3xl"
                >
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
                    Case Study: {selectedDiscipline.caseStudy.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                        {selectedDiscipline.caseStudy.description}
                      </p>
                      
                      <div className="glass p-6 rounded-2xl mb-6">
                        <h4 className="font-bold text-primary mb-2">Result</h4>
                        <p className="text-foreground/80">{selectedDiscipline.caseStudy.result}</p>
                      </div>

                      <blockquote className="border-l-4 border-primary pl-6">
                        <p className="text-lg text-foreground/90 italic mb-4">
                          "{selectedDiscipline.caseStudy.quote}"
                        </p>
                        <cite className="text-foreground/60 font-medium">
                          — {selectedDiscipline.caseStudy.author}
                        </cite>
                      </blockquote>
                    </div>
                    
                    <div className="relative">
                      <img
                        src={selectedDiscipline.caseStudy.video}
                        alt="Case study"
                        className="w-full h-80 object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                        <motion.button
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-6 h-6 text-white ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* CTA */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => setSelectedDiscipline(null)}
                      className="btn-neon text-lg px-12 py-5 magnetic"
                    >
                      Commission Your Masterpiece
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </AuraBackground>
  );
};

export default Services;