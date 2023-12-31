import { render, screen } from '@testing-library/react';
import Page, { generateMetadata, generateStaticParams } from '../page';

const mockNotFound = jest.fn();
const mockDataList = jest.fn();
const mockData = jest.fn();

jest.mock('next/navigation', () => ({
  notFound: () => mockNotFound(),
  usePathname: () => '',
}));

jest.mock('@/components/TableOfContents', () => () => null);

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => mockDataList(),
  getDataById: () => mockData(),
}));

beforeEach(() => {
  mockNotFound.mockClear();
  mockDataList.mockClear();
  mockData.mockClear();
});

describe('[postId] page', () => {
  it('should render correct page', async () => {
    // Arrange
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
    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('should call notFound when post data is null', async () => {
    // Arrange
    mockData.mockReturnValue(null);
    await Page({ params: { postId: 'test-id' } });
    // Assert
    expect(mockNotFound).toBeCalled();
  });
});

describe('generate static params', () => {

  it('should generate correct static params', async () => {
    // Arrange
    const source = [{ id: 'test-id-1' }, { id: 'test-id-2' }];
    mockDataList.mockReturnValueOnce(source);
    const staticParams = await generateStaticParams();
    const expected = source.map(({ id }) => ({ postId: id }));
    // Assert
    expect(staticParams).toStrictEqual(expected);
  });
});

describe('generate metadata', () => {

  it('should generate correct metadata', async () => {
    // Arrange
    const expected = {
      date: '2023/10/28',
      title: 'test title',
    };
    mockData.mockReturnValueOnce({ frontmatter: expected });
    const metadata = await generateMetadata({
      params: { postId: 'test-id' },
    });
    // Assert
    expect(metadata).toStrictEqual(expected);
  });

  it('should call notFound when post data is null', async () => {
    // Arrange
    await generateMetadata({ params: { postId: 'test-id' } });
    // Assert
    expect(mockNotFound).toBeCalled();
  });
});
