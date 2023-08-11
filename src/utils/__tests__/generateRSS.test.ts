import path from 'path';
import type { FeedOptions } from 'feed';
import generateRSS, { PUBLIC_FEED_PATH } from '../generateRSS';

const mockGenerateFile = jest.fn();

jest.mock('feed', () => ({
  Feed: class MockFeed {
    private _options: FeedOptions | null = null;
    constructor(options: FeedOptions) {
      this._options = options;
    }
    rss2 = () => `rss2 - ${JSON.stringify(this._options)}`;
    atom1 = () => `atom1 - ${JSON.stringify(this._options)}`;
    json1 = () => `json1 - ${JSON.stringify(this._options)}`;
  },
}));

jest.mock('fs', () => ({
  existsSync: () => false,
  mkdirSync: () => undefined,
  writeFileSync: (...args: unknown[]) => mockGenerateFile(...args),
}));

describe('Generate RSS function', () => {
  it('should', () => {
    const testFeedOptions: FeedOptions = {
      id: 'http://test.generate.rss',
      title: 'test generate RSS',
      copyright: `Copyright © ${new Date().getFullYear()}`,
    };

    generateRSS(testFeedOptions);

    expect(mockGenerateFile).toBeCalledTimes(3);
    expect(mockGenerateFile).toBeCalledWith(
      path.join(PUBLIC_FEED_PATH, 'feed.xml'),
      `rss2 - ${JSON.stringify(testFeedOptions)}`
    );
    expect(mockGenerateFile).toBeCalledWith(
      path.join(PUBLIC_FEED_PATH, 'atom.xml'),
      `atom1 - ${JSON.stringify(testFeedOptions)}`
    );
    expect(mockGenerateFile).lastCalledWith(
      path.join(PUBLIC_FEED_PATH, 'feed.json'),
      `json1 - ${JSON.stringify(testFeedOptions)}`
    );
  });
});
