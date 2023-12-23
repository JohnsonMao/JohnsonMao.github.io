import { act, renderHook, waitFor } from '@testing-library/react';
import useAutoReset from '../useAutoReset';

describe('useAutoReset hook', () => {
  it('should reset state to initial value after a specified delay', async () => {
    // Arrange
    const initialValue = false;
    const newValue = true;
    const { result } = renderHook(() => useAutoReset(initialValue));
    // Assert
    expect(result.current[0]).toBe(initialValue);
    // Act
    act(() => result.current[1](newValue));
    // Assert
    expect(result.current[0]).toBe(newValue);
    await waitFor(
      () => expect(result.current[0]).toBe(initialValue),
      { timeout: 2000 }
    );
  });
});
