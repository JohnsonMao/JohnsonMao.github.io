import { RefObject, useCallback, useEffect, useRef } from 'react';

type ScrollElement = HTMLElement | Window | null;

export type ScrollHandler = (
  scroll: Record<'x' | 'y', number>,
  element: ScrollElement
) => void;

export type UseScroll = {
  ref?: RefObject<ScrollElement>;
  initial?: boolean;
  handler: ScrollHandler;
};

/**
 * This hook allows tracking the scroll position of a specified DOM element or the window.
 */
function useScroll({ ref, initial, handler }: UseScroll) {
  const internalElementRef = useRef<ScrollElement>(null);

  const scrollHandler = useCallback(() => {
    const element = internalElementRef.current;
    const scroll = { x: 0, y: 0 };

    if (element === window) {
      scroll.x = element.scrollX;
      scroll.y = element.scrollY;
    } else if (element instanceof Element) {
      scroll.x = element.scrollLeft;
      scroll.y = element.scrollTop;
    }
    handler(scroll, element);
  }, [handler]);

  const remove = useCallback(() => {
    internalElementRef.current?.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);

  const register = useCallback(
    (element: ScrollElement) => {
      internalElementRef.current?.removeEventListener('scroll', scrollHandler);
      internalElementRef.current = element;
      internalElementRef.current?.addEventListener('scroll', scrollHandler);
    },
    [scrollHandler]
  );

  useEffect(() => {
    const element = ref?.current || window;

    internalElementRef.current = element;
    element.addEventListener('scroll', scrollHandler);
    if (initial) scrollHandler();

    return () => element.removeEventListener('scroll', scrollHandler);
  }, [ref, initial, scrollHandler]);

  return {
    remove,
    register,
  };
}

export default useScroll;
