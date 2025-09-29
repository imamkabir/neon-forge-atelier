import { useState } from "react";
import { 
  Save, Eye, Code, Palette, Type, Image, 
  Plus, Trash2, ArrowLeft, Layout, Smartphone, 
  Monitor, Tablet, Globe, Settings, Wand2, ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { NEON_TEMPLATES, PREMIUM_FONTS } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NeonFingerprintCard from "./NeonFingerprintCard";

interface EnhancedSiteEditorProps {
  templateId: string;
  siteId: string;
  siteName: string;
  onBack: () => void;
  onSave: (siteData: any) => void;
}

const EnhancedSiteEditor = ({ templateId, siteId, siteName, onBack, onSave }: EnhancedSiteEditorProps) => {
  const [editMode, setEditMode] = useState<"easy" | "developer">("easy");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreview, setIsPreview] = useState(false);
  
  const template = NEON_TEMPLATES.find(t => t.id === templateId);
  const [siteData, setSiteData] = useState({
    name: siteName,
    template: templateId,
    business: {
      name: "",
      type: "",
      description: "",
      links: [] as { name: string; url: string }[],
      images: [] as string[],
      colors: {
        primary: "#00E5FF",
        secondary: "#50207A",
        accent: "#D6B9FC"
      }
    },
    published: false,
    fingerprintData: {
      userName: "Your Name",
      businessName: "",
      businessType: "",
      fingerprintNumber: `NTC-2025-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
      planLevel: "Free" as "Free" | "Pro" | "Enterprise",
      dateCreated: new Date().toLocaleDateString(),
      badges: ["New Member"],
      websiteUrl: ""
    }
  });

  const generateWebsiteCode = () => {
    const { business, fingerprintData } = siteData;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${business.name || siteName} - Powered by Neon Tech</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, ${business.colors.secondary}15, ${business.colors.accent}15);
            color: #333;
            line-height: 1.6;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { 
            background: rgba(255,255,255,0.95); 
            backdrop-filter: blur(10px);
            padding: 1rem 0; 
            position: sticky; 
            top: 0; 
            z-index: 100;
            border-bottom: 1px solid ${business.colors.primary}30;
        }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { 
            font-size: 1.8rem; 
            font-weight: 900; 
            color: ${business.colors.primary}; 
            text-decoration: none;
        }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { 
            text-decoration: none; 
            color: #666; 
            font-weight: 500;
            transition: all 0.3s;
            padding: 0.5rem 1rem;
            border-radius: 8px;
        }
        .nav-links a:hover { 
            color: ${business.colors.primary}; 
            background: ${business.colors.primary}10;
        }
        .hero { 
            padding: 6rem 0; 
            text-align: center; 
            background: linear-gradient(135deg, ${business.colors.primary}10, ${business.colors.accent}10);
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 70%, ${business.colors.primary}20, transparent 50%);
        }
        .hero-content { position: relative; z-index: 2; }
        .hero h1 { 
            font-size: 4rem; 
            margin-bottom: 1.5rem; 
            color: ${business.colors.primary};
            font-weight: 900;
            line-height: 1.1;
        }
        .hero p { 
            font-size: 1.4rem; 
            color: #666; 
            margin-bottom: 3rem; 
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .btn { 
            display: inline-block;
            padding: 1.2rem 3rem; 
            background: ${business.colors.primary}; 
            color: white; 
            text-decoration: none; 
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-size: 1.1rem;
            box-shadow: 0 10px 30px ${business.colors.primary}30;
        }
        .btn:hover { 
            background: ${business.colors.secondary}; 
            transform: translateY(-3px);
            box-shadow: 0 20px 40px ${business.colors.primary}40;
        }
        .section { 
            padding: 5rem 0; 
            position: relative;
        }
        .section h2 {
            font-size: 2.5rem;
            color: ${business.colors.secondary};
            margin-bottom: 2rem;
            text-align: center;
            font-weight: 800;
        }
        .section p {
            font-size: 1.1rem;
            color: #666;
            text-align: center;
            max-width: 800px;
            margin: 0 auto 3rem;
            line-height: 1.8;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        .feature-card {
            background: rgba(255,255,255,0.8);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 20px;
            border: 1px solid ${business.colors.primary}20;
            transition: all 0.3s;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px ${business.colors.primary}20;
        }
        .footer { 
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a); 
            color: white;
            padding: 3rem 0 2rem; 
            text-align: center; 
        }
        .neon-watermark { 
            color: #666; 
            font-size: 0.9rem; 
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #333;
        }
        .links-section {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
        }
        .social-link {
            color: ${business.colors.primary};
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
        }
        .social-link:hover {
            color: ${business.colors.accent};
            transform: translateY(-2px);
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .nav-links { display: none; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="#" class="logo">${business.name || siteName}</a>
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
                    <h1>${business.name || siteName}</h1>
                    <p>${business.description || 'Your digital presence, perfected with Neon Tech precision.'}</p>
                    <button class="btn" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                        Get Started
                    </button>
                </div>
            </div>
        </section>

        <section class="section" id="about">
            <div class="container">
                <h2>About ${business.name || 'Us'}</h2>
                <p>We are ${business.type || 'a forward-thinking organization'} dedicated to excellence and innovation. Our digital fingerprint represents our commitment to quality and our vision for the future.</p>
                
                <div class="features">
                    <div class="feature-card">
                        <h3 style="color: ${business.colors.primary}; margin-bottom: 1rem;">Excellence</h3>
                        <p>We deliver nothing but the highest quality in everything we do.</p>
                    </div>
                    <div class="feature-card">
                        <h3 style="color: ${business.colors.primary}; margin-bottom: 1rem;">Innovation</h3>
                        <p>Cutting-edge solutions that push boundaries and drive results.</p>
                    </div>
                    <div class="feature-card">
                        <h3 style="color: ${business.colors.primary}; margin-bottom: 1rem;">Trust</h3>
                        <p>Building lasting relationships through transparency and reliability.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="services">
            <div class="container">
                <h2>Our Services</h2>
                <p>Comprehensive ${business.type?.toLowerCase() || 'digital'} solutions tailored to your needs.</p>
            </div>
        </section>

        <section class="section" id="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <p>Ready to work together? Let's create something amazing.</p>
                
                ${business.links.length > 0 ? `
                <div class="links-section">
                    ${business.links.map(link => `
                        <a href="${link.url}" class="social-link" target="_blank">${link.name}</a>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ${business.name || siteName}. All rights reserved.</p>
            <p>Powered by Neon Tech Digital Fingerprints</p>
            <p class="neon-watermark">neonc©2025 — all rights reserved</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>`;
  };

  const handleEasyEdit = (field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        [field]: value
      },
      fingerprintData: {
        ...prev.fingerprintData,
        businessName: field === 'name' ? value : prev.fingerprintData.businessName,
        businessType: field === 'type' ? value : prev.fingerprintData.businessType
      }
    }));
  };

  const handleSave = () => {
    const updatedSiteData = {
      ...siteData,
      fingerprintData: {
        ...siteData.fingerprintData,
        websiteUrl: siteData.published ? `/sites/${siteId}` : ""
      }
    };
    
    onSave(updatedSiteData);
    toast("Digital fingerprint saved successfully!");
  };

  const handlePublish = () => {
    const publishedSiteData = {
      ...siteData,
      published: true,
      fingerprintData: {
        ...siteData.fingerprintData,
        websiteUrl: `/sites/${siteId}`
      }
    };
    
    setSiteData(publishedSiteData);
    onSave(publishedSiteData);
    toast("Digital fingerprint published! 🚀 Your site is now live!");
  };

  const generateAISite = () => {
    toast("AI is crafting your digital fingerprint...");
    setTimeout(() => {
      setSiteData(prev => ({
        ...prev,
        business: {
          ...prev.business,
          name: prev.business.name || "My Digital Business",
          type: prev.business.type || "Digital Innovation",
          description: "We create exceptional digital experiences that drive real results. Our approach combines cutting-edge technology with human-centered design to deliver solutions that truly matter.",
          links: [
            { name: "LinkedIn", url: "https://linkedin.com/company/mydigitalbusiness" },
            { name: "Twitter", url: "https://twitter.com/mydigitalbiz" },
            { name: "Instagram", url: "https://instagram.com/mydigitalbusiness" }
          ],
          images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop"
          ]
        }
      }));
      toast("AI has generated your digital fingerprint! ✨");
    }, 2000);
  };

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-dark">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Template not found</h2>
          <button onClick={onBack} className="btn-neon">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas-dark flex flex-col">
      {/* Top Bar */}
      <div className="glass-strong border-b border-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-headline font-bold text-neon">{siteName}</h1>
            <p className="text-sm text-muted-foreground">Digital Fingerprint Editor</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Edit Mode Toggle */}
          <div className="flex items-center space-x-2 glass p-1 rounded-lg">
            <button
              onClick={() => setEditMode("easy")}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                editMode === "easy" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"
              }`}
            >
              <Wand2 className="w-4 h-4 mr-1" />
              Easy
            </button>
            <button
              onClick={() => setEditMode("developer")}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                editMode === "developer" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"
              }`}
            >
              <Code className="w-4 h-4 mr-1" />
              Developer
            </button>
          </div>

          <button onClick={handleSave} className="btn-glass">
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>

          <button onClick={handlePublish} className="btn-neon">
            <Globe className="w-4 h-4 mr-2" />
            Publish Fingerprint
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Editor */}
        <div className="w-96 glass-strong border-r border-primary/10 flex flex-col">
          
          {/* Digital Fingerprint Preview */}
          <div className="p-6 border-b border-primary/10">
            <h3 className="font-semibold text-foreground mb-4">Your Digital Fingerprint</h3>
            <div className="scale-75 origin-top">
              <NeonFingerprintCard
                userName={siteData.fingerprintData.userName}
                businessName={siteData.business.name}
                businessType={siteData.business.type}
                fingerprintNumber={siteData.fingerprintData.fingerprintNumber}
                planLevel={siteData.fingerprintData.planLevel}
                dateCreated={siteData.fingerprintData.dateCreated}
                badges={siteData.fingerprintData.badges}
                websiteUrl={siteData.published ? `/sites/${siteId}` : undefined}
                customColors={siteData.business.colors}
                isActive={siteData.published}
                streak={7}
              />
            </div>
          </div>

          <Tabs value={editMode} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="easy">Easy Edit</TabsTrigger>
              <TabsTrigger value="developer">Developer</TabsTrigger>
            </TabsList>

            {/* Easy Edit Mode */}
            <TabsContent value="easy" className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Business Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Business Name</label>
                    <Input
                      value={siteData.business.name}
                      onChange={(e) => handleEasyEdit("name", e.target.value)}
                      placeholder="Your Business Name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">What You Do</label>
                    <Input
                      value={siteData.business.type}
                      onChange={(e) => handleEasyEdit("type", e.target.value)}
                      placeholder="e.g., Digital Agency, Restaurant, Consulting"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground">Description</label>
                    <Textarea
                      value={siteData.business.description}
                      onChange={(e) => handleEasyEdit("description", e.target.value)}
                      placeholder="Tell visitors what makes you special..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* AI Generation */}
              <div className="border-t border-primary/10 pt-6">
                <Button onClick={generateAISite} className="w-full btn-neon">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate My Site with AI
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI will create a complete site based on your business info
                </p>
              </div>

              {/* Color Customization */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Brand Colors</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Primary Color</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={siteData.business.colors.primary}
                        onChange={(e) => setSiteData(prev => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            colors: { ...prev.business.colors, primary: e.target.value }
                          }
                        }))}
                        className="w-10 h-10 rounded border border-primary/20"
                      />
                      <span className="text-sm font-mono text-foreground">
                        {siteData.business.colors.primary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Developer Mode */}
            <TabsContent value="developer" className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Raw Code Editor</h3>
                  <div className="text-xs text-muted-foreground">
                    Full HTML/CSS/JS control
                  </div>
                </div>
                
                <Textarea
                  value={generateWebsiteCode()}
                  onChange={(e) => {/* Code editing logic */}}
                  className="font-mono text-sm min-h-96 bg-canvas-elevated border border-primary/20"
                  placeholder="Your website code..."
                />
                
                <div className="text-xs text-muted-foreground">
                  ⚠️ Developer mode: The Neon Tech watermark must remain for compliance.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Preview */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="glass-card p-4 max-w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                Live Preview - {previewMode}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-muted-foreground">
                  {previewMode === "desktop" ? "1200px" : previewMode === "tablet" ? "768px" : "375px"}
                </div>
                {siteData.published && (
                  <Button
                    onClick={() => window.open(`/sites/${siteId}`, '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live
                  </Button>
                )}
              </div>
            </div>
            
            <div className="border border-primary/20 rounded-lg overflow-hidden bg-white">
              <iframe
                srcDoc={generateWebsiteCode()}
                className={`block bg-white ${
                  previewMode === "desktop" ? "w-full h-96" :
                  previewMode === "tablet" ? "w-96 h-96" :
                  "w-80 h-96"
                }`}
                title="Site Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSiteEditor;