import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EnhancedButton } from '@/components/ui/enhanced-button';

describe('EnhancedButton', () => {
  it('renders button with children', () => {
    render(<EnhancedButton>Click me</EnhancedButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<EnhancedButton onClick={handleClick}>Click me</EnhancedButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('creates ripple effect when ripple prop is true', () => {
    const handleClick = jest.fn();
    render(
      <EnhancedButton ripple onClick={handleClick}>
        Ripple Button
      </EnhancedButton>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies shimmer animation when shimmer prop is true', () => {
    render(<EnhancedButton shimmer>Shimmer Button</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('animate-[shimmer_2s_ease-in-out_infinite]');
  });

  it('disables button when disabled prop is true', () => {
    render(<EnhancedButton disabled>Disabled Button</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<EnhancedButton className="custom-class">Custom Button</EnhancedButton>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});