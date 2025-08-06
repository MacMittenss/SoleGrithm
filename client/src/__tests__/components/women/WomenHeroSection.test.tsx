import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WomenHeroSection from '@/components/women/WomenHeroSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('WomenHeroSection', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders hero section with main heading', () => {
    render(<WomenHeroSection />);
    
    expect(screen.getByText('Women Move')).toBeInTheDocument();
    expect(screen.getByText('the Culture')).toBeInTheDocument();
  });

  it('displays tagline and description', () => {
    render(<WomenHeroSection />);
    
    expect(screen.getByText('Celebrating Women in Sneaker Culture')).toBeInTheDocument();
    expect(screen.getByText(/Stories, sneakers, and spotlight moments/)).toBeInTheDocument();
  });

  it('shows engagement statistics', () => {
    render(<WomenHeroSection />);
    
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('Featured Stories')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('Curated Sneakers')).toBeInTheDocument();
    expect(screen.getByText('1K+')).toBeInTheDocument();
    expect(screen.getByText('Community Voices')).toBeInTheDocument();
  });

  it('renders explore features button with correct test id', () => {
    render(<WomenHeroSection />);
    
    const exploreButton = screen.getByTestId('button-explore-features');
    expect(exploreButton).toBeInTheDocument();
    expect(exploreButton).toHaveTextContent('Explore Features');
  });

  it('renders submit story button with correct test id', () => {
    render(<WomenHeroSection />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit Your Story');
  });

  it('handles explore button click with smooth scroll', () => {
    render(<WomenHeroSection />);
    
    const exploreButton = screen.getByTestId('button-explore-features');
    fireEvent.click(exploreButton);
    
    // Verify scrollIntoView was called (mocked)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('handles submit story button click with smooth scroll', () => {
    render(<WomenHeroSection />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    fireEvent.click(submitButton);
    
    // Verify scrollIntoView was called (mocked)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('applies correct CSS classes for styling', () => {
    render(<WomenHeroSection />);
    
    const heroSection = screen.getByRole('region');
    expect(heroSection).toHaveClass('relative', 'min-h-screen', 'flex', 'items-center');
  });

  it('displays scroll indicator', () => {
    render(<WomenHeroSection />);
    
    // Check for scroll indicator elements
    const scrollIndicator = document.querySelector('.absolute.bottom-8');
    expect(scrollIndicator).toBeInTheDocument();
  });
});