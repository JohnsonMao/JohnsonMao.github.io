import { useCallback, useEffect, useRef, useState, RefObject } from 'react';

type ElementNode = Element | Element[] | null;

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  elementRef?: RefObject<ElementNode>;
}

/**
 * This Hook provides a way to observe the intersection of a DOM element with its nearest scrollable ancestor or the viewport.
 */
function useIntersectionObserver({
  root = null,
  threshold = 0,
  rootMargin,
  elementRef,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry[]>([]);
  const internalElementRef = useRef<ElementNode>();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setInternalElementRef = useCallback((node: ElementNode) => {
    const observer = observerRef.current;

    observer?.disconnect();

    if (Array.isArray(node)) {
      node.filter(Boolean).forEach((item) => observer?.observe(item));
    } else if (node) {
      observer?.observe(node);
    }

    internalElementRef.current = node;
  }, []);

  useEffect(() => {
    const element = elementRef?.current;
    const observer = observerRef.current;

    observerRef.current = new IntersectionObserver(setEntry, {
      root,
      rootMargin,
      threshold,
    });

    if (element) setInternalElementRef(element);

    return () => {
      observer?.disconnect();
      observerRef.current = null;
    };
  }, [elementRef, root, rootMargin, threshold, setInternalElementRef]);

  return [entry, setInternalElementRef] as const;
}

export default useIntersectionObserver;
