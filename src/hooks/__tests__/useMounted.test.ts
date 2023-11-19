import { renderHook } from '@testing-library/react';
import useIsMounted from '../useIsMounted';

describe('useIsMounted hook', () => {
  it('should return true if component is mounted', () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current).toBeTruthy();
  });
});
