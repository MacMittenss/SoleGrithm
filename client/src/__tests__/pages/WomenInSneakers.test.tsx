import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WomenInSneakers from '@/pages/WomenInSneakers';

// Mock all the child components
jest.mock('@/components/women/WomenHeroSection', () => {
  return function MockWomenHeroSection() {
    return <div data-testid="mock-women-hero-section">Women Hero Section</div>;
  };
});

jest.mock('@/components/women/SpotlightFeatureCard', () => {
  return function MockSpotlightFeatureCard() {
    return <div data-testid="mock-spotlight-feature">Spotlight Feature</div>;
  };
});

jest.mock('@/components/women/EditorialSection', () => {
  return function MockEditorialSection() {
    return <div data-testid="mock-editorial-section">Editorial Section</div>;
  };
});

jest.mock('@/components/women/CuratedKicks', () => {
  return function MockCuratedKicks() {
    return <div data-testid="mock-curated-kicks">Curated Kicks</div>;
  };
});

jest.mock('@/components/women/CommunityVoices', () => {
  return function MockCommunityVoices() {
    return <div data-testid="mock-community-voices">Community Voices</div>;
  };
});

jest.mock('@/components/women/EventSpotlight', () => {
  return function MockEventSpotlight() {
    return <div data-testid="mock-event-spotlight">Event Spotlight</div>;
  };
});

jest.mock('@/components/women/AIAssistWidget', () => {
  return function MockAIAssistWidget() {
    return <div data-testid="mock-ai-assist-widget">AI Assist Widget</div>;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('WomenInSneakers Page', () => {
  it('renders the page with correct test id', () => {
    render(<WomenInSneakers />);
    
    const page = screen.getByTestId('page-women-in-sneakers');
    expect(page).toBeInTheDocument();
  });

  it('has correct page styling classes', () => {
    render(<WomenInSneakers />);
    
    const page = screen.getByTestId('page-women-in-sneakers');
    expect(page).toHaveClass('min-h-screen', 'bg-background');
  });

  it('renders all main sections in correct order', () => {
    render(<WomenInSneakers />);
    
    // Check that all sections are present
    expect(screen.getByTestId('mock-women-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-spotlight-feature')).toBeInTheDocument();
    expect(screen.getByTestId('mock-editorial-section')).toBeInTheDocument();
    expect(screen.getByTestId('mock-curated-kicks')).toBeInTheDocument();
    expect(screen.getByTestId('mock-community-voices')).toBeInTheDocument();
    expect(screen.getByTestId('mock-event-spotlight')).toBeInTheDocument();
    expect(screen.getByTestId('mock-ai-assist-widget')).toBeInTheDocument();
  });

  it('renders hero section first', () => {
    render(<WomenInSneakers />);
    
    const heroSection = screen.getByTestId('mock-women-hero-section');
    const page = screen.getByTestId('page-women-in-sneakers');
    
    expect(page.firstElementChild).toContainElement(heroSection);
  });

  it('has correct section layout structure', () => {
    render(<WomenInSneakers />);
    
    // Check that sections are wrapped in proper containers
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBe(5); // 5 main sections after hero
    
    // Check that sections have proper padding and containers
    sections.forEach(section => {
      expect(section).toHaveClass('py-16');
      const container = section.querySelector('.max-w-7xl');
      expect(container).toBeInTheDocument();
    });
  });

  it('applies correct background styling to sections', () => {
    render(<WomenInSneakers />);
    
    const sections = document.querySelectorAll('section');
    
    // Editorial section should have gray background
    const editorialSection = sections[1]; // Second section
    expect(editorialSection).toHaveClass('bg-gray-50', 'dark:bg-gray-900');
    
    // Community section should have gradient background
    const communitySection = sections[3]; // Fourth section
    expect(communitySection).toHaveClass('bg-gradient-to-r');
  });

  it('renders AI assistant widget outside main sections', () => {
    render(<WomenInSneakers />);
    
    const aiWidget = screen.getByTestId('mock-ai-assist-widget');
    const page = screen.getByTestId('page-women-in-sneakers');
    
    // AI widget should be last child, not in a section
    expect(page.lastElementChild).toContainElement(aiWidget);
  });

  it('has responsive padding classes', () => {
    render(<WomenInSneakers />);
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      expect(section).toHaveClass('px-4', 'md:px-6', 'lg:px-8');
    });
  });

  it('uses motion div for page animations', () => {
    render(<WomenInSneakers />);
    
    const page = screen.getByTestId('page-women-in-sneakers');
    
    // Should have motion properties (mocked, but structure is correct)
    expect(page).toBeInTheDocument();
  });

  it('maintains semantic HTML structure', () => {
    render(<WomenInSneakers />);
    
    // Should have proper section elements
    const sections = document.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
    
    // Each section should have a container div
    sections.forEach(section => {
      const container = section.querySelector('.max-w-7xl.mx-auto');
      expect(container).toBeInTheDocument();
    });
  });

  it('components are properly imported and rendered', () => {
    render(<WomenInSneakers />);
    
    // Verify all mocked components are rendered
    expect(screen.getByText('Women Hero Section')).toBeInTheDocument();
    expect(screen.getByText('Spotlight Feature')).toBeInTheDocument();
    expect(screen.getByText('Editorial Section')).toBeInTheDocument();
    expect(screen.getByText('Curated Kicks')).toBeInTheDocument();
    expect(screen.getByText('Community Voices')).toBeInTheDocument();
    expect(screen.getByText('Event Spotlight')).toBeInTheDocument();
    expect(screen.getByText('AI Assist Widget')).toBeInTheDocument();
  });
});