import { act, renderHook, waitFor } from '@testing-library/react';
import useRafState from '../useRafState';

describe('useRafState hook', () => {
  it('should only update the state after a requestAnimationFrame', async () => {
    const { result } = renderHook(() => useRafState(1));

    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(1);

    await waitFor(() => expect(result.current[0]).toBe(2));

    act(() => result.current[1](3));
    act(() => result.current[1](4));
    act(() => result.current[1](5));

    expect(result.current[0]).toBe(2);

    await waitFor(() => expect(result.current[0]).toBe(5));
  });

  it('should cancel update the state after unmount', async () => {
    const { result, unmount } = renderHook(() => useRafState(1));

    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(1);

    unmount();

    await waitFor(() => expect(result.current[0]).toBe(1));
  });
});
