import { renderHook } from '@testing-library/react';
import mockPathname from '~/tests/navigation';
import useI18n from '../useI18n';

describe('useI18n hook', () => {
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
