import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CommunityVoices from '@/components/women/CommunityVoices';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('CommunityVoices', () => {
  it('renders section header', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('Community Voices')).toBeInTheDocument();
    expect(screen.getByText(/Real stories from women in sneaker culture/)).toBeInTheDocument();
  });

  it('shows submit story button', () => {
    render(<CommunityVoices />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Submit Your Story');
  });

  it('opens submission dialog when submit button clicked', async () => {
    const user = userEvent.setup();
    render(<CommunityVoices />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    await user.click(submitButton);
    
    expect(screen.getByText('Share Your Sneaker Story')).toBeInTheDocument();
  });

  it('displays featured posts section', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('Featured Voices')).toBeInTheDocument();
  });

  it('shows community feed section', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('Community Feed')).toBeInTheDocument();
  });

  it('displays featured posts with correct badges', () => {
    render(<CommunityVoices />);
    
    const featuredBadges = screen.getAllByText('Featured');
    expect(featuredBadges.length).toBeGreaterThan(0);
  });

  it('shows community post content', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('SneakerQueen23')).toBeInTheDocument();
    expect(screen.getByText(/Just copped my first pair of Jordan 1s/)).toBeInTheDocument();
  });

  it('displays reaction buttons for posts', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByTestId('button-heart-1')).toBeInTheDocument();
    expect(screen.getByTestId('button-comment-1')).toBeInTheDocument();
    expect(screen.getByTestId('button-share-1')).toBeInTheDocument();
  });

  it('handles heart reaction click', async () => {
    const user = userEvent.setup();
    render(<CommunityVoices />);
    
    const heartButton = screen.getByTestId('button-heart-1');
    await user.click(heartButton);
    
    // Should toggle heart state (color change)
    expect(heartButton).toHaveClass('text-red-500');
  });

  it('shows load more button', () => {
    render(<CommunityVoices />);
    
    const loadMoreButton = screen.getByTestId('button-load-more-posts');
    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toHaveTextContent('Load More Stories');
  });

  it('displays submission form fields when dialog opened', async () => {
    const user = userEvent.setup();
    render(<CommunityVoices />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    await user.click(submitButton);
    
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Featured Sneaker (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Story')).toBeInTheDocument();
  });

  it('has add photo and submit buttons in form', async () => {
    const user = userEvent.setup();
    render(<CommunityVoices />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    await user.click(submitButton);
    
    expect(screen.getByText('Add Photo')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('shows author avatars for posts', () => {
    render(<CommunityVoices />);
    
    const avatar = screen.getByAltText('SneakerQueen23');
    expect(avatar).toBeInTheDocument();
  });

  it('displays post timestamps', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    expect(screen.getByText('4 hours ago')).toBeInTheDocument();
  });

  it('shows sneaker information for relevant posts', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('Featured Sneaker:')).toBeInTheDocument();
    expect(screen.getByText('Jordan Air Jordan 1 High')).toBeInTheDocument();
  });

  it('displays reaction counts', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByText('147')).toBeInTheDocument(); // heart count
    expect(screen.getByText('23')).toBeInTheDocument();  // comment count
    expect(screen.getByText('8')).toBeInTheDocument();   // share count
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    render(<CommunityVoices />);
    
    const submitButton = screen.getByTestId('button-submit-story');
    await user.click(submitButton);
    
    // Fill form
    await user.type(screen.getByLabelText('Your Name'), 'Test User');
    await user.type(screen.getByLabelText('Your Story'), 'This is my test story');
    
    // Submit form
    const formSubmitButton = screen.getByText('Submit');
    await user.click(formSubmitButton);
    
    // Dialog should close
    await waitFor(() => {
      expect(screen.queryByText('Share Your Sneaker Story')).not.toBeInTheDocument();
    });
  });

  it('shows different post images when available', () => {
    render(<CommunityVoices />);
    
    const postImages = screen.getAllByAltText('Post content');
    expect(postImages.length).toBeGreaterThan(0);
  });

  it('displays community feed posts in grid layout', () => {
    render(<CommunityVoices />);
    
    // Should have multiple posts in feed
    expect(screen.getByText('Maya_Collects')).toBeInTheDocument();
    expect(screen.getByText('KickGameStrong')).toBeInTheDocument();
    expect(screen.getByText('DesignDriven')).toBeInTheDocument();
  });

  it('shows feed post reaction buttons', () => {
    render(<CommunityVoices />);
    
    expect(screen.getByTestId('button-heart-feed-2')).toBeInTheDocument();
    expect(screen.getByTestId('button-comment-feed-2')).toBeInTheDocument();
    expect(screen.getByTestId('button-share-feed-2')).toBeInTheDocument();
  });
});