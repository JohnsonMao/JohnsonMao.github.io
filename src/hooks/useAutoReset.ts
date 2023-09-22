import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that resets a value to its initial state after a specified delay.
 *
 * @param initialValue - The initial value.
 * @param resetDelayMs - The reset delay in milliseconds. Default is 1000.
 * @returns A tuple containing the current value, and a function to set a new value.
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
