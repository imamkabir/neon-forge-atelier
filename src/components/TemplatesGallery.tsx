import { useState } from "react";
import { Layout, Star, Eye, Download, ArrowRight } from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  rating: number;
  downloads: number;
  isPremium: boolean;
  tags: string[];
}

const TemplatesGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const templates: Template[] = [
    {
      id: "1",
      name: "Luxury Portfolio Pro",
      category: "portfolio",
      description: "Premium portfolio template with elegant animations",
      thumbnail: "bg-gradient-to-br from-luxury-purple/20 to-luxury-lavender/20",
      rating: 4.9,
      downloads: 1247,
      isPremium: true,
      tags: ["luxury", "animation", "portfolio"]
    },
    {
      id: "2", 
      name: "Minimalist Showcase",
      category: "showcase",
      description: "Clean, minimal design for creative professionals",
      thumbnail: "bg-gradient-to-br from-neon-blue/20 to-luxury-periwinkle/20",
      rating: 4.7,
      downloads: 892,
      isPremium: false,
      tags: ["minimal", "clean", "creative"]
    },
    {
      id: "3",
      name: "Corporate Executive",
      category: "business",
      description: "Professional template for business leaders",
      thumbnail: "bg-gradient-to-br from-canvas-surface to-canvas-elevated",
      rating: 4.8,
      downloads: 634,
      isPremium: true,
      tags: ["business", "professional", "executive"]
    },
    {
      id: "4",
      name: "Creative Studio",
      category: "creative",
      description: "Bold, expressive template for artists and designers",
      thumbnail: "bg-gradient-to-br from-accent-red/20 to-luxury-purple/20", 
      rating: 4.6,
      downloads: 756,
      isPremium: false,
      tags: ["creative", "bold", "artistic"]
    }
  ];

  const categories = [
    { id: "all", label: "All Templates" },
    { id: "portfolio", label: "Portfolio" },
    { id: "showcase", label: "Showcase" },
    { id: "business", label: "Business" },
    { id: "creative", label: "Creative" }
  ];

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Layout className="w-6 h-6 text-neon-blue" />
          <h3 className="text-xl font-headline font-bold text-neon">
            Templates Gallery
          </h3>
        </div>
        <button className="text-sm text-neon-blue hover:underline flex items-center space-x-1">
          <span>Browse all</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                : "bg-canvas-elevated text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            {/* Template Thumbnail */}
            <div className={`h-32 rounded-lg mb-4 ${template.thumbnail} flex items-center justify-center relative overflow-hidden`}>
              <Layout className="w-12 h-12 text-white/30" />
              {template.isPremium && (
                <div className="absolute top-2 right-2 bg-luxury-purple/90 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>PRO</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-neon-blue/80 rounded-full backdrop-blur-sm hover:bg-neon-blue transition-colors">
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-foreground">{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{template.downloads.toLocaleString()}</span>
                  </div>
                </div>
                <button className="text-sm text-neon-blue hover:underline font-medium">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesGallery;