import { act, renderHook, waitFor } from '@testing-library/react';
import useScroll from '../useScroll';

describe('useScroll hook', () => {
  const scrollHandler = jest.fn();

  beforeEach(() => {
    window.scrollX = 0;
    window.scrollY = 0;
    scrollHandler.mockClear();
  });

  it('should call the scroll handler when window is scrolled', async () => {
    renderHook(() => useScroll({ handler: scrollHandler }));

    expect(scrollHandler).not.toBeCalled();

    act(() => {
      window.scrollX = 100;
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(scrollHandler).toBeCalled();
      expect(scrollHandler).toBeCalledTimes(1);
      expect(scrollHandler).toBeCalledWith({ x: 100, y: 200 }, window);
    });
  });

  it('should call the scroll handler when a specified element is scrolled', async () => {
    const element = document.createElement('div');

    renderHook(() =>
      useScroll({
        ref: { current: element },
        handler: scrollHandler,
      })
    );

    expect(scrollHandler).not.toBeCalled();

    act(() => {
      element.scrollLeft = 150;
      element.scrollTop = 250;
      element.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(scrollHandler).toBeCalled();
      expect(scrollHandler).toBeCalledTimes(1);
      expect(scrollHandler).toBeCalledWith({ x: 150, y: 250 }, element);
    });
  });

  it('should switch the element being listened to for scrolling when using register', async () => {
    const element = document.createElement('main');
    const { result } = renderHook(() =>
      useScroll({
        handler: scrollHandler,
      })
    );

    act(() => {
      window.scrollX = 0;
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(scrollHandler).toBeCalled();
      expect(scrollHandler).toBeCalledTimes(1);
      expect(scrollHandler).toBeCalledWith({ x: 0, y: 80 }, window);
    });

    act(() => {
      result.current.register(element);
      element.scrollLeft = 180;
      element.scrollTop = 280;
      element.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(scrollHandler).toBeCalled();
      expect(scrollHandler).toBeCalledTimes(2);
      expect(scrollHandler).toBeCalledWith({ x: 180, y: 280 }, element);
    });
  });

  it('should stop listening to scroll events when remove is called', async () => {
    const { result } = renderHook(() =>
      useScroll({
        handler: scrollHandler,
      })
    );

    expect(scrollHandler).not.toBeCalled();

    act(() => {
      result.current.remove();
      window.scrollX = 100;
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(scrollHandler).not.toBeCalled();
    });
  });

  it('should stop listening to scroll events when the component is unmounted', async () => {
    const { unmount } = renderHook(() =>
      useScroll({
        handler: scrollHandler,
      })
    );

    expect(scrollHandler).not.toBeCalled();

    unmount();

    act(() => {
      window.scrollX = 100;
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(scrollHandler).not.toBeCalled();
    });
  });

  it('should trigger the scroll handler on initial render', async () => {
    renderHook(() =>
      useScroll({
        handler: scrollHandler,
        initial: true,
      })
    );

    await waitFor(() => {
      expect(scrollHandler).toBeCalled();
      expect(scrollHandler).toBeCalledTimes(1);
      expect(scrollHandler).toBeCalledWith({ x: 0, y: 0 }, window);
    });
  });
});
