import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpotlightFeatureCard from '../../../components/women/SpotlightFeatureCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

describe('SpotlightFeatureCard', () => {
  it('renders spotlight section with header', () => {
    render(<SpotlightFeatureCard />);
    
    expect(screen.getByText('Spotlight Feature')).toBeInTheDocument();
    expect(screen.getByText(/Meet the women who are defining sneaker culture/)).toBeInTheDocument();
  });

  it('displays first person by default', () => {
    render(<SpotlightFeatureCard />);
    
    expect(screen.getByText('Janelle Chen')).toBeInTheDocument();
    expect(screen.getByText('Collector & Content Creator')).toBeInTheDocument();
    expect(screen.getByText('Air Jordan 1 "Chicago"')).toBeInTheDocument();
  });

  it('shows navigation controls', () => {
    render(<SpotlightFeatureCard />);
    
    expect(screen.getByTestId('button-spotlight-prev')).toBeInTheDocument();
    expect(screen.getByTestId('button-spotlight-next')).toBeInTheDocument();
  });

  it('displays dot indicators', () => {
    render(<SpotlightFeatureCard />);
    
    expect(screen.getByTestId('dot-indicator-0')).toBeInTheDocument();
    expect(screen.getByTestId('dot-indicator-1')).toBeInTheDocument();
    expect(screen.getByTestId('dot-indicator-2')).toBeInTheDocument();
  });

  it('navigates to next person when next button clicked', async () => {
    render(<SpotlightFeatureCard />);
    
    const nextButton = screen.getByTestId('button-spotlight-next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Maya Rodriguez')).toBeInTheDocument();
      expect(screen.getByText('Sneaker Designer')).toBeInTheDocument();
    });
  });

  it('navigates to previous person when prev button clicked', async () => {
    render(<SpotlightFeatureCard />);
    
    // First go to next person
    const nextButton = screen.getByTestId('button-spotlight-next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Maya Rodriguez')).toBeInTheDocument();
    });
    
    // Then go back to previous
    const prevButton = screen.getByTestId('button-spotlight-prev');
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText('Janelle Chen')).toBeInTheDocument();
    });
  });

  it('navigates when dot indicator clicked', async () => {
    render(<SpotlightFeatureCard />);
    
    const dotIndicator2 = screen.getByTestId('dot-indicator-2');
    fireEvent.click(dotIndicator2);
    
    await waitFor(() => {
      expect(screen.getByText('Aisha Johnson')).toBeInTheDocument();
      expect(screen.getByText('Sneaker Influencer & Entrepreneur')).toBeInTheDocument();
    });
  });

  it('displays person quote with proper formatting', () => {
    render(<SpotlightFeatureCard />);
    
    const quote = screen.getByText(/Sneakers aren't just fashion—they're storytelling/);
    expect(quote).toBeInTheDocument();
    expect(quote.closest('p')).toHaveClass('italic');
  });

  it('shows sneaker of choice information', () => {
    render(<SpotlightFeatureCard />);
    
    expect(screen.getByText('Sneaker of Choice')).toBeInTheDocument();
    expect(screen.getByText('Air Jordan 1 "Chicago"')).toBeInTheDocument();
  });

  it('renders read more button with correct test id', () => {
    render(<SpotlightFeatureCard />);
    
    const readMoreButton = screen.getByTestId('button-read-more-janelle-chen');
    expect(readMoreButton).toBeInTheDocument();
    expect(readMoreButton).toHaveTextContent('Read Full Story');
  });

  it('displays person and sneaker images', () => {
    render(<SpotlightFeatureCard />);
    
    const personImage = screen.getByAltText('Janelle Chen');
    const sneakerImage = screen.getByAltText('Air Jordan 1 "Chicago"');
    
    expect(personImage).toBeInTheDocument();
    expect(sneakerImage).toBeInTheDocument();
  });

  it('cycles through all spotlight people', async () => {
    render(<SpotlightFeatureCard />);
    
    const nextButton = screen.getByTestId('button-spotlight-next');
    
    // Start with Janelle
    expect(screen.getByText('Janelle Chen')).toBeInTheDocument();
    
    // Click to Maya
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('Maya Rodriguez')).toBeInTheDocument();
    });
    
    // Click to Aisha
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('Aisha Johnson')).toBeInTheDocument();
    });
    
    // Click should cycle back to Janelle
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText('Janelle Chen')).toBeInTheDocument();
    });
  });
});