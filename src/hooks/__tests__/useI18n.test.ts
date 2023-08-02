import { renderHook } from '@testing-library/react';
import zhTW from '~/i18n/locales/zh-TW';
import en from '~/i18n/locales/en';
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
    ['/test/path', 'zh-TW', zhTW],
    ['/en/test/path', 'en', en],
    ['/zh-TW/test/path', 'zh-TW', zhTW],
    ['/fr-CH/test/path', 'zh-TW', zhTW],
  ])(
    'should return the correct language code and dictionary',
    (pathname, expectedLang, expectedDictionary) => {
      mockPathname.mockReturnValueOnce(pathname);

      const { result } = renderHook(() => useI18n());

      expect(result.current.lang).toBe(expectedLang);
      expect(result.current.dict).toEqual(expectedDictionary);
    }
  );
});
