import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import EventSpotlight from '@/components/women/EventSpotlight';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('EventSpotlight', () => {
  it('renders section header', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Event Spotlight')).toBeInTheDocument();
    expect(screen.getByText(/Women-led events, panels, and gatherings/)).toBeInTheDocument();
  });

  it('displays event tabs', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('Past Events')).toBeInTheDocument();
  });

  it('shows upcoming events by default', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Women in Sneaker Design Panel')).toBeInTheDocument();
    expect(screen.getByText('SoleGrithm x Female Founders Popup')).toBeInTheDocument();
  });

  it('displays event details', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Nike NYC Flagship')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('December 15, 2024')).toBeInTheDocument();
  });

  it('shows event categories with badges', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Panel Discussion')).toBeInTheDocument();
    expect(screen.getByText('Pop-up Event')).toBeInTheDocument();
  });

  it('displays featured event badges', () => {
    render(<EventSpotlight />);
    
    const featuredBadges = screen.getAllByText('Featured');
    expect(featuredBadges.length).toBeGreaterThan(0);
  });

  it('shows event organizer information', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Organized by: Nike Women')).toBeInTheDocument();
    expect(screen.getByText('Organized by: SoleGrithm')).toBeInTheDocument();
  });

  it('displays attendee counts for events', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('150 expected attendees')).toBeInTheDocument();
  });

  it('shows register now buttons for upcoming events', () => {
    render(<EventSpotlight />);
    
    const registerButtons = screen.getAllByText('Register Now');
    expect(registerButtons.length).toBeGreaterThan(0);
    
    expect(screen.getByTestId('button-register-1')).toBeInTheDocument();
  });

  it('switches to past events tab', async () => {
    const user = userEvent.setup();
    render(<EventSpotlight />);
    
    const pastEventsTab = screen.getByText('Past Events');
    await user.click(pastEventsTab);
    
    expect(screen.getByText('SneakerCon Women\'s Leadership Summit')).toBeInTheDocument();
  });

  it('displays past event highlights', async () => {
    const user = userEvent.setup();
    render(<EventSpotlight />);
    
    const pastEventsTab = screen.getByText('Past Events');
    await user.click(pastEventsTab);
    
    expect(screen.getByText('Event Highlights:')).toBeInTheDocument();
    expect(screen.getByText(/Keynote from Nike's VP/)).toBeInTheDocument();
  });

  it('shows coverage links for past events', async () => {
    const user = userEvent.setup();
    render(<EventSpotlight />);
    
    const pastEventsTab = screen.getByText('Past Events');
    await user.click(pastEventsTab);
    
    expect(screen.getByTestId('button-coverage-4')).toBeInTheDocument();
    expect(screen.getByText('Read Full Coverage')).toBeInTheDocument();
  });

  it('displays event times when available', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('7:00 PM EST')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM - 8:00 PM')).toBeInTheDocument();
  });

  it('shows event descriptions', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText(/Join leading female designers from Nike/)).toBeInTheDocument();
  });

  it('displays see more events button', () => {
    render(<EventSpotlight />);
    
    const seeMoreButton = screen.getByTestId('button-see-more-events');
    expect(seeMoreButton).toBeInTheDocument();
    expect(seeMoreButton).toHaveTextContent('See More Events');
  });

  it('shows attendee information for past events', async () => {
    const user = userEvent.setup();
    render(<EventSpotlight />);
    
    const pastEventsTab = screen.getByText('Past Events');
    await user.click(pastEventsTab);
    
    expect(screen.getByText('500 attendees')).toBeInTheDocument();
  });

  it('displays event locations correctly', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Nike NYC Flagship, New York')).toBeInTheDocument();
    expect(screen.getByText('Melrose Trading Post, Los Angeles')).toBeInTheDocument();
  });

  it('shows workshop category events', () => {
    render(<EventSpotlight />);
    
    expect(screen.getByText('Workshop')).toBeInTheDocument();
    expect(screen.getByText('Sneaker Culture & Feminism Workshop')).toBeInTheDocument();
  });

  it('handles events without attendee counts', () => {
    render(<EventSpotlight />);
    
    // Some events don't have attendee counts, should still render properly
    expect(screen.getByText('SoleGrithm x Female Founders Popup')).toBeInTheDocument();
  });

  it('displays event images', () => {
    render(<EventSpotlight />);
    
    const eventImage = screen.getByAltText('Women in Sneaker Design Panel');
    expect(eventImage).toBeInTheDocument();
  });

  it('shows correct event category colors', () => {
    render(<EventSpotlight />);
    
    const panelBadge = screen.getByText('Panel Discussion');
    const popupBadge = screen.getByText('Pop-up Event');
    
    expect(panelBadge).toHaveClass('bg-blue-100', 'text-blue-800');
    expect(popupBadge).toHaveClass('bg-pink-100', 'text-pink-800');
  });
});