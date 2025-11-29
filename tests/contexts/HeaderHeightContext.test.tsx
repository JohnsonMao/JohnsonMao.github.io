import { act, renderHook, waitFor } from '#/tests/__helpers__/test-utils';
import {
  HeaderHeightProvider,
  useHeaderHeight,
} from '@/contexts/HeaderHeightContext';

const mockResizeObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  mockResizeObserver.mockClear();
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();

  global.ResizeObserver = jest.fn().mockImplementation((callback) => {
    const observer = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      callback,
    };
    mockResizeObserver(callback);
    return observer;
  });

  document.body.style.removeProperty('scroll-padding-top');
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('HeaderHeightContext', () => {
  describe('useHeaderHeight', () => {
    it('should throw error when used outside HeaderHeightProvider', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useHeaderHeight());
      }).toThrow('useHeaderHeight must be used within HeaderHeightProvider');

      consoleSpy.mockRestore();
    });

    it('should return context value when used within HeaderHeightProvider', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });

      expect(result.current).toHaveProperty('headerHeight');
      expect(result.current).toHaveProperty('registerHeader');
      expect(typeof result.current.registerHeader).toBe('function');
      expect(result.current.headerHeight).toBe(0);
    });
  });

  describe('HeaderHeightProvider', () => {
    it('should initialize with headerHeight of 0', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });

      expect(result.current.headerHeight).toBe(0);
    });

    it('should update headerHeight when registerHeader is called with a node', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });
      const headerElement = document.createElement('header');
      Object.defineProperty(headerElement, 'offsetHeight', {
        configurable: true,
        value: 100,
      });

      act(() => {
        result.current.registerHeader(headerElement);
      });

      expect(result.current.headerHeight).toBe(100);
      expect(document.body.style.getPropertyValue('scroll-padding-top')).toBe(
        '100px'
      );
    });

    it('should create ResizeObserver when registerHeader is called with a node', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });
      const headerElement = document.createElement('header');

      act(() => {
        result.current.registerHeader(headerElement);
      });

      expect(mockResizeObserver).toHaveBeenCalled();
      expect(mockObserve).toHaveBeenCalledWith(headerElement);
    });

    it('should update headerHeight when ResizeObserver callback is triggered', async () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });
      const headerElement = document.createElement('header');
      Object.defineProperty(headerElement, 'offsetHeight', {
        configurable: true,
        value: 50,
      });

      act(() => {
        result.current.registerHeader(headerElement);
      });

      expect(result.current.headerHeight).toBe(50);

      const resizeObserverCallback = mockResizeObserver.mock.calls[0][0];
      Object.defineProperty(headerElement, 'offsetHeight', {
        configurable: true,
        value: 150,
      });

      act(() => {
        resizeObserverCallback();
      });

      await waitFor(() => {
        expect(result.current.headerHeight).toBe(150);
        expect(document.body.style.getPropertyValue('scroll-padding-top')).toBe(
          '150px'
        );
      });
    });

    it('should cleanup when registerHeader is called with null', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });
      const headerElement = document.createElement('header');
      Object.defineProperty(headerElement, 'offsetHeight', {
        configurable: true,
        value: 100,
      });

      act(() => {
        result.current.registerHeader(headerElement);
      });

      expect(result.current.headerHeight).toBe(100);
      expect(mockObserve).toHaveBeenCalled();

      act(() => {
        result.current.registerHeader(null);
      });

      expect(mockDisconnect).toHaveBeenCalled();
      expect(result.current.headerHeight).toBe(0);
      expect(document.body.style.getPropertyValue('scroll-padding-top')).toBe(
        ''
      );
    });

    it('should cleanup when registerHeader is called with a new node', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });
      const headerElement1 = document.createElement('header');
      const headerElement2 = document.createElement('header');

      act(() => {
        result.current.registerHeader(headerElement1);
      });

      const firstDisconnectCallCount = mockDisconnect.mock.calls.length;

      act(() => {
        result.current.registerHeader(headerElement2);
      });

      expect(mockDisconnect.mock.calls.length).toBeGreaterThan(
        firstDisconnectCallCount
      );
      expect(mockObserve).toHaveBeenCalledWith(headerElement2);
    });

    it('should cleanup on unmount', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result, unmount } = renderHook(() => useHeaderHeight(), {
        wrapper,
      });
      const headerElement = document.createElement('header');

      act(() => {
        result.current.registerHeader(headerElement);
      });

      unmount();

      expect(mockDisconnect).toHaveBeenCalled();
      expect(document.body.style.getPropertyValue('scroll-padding-top')).toBe(
        ''
      );
    });

    it('should handle multiple registerHeader calls correctly', () => {
      const wrapper = ({ children }: React.PropsWithChildren) => (
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      );

      const { result } = renderHook(() => useHeaderHeight(), { wrapper });
      const headerElement1 = document.createElement('header');
      const headerElement2 = document.createElement('header');
      const headerElement3 = document.createElement('header');

      Object.defineProperty(headerElement1, 'offsetHeight', {
        configurable: true,
        value: 50,
      });
      Object.defineProperty(headerElement2, 'offsetHeight', {
        configurable: true,
        value: 100,
      });
      Object.defineProperty(headerElement3, 'offsetHeight', {
        configurable: true,
        value: 150,
      });

      act(() => {
        result.current.registerHeader(headerElement1);
      });
      expect(result.current.headerHeight).toBe(50);

      act(() => {
        result.current.registerHeader(headerElement2);
      });
      expect(result.current.headerHeight).toBe(100);

      act(() => {
        result.current.registerHeader(headerElement3);
      });
      expect(result.current.headerHeight).toBe(150);

      act(() => {
        result.current.registerHeader(null);
      });
      expect(result.current.headerHeight).toBe(0);
    });
  });
});
