import { render, screen } from '@testing-library/react';
import Page, { generateMetadata, generateStaticParams } from '../page';

const mockNotFound = jest.fn();
const mockDataList = jest.fn();
const mockData = jest.fn();

jest.mock('next/navigation', () => ({
  notFound: () => mockNotFound(),
  usePathname: () => ''
}));

jest.mock('@/components/TableOfContents', () => () => null);

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => mockDataList(),
  getDataById: () => mockData(),
}));

describe('Post page component', () => {
  beforeEach(() => {
    mockNotFound.mockClear();
    mockDataList.mockClear();
    mockData.mockClear();
  });

  it('should render correct element', async () => {
    const testText = 'test content';

    mockData.mockReturnValueOnce({
      id: 'test-id',
      content: <h2>{testText}</h2>,
      source: `## ${testText}`,
      frontmatter: {
        date: '2023/10/28',
        title: 'test title',
      },
    });

    const page = await Page({
      params: { postId: 'test-id' },
    });

    render(page);

    const heading = await screen.findByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    const expected = {
      date: '2023/10/28',
      title: 'test title',
    };

    mockData.mockReturnValueOnce({ frontmatter: expected });

    const metadata = await generateMetadata({
      params: { postId: 'test-id' },
    });

    expect(metadata).toStrictEqual(expected);
  });

  it('should generate correct static params', async () => {
    const source = [
      {
        id: 'test-id-1',
      },
      {
        id: 'test-id-2',
      },
    ];
    mockDataList.mockReturnValueOnce(source);
    const staticParams = await generateStaticParams();
    const expected = source.map(({ id }) => ({ postId: id }));

    expect(staticParams).toStrictEqual(expected);
  });

  it('should call notFound when post data is null', async () => {
    mockData.mockReturnValue(null);

    await Page({
      params: { postId: 'test-id' },
    });

    expect(mockNotFound).toBeCalled();
    expect(mockNotFound).toBeCalledTimes(1);

    await generateMetadata({
      params: { postId: 'test-id' },
    });

    expect(mockNotFound).toBeCalledTimes(2);
  });
});
