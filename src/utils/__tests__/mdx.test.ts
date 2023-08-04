import { getMarkdownById, getMarkdownsFrontMatter } from '../mdx';

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

const PASS_CASE_TYPE = '__mocks__/pass_case';
const SAME_ID_CASE_TYPE = '__mocks__/same_id_case';

describe('Get post list function', () => {
  it('should get post list descending by date', async () => {
    const postList = await getMarkdownsFrontMatter(PASS_CASE_TYPE);

    expect(postList).toStrictEqual([
      { id: 'test_C', date: '2023/07/09' },
      { id: 'test_A', date: '2023/07/08' },
      { id: 'test_B', date: '2023/07/07' },
    ]);
  });

  it('should return same id error with reject', async () => {
    expect.assertions(1);

    await expect(
      getMarkdownsFrontMatter(SAME_ID_CASE_TYPE)
    ).rejects.toStrictEqual(
      Error('Duplicate id "test_A" found in "test_A.mdx"')
    );
  });
});

describe('Get post data function', () => {
  it('should get post data by mdx file', async () => {
    const postData = await getMarkdownById(PASS_CASE_TYPE, 'test_B');

    expect(postData).toStrictEqual({
      content: '測試文章B',
      frontmatter: { date: '2023/07/07' },
      id: 'test_B',
      source: '---\ndate: 2023/07/07\n---\n\n測試文章B',
    });
  });

  it('should get post data by md file', async () => {
    const postData = await getMarkdownById(PASS_CASE_TYPE, 'test_C');

    expect(postData).toStrictEqual({
      content: '測試文章C',
      frontmatter: { date: '2023/07/09' },
      id: 'test_C',
      source: '---\ndate: 2023/07/09\n---\n\n測試文章C',
    });
  });
});
