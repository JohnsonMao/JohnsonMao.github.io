import { renderHook } from '@testing-library/react';
import { defaultLocale } from '#/data/i18n';
import mockNavigation from '#/tests/navigation';
import useI18n from '@/hooks/useI18n';

describe('useI18n hook', () => {
  it.each([
    ['/test/path', defaultLocale],
    ['/en/test/path', 'en'],
    ['/zh/test/path', 'zh'],
    ['/fr/test/path', defaultLocale],
  ])('should return the correct language code and dictionary, pathname: %s, expected: %s', (pathname, expected) => {
    mockNavigation.pathname.mockReturnValueOnce(pathname);
    const { result } = renderHook(() => useI18n());
    expect(result.current.lang).toBe(expected);
  });
});
