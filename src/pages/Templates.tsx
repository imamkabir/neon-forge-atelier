import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import TemplatesGallery from "@/components/TemplatesGallery";

const Templates = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-headline font-bold text-neon mb-4">
              Choose Your Template
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select from our curated collection of premium templates to create your digital fingerprint
            </p>
          </div>

          {/* Templates Gallery */}
          <TemplatesGallery />

          {/* Footer CTA */}
          <div className="text-center mt-16 mb-8">
            <div className="glass-card max-w-2xl mx-auto">
              <h3 className="text-2xl font-headline font-bold text-foreground mb-4">
                Need help choosing?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our design experts can help you select the perfect template for your brand
              </p>
              <Link
                to="/contact"
                className="btn-glass text-lg px-8 py-3"
              >
                Get Expert Advice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;