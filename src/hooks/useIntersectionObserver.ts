import { useCallback, useEffect, useRef, useState, RefObject } from 'react';

type ElementNode = Element | Element[] | null;

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  elementRef?: RefObject<ElementNode>;
}

type UseIntersectionObserverResponse = [
  IntersectionObserverEntry[],
  (node: ElementNode) => void
] & {
  entry: IntersectionObserverEntry[];
  setElementRef: (node: ElementNode) => void;
};

function useIntersectionObserver({
  root = null,
  threshold = 0,
  rootMargin,
  elementRef,
}: UseIntersectionObserverProps = {}): UseIntersectionObserverResponse {
  const [entry, setEntry] = useState<IntersectionObserverEntry[]>([]);
  const observerRef = useRef<IntersectionObserver>();
  const interalElementRef = useRef<ElementNode>();
  const setInteralElementRef = useCallback(
    (node: ElementNode) => {
      const observerParams = { root, rootMargin, threshold };

      observerRef.current?.disconnect();
      observerRef.current = new IntersectionObserver(setEntry, observerParams);

      if (Array.isArray(node)) {
        node.forEach((_node) => observerRef.current?.observe(_node));
      } else if (node) {
        observerRef.current.observe(node);
      }

      interalElementRef.current = node;
    },
    [root, rootMargin, threshold]
  );

  useEffect(() => {
    const element = elementRef?.current;

    if (element) setInteralElementRef(element);

    return () => observerRef.current?.disconnect();
  }, [elementRef, setInteralElementRef]);

  const result = [
    entry,
    setInteralElementRef,
  ] as UseIntersectionObserverResponse;

  result.entry = result[0];
  result.setElementRef = result[1];

  return result;
}

export default useIntersectionObserver;
