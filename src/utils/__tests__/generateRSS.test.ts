import path from 'path';
import type { FeedOptions } from 'feed';
import { defaultLocale } from '~/i18n';
import generateRSS, { PUBLIC_FEED_PATH } from '../generateRSS';

const mockWriteFile = jest.fn();

jest.mock('feed', () => ({
  Feed: class MockFeed {
    private _options: FeedOptions | null = null;
    constructor(options: FeedOptions) {
      this._options = options;
    }
    atom1 = () => `atom1 - ${JSON.stringify(this._options)}`;
  },
}));

jest.mock('fs', () => ({
  existsSync: () => false,
  mkdirSync: () => undefined,
  writeFileSync: (...args: unknown[]) => mockWriteFile(...args),
}));

describe('Generate RSS function', () => {
  beforeEach(() => {
    mockWriteFile.mockClear();
  });

  it('should generate the rss for the specified language', () => {
    const testFeedOptions: FeedOptions = {
      id: 'http://test.generate.rss',
      title: 'test generate RSS',
      copyright: `Copyright © ${new Date().getFullYear()}`,
      language: 'en',
    };

    generateRSS(testFeedOptions);

    expect(mockWriteFile).toBeCalledTimes(1);
    expect(mockWriteFile).toBeCalledWith(
      path.join(PUBLIC_FEED_PATH, 'atom.en.xml'),
      `atom1 - ${JSON.stringify(testFeedOptions)}`
    );
  });

  it('should generate the rss for the default language', () => {
    const testFeedOptions: FeedOptions = {
      id: 'http://test.generate.rss',
      title: 'test generate RSS',
      copyright: `Copyright © ${new Date().getFullYear()}`,
    };

    generateRSS(testFeedOptions);

    expect(mockWriteFile).toBeCalledTimes(1);
    expect(mockWriteFile).toBeCalledWith(
      path.join(PUBLIC_FEED_PATH, `atom.${defaultLocale}.xml`),
      `atom1 - ${JSON.stringify(testFeedOptions)}`
    );
  });
});
