import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mocked } from '#/tests/__helpers__/test-utils';
import { getAllDataFrontmatter, getDataById } from '@/utils/mdx';

jest.mock('fs');
jest.mock('remark-gfm');
jest.mock('rehype-slug');
jest.mock('rehype-prism-plus');
jest.mock('rehype-code-titles');
jest.mock('sharp');
jest.mock('unist-util-visit');
jest.mock('next-mdx-remote/rsc', () => ({
  compileMDX: jest.fn(),
}));

const mockCompileMDX = () =>
  mocked(compileMDX).mockImplementation(({ source }: { source: string }) => ({
    frontmatter: { date: source.replace(/[^/\d]/g, '') },
    content: source.replace(/^---\n.*\n---\n\n/g, ''),
  }));

describe('Get post list function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockCompileMDX();
  });

  it('should get post list descending by date', async () => {
    mocked(fs.readdirSync).mockReturnValueOnce([
      'test_A.md',
      'test_B.mdx',
      'test_C.md',
    ]);
    mocked(fs.readFileSync)
      .mockReturnValueOnce(mockFileA)
      .mockReturnValueOnce(mockFileB)
      .mockReturnValueOnce(mockFileC);
    const postList = await getAllDataFrontmatter('posts');
    expect(postList).toStrictEqual([
      { id: 'test_C', date: '2023/07/09' },
      { id: 'test_A', date: '2023/07/08' },
      { id: 'test_B', date: '2023/07/07' },
    ]);
  });

  it('should warn about duplicate ids but continue execution', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    mocked(fs.readdirSync).mockReturnValueOnce(['test_A.md', 'test_A.mdx']);
    mocked(fs.readFileSync)
      .mockReturnValueOnce(mockFileA)
      .mockReturnValueOnce(mockFileA);

    const result = await getAllDataFrontmatter('posts');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('⚠️ Duplicate files detected: test_A')
    );
    expect(result).toHaveLength(1);

    consoleSpy.mockRestore();
  });
});

describe('Get post data function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockCompileMDX();
  });

  it('should get post data by mdx file', async () => {
    mocked(fs.existsSync).mockReturnValueOnce(true);
    mocked(fs.readFileSync).mockReturnValueOnce(mockFileB);
    const postData = await getDataById('posts', 'test_B');
    expect(postData).toStrictEqual({
      content: '測試文章B',
      frontmatter: { date: '2023/07/07' },
      id: 'test_B',
    });
  });

  it('should get post data by md file', async () => {
    mocked(fs.existsSync).mockReturnValueOnce(false);
    mocked(fs.readFileSync).mockReturnValueOnce(mockFileC);
    const postData = await getDataById('posts', 'test_C');
    expect(postData).toStrictEqual({
      content: '測試文章C',
      frontmatter: { date: '2023/07/09' },
      id: 'test_C',
    });
  });

  it('should return null when trying to get post data for a non-existing file', async () => {
    mocked(fs.existsSync).mockReturnValueOnce(false);
    mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File not found');
    });
    const postData = await getDataById('posts', 'not_found');
    expect(postData).toBe(null);
  });
});

const mockFileA = `---
date: 2023/07/08
---

測試文章A`;

const mockFileB = `---
date: 2023/07/07
---

測試文章B`;

const mockFileC = `---
date: 2023/07/09
---

測試文章C`;
