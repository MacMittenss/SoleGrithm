import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AIAssistWidget from '@/components/women/AIAssistWidget';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

describe('AIAssistWidget', () => {
  it('renders floating AI button', () => {
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    expect(aiButton).toBeInTheDocument();
  });

  it('opens chat dialog when button clicked', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    expect(screen.getByText("Women's Sneaker Assistant")).toBeInTheDocument();
    expect(screen.getByText('Specialized in women\'s kicks')).toBeInTheDocument();
  });

  it('displays welcome message and quick actions', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    expect(screen.getByText(/Hi! I'm your personal sneaker assistant/)).toBeInTheDocument();
    expect(screen.getByText('Quick Actions:')).toBeInTheDocument();
  });

  it('shows quick action buttons', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    expect(screen.getByTestId('button-quick-action-sizing')).toBeInTheDocument();
    expect(screen.getByTestId('button-quick-action-recommendations')).toBeInTheDocument();
    expect(screen.getByTestId('button-quick-action-collaborations')).toBeInTheDocument();
    expect(screen.getByTestId('button-quick-action-search')).toBeInTheDocument();
  });

  it('displays quick action titles and descriptions', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    expect(screen.getByText('Find My Size')).toBeInTheDocument();
    expect(screen.getByText('Get personalized sizing recommendations')).toBeInTheDocument();
    expect(screen.getByText('Style Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Latest Collabs')).toBeInTheDocument();
    expect(screen.getByText('Smart Search')).toBeInTheDocument();
  });

  it('has input field for messages', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const chatInput = screen.getByTestId('input-ai-chat');
    expect(chatInput).toBeInTheDocument();
    expect(chatInput).toHaveAttribute('placeholder', "Ask about women's sneakers...");
  });

  it('has send button', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const sendButton = screen.getByTestId('button-send-message');
    expect(sendButton).toBeInTheDocument();
  });

  it('closes dialog when close button clicked', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const closeButton = screen.getByTestId('button-ai-assist-close');
    await user.click(closeButton);
    
    // Dialog should close
    expect(screen.queryByText("Women's Sneaker Assistant")).not.toBeInTheDocument();
  });

  it('sends message when send button clicked', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const chatInput = screen.getByTestId('input-ai-chat');
    const sendButton = screen.getByTestId('button-send-message');
    
    await user.type(chatInput, 'What size should I get?');
    await user.click(sendButton);
    
    expect(screen.getByText('What size should I get?')).toBeInTheDocument();
  });

  it('sends message when Enter key pressed', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const chatInput = screen.getByTestId('input-ai-chat');
    
    await user.type(chatInput, 'Help me find sneakers');
    await user.keyboard('{Enter}');
    
    expect(screen.getByText('Help me find sneakers')).toBeInTheDocument();
  });

  it('shows typing indicator when AI is responding', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const chatInput = screen.getByTestId('input-ai-chat');
    const sendButton = screen.getByTestId('button-send-message');
    
    await user.type(chatInput, 'Test message');
    await user.click(sendButton);
    
    // Should show typing indicator briefly
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('displays AI response after user message', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const chatInput = screen.getByTestId('input-ai-chat');
    await user.type(chatInput, 'What size should I get?');
    await user.keyboard('{Enter}');
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText(/I'd be happy to help you find the right size/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('triggers quick action when clicked', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const sizingAction = screen.getByTestId('button-quick-action-sizing');
    await user.click(sizingAction);
    
    // Should send the quick action message
    await waitFor(() => {
      expect(screen.getByText('Help me find the right size for women\'s sneakers')).toBeInTheDocument();
    });
  });

  it('displays suggestion buttons in AI responses', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    // Initial message should have suggestions
    expect(screen.getByTestId('button-suggestion-0')).toBeInTheDocument();
    expect(screen.getByTestId('button-suggestion-1')).toBeInTheDocument();
    expect(screen.getByTestId('button-suggestion-2')).toBeInTheDocument();
  });

  it('sends suggestion when suggestion button clicked', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const suggestionButton = screen.getByTestId('button-suggestion-0');
    await user.click(suggestionButton);
    
    // Should send the suggestion text as a message
    const suggestionText = suggestionButton.textContent?.replace(/"/g, '') || '';
    expect(screen.getByText(suggestionText)).toBeInTheDocument();
  });

  it('disables input and send button when AI is typing', async () => {
    const user = userEvent.setup();
    render(<AIAssistWidget />);
    
    const aiButton = screen.getByTestId('button-ai-assist-open');
    await user.click(aiButton);
    
    const chatInput = screen.getByTestId('input-ai-chat');
    const sendButton = screen.getByTestId('button-send-message');
    
    await user.type(chatInput, 'Test');
    await user.click(sendButton);
    
    // During typing, controls should be disabled
    expect(chatInput).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });
});