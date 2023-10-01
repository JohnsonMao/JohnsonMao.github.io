import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * This hook for managing state with RAF (requestAnimationFrame) optimization.
 */
const useRafState = <S>(initialState: S | (() => S)) => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(frame.current);
  }, [])

  return [state, setRafState] as const;
};

export default useRafState;
