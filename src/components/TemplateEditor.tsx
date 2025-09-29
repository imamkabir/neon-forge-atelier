import { useState, useRef } from "react";
import { 
  Save, Eye, Code, Palette, Type, Image, 
  Plus, Trash2, ArrowLeft, Layout, Smartphone, 
  Monitor, Tablet, Globe, Settings, Wand2
} from "lucide-react";
import { toast } from "sonner";
import { NEON_TEMPLATES, PREMIUM_FONTS } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TemplateEditorProps {
  templateId: string;
  siteId: string;
  siteName: string;
  onBack: () => void;
  onSave: (siteData: any) => void;
}

interface SiteData {
  name: string;
  template: string;
  pages: {
    name: string;
    content: string;
    elements: any[];
  }[];
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    font: string;
  };
  business: {
    name: string;
    type: string;
    description: string;
    links: { name: string; url: string }[];
    images: string[];
  };
  published: boolean;
  code?: string;
}

const TemplateEditor = ({ templateId, siteId, siteName, onBack, onSave }: TemplateEditorProps) => {
  const [editMode, setEditMode] = useState<"easy" | "developer">("easy");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreview, setIsPreview] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  
  const template = NEON_TEMPLATES.find(t => t.id === templateId);
  const [siteData, setSiteData] = useState<SiteData>({
    name: siteName,
    template: templateId,
    pages: template?.pages.map(page => ({
      name: page,
      content: generatePageContent(page),
      elements: []
    })) || [],
    theme: {
      colors: template?.colorSchemes[0] || { name: "Default", primary: "#00E5FF", secondary: "#50207A", accent: "#D6B9FC" },
      font: template?.fonts[0] || "Inter"
    },
    business: {
      name: "",
      type: "",
      description: "",
      links: [],
      images: []
    },
    published: false,
    code: generateInitialCode()
  });

  function generatePageContent(pageName: string): string {
    switch (pageName.toLowerCase()) {
      case "home":
        return `# Welcome to ${siteName}\n\nYour digital presence starts here. Crafted with Neon Tech precision.\n\n## What We Do\nDescribe your business or personal brand here.\n\n## Get Started\nReady to connect? Let's build something amazing together.`;
      case "about":
        return `# About Us\n\nTell your story here. What makes you unique?\n\n## Our Mission\nShare your mission and values.\n\n## Our Team\nIntroduce your team members.`;
      case "services":
        return `# Our Services\n\nWhat do you offer? List your services here.\n\n## Service 1\nDescribe your first service.\n\n## Service 2\nDescribe your second service.`;
      case "contact":
        return `# Get In Touch\n\nReady to work together?\n\n## Contact Information\nEmail: hello@yoursite.com\nPhone: (555) 123-4567\n\n## Office Location\nYour address here`;
      default:
        return `# ${pageName}\n\nContent for ${pageName} page goes here.`;
    }
  }

  function generateInitialCode(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName} - Powered by Neon Tech</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: '${siteData.theme.font}', sans-serif;
            background: linear-gradient(135deg, ${siteData.theme.colors.secondary}15, ${siteData.theme.colors.accent}15);
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
            border-bottom: 1px solid ${siteData.theme.colors.primary}30;
        }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { 
            font-size: 1.5rem; 
            font-weight: bold; 
            color: ${siteData.theme.colors.primary}; 
        }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { 
            text-decoration: none; 
            color: #666; 
            font-weight: 500;
            transition: color 0.3s;
        }
        .nav-links a:hover { color: ${siteData.theme.colors.primary}; }
        .hero { 
            padding: 4rem 0; 
            text-align: center; 
            background: linear-gradient(135deg, ${siteData.theme.colors.primary}10, ${siteData.theme.colors.accent}10);
        }
        .hero h1 { 
            font-size: 3rem; 
            margin-bottom: 1rem; 
            color: ${siteData.theme.colors.primary};
            font-weight: 900;
        }
        .hero p { 
            font-size: 1.2rem; 
            color: #666; 
            margin-bottom: 2rem; 
        }
        .btn { 
            display: inline-block;
            padding: 1rem 2rem; 
            background: ${siteData.theme.colors.primary}; 
            color: white; 
            text-decoration: none; 
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
        }
        .btn:hover { 
            background: ${siteData.theme.colors.secondary}; 
            transform: translateY(-2px);
            box-shadow: 0 10px 30px ${siteData.theme.colors.primary}30;
        }
        .section { padding: 4rem 0; }
        .footer { 
            background: #f8f9fa; 
            padding: 2rem 0; 
            text-align: center; 
            border-top: 1px solid #eee;
        }
        .neon-watermark { 
            color: #999; 
            font-size: 0.8rem; 
            margin-top: 1rem;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .nav-links { display: none; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">${siteData.business.name || siteName}</div>
                <div class="nav-links">
                    ${siteData.pages.map(page => `<a href="#${page.name.toLowerCase()}">${page.name}</a>`).join('')}
                </div>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h1>${siteData.business.name || siteName}</h1>
                <p>${siteData.business.description || 'Your digital presence, perfected.'}</p>
                <button class="btn">Get Started</button>
            </div>
        </section>

        ${siteData.pages.map(page => `
        <section class="section" id="${page.name.toLowerCase()}">
            <div class="container">
                <h2>${page.name}</h2>
                <p>${page.content.replace(/[#\n]/g, ' ').substring(0, 200)}...</p>
            </div>
        </section>
        `).join('')}
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ${siteData.business.name || siteName}. All rights reserved.</p>
            <p class="neon-watermark">neonc©2025 — all rights reserved</p>
        </div>
    </footer>
</body>
</html>`;
  }

  const handleEasyEdit = (field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        [field]: value
      }
    }));
  };

  const handleAddLink = () => {
    setSiteData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        links: [...prev.business.links, { name: "", url: "" }]
      }
    }));
  };

  const handleUpdateLink = (index: number, field: string, value: string) => {
    setSiteData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        links: prev.business.links.map((link, i) => 
          i === index ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const handleRemoveLink = (index: number) => {
    setSiteData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        links: prev.business.links.filter((_, i) => i !== index)
      }
    }));
  };

  const handleColorChange = (colorType: string, color: string) => {
    setSiteData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          [colorType]: color
        }
      }
    }));
  };

  const handleSave = () => {
    // Update code if in developer mode
    if (editMode === "developer") {
      setSiteData(prev => ({ ...prev, code: siteData.code }));
    } else {
      // Regenerate code from easy edit data
      setSiteData(prev => ({ ...prev, code: generateInitialCode() }));
    }
    
    onSave(siteData);
    toast("Site saved successfully!");
  };

  const handlePublish = () => {
    setSiteData(prev => ({ ...prev, published: true }));
    handleSave();
    toast("Site published! 🚀 Your digital fingerprint is now live!");
  };

  const generateSiteFromAI = () => {
    // Mock AI generation
    toast("AI is generating your site...");
    setTimeout(() => {
      setSiteData(prev => ({
        ...prev,
        business: {
          name: prev.business.name || "My Business",
          type: prev.business.type || "Digital Services",
          description: "We create exceptional digital experiences that drive results. Our team combines creativity with technology to deliver solutions that matter.",
          links: [
            { name: "LinkedIn", url: "https://linkedin.com/company/mybusiness" },
            { name: "Twitter", url: "https://twitter.com/mybusiness" }
          ],
          images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop"
          ]
        },
        pages: prev.pages.map(page => ({
          ...page,
          content: generateEnhancedPageContent(page.name, prev.business)
        }))
      }));
      toast("AI has generated your site content! ✨");
    }, 2000);
  };

  function generateEnhancedPageContent(pageName: string, business: any): string {
    switch (pageName.toLowerCase()) {
      case "home":
        return `# ${business.name || siteName}\n\n${business.description || 'Your digital presence starts here.'}\n\n## What We Do\n${business.type || 'We provide exceptional services'} that drive real results for our clients.\n\n## Why Choose Us\n- Expert team with proven track record\n- Cutting-edge technology and methods\n- Personalized approach to every project\n\n## Get Started\nReady to transform your digital presence? Let's build something amazing together.`;
      case "about":
        return `# About ${business.name || 'Us'}\n\nWe are passionate about ${business.type?.toLowerCase() || 'creating exceptional experiences'}.\n\n## Our Story\nFounded with a vision to revolutionize the digital landscape, we've been helping businesses and individuals create their perfect digital fingerprint.\n\n## Our Mission\nTo democratize access to premium digital experiences and empower everyone to have a professional online presence.\n\n## Our Values\n- Excellence in everything we do\n- Innovation that drives results\n- Transparency and trust\n- Client success is our success`;
      case "services":
        return `# Our Services\n\nWe offer comprehensive ${business.type?.toLowerCase() || 'digital'} solutions.\n\n## Digital Fingerprint Creation\nCustom websites that reflect your unique identity and brand.\n\n## Brand Development\nComplete brand identity packages including logos, colors, and messaging.\n\n## Ongoing Support\n24/7 support and maintenance to keep your digital presence perfect.\n\n## Consultation\nStrategic guidance to maximize your online impact.`;
      case "contact":
        return `# Get In Touch\n\nReady to create your digital fingerprint?\n\n## Contact Information\nEmail: hello@${business.name?.toLowerCase().replace(/\s+/g, '') || 'yoursite'}.com\nPhone: (555) 123-4567\n\n## Business Hours\nMonday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed\n\n## Let's Connect\nFollow us on social media for updates and inspiration.`;
      default:
        return `# ${pageName}\n\nContent for ${pageName} page goes here.\n\nThis page is part of your digital fingerprint created with Neon Tech.`;
    }
  }

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
            <p className="text-sm text-muted-foreground">Using {template.name}</p>
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

          {/* Preview Mode Toggle */}
          <div className="flex items-center space-x-2 glass p-1 rounded-lg">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-2 rounded ${previewMode === "desktop" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode("tablet")}
              className={`p-2 rounded ${previewMode === "tablet" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-2 rounded ${previewMode === "mobile" ? "bg-neon-blue/20 text-neon-blue" : "text-muted-foreground"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsPreview(!isPreview)}
            className="btn-glass"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? "Edit" : "Preview"}
          </button>

          <button onClick={handleSave} className="btn-glass">
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>

          <button onClick={handlePublish} className="btn-neon">
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Editor */}
        {!isPreview && (
          <div className="w-96 glass-strong border-r border-primary/10 flex flex-col">
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
                      <label className="text-sm text-muted-foreground">Business Type</label>
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
                        placeholder="Tell visitors what you do..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Links Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Links</h3>
                    <Button onClick={handleAddLink} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Link
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {siteData.business.links.map((link, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          value={link.name}
                          onChange={(e) => handleUpdateLink(index, "name", e.target.value)}
                          placeholder="Link name"
                          className="flex-1"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => handleUpdateLink(index, "url", e.target.value)}
                          placeholder="https://..."
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleRemoveLink(index)}
                          size="icon"
                          variant="ghost"
                          className="text-accent-red"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Generation */}
                <div className="border-t border-primary/10 pt-6">
                  <Button onClick={generateSiteFromAI} className="w-full btn-neon">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    AI will create content based on your business info
                  </p>
                </div>

                {/* Theme Customization */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Theme</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Primary Color</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          value={siteData.theme.colors.primary}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          className="w-10 h-10 rounded border border-primary/20"
                        />
                        <span className="text-sm font-mono text-foreground">
                          {siteData.theme.colors.primary}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground">Font</label>
                      <select
                        value={siteData.theme.font}
                        onChange={(e) => setSiteData(prev => ({
                          ...prev,
                          theme: { ...prev.theme, font: e.target.value }
                        }))}
                        className="w-full mt-1 p-2 bg-canvas-elevated border border-primary/20 rounded-lg text-foreground"
                      >
                        {PREMIUM_FONTS.map(font => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
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
                    value={siteData.code}
                    onChange={(e) => setSiteData(prev => ({ ...prev, code: e.target.value }))}
                    className="font-mono text-sm min-h-96 bg-canvas-elevated border border-primary/20"
                    placeholder="Enter your HTML code here..."
                  />
                  
                  <div className="text-xs text-muted-foreground">
                    ⚠️ Developer mode gives you full control. The Neon Tech watermark must remain.
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Main Preview */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="glass-card p-4 max-w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                Preview - {previewMode}
              </h3>
              <div className="text-xs text-muted-foreground">
                {previewMode === "desktop" ? "1200px" : previewMode === "tablet" ? "768px" : "375px"} viewport
              </div>
            </div>
            
            <div className="border border-primary/20 rounded-lg overflow-hidden bg-white">
              <iframe
                srcDoc={siteData.code}
                className={`block bg-white ${
                  previewMode === "desktop" ? "w-full h-96" :
                  previewMode === "tablet" ? "w-96 h-96" :
                  "w-80 h-96"
                }`}
                title="Site Preview"
              />
            </div>
            
            {siteData.published && (
              <div className="mt-4 text-center">
                <Button
                  onClick={() => window.open(`/sites/${siteId}`, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Site
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;