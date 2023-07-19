import { act, render, renderHook } from '@testing-library/react';
import useIntersectionObserver from '../useIntersectionObserver';

describe('useIntersectionObserver hook', () => {
  const mockIntersectionObserver = jest.fn();
  const mockObserve = jest.fn();
  const mockUnobserve = jest.fn();
  const mockDisconnect = jest.fn();
  const elementRef: { current: Element[] } = { current: [] };
  const pushElementRef = (element: Element | null) =>
    element && elementRef.current.push(element);

  beforeEach(() => {
    elementRef.current = [];
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
    render(
      <div>
        <h2 ref={pushElementRef}>Test1</h2>
        <h2 ref={pushElementRef}>Test2</h2>
      </div>
    );

    renderHook(() => useIntersectionObserver({ elementRef }));

    expect(mockIntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);
  });

  it('should observe and disconnect elements when setElementRef is called', () => {
    render(
      <div>
        <h2 ref={pushElementRef}>Test1</h2>
        <h2 ref={pushElementRef}>Test2</h2>
      </div>
    );

    const { result } = renderHook(() => useIntersectionObserver());

    expect(mockIntersectionObserver).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(0);

    act(() => result.current.setElementRef(elementRef.current));

    expect(mockDisconnect).toBeCalledTimes(0);
    expect(mockObserve).toBeCalledTimes(2);
    expect(mockObserve).toBeCalledWith(elementRef.current[0]);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[1]);

    act(() => result.current.setElementRef(elementRef.current[0]));

    expect(mockDisconnect).toBeCalledTimes(1);
    expect(mockObserve).toBeCalledTimes(3);
    expect(mockObserve).toHaveBeenLastCalledWith(elementRef.current[0]);
  });
});
