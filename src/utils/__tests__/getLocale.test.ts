import { defaultLocale } from '~/i18n';
import getLocale from '../getLocale';

describe('get locale function', () => {
  it('should return undefined when acceptLanguage does not match and defaultLocale is not provided', () => {
    expect(getLocale()).toBe(undefined);
    expect(getLocale('/not/match/locale')).toBe(undefined);
  });

  it.each([
    ['zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7', 'zh'],
    ['en-US,en;q=0.9,zh-TW;q=0.8,ja;q=0.7', 'en'],
    ['fr-CH,fr;q=0.9,de-CH;q=0.8,de;q=0.7', 'zh'],
  ])(
    'should extract the preferred language code from the Accept-Language header',
    (acceptLanguage, expected) => {
      expect(getLocale(acceptLanguage, defaultLocale)).toBe(expected);
    }
  );

  it.each([
    ['/test/path', 'zh'],
    ['/en/test/path', 'en'],
    ['/zh/test/path', 'zh'],
    ['/fr/test/path', 'zh'],
  ])(
    'should extract the language code from the path string',
    (pathname, expected) => {
      expect(getLocale(pathname, defaultLocale)).toBe(expected);
    }
  );
});
