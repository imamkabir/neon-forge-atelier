import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, Code, Download, Palette, Type, Image, Globe, Sparkles, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import templatesData from "@/mock/templates.json";
import { toast } from "sonner";

interface BuilderState {
  template: string;
  brand: {
    name: string;
    tagline: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logo: string;
    heroImage: string;
  };
  content: {
    about: string;
    services: string[];
    contact: {
      email: string;
      phone: string;
      address: string;
    };
  };
  social: {
    website: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  pages: string[];
}

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<"guided" | "developer">("guided");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [builderState, setBuilderState] = useState<BuilderState>({
    template: "monolith",
    brand: {
      name: "",
      tagline: "",
      description: "",
      primaryColor: "#8CC5FF",
      secondaryColor: "#0B0B10",
      accentColor: "#FF5570",
      logo: "",
      heroImage: ""
    },
    content: {
      about: "",
      services: [],
      contact: {
        email: "",
        phone: "",
        address: ""
      }
    },
    social: {
      website: "",
      linkedin: "",
      twitter: "",
      instagram: ""
    },
    pages: ["Home", "About", "Services", "Contact"]
  });

  const steps = [
    { id: "template", title: "Choose Template", icon: Sparkles },
    { id: "brand", title: "Brand Identity", icon: Palette },
    { id: "content", title: "Content", icon: Type },
    { id: "social", title: "Social Links", icon: Globe },
    { id: "preview", title: "Preview & Publish", icon: Eye }
  ];

  const selectedTemplate = templatesData.find(t => t.id === builderState.template);

  const generateSiteCode = () => {
    const { brand, content, social } = builderState;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.name} - Luxury Digital Presence</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, ${brand.secondaryColor}, ${brand.primaryColor}15);
            color: #333;
            line-height: 1.7;
            font-feature-settings: "cv02", "cv03", "cv04", "cv11";
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .header { 
            background: rgba(255,255,255,0.95); 
            backdrop-filter: blur(24px);
            padding: 1.5rem 0; 
            position: sticky; 
            top: 0; 
            z-index: 100;
            border-bottom: 1px solid ${brand.primaryColor}20;
        }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { 
            font-size: 1.75rem; 
            font-weight: 800; 
            color: ${brand.primaryColor}; 
            text-decoration: none;
            letter-spacing: -0.02em;
        }
        .nav-links { display: flex; gap: 2.5rem; }
        .nav-links a { 
            text-decoration: none; 
            color: #666; 
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 0.75rem 1.25rem;
            border-radius: 12px;
            position: relative;
        }
        .nav-links a:hover { 
            color: ${brand.primaryColor}; 
            background: ${brand.primaryColor}08;
            transform: translateY(-1px);
        }
        .hero { 
            padding: 8rem 0; 
            text-align: center; 
            background: linear-gradient(135deg, ${brand.primaryColor}08, ${brand.accentColor}05);
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 30% 70%, ${brand.primaryColor}15, transparent 60%);
        }
        .hero-content { position: relative; z-index: 2; }
        .hero h1 { 
            font-size: 4.5rem; 
            margin-bottom: 2rem; 
            color: ${brand.primaryColor};
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -0.03em;
            font-family: 'Playfair Display', serif;
        }
        .hero p { 
            font-size: 1.5rem; 
            color: #666; 
            margin-bottom: 3rem; 
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 300;
            line-height: 1.6;
        }
        .btn { 
            display: inline-block;
            padding: 1.25rem 3.5rem; 
            background: ${brand.primaryColor}; 
            color: white; 
            text-decoration: none; 
            border-radius: 16px;
            font-weight: 600;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border: none;
            cursor: pointer;
            font-size: 1.1rem;
            box-shadow: 0 12px 40px ${brand.primaryColor}25;
            letter-spacing: -0.01em;
        }
        .btn:hover { 
            background: ${brand.secondaryColor}; 
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 60px ${brand.primaryColor}35;
        }
        .section { 
            padding: 6rem 0; 
            position: relative;
        }
        .section h2 {
            font-size: 3rem;
            color: ${brand.secondaryColor};
            margin-bottom: 2.5rem;
            text-align: center;
            font-weight: 800;
            font-family: 'Playfair Display', serif;
            letter-spacing: -0.02em;
        }
        .section p {
            font-size: 1.2rem;
            color: #666;
            text-align: center;
            max-width: 900px;
            margin: 0 auto 4rem;
            line-height: 1.8;
            font-weight: 300;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2.5rem;
            margin-top: 4rem;
        }
        .feature-card {
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(20px);
            padding: 2.5rem;
            border-radius: 24px;
            border: 1px solid ${brand.primaryColor}15;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            position: relative;
            overflow: hidden;
        }
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }
        .feature-card:hover::before {
            transform: translateX(100%);
        }
        .feature-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 80px ${brand.primaryColor}20;
            border-color: ${brand.primaryColor}30;
        }
        .footer { 
            background: linear-gradient(135deg, #0a0a0f, #1a1a1f); 
            color: white;
            padding: 4rem 0 2rem; 
            text-align: center; 
            position: relative;
        }
        .footer::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle at 50% 0%, ${brand.primaryColor}10, transparent 50%);
        }
        .footer-content { position: relative; z-index: 2; }
        .social-links {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
        }
        .social-link {
            color: ${brand.primaryColor};
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 0.75rem 1.5rem;
            border: 1px solid ${brand.primaryColor}30;
            border-radius: 12px;
            backdrop-filter: blur(10px);
        }
        .social-link:hover {
            color: white;
            background: ${brand.primaryColor};
            transform: translateY(-2px);
            box-shadow: 0 8px 25px ${brand.primaryColor}40;
        }
        .neon-watermark { 
            color: #666; 
            font-size: 8px; 
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #333;
            opacity: 0.6;
            letter-spacing: 0.5px;
            font-family: 'Inter', sans-serif;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .nav-links { display: none; }
            .features { grid-template-columns: 1fr; gap: 1.5rem; }
            .social-links { flex-direction: column; align-items: center; gap: 1rem; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="#" class="logo">${brand.name || 'Your Brand'}</a>
                <div class="nav-links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero" id="home">
            <div class="container">
                <div class="hero-content">
                    <h1>${brand.name || 'Your Brand'}</h1>
                    <p>${brand.tagline || 'Crafting exceptional digital experiences'}</p>
                    <button class="btn" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                        Get Started
                    </button>
                </div>
            </div>
        </section>

        <section class="section" id="about">
            <div class="container">
                <h2>About</h2>
                <p>${content.about || brand.description || 'We create exceptional digital experiences that matter.'}</p>
            </div>
        </section>

        <section class="section" id="services">
            <div class="container">
                <h2>Services</h2>
                <div class="features">
                    <div class="feature-card">
                        <h3 style="color: ${brand.primaryColor}; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">Excellence</h3>
                        <p>We deliver nothing but the highest quality in everything we do.</p>
                    </div>
                    <div class="feature-card">
                        <h3 style="color: ${brand.primaryColor}; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">Innovation</h3>
                        <p>Cutting-edge solutions that push boundaries and drive results.</p>
                    </div>
                    <div class="feature-card">
                        <h3 style="color: ${brand.primaryColor}; margin-bottom: 1.5rem; font-size: 1.5rem; font-weight: 700;">Trust</h3>
                        <p>Building lasting relationships through transparency and reliability.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <p>Ready to work together? Let's create something extraordinary.</p>
                
                <div class="social-links">
                    ${social.website ? `<a href="${social.website}" class="social-link">Website</a>` : ''}
                    ${social.linkedin ? `<a href="${social.linkedin}" class="social-link">LinkedIn</a>` : ''}
                    ${social.twitter ? `<a href="${social.twitter}" class="social-link">Twitter</a>` : ''}
                    ${social.instagram ? `<a href="${social.instagram}" class="social-link">Instagram</a>` : ''}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="container">
                <p>&copy; 2025 ${brand.name || 'Your Brand'}. All rights reserved.</p>
                <p style="margin-top: 1rem; opacity: 0.7;">Powered by Neon Tech Digital Fingerprints</p>
                <p class="neon-watermark">neonc©2025 — all rights reserved</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            if (parallax) {
                parallax.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
            }
        });
    </script>
</body>
</html>`;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    const siteCode = generateSiteCode();
    const blob = new Blob([siteCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${builderState.brand.name || 'neon-site'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast("🚀 Site exported! Your digital fingerprint is ready.");
  };

  const updateBrand = (field: string, value: string) => {
    setBuilderState(prev => ({
      ...prev,
      brand: { ...prev.brand, [field]: value }
    }));
  };

  const updateContent = (field: string, value: string) => {
    setBuilderState(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }));
  };

  const updateSocial = (field: string, value: string) => {
    setBuilderState(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value }
    }));
  };

  return (
    <AuraBackground variant="blue" intensity="medium">
      <NavBar />
      
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              The Digital{" "}
              <span className="text-luxury">Atelier</span>
            </h1>
            <p className="text-xl text-foreground/70 font-light">
              Craft your luxury digital presence with precision and elegance
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            className="glass-card mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      index === currentStep
                        ? "bg-primary/20 text-primary"
                        : index < currentStep
                          ? "bg-green-500/20 text-green-400"
                          : "text-foreground/40"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <step.icon className="w-5 h-5" />
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 transition-colors duration-300 ${
                      index < currentStep ? "bg-green-400" : "bg-white/20"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Builder Form */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {/* Template Selection */}
                {currentStep === 0 && (
                  <motion.div
                    key="template"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                      Choose Your Foundation
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {templatesData.map((template) => (
                        <motion.div
                          key={template.id}
                          className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            builderState.template === template.id
                              ? "border-primary bg-primary/10"
                              : "border-white/20 hover:border-white/40 hover:bg-white/5"
                          }`}
                          onClick={() => setBuilderState(prev => ({ ...prev, template: template.id }))}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-violet/20 rounded-xl mb-4 overflow-hidden">
                            <img
                              src={template.preview}
                              alt={template.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-serif font-bold text-foreground mb-1">
                            {template.name}
                          </h3>
                          <p className="text-sm text-foreground/60 mb-2">{template.vibe}</p>
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                            template.tier === "Enterprise" ? "bg-violet/20 text-violet" :
                            template.tier === "Pro" ? "bg-primary/20 text-primary" :
                            "bg-white/10 text-foreground/60"
                          }`}>
                            {template.tier === "Free" ? <Sparkles className="w-3 h-3" /> :
                             template.tier === "Pro" ? <Star className="w-3 h-3" /> :
                             <Lock className="w-3 h-3" />}
                            <span>{template.tier}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Brand Identity */}
                {currentStep === 1 && (
                  <motion.div
                    key="brand"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                      Brand Identity
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-3">
                          Brand Name
                        </label>
                        <Input
                          value={builderState.brand.name}
                          onChange={(e) => updateBrand("name", e.target.value)}
                          placeholder="Your Brand Name"
                          className="glass text-lg py-4"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-3">
                          Tagline
                        </label>
                        <Input
                          value={builderState.brand.tagline}
                          onChange={(e) => updateBrand("tagline", e.target.value)}
                          placeholder="Your brand's mission in one line"
                          className="glass text-lg py-4"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-3">
                          Description
                        </label>
                        <Textarea
                          value={builderState.brand.description}
                          onChange={(e) => updateBrand("description", e.target.value)}
                          placeholder="Tell your story..."
                          className="glass min-h-32"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-3">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="color"
                            value={builderState.brand.primaryColor}
                            onChange={(e) => updateBrand("primaryColor", e.target.value)}
                            className="w-12 h-12 rounded-xl border border-white/20"
                          />
                          <Input
                            value={builderState.brand.primaryColor}
                            onChange={(e) => updateBrand("primaryColor", e.target.value)}
                            className="glass font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Content */}
                {currentStep === 2 && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                      Content & Story
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground/70 mb-3">
                        About Section
                      </label>
                      <Textarea
                        value={builderState.content.about}
                        onChange={(e) => updateContent("about", e.target.value)}
                        placeholder="Tell visitors about your mission, values, and what makes you unique..."
                        className="glass min-h-40"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Social Links */}
                {currentStep === 3 && (
                  <motion.div
                    key="social"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                      Connect & Share
                    </h2>
                    
                    <div className="space-y-4">
                      {Object.entries(builderState.social).map(([platform, url]) => (
                        <div key={platform}>
                          <label className="block text-sm font-medium text-foreground/70 mb-2 capitalize">
                            {platform}
                          </label>
                          <Input
                            value={url}
                            onChange={(e) => updateSocial(platform, e.target.value)}
                            placeholder={`https://${platform}.com/yourbrand`}
                            className="glass"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Preview & Publish */}
                {currentStep === 4 && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                      Ready to Launch
                    </h2>
                    
                    <div className="glass-card">
                      <h3 className="font-serif font-bold text-foreground mb-4">
                        Your Digital Fingerprint
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Brand Name:</span>
                          <span className="text-foreground font-medium">{builderState.brand.name || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Template:</span>
                          <span className="text-foreground font-medium">{selectedTemplate?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Pages:</span>
                          <span className="text-foreground font-medium">{builderState.pages.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <motion.button
                        onClick={handlePublish}
                        className="btn-neon w-full text-lg py-5 magnetic"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Export Digital Fingerprint
                      </motion.button>
                      
                      <div className="text-center">
                        <p className="text-sm text-foreground/50">
                          Includes Neon Tech watermark and premium styling
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between pt-8">
                <Button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="glass border-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                {currentStep < steps.length - 1 && (
                  <Button
                    onClick={handleNext}
                    className="btn-neon"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              className="sticky top-32"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif font-bold text-foreground">Live Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setMode(mode === "guided" ? "developer" : "guided")}
                      className={`p-2 rounded-lg transition-colors ${
                        mode === "developer" ? "bg-primary/20 text-primary" : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      <Code className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {mode === "guided" ? (
                  <div className="aspect-video border border-white/20 rounded-xl overflow-hidden bg-white">
                    <iframe
                      srcDoc={generateSiteCode()}
                      className="w-full h-full"
                      title="Site Preview"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm text-foreground/60 mb-2">Generated Code</div>
                    <div className="h-80 bg-black/20 rounded-xl p-4 overflow-auto">
                      <pre className="text-xs text-foreground/80 font-mono leading-relaxed">
                        {generateSiteCode().substring(0, 1000)}...
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Builder;