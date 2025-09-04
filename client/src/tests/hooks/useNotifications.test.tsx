import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '@/hooks/useNotifications';

describe('useNotifications', () => {
  it('starts with empty notifications array', () => {
    const { result } = renderHook(() => useNotifications());
    
    expect(result.current.notifications).toEqual([]);
  });

  it('adds notification correctly', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({
        title: 'Test Notification',
        message: 'This is a test',
        type: 'success'
      });
    });
    
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0].title).toBe('Test Notification');
    expect(result.current.notifications[0].type).toBe('success');
  });

  it('generates unique IDs for notifications', () => {
    const { result } = renderHook(() => useNotifications());
    
    let id1: string, id2: string;
    
    act(() => {
      id1 = result.current.addNotification({
        title: 'First',
        type: 'info'
      });
    });
    
    act(() => {
      id2 = result.current.addNotification({
        title: 'Second',
        type: 'info'
      });
    });
    
    expect(id1).not.toBe(id2);
    expect(result.current.notifications).toHaveLength(2);
  });

  it('removes notification by ID', () => {
    const { result } = renderHook(() => useNotifications());
    
    let notificationId: string;
    
    act(() => {
      notificationId = result.current.addNotification({
        title: 'Test',
        type: 'info'
      });
    });
    
    expect(result.current.notifications).toHaveLength(1);
    
    act(() => {
      result.current.removeNotification(notificationId);
    });
    
    expect(result.current.notifications).toHaveLength(0);
  });

  it('clears all notifications', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({ title: 'First', type: 'info' });
      result.current.addNotification({ title: 'Second', type: 'success' });
      result.current.addNotification({ title: 'Third', type: 'error' });
    });
    
    expect(result.current.notifications).toHaveLength(3);
    
    act(() => {
      result.current.clearAll();
    });
    
    expect(result.current.notifications).toHaveLength(0);
  });

  it('provides convenience methods for different types', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.success('Success message');
      result.current.error('Error message');
      result.current.warning('Warning message');
      result.current.info('Info message');
    });
    
    expect(result.current.notifications).toHaveLength(4);
    
    const types = result.current.notifications.map(n => n.type);
    expect(types).toContain('success');
    expect(types).toContain('error');
    expect(types).toContain('warning');
    expect(types).toContain('info');
  });

  it('sets default duration for notifications', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({
        title: 'Test',
        type: 'info'
      });
    });
    
    expect(result.current.notifications[0].duration).toBe(5000);
  });

  it('allows custom duration', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({
        title: 'Test',
        type: 'info',
        duration: 10000
      });
    });
    
    expect(result.current.notifications[0].duration).toBe(10000);
  });

  it('handles action callback in notifications', () => {
    const { result } = renderHook(() => useNotifications());
    const mockAction = jest.fn();
    
    act(() => {
      result.current.addNotification({
        title: 'Test',
        type: 'info',
        action: {
          label: 'Click me',
          onClick: mockAction
        }
      });
    });
    
    expect(result.current.notifications[0].action).toBeDefined();
    expect(result.current.notifications[0].action?.label).toBe('Click me');
    expect(result.current.notifications[0].action?.onClick).toBe(mockAction);
  });
});