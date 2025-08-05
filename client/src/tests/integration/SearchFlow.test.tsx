import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'wouter';
import InteractiveSearch from '@/components/enhanced/InteractiveSearch';

// Mock fetch for API calls
global.fetch = jest.fn();

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderSearchFlow = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <InteractiveSearch />
      </Router>
    </QueryClientProvider>
  );
};

describe('Search Flow Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('completes full search flow with suggestions', async () => {
    // Mock API response for suggestions
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { text: 'Jordan 1 Retro High' },
        { text: 'Jordan 1 Low' },
        { text: 'Jordan 1 Mid' }
      ]
    });

    renderSearchFlow();
    
    const input = screen.getByTestId('interactive-search-input');
    
    // Type in search input
    fireEvent.change(input, { target: { value: 'Jordan' } });
    
    // Wait for debounced API call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/search/suggestions?q=Jordan');
    }, { timeout: 1000 });
    
    // Check if suggestions appear
    await waitFor(() => {
      expect(screen.getByText('Jordan 1 Retro High')).toBeInTheDocument();
    });
  });

  it('stores and displays recent searches', async () => {
    renderSearchFlow();
    
    const input = screen.getByTestId('interactive-search-input');
    
    // Perform a search
    fireEvent.change(input, { target: { value: 'Air Max' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Clear input and focus to see recent searches
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.focus(input);
    
    // Should show recent search
    await waitFor(() => {
      expect(screen.getByText('Air Max')).toBeInTheDocument();
    });
    
    // Check localStorage
    const recentSearches = JSON.parse(localStorage.getItem('recent-searches') || '[]');
    expect(recentSearches).toContain('Air Max');
  });

  it('handles search suggestion selection', async () => {
    const mockOnSuggestionSelect = jest.fn();
    
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <InteractiveSearch onSuggestionSelect={mockOnSuggestionSelect} />
        </Router>
      </QueryClientProvider>
    );
    
    const input = screen.getByTestId('interactive-search-input');
    fireEvent.focus(input);
    
    // Wait for trending suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Jordan 1 Retro')).toBeInTheDocument();
    });
    
    // Click on a suggestion
    fireEvent.click(screen.getByText('Jordan 1 Retro'));
    
    expect(mockOnSuggestionSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Jordan 1 Retro',
        type: 'trending'
      })
    );
  });

  it('clears recent searches when clear button is clicked', async () => {
    renderSearchFlow();
    
    const input = screen.getByTestId('interactive-search-input');
    
    // Add a recent search
    fireEvent.change(input, { target: { value: 'Test Search' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Open suggestions to see recent searches
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.focus(input);
    
    await waitFor(() => {
      expect(screen.getByText('Test Search')).toBeInTheDocument();
    });
    
    // Click clear recent searches
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    // Recent search should be gone
    expect(screen.queryByText('Test Search')).not.toBeInTheDocument();
    
    // Check localStorage is cleared
    const recentSearches = JSON.parse(localStorage.getItem('recent-searches') || '[]');
    expect(recentSearches).toHaveLength(0);
  });

  it('handles API error gracefully', async () => {
    // Mock API error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    renderSearchFlow();
    
    const input = screen.getByTestId('interactive-search-input');
    fireEvent.change(input, { target: { value: 'Error Test' } });
    
    // Wait for API call to fail
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    
    // Should still show UI without crashing
    expect(input).toBeInTheDocument();
  });

  it('debounces search input correctly', async () => {
    renderSearchFlow();
    
    const input = screen.getByTestId('interactive-search-input');
    
    // Type multiple characters quickly
    fireEvent.change(input, { target: { value: 'J' } });
    fireEvent.change(input, { target: { value: 'Jo' } });
    fireEvent.change(input, { target: { value: 'Jor' } });
    fireEvent.change(input, { target: { value: 'Jordan' } });
    
    // Should only make one API call after debounce delay
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    }, { timeout: 500 });
  });
});