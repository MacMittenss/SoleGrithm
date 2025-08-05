import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'wouter';
import EnhancedSneakerCard from '@/components/enhanced/EnhancedSneakerCard';

const mockSneaker = {
  id: 1,
  name: 'Air Jordan 1 Retro High',
  brand: 'Nike',
  brandName: 'Nike',
  price: '$170',
  retailPrice: 170,
  imageUrl: 'https://example.com/jordan1.jpg',
  images: [
    'https://example.com/jordan1.jpg',
    'https://example.com/jordan1-2.jpg'
  ],
  slug: 'air-jordan-1-retro-high',
  isNew: true,
  rating: 4.5,
  reviewCount: 128,
  colorway: 'Bred',
  releaseDate: '2023-11-15',
  trending: true,
  discount: 10
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <Router>
      {component}
    </Router>
  );
};

describe('EnhancedSneakerCard', () => {
  it('renders sneaker information correctly', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    expect(screen.getByText('Air Jordan 1 Retro High')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('$170')).toBeInTheDocument();
    expect(screen.getByText('Bred')).toBeInTheDocument();
  });

  it('displays badges for new and trending sneakers', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Trending')).toBeInTheDocument();
  });

  it('shows discount badge when discount is available', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('displays rating and review count', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    expect(screen.getByText('4.5 (128)')).toBeInTheDocument();
  });

  it('shows release date', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    const releaseDate = new Date(mockSneaker.releaseDate).toLocaleDateString();
    expect(screen.getByText(`Released: ${releaseDate}`)).toBeInTheDocument();
  });

  it('renders quick action buttons when showQuickActions is true', () => {
    renderWithRouter(
      <EnhancedSneakerCard sneaker={mockSneaker} showQuickActions={true} />
    );
    
    // Actions should be visible on hover, but test for their presence
    expect(screen.getByTestId(`like-button-${mockSneaker.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`quick-view-${mockSneaker.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`add-to-bag-${mockSneaker.id}`)).toBeInTheDocument();
  });

  it('toggles like state when like button is clicked', () => {
    renderWithRouter(
      <EnhancedSneakerCard sneaker={mockSneaker} showQuickActions={true} />
    );
    
    const likeButton = screen.getByTestId(`like-button-${mockSneaker.id}`);
    
    // Initially should not be liked
    expect(likeButton).not.toHaveClass('bg-red-500');
    
    fireEvent.click(likeButton);
    
    // Should be liked after click
    expect(likeButton).toHaveClass('bg-red-500');
  });

  it('handles different card sizes', () => {
    const { rerender } = renderWithRouter(
      <EnhancedSneakerCard sneaker={mockSneaker} size="sm" />
    );
    
    let container = screen.getByRole('button').closest('div');
    expect(container).toHaveClass('max-w-xs');
    
    rerender(
      <Router>
        <EnhancedSneakerCard sneaker={mockSneaker} size="lg" />
      </Router>
    );
    
    container = screen.getByRole('button').closest('div');
    expect(container).toHaveClass('max-w-md');
  });

  it('shows market data badge when showMarketData is true', () => {
    renderWithRouter(
      <EnhancedSneakerCard sneaker={mockSneaker} showMarketData={true} />
    );
    
    expect(screen.getByText('Live Market')).toBeInTheDocument();
  });

  it('renders image navigation dots when multiple images exist', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    // Should have navigation dots for multiple images
    const dots = screen.getAllByRole('button').filter(button => 
      button.className.includes('rounded-full') && 
      button.className.includes('w-2')
    );
    
    expect(dots).toHaveLength(2); // Two images = two dots
  });

  it('links to sneaker detail page', () => {
    renderWithRouter(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    const nameLink = screen.getByText('Air Jordan 1 Retro High').closest('a');
    expect(nameLink).toHaveAttribute('href', '/sneakers/air-jordan-1-retro-high');
  });
});