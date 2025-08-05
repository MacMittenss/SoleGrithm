import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'wouter';
import { ThemeProvider } from 'next-themes';

// Create a test query client with disabled retries
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      cacheTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

// All providers wrapper
interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  const queryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          {children}
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Custom render function
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Mock implementations for common hooks
export const mockUseAuth = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export const mockUseNotifications = {
  notifications: [],
  addNotification: jest.fn(),
  removeNotification: jest.fn(),
  clearAll: jest.fn(),
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
};

// Mock localStorage
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    },
  };
})();

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };

  window.IntersectionObserver = jest.fn(() => mockObserver);
  (window.IntersectionObserver as any).mockImplementation = mockObserver;

  return mockObserver;
};

// Mock ResizeObserver
export const mockResizeObserver = () => {
  const mockObserver = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };

  window.ResizeObserver = jest.fn(() => mockObserver);
  (window.ResizeObserver as any).mockImplementation = mockObserver;

  return mockObserver;
};

// Mock fetch
export const mockFetch = (response: any, ok = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    })
  ) as jest.Mock;
};

// Mock window.matchMedia
export const mockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Setup function for common test environment
export const setupTestEnvironment = () => {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  });

  // Mock IntersectionObserver
  mockIntersectionObserver();

  // Mock ResizeObserver
  mockResizeObserver();

  // Mock matchMedia
  mockMatchMedia();

  // Mock scrollTo
  window.scrollTo = jest.fn();

  // Mock console methods to reduce noise in tests
  console.warn = jest.fn();
  console.error = jest.fn();
};

// Test data factories
export const createMockSneaker = (overrides = {}) => ({
  id: 1,
  name: 'Test Sneaker',
  brand: 'Test Brand',
  brandName: 'Test Brand',
  price: '$100',
  retailPrice: 100,
  imageUrl: 'https://example.com/test.jpg',
  images: ['https://example.com/test.jpg'],
  slug: 'test-sneaker',
  isNew: false,
  rating: 4.0,
  reviewCount: 10,
  colorway: 'Test Colorway',
  releaseDate: '2023-01-01',
  trending: false,
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  profileImageUrl: 'https://example.com/avatar.jpg',
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
  ...overrides,
});

// Export everything
export * from '@testing-library/react';
export { customRender as render };