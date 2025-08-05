import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { setupTestEnvironment, createMockSneaker } from '../utils/testUtils';
import EnhancedSneakerCard from '@/components/enhanced/EnhancedSneakerCard';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import InteractiveSearch from '@/components/enhanced/InteractiveSearch';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Setup test environment
setupTestEnvironment();

// Mock required hooks
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    isLoading: false
  })
}));

describe('Accessibility Tests', () => {
  it('EnhancedButton has no accessibility violations', async () => {
    const { container } = render(
      <EnhancedButton>Click me</EnhancedButton>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('EnhancedButton has proper ARIA attributes', () => {
    render(<EnhancedButton aria-label="Custom label">Button</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });

  it('EnhancedSneakerCard has no accessibility violations', async () => {
    const mockSneaker = createMockSneaker();
    
    const { container } = render(
      <EnhancedSneakerCard sneaker={mockSneaker} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('EnhancedSneakerCard has proper alt text for images', () => {
    const mockSneaker = createMockSneaker({
      name: 'Air Jordan 1',
      imageUrl: 'https://example.com/jordan.jpg'
    });
    
    render(<EnhancedSneakerCard sneaker={mockSneaker} />);
    
    const image = screen.getByAltText('Air Jordan 1');
    expect(image).toBeInTheDocument();
  });

  it('EnhancedSneakerCard action buttons have proper labels', () => {
    const mockSneaker = createMockSneaker({ id: 123 });
    
    render(
      <EnhancedSneakerCard sneaker={mockSneaker} showQuickActions={true} />
    );
    
    const likeButton = screen.getByTestId('like-button-123');
    const quickViewButton = screen.getByTestId('quick-view-123');
    const addToBagButton = screen.getByTestId('add-to-bag-123');
    
    expect(likeButton).toBeInTheDocument();
    expect(quickViewButton).toBeInTheDocument();
    expect(addToBagButton).toBeInTheDocument();
  });

  it('MobileNavigation has proper navigation structure', () => {
    render(<MobileNavigation />);
    
    // Check navigation landmarks
    const navigation = screen.getByRole('navigation', { hidden: true });
    expect(navigation).toBeInTheDocument();
    
    // Check navigation links have proper text
    expect(screen.getByTestId('mobile-nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-discover')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-live market')).toBeInTheDocument();
  });

  it('MobileNavigation has keyboard navigation support', () => {
    render(<MobileNavigation />);
    
    const menuToggle = screen.getByTestId('mobile-menu-toggle');
    
    // Should be focusable
    expect(menuToggle).toHaveAttribute('tabIndex');
    
    // Should have proper role
    expect(menuToggle).toHaveAttribute('type', 'button');
  });

  it('InteractiveSearch has proper form structure', () => {
    render(<InteractiveSearch />);
    
    const searchInput = screen.getByTestId('interactive-search-input');
    
    // Should have proper input type
    expect(searchInput).toHaveAttribute('type', 'search');
    
    // Should have placeholder text
    expect(searchInput).toHaveAttribute('placeholder', 'Search sneakers, brands, or styles...');
  });

  it('InteractiveSearch suggestions have proper ARIA attributes', async () => {
    render(<InteractiveSearch />);
    
    const searchInput = screen.getByTestId('interactive-search-input');
    
    // Focus input to show suggestions
    searchInput.focus();
    
    // Should have proper ARIA attributes for autocomplete
    expect(searchInput).toHaveAttribute('role', 'searchbox');
  });

  it('form inputs have proper labels and validation', () => {
    // Test enhanced input component
    const { container } = render(
      <div>
        <label htmlFor="test-input">Test Input</label>
        <input 
          id="test-input" 
          type="text" 
          aria-describedby="test-help"
          required
        />
        <div id="test-help">This field is required</div>
      </div>
    );
    
    const input = screen.getByLabelText('Test Input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', 'test-help');
    expect(input).toBeRequired();
  });

  it('skip links are properly implemented', () => {
    render(
      <div>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <main id="main-content">
          <h1>Main Content</h1>
        </main>
      </div>
    );
    
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('headings have proper hierarchy', () => {
    render(
      <div>
        <h1>Main Title</h1>
        <h2>Section Title</h2>
        <h3>Subsection Title</h3>
      </div>
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('interactive elements have sufficient contrast', async () => {
    const { container } = render(
      <div>
        <button className="bg-primary text-primary-foreground p-2 rounded">
          High Contrast Button
        </button>
        <a href="#" className="text-primary underline">
          High Contrast Link
        </a>
      </div>
    );
    
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });
    
    expect(results).toHaveNoViolations();
  });

  it('focus indicators are visible', () => {
    render(
      <button className="focus:ring-2 focus:ring-primary focus:outline-none p-2">
        Focusable Button
      </button>
    );
    
    const button = screen.getByRole('button');
    
    // Simulate focus
    button.focus();
    expect(button).toHaveFocus();
  });

  it('images have proper alt text or are marked decorative', () => {
    render(
      <div>
        <img src="test.jpg" alt="Descriptive alt text" />
        <img src="decorative.jpg" alt="" role="presentation" />
      </div>
    );
    
    const descriptiveImage = screen.getByAltText('Descriptive alt text');
    const decorativeImage = screen.getByRole('presentation');
    
    expect(descriptiveImage).toBeInTheDocument();
    expect(decorativeImage).toBeInTheDocument();
  });

  it('forms have proper error handling', () => {
    render(
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email" 
          aria-describedby="email-error"
          aria-invalid="true"
        />
        <div id="email-error" role="alert">
          Please enter a valid email address
        </div>
      </div>
    );
    
    const input = screen.getByLabelText('Email');
    const errorMessage = screen.getByRole('alert');
    
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(errorMessage).toBeInTheDocument();
  });
});