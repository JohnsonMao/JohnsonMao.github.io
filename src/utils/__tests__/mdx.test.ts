import { getPostDataById, getSortedPostList } from '../mdx';
import { SAME_ID_CASE_DIRECTORY } from '@/configs/path';

jest.mock('remark-gfm', () => ({}));
jest.mock('rehype-slug', () => ({}));
jest.mock('rehype-prism-plus', () => ({}));
jest.mock('rehype-code-titles', () => ({}));
jest.mock('sharp', () => ({}));
jest.mock('unist-util-visit', () => ({}));
jest.mock('next-mdx-remote/rsc', () => ({
  compileMDX: ({ source }: { source: string }) => ({
    frontmatter: { date: source.replace(/[^/\d]/g, '') },
    content: source.replace(/^---\n.*\n---\n\n/g, ''),
  }),
}));

describe('Get post list function', () => {
  it('should get post list descending by date', async () => {
    const postList = await getSortedPostList();

    expect(postList).toEqual([
      { id: 'test_C', date: '2023/07/09' },
      { id: 'test_A', date: '2023/07/08' },
      { id: 'test_B', date: '2023/07/07' },
    ]);
  });

  it('should return same id error with reject', async () => {
    expect.assertions(1);

    await expect(getSortedPostList(SAME_ID_CASE_DIRECTORY)).rejects.toEqual(
      Error('Duplicate id "test_A" found in "test_A.mdx"')
    );
  });
});

describe('Get post data function', () => {
  it('should get post data by mdx file', async () => {
    const postData = await getPostDataById('test_A', SAME_ID_CASE_DIRECTORY);

    expect(postData).toEqual({
      content: '測試文章A',
      frontmatter: { date: '2023/07/08' },
      id: 'test_A',
      source: '---\ndate: 2023/07/08\n---\n\n測試文章A',
    });
  });

  it('should get post data by md file', async () => {
    const postData = await getPostDataById('test_C');

    expect(postData).toEqual({
      content: '測試文章C',
      frontmatter: { date: '2023/07/09' },
      id: 'test_C',
      source: '---\ndate: 2023/07/09\n---\n\n測試文章C',
    });
  });
});
