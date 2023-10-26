import { renderHook } from '@testing-library/react';
import useI18n from '../useI18n';

const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('useI18n hook', () => {
  beforeEach(() => {
    mockPathname.mockClear();
  });

  it.each([
    ['/test/path', 'zh'],
    ['/en/test/path', 'en'],
    ['/zh/test/path', 'zh'],
    ['/fr/test/path', 'zh'],
  ])(
    'should return the correct language code and dictionary',
    (pathname, expected) => {
      mockPathname.mockReturnValueOnce(pathname);

      const { result } = renderHook(() => useI18n());

      expect(result.current.lang).toBe(expected);
    }
  );
});
