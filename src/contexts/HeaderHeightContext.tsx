'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface HeaderHeightContextValue {
  headerHeight: number;
  registerHeader: (node: HTMLElement | null) => void;
}

const HeaderHeightContext = createContext<HeaderHeightContextValue | undefined>(
  undefined
);

export const useHeaderHeight = () => {
  const context = useContext(HeaderHeightContext);
  if (!context) {
    throw new Error('useHeaderHeight must be used within HeaderHeightProvider');
  }
  return context;
};

export const HeaderHeightProvider = ({ children }: React.PropsWithChildren) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const cleanup = useCallback(() => {
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;
    document.body.style.removeProperty('scroll-padding-top');
    setHeaderHeight(0);
  }, []);

  const registerHeader = useCallback<
    HeaderHeightContextValue['registerHeader']
  >(
    (node) => {
      cleanup();

      if (node) {
        const updateHeaderHeight = () => {
          const height = node.offsetHeight;
          setHeaderHeight(height);
          document.body.style.setProperty('scroll-padding-top', `${height}px`);
        };

        updateHeaderHeight();

        const resizeObserver = new ResizeObserver(updateHeaderHeight);
        resizeObserver.observe(node);
        resizeObserverRef.current = resizeObserver;
      }
    },
    [cleanup]
  );

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <HeaderHeightContext.Provider value={{ headerHeight, registerHeader }}>
      {children}
    </HeaderHeightContext.Provider>
  );
};
