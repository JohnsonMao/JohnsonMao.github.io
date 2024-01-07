import { act, renderHook } from '@testing-library/react';
import useAutoReset from '@/hooks/useAutoReset';

describe('useAutoReset hook', () => {
  it('should reset state to initial value after a specified delay', async () => {
    const initialValue = false;
    const newValue = true;
    const { result } = renderHook(() => useAutoReset(initialValue));

    jest.useFakeTimers();

    expect(result.current[0]).toBe(initialValue);

    act(() => result.current[1](newValue));
    expect(result.current[0]).toBe(newValue);

    act(() => jest.runAllTimers());
    expect(result.current[0]).toBe(initialValue);

    jest.useRealTimers();
  });
});
