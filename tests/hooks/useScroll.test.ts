import { act, renderHook, waitFor } from '@testing-library/react';
import useScroll from '@/hooks/useScroll';

describe('useScroll hook', () => {
  const handler = jest.fn();

  beforeEach(() => {
    window.scrollX = 0;
    window.scrollY = 0;
    handler.mockClear();
  });

  it('should not call the scroll handler initially', () => {
    renderHook(() => useScroll({ handler }));
    expect(handler).not.toHaveBeenCalled();
  });

  it('should call the scroll handler when window is scrolled', async () => {
    renderHook(() => useScroll({ handler }));
    act(() => {
      window.scrollX = 100;
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ x: 100, y: 200 }, window);
    });
  });

  it('should call the scroll handler when a specified element is scrolled', async () => {
    const element = document.createElement('div');
    renderHook(() =>
      useScroll({
        ref: { current: element },
        handler,
      })
    );
    act(() => {
      element.scrollLeft = 150;
      element.scrollTop = 250;
      element.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ x: 150, y: 250 }, element);
    });
  });

  it('should switch the element being listened to for scrolling when using register', async () => {
    const element = document.createElement('main');
    const { result } = renderHook(() => useScroll({ handler }));
    act(() => {
      window.scrollX = 0;
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenLastCalledWith({ x: 0, y: 80 }, window);
    });

    act(() => {
      result.current.register(element);
      element.scrollLeft = 180;
      element.scrollTop = 280;
      element.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => {
      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenLastCalledWith({ x: 180, y: 280 }, element);
    });
  });

  it('should stop listening to scroll events when remove is called', async () => {
    const { result } = renderHook(() => useScroll({ handler }));
    act(() => {
      result.current.remove();
      window.scrollX = 100;
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => {
      expect(handler).not.toBeCalled();
    });
  });

  it('should stop listening to scroll events when the component is unmounted', async () => {
    const { unmount } = renderHook(() => useScroll({ handler }));
    unmount();
    act(() => {
      window.scrollX = 100;
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });
    await waitFor(() => {
      expect(handler).not.toHaveBeenCalled();
    });
  });

  it('should trigger the scroll handler on initial render', async () => {
    renderHook(() =>
      useScroll({
        handler,
        initial: true,
      })
    );
    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ x: 0, y: 0 }, window);
    });
  });
});
