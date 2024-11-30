import { RefObject, useCallback, useEffect, useRef } from 'react';

type ScrollElement = HTMLElement | Window | null;

export type ScrollHandler = (
  scroll: Record<'x' | 'y', number>,
  element: ScrollElement
) => void;

export type UseScrollProps = {
  ref?: RefObject<ScrollElement>;
  initial?: boolean;
  handler: ScrollHandler;
};

/**
 * This hook allows tracking the scroll position of a specified DOM element or the window.
 */
function useScroll({ ref, initial, handler }: UseScrollProps) {
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
    (element: ScrollElement, initial = false) => {
      remove();
      internalElementRef.current = element;
      internalElementRef.current?.addEventListener('scroll', scrollHandler);
      if (initial) scrollHandler();
      return remove;
    },
    [scrollHandler, remove]
  );

  useEffect(() => {
    const element = ref?.current || window;
    return register(element, initial);
  }, [ref, initial, register]);

  return {
    remove,
    register,
  };
}

export default useScroll;
