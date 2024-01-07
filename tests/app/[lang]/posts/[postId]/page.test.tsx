import { render, screen } from '@testing-library/react';
import mockNavigation from '~/tests/navigation';
import Page, {
  generateMetadata,
  generateStaticParams,
} from '@/app/[lang]/posts/[postId]/page';

const mockDataList = jest.fn();
const mockData = jest.fn();

jest.mock('@/components/TableOfContents', () => () => null);

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => mockDataList(),
  getDataById: () => mockData(),
}));

beforeEach(() => {
  mockDataList.mockClear();
  mockData.mockClear();
});

describe('[postId] page', () => {
  it('should render correct page', async () => {
    const testText = 'test content';
    mockData.mockReturnValueOnce({
      id: 'test-id',
      content: <h2>{testText}</h2>,
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

  it('should call notFound when post data is null', async () => {
    mockData.mockReturnValue(null);
    await Page({ params: { postId: 'test-id' } });
    expect(mockNavigation.notFound).toHaveBeenCalled();
  });
});

describe('generate static params', () => {
  it('should generate correct static params', async () => {
    const source = [{ id: 'test-id-1' }, { id: 'test-id-2' }];
    mockDataList.mockReturnValueOnce(source);
    const staticParams = await generateStaticParams();
    const expected = source.map(({ id }) => ({ postId: id }));
    expect(staticParams).toStrictEqual(expected);
  });
});

describe('generate metadata', () => {
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

  it('should call notFound when post data is null', async () => {
    await generateMetadata({ params: { postId: 'test-id' } });
    expect(mockNavigation.notFound).toHaveBeenCalled();
  });
});
