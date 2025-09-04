import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InteractiveSearch from '@/components/enhanced/InteractiveSearch';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('InteractiveSearch', () => {
  it('renders search input with placeholder', () => {
    renderWithQueryClient(<InteractiveSearch />);
    
    const input = screen.getByTestId('interactive-search-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search sneakers, brands, or styles...');
  });

  it('shows suggestions when input is focused', async () => {
    renderWithQueryClient(<InteractiveSearch />);
    
    const input = screen.getByTestId('interactive-search-input');
    fireEvent.focus(input);
    
    // Should show trending searches when no query
    await waitFor(() => {
      expect(screen.getByText('Jordan 1 Retro')).toBeInTheDocument();
      expect(screen.getByText('Nike Dunk Low')).toBeInTheDocument();
    });
  });

  it('updates input value when typing', () => {
    renderWithQueryClient(<InteractiveSearch />);
    
    const input = screen.getByTestId('interactive-search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jordan' } });
    
    expect(input.value).toBe('Jordan');
  });

  it('shows clear button when input has value', () => {
    renderWithQueryClient(<InteractiveSearch />);
    
    const input = screen.getByTestId('interactive-search-input');
    fireEvent.change(input, { target: { value: 'Jordan' } });
    
    const clearButton = screen.getByTestId('clear-search');
    expect(clearButton).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    renderWithQueryClient(<InteractiveSearch />);
    
    const input = screen.getByTestId('interactive-search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jordan' } });
    
    const clearButton = screen.getByTestId('clear-search');
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
  });

  it('triggers search when Enter key is pressed', () => {
    const mockOnSearch = jest.fn();
    renderWithQueryClient(<InteractiveSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByTestId('interactive-search-input');
    fireEvent.change(input, { target: { value: 'Air Jordan' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnSearch).toHaveBeenCalledWith('Air Jordan');
  });

  it('shows filter button when showFilters is true', () => {
    renderWithQueryClient(<InteractiveSearch showFilters={true} />);
    
    const filterButton = screen.getByTestId('search-filters');
    expect(filterButton).toBeInTheDocument();
  });

  it('hides suggestions when Escape key is pressed', async () => {
    renderWithQueryClient(<InteractiveSearch />);
    
    const input = screen.getByTestId('interactive-search-input');
    fireEvent.focus(input);
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Jordan 1 Retro')).toBeInTheDocument();
    });
    
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Suggestions should be hidden
    expect(screen.queryByText('Jordan 1 Retro')).not.toBeInTheDocument();
  });
});