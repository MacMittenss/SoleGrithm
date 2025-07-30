import { useCallback } from 'react';
import { useAuth } from './useAuth';

interface TrackingData {
  actionType: 'click' | 'save' | 'like' | 'view' | 'search' | 'add_to_collection' | 'add_to_wishlist' | 'share' | 'filter' | 'sort';
  targetType: 'sneaker' | 'brand' | 'blog' | 'collection' | 'user' | 'search' | 'category';
  targetId?: number;
  metadata?: Record<string, any>;
}

export function useUserTracking() {
  const { user } = useAuth();

  const trackInteraction = useCallback(async (data: TrackingData) => {
    try {
      const endpoint = user ? '/api/track/user-interaction' : '/api/track/interaction';
      
      const payload = {
        ...data,
        sessionId: !user ? getSessionId() : undefined,
        metadata: {
          ...data.metadata,
          timestamp: new Date().toISOString(),
          url: window.location.pathname,
          userAgent: navigator.userAgent
        }
      };

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${await user.getIdToken()}` })
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.warn('Failed to track interaction:', error);
      // Fail silently to not impact user experience
    }
  }, [user]);

  const trackSneakerView = useCallback((sneakerId: number, sneakerName: string) => {
    trackInteraction({
      actionType: 'view',
      targetType: 'sneaker',
      targetId: sneakerId,
      metadata: { sneakerName }
    });
  }, [trackInteraction]);

  const trackSneakerSave = useCallback((sneakerId: number, collectionType: 'collection' | 'wishlist') => {
    trackInteraction({
      actionType: collectionType === 'collection' ? 'add_to_collection' : 'add_to_wishlist',
      targetType: 'sneaker',
      targetId: sneakerId,
      metadata: { collectionType }
    });
  }, [trackInteraction]);

  const trackSearch = useCallback((query: string, filters?: Record<string, any>) => {
    trackInteraction({
      actionType: 'search',
      targetType: 'search',
      metadata: { query, filters }
    });
  }, [trackInteraction]);

  const trackBlogView = useCallback((blogId: number, title: string) => {
    trackInteraction({
      actionType: 'view',
      targetType: 'blog',
      targetId: blogId,
      metadata: { title }
    });
  }, [trackInteraction]);

  const trackHoverPreview = useCallback((sneakerId: number, hoverDuration: number) => {
    trackInteraction({
      actionType: 'view',
      targetType: 'sneaker',
      targetId: sneakerId,
      metadata: { 
        interactionType: 'hover_preview',
        hoverDuration,
        device: window.innerWidth < 768 ? 'mobile' : 'desktop'
      }
    });
  }, [trackInteraction]);

  return {
    trackInteraction,
    trackSneakerView,
    trackSneakerSave,
    trackSearch,
    trackBlogView,
    trackHoverPreview
  };
}

// Generate or retrieve session ID for anonymous tracking
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('tracking_session_id');
  if (!sessionId) {
    sessionId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tracking_session_id', sessionId);
  }
  return sessionId;
}