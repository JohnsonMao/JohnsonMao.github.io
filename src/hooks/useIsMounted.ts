import { useEffect, useState } from 'react';

/**
 * This hook to track whether the component is mounted.
 */
function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export default useIsMounted;
