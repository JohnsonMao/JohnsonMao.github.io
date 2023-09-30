import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

type ScrollElement = HTMLElement | Window | null;

/**
 * This hook allows tracking the scroll position of a specified DOM element or the window.
 */
function useScroll(ref?: RefObject<ScrollElement>) {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const internalElementRef = useRef<ScrollElement>(null);

  const handleScroll = useCallback(() => {
    const element = internalElementRef.current;

    if (element === window) {
      setScroll({ x: element.scrollX, y: element.scrollY });
    } else if (element instanceof Element) {
      setScroll({ x: element.scrollLeft, y: element.scrollTop });
    }
  }, []);

  const setInternalElementRef = useCallback(
    (element: ScrollElement) => {
      internalElementRef.current?.removeEventListener('scroll', handleScroll);
      internalElementRef.current = element;
      internalElementRef.current?.addEventListener('scroll', handleScroll);
      handleScroll();
    },
    [handleScroll]
  );

  useEffect(() => {
    internalElementRef.current = ref?.current || window;

    const element = internalElementRef.current;

    element.addEventListener('scroll', handleScroll);

    return () => element.removeEventListener('scroll', handleScroll);
  }, [ref, handleScroll]);

  return [scroll, setInternalElementRef] as const;
}

export default useScroll;
