import { useEffect, useRef, useState } from 'react';

/**
 * This hook resets a value to its initial state after a specified delay.
 */
function useAutoReset<T>(initialValue: T, resetDelayMs = 1000) {
  const [internalValue, setInternalValue] = useState(initialValue);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const setValue = (newValue: T) => {
    setInternalValue(newValue);
    clearTimer();
    timerRef.current = setTimeout(() => setInternalValue(initialValue), resetDelayMs);
  };

  useEffect(() => clearTimer, []);

  return [internalValue, setValue] as const;
}

export default useAutoReset;
