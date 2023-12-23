import path from 'path';
import type { FeedOptions } from 'feed';
import { defaultLocale } from '~/i18n';
import generateRSS, { PUBLIC_FEED_PATH } from '../generateRSS';

const mockWriteFile = jest.fn();
const mockAtom1 = (options: unknown) => `atom1 - ${JSON.stringify(options)}`;

jest.mock('feed', () => ({
  Feed: class MockFeed {
    private _options: FeedOptions | null = null;
    constructor(options: FeedOptions) {
      this._options = options;
    }
    atom1 = () => mockAtom1(this._options);
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
    // Arrange
    const testFeedOptions: FeedOptions = {
      id: 'http://test.generate.rss',
      title: 'test generate RSS',
      copyright: `Copyright © ${new Date().getFullYear()}`,
      language: 'en',
    };
    const expectedFileName = 'atom.en.xml';
    const expectedFileContent = mockAtom1(testFeedOptions);
    // Act
    generateRSS(testFeedOptions);
    // Assert
    expect(mockWriteFile).toBeCalledTimes(1);
    expect(mockWriteFile).toBeCalledWith(
      path.join(PUBLIC_FEED_PATH, expectedFileName),
      expectedFileContent
    );
  });

  it('should generate the rss for the default language', () => {
    // Arrange
    const testFeedOptions: FeedOptions = {
      id: 'http://test.generate.rss',
      title: 'test generate RSS',
      copyright: `Copyright © ${new Date().getFullYear()}`,
    };
    const expectedFileName = `atom.${defaultLocale}.xml`;
    const expectedFileContent = mockAtom1(testFeedOptions);
    // Act
    generateRSS(testFeedOptions);
    // Assert
    expect(mockWriteFile).toBeCalledTimes(1);
    expect(mockWriteFile).toBeCalledWith(
      path.join(PUBLIC_FEED_PATH, expectedFileName),
      expectedFileContent
    );
  });
});
