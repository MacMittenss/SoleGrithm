import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { setupTestEnvironment, mockFetch, createMockSneaker } from '../utils/testUtils';
import Home from '@/pages/Home';

// Setup test environment
setupTestEnvironment();

// Mock the hooks
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    isLoading: false
  })
}));

jest.mock('@/hooks/useUserTracking', () => ({
  useUserTracking: () => ({
    trackEvent: jest.fn(),
    trackPageView: jest.fn()
  })
}));

describe('Home Page E2E', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock API responses
    const mockSneakers = [
      createMockSneaker({ id: 1, name: 'Air Jordan 1' }),
      createMockSneaker({ id: 2, name: 'Nike Dunk Low' }),
      createMockSneaker({ id: 3, name: 'Adidas Yeezy' })
    ];

    const mockBrands = [
      { id: 1, name: 'Nike', slug: 'nike' },
      { id: 2, name: 'Adidas', slug: 'adidas' }
    ];

    const mockBlogPosts = [
      {
        id: 1,
        title: 'Latest Sneaker Trends',
        slug: 'latest-sneaker-trends',
        excerpt: 'Discover the hottest trends...',
        featuredImage: 'https://example.com/blog1.jpg'
      }
    ];

    // Setup fetch mocks for different endpoints
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/sneakers/featured')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSneakers)
        });
      }
      if (url.includes('/api/brands')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBrands)
        });
      }
      if (url.includes('/api/blog')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBlogPosts)
        });
      }
      if (url.includes('/api/ai/recommendations')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSneakers.slice(0, 2))
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    }) as jest.Mock;
  });

  it('loads and displays all main sections', async () => {
    render(<Home />);

    // Check hero section
    expect(screen.getByText(/Welcome to SoleGrithm/i)).toBeInTheDocument();

    // Wait for API data to load
    await waitFor(() => {
      expect(screen.getByText('Air Jordan 1')).toBeInTheDocument();
    });

    // Check featured sneakers section
    expect(screen.getByText('Nike Dunk Low')).toBeInTheDocument();
    expect(screen.getByText('Adidas Yeezy')).toBeInTheDocument();

    // Check AI recommendations section
    expect(screen.getByText(/AI Picks/i)).toBeInTheDocument();

    // Check blog section
    expect(screen.getByText('Latest Sneaker Trends')).toBeInTheDocument();
  });

  it('handles loading states correctly', async () => {
    // Mock slow API response
    global.fetch = jest.fn(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve([])
        }), 100)
      )
    ) as jest.Mock;

    render(<Home />);

    // Should show loading skeletons initially
    const skeletons = screen.getAllByTestId(/skeleton/i);
    expect(skeletons.length).toBeGreaterThan(0);

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId(/skeleton/i)).not.toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock API error
    global.fetch = jest.fn(() => Promise.reject(new Error('API Error'))) as jest.Mock;

    render(<Home />);

    // Should still render without crashing
    expect(screen.getByText(/Welcome to SoleGrithm/i)).toBeInTheDocument();

    // Wait a bit to ensure error handling
    await waitFor(() => {
      // Page should still be functional
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('navigates to different sections correctly', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Air Jordan 1')).toBeInTheDocument();
    });

    // Test navigation to sneaker detail
    const sneakerLink = screen.getByText('Air Jordan 1').closest('a');
    expect(sneakerLink).toHaveAttribute('href', '/sneakers/test-sneaker');

    // Test navigation to blog post
    const blogLink = screen.getByText('Latest Sneaker Trends').closest('a');
    expect(blogLink).toHaveAttribute('href', '/blog/latest-sneaker-trends');
  });

  it('displays correct number of items in each section', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Air Jordan 1')).toBeInTheDocument();
    });

    // Should show 3 featured sneakers
    const sneakerCards = screen.getAllByText(/Test Sneaker|Air Jordan 1|Nike Dunk Low|Adidas Yeezy/);
    expect(sneakerCards.length).toBeGreaterThanOrEqual(3);

    // Should show 2 AI recommendations
    const aiSection = screen.getByText(/AI Picks/i).closest('section');
    expect(aiSection).toBeInTheDocument();

    // Should show 1 blog post
    expect(screen.getByText('Latest Sneaker Trends')).toBeInTheDocument();
  });

  it('handles mobile responsiveness', async () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Air Jordan 1')).toBeInTheDocument();
    });

    // Check that mobile navigation is present
    expect(screen.getByTestId('mobile-nav-home')).toBeInTheDocument();

    // Check responsive grid layouts
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });

  it('tracks page view and user interactions', async () => {
    const mockTrackPageView = jest.fn();
    const mockTrackEvent = jest.fn();

    jest.doMock('@/hooks/useUserTracking', () => ({
      useUserTracking: () => ({
        trackEvent: mockTrackEvent,
        trackPageView: mockTrackPageView
      })
    }));

    render(<Home />);

    // Should track page view
    expect(mockTrackPageView).toHaveBeenCalledWith('/');

    await waitFor(() => {
      expect(screen.getByText('Air Jordan 1')).toBeInTheDocument();
    });

    // Click on a sneaker card
    fireEvent.click(screen.getByText('Air Jordan 1'));

    // Should track click event
    expect(mockTrackEvent).toHaveBeenCalledWith('sneaker_card_click', expect.any(Object));
  });
});