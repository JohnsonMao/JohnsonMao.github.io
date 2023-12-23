import { renderHook } from '@testing-library/react';
import useIsMounted from '../useIsMounted';

describe('useIsMounted hook', () => {
  it('should return true if component is mounted', () => {
    // Arrange
    const { result } = renderHook(() => useIsMounted());
    // Assert
    expect(result.current).toBeTruthy();
  });
});
