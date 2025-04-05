import { act, renderHook } from '@testing-library/react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

describe('useIntersectionObserver hook', () => {
  const mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockClear();
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();

    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should observe elements when elementRef is provided', () => {
    const elementRef = {
      current: [
        document.createElement('h2'),
        document.createElement('h2')
      ]
    }
    renderHook(() => useIntersectionObserver({ elementRef }));
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);
  });

  it('should observe and disconnect elements when setElementRef is called', () => {
    const elementRef = {
      current: [
        document.createElement('h2'),
        document.createElement('h2')
      ]
    }
    const { result } = renderHook(() => useIntersectionObserver());
    const [_, setElementRef] = result.current;
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledTimes(0);

    act(() => setElementRef(elementRef.current));
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);

    act(() => setElementRef(elementRef.current[0]));
    expect(mockDisconnect).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledTimes(3);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[0]);
  });
});
