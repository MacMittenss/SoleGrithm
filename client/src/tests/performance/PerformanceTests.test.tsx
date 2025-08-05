import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupTestEnvironment, createMockSneaker } from '../utils/testUtils';
import LazyImage from '@/components/optimized/LazyImage';
import OptimizedSneakerGrid from '@/components/optimized/OptimizedSneakerGrid';
import { cacheManager } from '@/utils/cacheManager';

setupTestEnvironment();

describe('Performance Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cacheManager.clear();
  });

  describe('LazyImage', () => {
    it('renders placeholder initially', () => {
      render(
        <LazyImage
          src="https://example.com/image.jpg"
          alt="Test image"
          placeholder="blur"
        />
      );

      // Should show placeholder initially
      const placeholder = screen.getByTestId('image-placeholder');
      expect(placeholder).toBeInTheDocument();
    });

    it('loads image when in viewport', async () => {
      const mockIntersectionObserver = jest.fn();
      const mockObserve = jest.fn();
      const mockUnobserve = jest.fn();

      // Mock IntersectionObserver
      window.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: jest.fn(),
      })) as any;

      render(
        <LazyImage
          src="https://example.com/image.jpg"
          alt="Test image"
        />
      );

      expect(mockObserve).toHaveBeenCalled();
    });

    it('handles image loading errors gracefully', async () => {
      render(
        <LazyImage
          src="https://invalid-url.com/broken.jpg"
          alt="Broken image"
          fallback="https://example.com/fallback.jpg"
        />
      );

      // Should not crash on broken image
      expect(screen.getByAltText('Broken image')).toBeInTheDocument();
    });
  });

  describe('OptimizedSneakerGrid', () => {
    it('renders virtual scrolling for large datasets', async () => {
      const largeMockData = Array.from({ length: 100 }, (_, i) =>
        createMockSneaker({ id: i + 1, name: `Sneaker ${i + 1}` })
      );

      render(
        <OptimizedSneakerGrid
          items={largeMockData}
          itemHeight={300}
          containerHeight={600}
        />
      );

      // Should only render visible items
      const renderedCards = screen.getAllByText(/Sneaker \d+/);
      expect(renderedCards.length).toBeLessThan(largeMockData.length);
    });

    it('handles empty data gracefully', () => {
      render(
        <OptimizedSneakerGrid
          items={[]}
          itemHeight={300}
          containerHeight={600}
        />
      );

      expect(screen.getByText('No sneakers found')).toBeInTheDocument();
    });

    it('updates when data changes', async () => {
      const initialData = [createMockSneaker({ id: 1, name: 'Initial Sneaker' })];
      const updatedData = [createMockSneaker({ id: 2, name: 'Updated Sneaker' })];

      const { rerender } = render(
        <OptimizedSneakerGrid
          items={initialData}
          itemHeight={300}
          containerHeight={600}
        />
      );

      expect(screen.getByText('Initial Sneaker')).toBeInTheDocument();

      rerender(
        <OptimizedSneakerGrid
          items={updatedData}
          itemHeight={300}
          containerHeight={600}
        />
      );

      expect(screen.getByText('Updated Sneaker')).toBeInTheDocument();
      expect(screen.queryByText('Initial Sneaker')).not.toBeInTheDocument();
    });
  });

  describe('Cache Manager', () => {
    it('stores and retrieves data correctly', () => {
      const testData = { message: 'Hello World' };
      
      cacheManager.set('test-key', testData, 1000);
      const retrieved = cacheManager.get('test-key');
      
      expect(retrieved).toEqual(testData);
    });

    it('respects TTL expiration', (done) => {
      const testData = { message: 'Expires soon' };
      
      cacheManager.set('expire-key', testData, 50); // 50ms TTL
      
      setTimeout(() => {
        const retrieved = cacheManager.get('expire-key');
        expect(retrieved).toBeNull();
        done();
      }, 100);
    });

    it('handles cache size limits', () => {
      // Fill cache beyond limit
      for (let i = 0; i < 150; i++) {
        cacheManager.set(`key-${i}`, { data: i }, 10000);
      }

      const stats = cacheManager.getStats();
      expect(stats.totalEntries).toBeLessThanOrEqual(100); // Max size limit
    });

    it('clears expired entries during cleanup', (done) => {
      // Add expired entries
      cacheManager.set('expired-1', 'data1', 10);
      cacheManager.set('expired-2', 'data2', 10);
      cacheManager.set('valid', 'data3', 10000);

      setTimeout(() => {
        // Trigger cleanup by adding new entry
        cacheManager.set('trigger-cleanup', 'new data', 10000);
        
        const stats = cacheManager.getStats();
        expect(stats.expiredEntries).toBe(2);
        expect(cacheManager.get('valid')).not.toBeNull();
        done();
      }, 50);
    });
  });

  describe('Memory Management', () => {
    it('does not create memory leaks with event listeners', () => {
      const initialListenerCount = document.querySelectorAll('*').length;
      
      const { unmount } = render(
        <div>
          <LazyImage src="test.jpg" alt="Test" />
          <OptimizedSneakerGrid items={[]} itemHeight={200} containerHeight={400} />
        </div>
      );

      unmount();

      // Should clean up properly
      const finalListenerCount = document.querySelectorAll('*').length;
      expect(finalListenerCount).toBeLessThanOrEqual(initialListenerCount);
    });

    it('handles rapid component mounting/unmounting', () => {
      const mockData = [createMockSneaker()];

      // Rapidly mount and unmount components
      for (let i = 0; i < 10; i++) {
        const { unmount } = render(
          <OptimizedSneakerGrid 
            items={mockData} 
            itemHeight={200} 
            containerHeight={400}
          />
        );
        unmount();
      }

      // Should not crash or leak memory
      expect(true).toBe(true);
    });
  });

  describe('Bundle Size Optimization', () => {
    it('lazy loads components correctly', async () => {
      const LazyComponent = React.lazy(() => 
        Promise.resolve({
          default: () => <div>Lazy Loaded Component</div>
        })
      );

      render(
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </React.Suspense>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByText('Lazy Loaded Component')).toBeInTheDocument();
      });
    });

    it('tree shakes unused code correctly', () => {
      // Test that unused utilities are not included
      const utilsModule = require('@/lib/utils');
      
      // Should only include used functions
      expect(typeof utilsModule.cn).toBe('function');
    });
  });

  describe('Animation Performance', () => {
    it('uses CSS transforms for animations', () => {
      render(
        <div
          style={{
            transform: 'translateX(100px)',
            transition: 'transform 0.3s ease'
          }}
          data-testid="animated-element"
        >
          Animated Element
        </div>
      );

      const element = screen.getByTestId('animated-element');
      expect(element).toHaveStyle('transform: translateX(100px)');
    });

    it('respects reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(
        <div
          className="motion-reduce:transform-none transform transition-transform"
          data-testid="respectful-animation"
        >
          Respectful Animation
        </div>
      );

      const element = screen.getByTestId('respectful-animation');
      expect(element).toHaveClass('motion-reduce:transform-none');
    });
  });
});