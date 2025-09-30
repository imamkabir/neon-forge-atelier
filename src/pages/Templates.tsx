import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Download, Star, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import Footer from "@/components/Footer";
import templatesData from "@/mock/templates.json";

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Enterprise":
        return "text-violet border-violet/30 bg-violet/10";
      case "Pro":
        return "text-primary border-primary/30 bg-primary/10";
      default:
        return "text-foreground/60 border-white/20 bg-white/5";
    }
  };

  const getTierIcon = (tier: string) => {
    if (tier === "Free") return <Sparkles className="w-3 h-3" />;
    if (tier === "Pro") return <Star className="w-3 h-3" />;
    return <Lock className="w-3 h-3" />;
  };

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
              <motion.div
                className="inline-flex items-center space-x-2 mb-8 px-6 py-3 glass rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Curated Collection</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground mb-8 leading-tight">
                Seven{" "}
                <span className="text-luxury">Templates</span>
              </h1>
              
              <p className="text-2xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed">
                Each template is a masterpiece. Carefully crafted, obsessively refined, 
                and designed for those who refuse to settle for ordinary.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Templates Gallery */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {templatesData.map((template, index) => (
                <motion.div
                  key={template.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  onHoverStart={() => setHoveredTemplate(template.id)}
                  onHoverEnd={() => setHoveredTemplate(null)}
                  onClick={() => setSelectedTemplate(template.id)}
                  whileHover={{ y: -8 }}
                >
                  {/* Template Preview */}
                  <div className="relative aspect-[4/5] glass-card overflow-hidden mb-6">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Tier Badge */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(template.tier)}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                      >
                        <div className="flex items-center space-x-1">
                          {getTierIcon(template.tier)}
                          <span>{template.tier}</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Hover Overlay */}
                    <AnimatePresence>
                      {hoveredTemplate === template.id && (
                        <motion.div
                          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex space-x-4">
                            <motion.button
                              className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Eye className="w-5 h-5 text-white" />
                            </motion.button>
                            <motion.button
                              className="p-3 bg-primary/80 hover:bg-primary rounded-full backdrop-blur-sm transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Download className="w-5 h-5 text-white" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Template Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-primary font-medium mb-3">
                        {template.vibe}
                      </p>
                      <p className="text-foreground/70 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    {/* Color Palette Preview */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-foreground/50">Palette:</span>
                      <div className="flex space-x-2">
                        {Object.values(template.config.palette).map((color, colorIndex) => (
                          <motion.div
                            key={colorIndex}
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.2 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        to={`/builder?template=${template.id}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Use Template
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8">
                Ready to create your{" "}
                <span className="text-luxury">digital fingerprint?</span>
              </h2>
              
              <p className="text-xl text-foreground/70 mb-12 leading-relaxed font-light">
                Choose a template and start building your luxury digital presence
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/builder" className="btn-neon text-lg px-12 py-5 magnetic">
                    Start Building
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/contact" className="btn-glass text-lg px-12 py-5 magnetic">
                    Custom Design
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </AuraBackground>
  );
};

export default Templates;