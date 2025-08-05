import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    isLoading: false
  })
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Router>
        {component}
      </Router>
    </QueryClientProvider>
  );
};

describe('MobileNavigation', () => {
  it('renders navigation items', () => {
    renderWithProviders(<MobileNavigation />);
    
    expect(screen.getByTestId('mobile-nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-discover')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-live market')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-collections')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-profile')).toBeInTheDocument();
  });

  it('opens menu when hamburger button is clicked', () => {
    renderWithProviders(<MobileNavigation />);
    
    const menuToggle = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(menuToggle);
    
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Visual Search')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('closes menu when backdrop is clicked', () => {
    renderWithProviders(<MobileNavigation />);
    
    const menuToggle = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(menuToggle);
    
    // Menu should be open
    expect(screen.getByText('Menu')).toBeInTheDocument();
    
    // Click backdrop (the overlay div)
    const backdrop = screen.getByRole('presentation', { hidden: true });
    fireEvent.click(backdrop);
    
    // Menu should close
    expect(screen.queryByText('Menu')).not.toBeInTheDocument();
  });

  it('shows sign in option when user is not authenticated', () => {
    renderWithProviders(<MobileNavigation />);
    
    const menuToggle = screen.getByTestId('mobile-menu-toggle');
    fireEvent.click(menuToggle);
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});