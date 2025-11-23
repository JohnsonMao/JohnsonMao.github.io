import { renderHook } from '#/tests/__helpers__/test-utils';
import useIsMounted from '@/hooks/useIsMounted';

describe('useIsMounted hook', () => {
  it('should return true if component is mounted', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current).toBeTruthy();
  });
});
