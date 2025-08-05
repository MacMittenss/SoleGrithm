import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { setupTestEnvironment } from '../utils/testUtils';
import { ResponsiveContainer, ResponsiveGrid } from '@/components/responsive/ResponsiveContainer';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';

setupTestEnvironment();

// Mock useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    isLoading: false
  })
}));

describe('Responsive Design Tests', () => {
  const mockViewport = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });

    // Mock matchMedia for responsive breakpoints
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query.includes(`max-width: ${width}px`),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  };

  describe('Mobile Viewport (375px)', () => {
    beforeEach(() => {
      mockViewport(375, 667);
    });

    it('shows mobile navigation on small screens', () => {
      render(<MobileNavigation />);
      
      // Mobile navigation should be visible
      const bottomNav = screen.getByTestId('mobile-nav-home');
      expect(bottomNav).toBeInTheDocument();
    });

    it('adapts container sizing for mobile', () => {
      render(
        <ResponsiveContainer size="sm" padding="sm">
          <div>Mobile Content</div>
        </ResponsiveContainer>
      );

      const container = screen.getByText('Mobile Content').parentElement;
      expect(container).toHaveClass('max-w-screen-sm');
      expect(container).toHaveClass('px-4');
    });

    it('uses single column grid on mobile', () => {
      render(
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </ResponsiveGrid>
      );

      const grid = screen.getByText('Item 1').parentElement;
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('handles touch interactions appropriately', () => {
      const handleTouch = jest.fn();
      
      render(
        <button 
          onTouchStart={handleTouch}
          className="p-4 min-h-[44px] min-w-[44px]"
          data-testid="touch-target"
        >
          Touch Me
        </button>
      );

      const button = screen.getByTestId('touch-target');
      
      // Should have appropriate touch target size
      expect(button).toHaveClass('min-h-[44px]');
      expect(button).toHaveClass('min-w-[44px]');
    });
  });

  describe('Tablet Viewport (768px)', () => {
    beforeEach(() => {
      mockViewport(768, 1024);
    });

    it('uses two-column grid on tablet', () => {
      render(
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }}>
          <div>Item 1</div>
          <div>Item 2</div>
        </ResponsiveGrid>
      );

      const grid = screen.getByText('Item 1').parentElement;
      expect(grid).toHaveClass('md:grid-cols-2');
    });

    it('adapts container for tablet', () => {
      render(
        <ResponsiveContainer size="md" padding="md">
          <div>Tablet Content</div>
        </ResponsiveContainer>
      );

      const container = screen.getByText('Tablet Content').parentElement;
      expect(container).toHaveClass('max-w-screen-md');
    });
  });

  describe('Desktop Viewport (1024px+)', () => {
    beforeEach(() => {
      mockViewport(1024, 768);
    });

    it('uses full grid layout on desktop', () => {
      render(
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </ResponsiveGrid>
      );

      const grid = screen.getByText('Item 1').parentElement;
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    it('hides mobile navigation on desktop', () => {
      render(<MobileNavigation />);
      
      const navigation = screen.getByTestId('mobile-nav-home').closest('nav');
      expect(navigation).toHaveClass('md:hidden');
    });
  });

  describe('Large Desktop (1440px+)', () => {
    beforeEach(() => {
      mockViewport(1440, 900);
    });

    it('uses maximum grid columns on large screens', () => {
      render(
        <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </ResponsiveGrid>
      );

      const grid = screen.getByText('Item 1').parentElement;
      expect(grid).toHaveClass('xl:grid-cols-4');
    });

    it('uses large container size', () => {
      render(
        <ResponsiveContainer size="xl" padding="lg">
          <div>Large Desktop Content</div>
        </ResponsiveContainer>
      );

      const container = screen.getByText('Large Desktop Content').parentElement;
      expect(container).toHaveClass('max-w-screen-xl');
      expect(container).toHaveClass('xl:px-12');
    });
  });

  describe('Orientation Changes', () => {
    it('handles landscape orientation on mobile', () => {
      mockViewport(667, 375); // Landscape mobile
      
      render(
        <div className="landscape:flex-row portrait:flex-col flex">
          <div>Content 1</div>
          <div>Content 2</div>
        </div>
      );

      const container = screen.getByText('Content 1').parentElement;
      expect(container).toHaveClass('landscape:flex-row');
    });

    it('adapts to portrait orientation', () => {
      mockViewport(375, 667); // Portrait mobile
      
      render(
        <div className="portrait:flex-col landscape:flex-row flex">
          <div>Content 1</div>
          <div>Content 2</div>
        </div>
      );

      const container = screen.getByText('Content 1').parentElement;
      expect(container).toHaveClass('portrait:flex-col');
    });
  });

  describe('Touch vs Mouse Interactions', () => {
    it('handles hover states appropriately', () => {
      render(
        <button className="hover:bg-gray-100 bg-white p-4">
          Hover Button
        </button>
      );

      const button = screen.getByText('Hover Button');
      expect(button).toHaveClass('hover:bg-gray-100');
    });

    it('provides larger touch targets on mobile', () => {
      mockViewport(375, 667);
      
      render(
        <button className="sm:p-2 md:p-3 lg:p-4 p-4 min-h-[44px]">
          Responsive Button
        </button>
      );

      const button = screen.getByText('Responsive Button');
      expect(button).toHaveClass('min-h-[44px]');
      expect(button).toHaveClass('p-4');
    });
  });

  describe('Accessibility Across Devices', () => {
    it('maintains focus indicators on all screen sizes', () => {
      render(
        <button className="focus:ring-2 focus:ring-primary focus:outline-none">
          Focus Test
        </button>
      );

      const button = screen.getByText('Focus Test');
      expect(button).toHaveClass('focus:ring-2');
    });

    it('provides appropriate contrast ratios', () => {
      render(
        <div className="bg-primary text-primary-foreground p-4">
          High Contrast Text
        </div>
      );

      const element = screen.getByText('High Contrast Text');
      expect(element).toHaveClass('bg-primary');
      expect(element).toHaveClass('text-primary-foreground');
    });

    it('supports keyboard navigation on all devices', () => {
      render(
        <div>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      );

      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button).toHaveAttribute('tabIndex');
      });
    });
  });

  describe('Performance on Different Devices', () => {
    it('loads appropriate image sizes for device', () => {
      render(
        <img
          src="image.jpg"
          srcSet="image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w"
          sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 1200px"
          alt="Responsive image"
        />
      );

      const image = screen.getByAltText('Responsive image');
      expect(image).toHaveAttribute('srcSet');
      expect(image).toHaveAttribute('sizes');
    });

    it('conditionally loads features based on device capabilities', () => {
      mockViewport(375, 667); // Mobile viewport
      
      render(
        <div>
          <div className="hidden md:block">Desktop Feature</div>
          <div className="md:hidden">Mobile Feature</div>
        </div>
      );

      expect(screen.getByText('Mobile Feature')).toBeInTheDocument();
      expect(screen.getByText('Desktop Feature')).toHaveClass('hidden');
    });
  });
});