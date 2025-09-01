import { create } from 'zustand';

interface Store {
  isNavigationCollapsed: boolean;
  setIsNavigationCollapsed: (collapsed: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  lenisSnap: any;
  setLenisSnap: (snap: any) => void;
}

export const useStore = create<Store>((set) => ({
  isNavigationCollapsed: false,
  setIsNavigationCollapsed: (collapsed: boolean) => set({ isNavigationCollapsed: collapsed }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  lenisSnap: null,
  setLenisSnap: (snap: any) => set({ lenisSnap: snap }),
}));