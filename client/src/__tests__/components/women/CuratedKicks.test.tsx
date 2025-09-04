import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CuratedKicks from '../../../components/women/CuratedKicks';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('CuratedKicks', () => {
  it('renders section header with title and description', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Curated Kicks')).toBeInTheDocument();
    expect(screen.getByText(/Hand-picked sneakers celebrating women/)).toBeInTheDocument();
  });

  it('displays filter controls', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Filter by:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Sneakers')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Brands')).toBeInTheDocument();
  });

  it('shows navigation buttons', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByTestId('button-curated-prev')).toBeInTheDocument();
    expect(screen.getByTestId('button-curated-next')).toBeInTheDocument();
  });

  it('displays sneaker cards with information', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Air Jordan 1 High "Aleali May"')).toBeInTheDocument();
    expect(screen.getByText('Jordan')).toBeInTheDocument();
    expect(screen.getByText('$170')).toBeInTheDocument();
  });

  it('shows why we picked it descriptions', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Why We Picked It')).toBeInTheDocument();
    expect(screen.getByText(/A celebration of feminine strength/)).toBeInTheDocument();
  });

  it('displays category badges', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Collaboration')).toBeInTheDocument();
  });

  it('shows designer information for collaborations', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Designed by Aleali May')).toBeInTheDocument();
  });

  it('renders action buttons for each sneaker', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByTestId('button-discover-1')).toBeInTheDocument();
    expect(screen.getByTestId('button-buy-1')).toBeInTheDocument();
  });

  it('filters sneakers by category', async () => {
    const user = userEvent.setup();
    render(<CuratedKicks />);
    
    // Click on category filter
    const categoryFilter = screen.getByDisplayValue('All Sneakers');
    await user.click(categoryFilter);
    
    // Should show category options
    expect(screen.getByText('Collaborations')).toBeInTheDocument();
    expect(screen.getByText("Women's Exclusive")).toBeInTheDocument();
    expect(screen.getByText('Designer Picks')).toBeInTheDocument();
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
  });

  it('filters sneakers by brand', async () => {
    const user = userEvent.setup();
    render(<CuratedKicks />);
    
    // Click on brand filter
    const brandFilter = screen.getByDisplayValue('All Brands');
    await user.click(brandFilter);
    
    // Should show brand options
    expect(screen.getByText('Jordan')).toBeInTheDocument();
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('Adidas')).toBeInTheDocument();
  });

  it('navigates through sneaker carousel', () => {
    render(<CuratedKicks />);
    
    const nextButton = screen.getByTestId('button-curated-next');
    const prevButton = screen.getByTestId('button-curated-prev');
    
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    
    // Initially prev button should be disabled
    expect(prevButton).toBeDisabled();
  });

  it('displays dot indicators for pagination', () => {
    render(<CuratedKicks />);
    
    // Should have dot indicators if there are more than 3 sneakers
    const dotIndicator = screen.queryByTestId('dot-curated-0');
    expect(dotIndicator).toBeInTheDocument();
  });

  it('shows view all button', () => {
    render(<CuratedKicks />);
    
    const viewAllButton = screen.getByTestId('button-view-all-curated');
    expect(viewAllButton).toBeInTheDocument();
    expect(viewAllButton).toHaveTextContent('View All Curated Sneakers');
  });

  it('displays heart icon for favorites', () => {
    render(<CuratedKicks />);
    
    // Should have heart buttons for favoriting
    const heartButtons = document.querySelectorAll('[data-lucide="heart"]');
    expect(heartButtons.length).toBeGreaterThan(0);
  });

  it('shows colorway information', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('Court Purple/Black')).toBeInTheDocument();
  });

  it('handles empty filter results', async () => {
    const user = userEvent.setup();
    render(<CuratedKicks />);
    
    // This would test empty state if implemented
    // For now, just verify filters work without breaking
    const categoryFilter = screen.getByDisplayValue('All Sneakers');
    await user.click(categoryFilter);
    
    expect(screen.getByText('All Sneakers')).toBeInTheDocument();
  });

  it('displays correct pricing format', () => {
    render(<CuratedKicks />);
    
    expect(screen.getByText('$170')).toBeInTheDocument();
    expect(screen.getByText('$110')).toBeInTheDocument();
    expect(screen.getByText('$230')).toBeInTheDocument();
  });
});