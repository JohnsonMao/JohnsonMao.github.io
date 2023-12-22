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
    // Arrange
    const elementRef = {
      current: [
        document.createElement('h2'),
        document.createElement('h2')
      ]
    }
    renderHook(() => useIntersectionObserver({ elementRef }));
    // Assert
    expect(mockIntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);
  });

  it('should observe and disconnect elements when setElementRef is called', () => {
    // Arrange
    const elementRef = {
      current: [
        document.createElement('h2'),
        document.createElement('h2')
      ]
    }
    const { result } = renderHook(() => useIntersectionObserver());
    // Assert
    expect(mockIntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(0);
    // Act
    act(() => result.current[1](elementRef.current));
    // Assert
    expect(mockDisconnect).toBeCalledTimes(0);
    expect(mockObserve).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);
    // Act
    act(() => result.current[1](elementRef.current[0]));
    // Assert
    expect(mockDisconnect).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(3);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[0]);
  });
});
