# SOLEGRITHM Hero & Brands Sections

Complete Hero and Brands sections extracted from the SOLEGRITHM website.

## Installation

1. Install dependencies:
```bash
npm install react gsap
```

2. Copy the components to your project:
- `HeroSection.tsx` - Main hero section with animations
- `BrandsSection.tsx` - Brands grid section
- `hero-brands-styles.css` - All required CSS styles
- `assets/` - All required images and SVGs

## Usage

```tsx
import HeroSection from './HeroSection';
import BrandsSection from './BrandsSection';
import './hero-brands-styles.css';

function App() {
  return (
    <div>
      <HeroSection />
      <BrandsSection />
    </div>
  );
}
```

## Features

### Hero Section
- **Font**: Inter, font-weight: 600
- **Font Size**: `clamp(2rem, 16vw, 18rem)` (responsive)
- **GSAP Animations**: Letter-by-letter stagger animation
- **3D Spline Model**: Interactive robot character
- **Fingerprint Background**: SVG with 0.05 opacity
- **Arrow Navigation**: Links to brands section

### Brands Section
- **Grid Layout**: 4-column grid (responsive)
- **Brand Logos**: 4 different brand images
- **Opacity**: 0.2 for subtle effect
- **Filter**: Invert colors for dark theme

## Assets Included

- `fingerprint.svg` - Background fingerprint pattern
- `arrow_outward.svg` - Navigation arrow icon
- `load.png` - Brand logo 1
- `logowithname1.png` - Brand logo 2
- `logowithname2.png` - Brand logo 3
- `logowithname3.png` - Brand logo 4

## Typography

- **Hero Text (SOLEGRITHM)**: Inter, 600 weight, responsive sizing
- **Welcome Text**: Inter, 400 weight, uppercase
- **Font Family**: Inter, sans-serif (Google Fonts)

## Responsive Design

- **Desktop**: Full responsive with viewport units
- **Tablet**: Fixed pixel sizes at 991px breakpoint
- **Mobile**: Smaller font sizes and 2-column brand grid
- **Small Mobile**: Single column brand grid

## Dependencies

- React 18+
- GSAP 3.12+ for animations
- Modern browser with CSS Grid support

## Customization

Update the CSS variables in `:root` to match your brand colors:

```css
:root {
  --black: #050505;
  --white: whitesmoke;
  --primary: var(--white);
}
```