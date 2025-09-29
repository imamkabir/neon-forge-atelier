import { useState, useEffect } from "react";
import { CreditCard, Shield, Award, Calendar, Copy, Eye, EyeOff, Fingerprint, Zap, Globe, QrCode, CreditCard as Edit, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface NeonFingerprintCardProps {
  userName: string;
  businessName?: string;
  businessType?: string;
  fingerprintNumber: string;
  planLevel: "Free" | "Pro" | "Enterprise";
  dateCreated: string;
  badges: string[];
  verificationCode?: string;
  websiteUrl?: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  isActive?: boolean;
  streak?: number;
  onEdit?: () => void;
  showEditButton?: boolean;
}

const NeonFingerprintCard = ({
  userName,
  businessName,
  businessType,
  fingerprintNumber,
  planLevel,
  dateCreated,
  badges,
  verificationCode = "NTC-8849-VX",
  websiteUrl,
  customColors,
  isActive = true,
  streak = 0,
  onEdit,
  showEditButton = false
}: NeonFingerprintCardProps) => {
  const [showVerification, setShowVerification] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(fingerprintNumber);
    toast("Digital Fingerprint ID copied to clipboard");
  };

  const handleCopyWebsite = () => {
    if (websiteUrl) {
      navigator.clipboard.writeText(websiteUrl);
      toast("Website URL copied to clipboard");
    }
  };

  const planColors = {
    Free: "from-canvas-elevated via-canvas-surface to-canvas-elevated",
    Pro: "from-neon-blue/30 via-luxury-purple/20 to-neon-blue/30",
    Enterprise: "from-luxury-purple/40 via-luxury-lavender/30 to-luxury-purple/40"
  };

  const planGlow = {
    Free: "shadow-lg",
    Pro: `shadow-2xl ${isGlowing ? 'shadow-neon-blue/40' : 'shadow-neon-blue/20'}`,
    Enterprise: `shadow-2xl ${isGlowing ? 'shadow-luxury-purple/50' : 'shadow-luxury-purple/30'}`
  };

  const cardColors = customColors || {
    primary: "#00E5FF",
    secondary: "#50207A", 
    accent: "#D6B9FC"
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Enhanced Digital Fingerprint Card */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${planColors[planLevel]} ${planGlow[planLevel]} border-2 border-primary/30 p-8 backdrop-blur-sm transition-all duration-1000 ${!isActive ? 'opacity-50 grayscale' : ''}`}>
        
        {/* Holographic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent transform rotate-45"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-neon-blue/20 to-transparent rounded-full blur-xl"></div>
        </div>

        {/* Edit Button */}
        {showEditButton && onEdit && (
          <button
            onClick={onEdit}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-foreground" />
          </button>
        )}

        {/* Neon Tech Branding */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-luxury-purple rounded-lg flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-headline font-bold text-neon text-lg">NEON TECH</span>
              <div className="text-xs text-muted-foreground font-mono">DIGITAL IDENTITY</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            EST. 2025
          </div>
        </div>

        {/* User/Business Info */}
        <div className="relative z-10 mb-6">
          <h2 className="text-2xl font-headline font-bold text-foreground mb-2">
            {businessName || userName}
          </h2>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm text-muted-foreground">
              {businessType || "Digital Creator"}
            </span>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              planLevel === "Free" ? "bg-canvas-elevated text-muted-foreground" :
              planLevel === "Pro" ? "bg-neon-blue/20 text-neon-blue" :
              "bg-luxury-purple/20 text-luxury-purple"
            }`}>
              {planLevel}
            </div>
            {streak > 0 && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-orange-400/20 rounded-full">
                <Zap className="w-3 h-3 text-orange-400" />
                <span className="text-xs text-orange-400 font-medium">{streak}</span>
              </div>
            )}
          </div>
          {businessName && (
            <div className="text-sm text-muted-foreground">
              Owner: {userName}
            </div>
          )}
        </div>

        {/* Fingerprint Number */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Digital Fingerprint ID
            </span>
            <button
              onClick={handleCopyFingerprint}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Copy className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          <div className="text-lg font-mono text-foreground tracking-wider">
            {fingerprintNumber}
          </div>
        </div>

        {/* Website URL */}
        {websiteUrl && (
          <div className="relative z-10 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Digital Presence
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={handleCopyWebsite}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Copy className="w-3 h-3 text-muted-foreground" />
                </button>
                <button
                  onClick={() => window.open(websiteUrl, '_blank')}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="text-sm font-mono text-neon-blue truncate">
              {websiteUrl}
            </div>
          </div>
        )}

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="relative z-10 mb-6">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              Digital Achievements
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.slice(0, 4).map((badge, index) => (
                <div key={index} className="flex items-center space-x-1 px-3 py-1 bg-luxury-purple/15 rounded-full border border-luxury-purple/20">
                  <Award className="w-3 h-3 text-luxury-periwinkle" />
                  <span className="text-xs text-luxury-periwinkle font-medium">{badge}</span>
                </div>
              ))}
              {badges.length > 4 && (
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <span className="text-xs text-muted-foreground">+{badges.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status & Actions */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-xs text-muted-foreground">
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {dateCreated}
              </span>
            </div>
          </div>

          {/* QR Code & Verification */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQR(!showQR)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <QrCode className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowVerification(!showVerification)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              {showVerification ? (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Eye className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {showVerification && (
              <span className="text-xs font-mono text-muted-foreground">
                {verificationCode}
              </span>
            )}
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="absolute inset-4 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-black rounded-lg mb-4 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-white" />
              </div>
              <p className="text-xs text-gray-600">Scan to view fingerprint</p>
              <button
                onClick={() => setShowQR(false)}
                className="mt-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Holographic Security Elements */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-luxury-purple/20 rounded-full blur-lg opacity-60 animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-br from-luxury-lavender/20 to-luxury-periwinkle/20 rounded-full blur-md opacity-50"></div>

        {/* Security Verification */}
        <div className="absolute bottom-6 right-6">
          <Shield className="w-5 h-5 text-neon-blue/60" />
        </div>

        {/* Neon Glow Border Effect */}
        <div className={`absolute inset-0 rounded-3xl border-2 ${
          planLevel === "Enterprise" ? "border-luxury-purple/50" :
          planLevel === "Pro" ? "border-neon-blue/50" :
          "border-white/20"
        } ${isGlowing ? 'animate-pulse' : ''}`}></div>
      </div>
    </div>
  );
};

export default NeonFingerprintCard;