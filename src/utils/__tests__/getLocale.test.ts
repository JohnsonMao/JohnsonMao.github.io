import { defaultLocale } from '~/i18n';
import getLocale from '../getLocale';

describe('get locale function', () => {
  it('should return empty string when acceptLanguage is not provided', () => {
    const lang = getLocale();

    expect(lang).toBe(undefined);
  });

  it.each([
    ['zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7', 'zh-TW'],
    ['en-US,en;q=0.9,zh-TW;q=0.8,ja;q=0.7', 'en'],
    ['fr-CH,fr;q=0.9,de-CH;q=0.8,de;q=0.7', 'zh-TW'],
  ])(
    'should extract the preferred language code from the Accept-Language header',
    (acceptLanguage, expected) => {
      expect(getLocale(acceptLanguage, defaultLocale)).toBe(expected);
    }
  );

  it.each([
    ['/test/path', 'zh-TW'],
    ['/en/test/path', 'en'],
    ['/zh-TW/test/path', 'zh-TW'],
    ['/fr-CH/test/path', 'zh-TW'],
  ])(
    'should extract the language code from the path string',
    (pathname, expected) => {
      expect(getLocale(pathname, defaultLocale)).toBe(expected);
    }
  );
});
