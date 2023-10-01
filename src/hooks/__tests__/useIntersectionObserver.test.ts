import { act, renderHook } from '@testing-library/react';
import useIntersectionObserver from '../useIntersectionObserver';

describe('useIntersectionObserver hook', () => {
  const mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
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

    expect(mockIntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(elementRef.current[0]);
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

    expect(mockIntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(0);

    act(() => result.current[1](elementRef.current));

    expect(mockDisconnect).toBeCalledTimes(0);
    expect(mockObserve).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);

    act(() => result.current[1](elementRef.current[0]));

    expect(mockDisconnect).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(3);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[0]);
  });
});
