import { defaultLocale } from '~/i18n';
import getLocale from '../getLocale';

describe('get locale function', () => {
  it.each([undefined, '/not/match/locale'])(
    'should return undefined when acceptLanguage does not match and defaultLocale is not provided',
    (param) => {
      // Act
      const result = getLocale(param);
      // Assert
      expect(result).toBe(undefined);
    }
  );

  it.each([
    ['zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7', 'zh'],
    ['en-US,en;q=0.9,zh-TW;q=0.8,ja;q=0.7', 'en'],
    ['fr-CH,fr;q=0.9,de-CH;q=0.8,de;q=0.7', 'zh'],
  ])(
    'should extract the preferred language code from the Accept-Language header',
    (acceptLanguage, expected) => {
      // Act
      const result = getLocale(acceptLanguage, defaultLocale);
      // Assert
      expect(result).toBe(expected);
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
      // Act
      const result = getLocale(pathname, defaultLocale);
      // Assert
      expect(result).toBe(expected);
    }
  );
});
