# Neon Tech Social+ Platform

An investor-ready luxury social platform with integrated website builder, featuring obsessive attention to detail, cinematic motion, and addictive social features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the platform.

## 🎨 Design System

### Color Tokens
```css
--bg: #0B0B10 (charcoal background)
--ink: #E9EDF5 (soft white text)
--blue: #8CC5FF (ice blue glow - primary)
--crimson: #FF5570 (subtle crimson accent)
--violet: #838CE5 (cool violet haze)
```

### Typography
- **Headings**: Playfair Display (luxury serif with tight tracking)
- **Body/UI**: Inter (clean sans-serif with optical kerning)
- **Mono**: JetBrains Mono (code and IDs)

### Glass System
- **Glass**: `rgba(255,255,255,0.06)` with `blur(24px)`
- **Glass Strong**: `rgba(255,255,255,0.08)` with enhanced borders
- **Borders**: `rgba(255,255,255,0.12)`

## 🏗️ Architecture

### Routes
- `/` - Investor home with hero and teasers
- `/about` - Minimal story (Problem → Spark → Philosophy)
- `/services` - Interactive filmstrip of disciplines
- `/feed` - Social feed with stories and posts
- `/profile/:id` - User profiles with neon fingerprint cards
- `/messages` - Luxury DM system
- `/leaderboard` - Gamified creator rankings
- `/templates` - Curated 7-template gallery
- `/builder` - Mini-site builder wizard
- `/dashboard` - User analytics with digital concierge
- `/explore` - Discovery and trending content
- `/referrals` - Refer & earn dashboard

### Key Components

#### Core UI
- `AuraBackground` - Breathing white dots + ambient gradients
- `NavBar` - Glass navigation with magnetic interactions
- `PostCard` - Luxury social post with micro-interactions
- `StoryReel` - Circular story cards with autoplay
- `Composer` - Post creation with media support

#### Social Features
- `ProfileHeader` - Enhanced user profiles with tier indicators
- `NeonFingerprintCard` - AMEX-inspired digital ID cards
- `LeaderboardTable` - Gamified rankings with confetti
- `MessagingCenter` - WhatsApp-style luxury chat

#### Builder System
- `TemplateGallery` - 7 curated templates with live previews
- `BuilderWizard` - Guided form + developer mode
- `LivePreview` - Real-time site preview with responsive modes

#### Analytics
- `ConciergeBar` - AI-powered insights and recommendations
- `ImpactCrate` - Gamified achievement reveals
- `Timeline` - Interactive journey visualization

## 📱 Features

### Social Platform
- **Stories**: Circular reels with ring glow and autoplay
- **Posts**: Text, images, hashtags with engagement tracking
- **Profiles**: Tier-based avatars with achievement badges
- **Messages**: End-to-end encrypted luxury chat experience
- **Leaderboard**: Global, weekly, and rising creator rankings

### Website Builder
- **7 Curated Templates**: Monolith, Atelier, Holo, Nova, Velvet, Kairo, Meridian
- **Guided Mode**: Conversational form with live preview
- **Developer Mode**: Raw code editor with JSON config
- **Export**: Static HTML with Neon Tech watermark
- **Responsive**: Mobile, tablet, desktop previews

### Gamification
- **Badges**: Neon Pioneer, Business Pro, Investor, Trendsetter
- **Tiers**: Free, Pro, Enterprise with visual indicators
- **Streaks**: Daily posting unlocks glow effects
- **Scores**: Engagement-based ranking system

### Analytics
- **Digital Concierge**: Personalized insights and recommendations
- **Performance Tracking**: Reach, engagement, growth metrics
- **Journey Timeline**: Interactive milestone visualization
- **Impact Moments**: Curated achievement highlights

## 🎭 Motion Design

### Animations
- **Page Transitions**: Crossfade with Z-depth using Framer Motion
- **Micro-interactions**: Magnetic buttons, parallax shadows
- **Loading States**: Shimmer skeletons with white line effect
- **Hover Effects**: Subtle lifts, glows, and scale transforms

### Accessibility
- **Reduced Motion**: `prefers-reduced-motion` guards on all animations
- **Focus Management**: Custom focus rings with proper contrast
- **Screen Readers**: Semantic HTML with proper ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility

## 🔧 Development

### Adding New Templates
1. Add template config to `src/mock/templates.json`
2. Include preview image, color palette, and typography
3. Template will automatically appear in gallery

### Adding New Badges
1. Update user badges in `src/mock/users.json`
2. Badge will automatically render with achievement styling

### Exporting Sites
Built sites include:
- Responsive HTML/CSS/JS
- Neon Tech watermark: `neonc©2025 — all rights reserved`
- Optimized performance and SEO
- Mobile-first responsive design

## 🎯 Investor Demo Script (90 seconds)

1. **Hero Landing** (15s)
   - White dot completes headline animation
   - Showcase luxury typography and spacing

2. **Blueprint Room** (20s)
   - Hover filmstrip disciplines
   - Click into "Identity & Soul" case study
   - Show killer client testimonial

3. **Social Feed** (20s)
   - Stories autoplay interaction
   - Post engagement micro-interactions
   - Follow user and see real-time updates

4. **Profile & Fingerprint** (15s)
   - View neon digital fingerprint card
   - Show tier system and badges
   - Demonstrate social proof

5. **Builder Demo** (15s)
   - Select template → change brand name/color
   - Live preview updates
   - Export to HTML with watermark

6. **Dashboard Concierge** (5s)
   - Show personalized insights
   - Click "Impact Crate" reveal
   - Demonstrate analytics depth

## 🏆 Production Features

### Performance
- Code-split routes with lazy loading
- Optimized images with modern formats
- Minimal bundle size with tree shaking
- 60fps animations with GPU acceleration

### Security
- XSS protection on user content
- Secure file uploads (mocked)
- Rate limiting on actions
- Content moderation hooks

### Scalability
- Component-based architecture
- Zustand state management
- Mock data easily replaceable with APIs
- Responsive design system

## 📄 License

© 2025 Neon Tech. All rights reserved.

---

*Built with obsessive attention to detail for investors who appreciate excellence.*