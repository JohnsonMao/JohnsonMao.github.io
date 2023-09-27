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
    ['/test/path', 'zh-TW'],
    ['/en/test/path', 'en'],
    ['/zh-TW/test/path', 'zh-TW'],
    ['/fr-CH/test/path', 'zh-TW'],
  ])(
    'should return the correct language code and dictionary',
    (pathname, expected) => {
      mockPathname.mockReturnValueOnce(pathname);

      const { result } = renderHook(() => useI18n());

      expect(result.current.lang).toBe(expected);
    }
  );
});
