import { act, renderHook, waitFor } from '@testing-library/react';
import useAutoReset from '../useAutoReset';

describe('useAutoReset hook', () => {
  it('should reset state to initial value after a specified delay', async () => {
    const initialValue = false;
    const newValue = true;
    const { result } = renderHook(() => useAutoReset(initialValue));

    expect(result.current[0]).toBe(initialValue);

    act(() => result.current[1](newValue));

    expect(result.current[0]).toBe(newValue);

    await waitFor(
      () => expect(result.current[0]).toBe(initialValue),
      { timeout: 2000 }
    );
  });
});
