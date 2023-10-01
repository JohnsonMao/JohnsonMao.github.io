import { act, renderHook } from '@testing-library/react';
import useScroll from '../useScroll';

describe('useScroll hook', () => {
  beforeAll(() => {
    const mockRaf = jest.fn();

    mockRaf.mockImplementation((fn: () => void) => {
      fn();
      return 1;
    })

    window.requestAnimationFrame = mockRaf;
  })

  it('should monitor and update scroll position for the window', async () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current[0]).toEqual({ x: 0, y: 0 });

    act(() => {
      window.scrollX = 100;
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current[0]).toEqual({ x: 100, y: 200 });
  });

  it('should monitor and update scroll position for a specific DOM element', async () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => useScroll({ current: element }));

    expect(result.current[0]).toEqual({ x: 0, y: 0 });

    act(() => {
      element.scrollLeft = 150;
      element.scrollTop = 250;
      element.dispatchEvent(new Event('scroll'));
    });

    expect(result.current[0]).toEqual({ x: 150, y: 250 });
  });

  it('should monitor and update scroll position after setting the monitored element', async () => {
    const element = document.createElement('main');
    const { result } = renderHook(() => useScroll());

    expect(result.current[0]).toEqual({ x: 0, y: 0 });

    act(() => {
      result.current[1](element);
      element.scrollLeft = 180;
      element.scrollTop = 280;
      element.dispatchEvent(new Event('scroll'));
    });

    expect(result.current[0]).toEqual({ x: 180, y: 280 });
  });
});
