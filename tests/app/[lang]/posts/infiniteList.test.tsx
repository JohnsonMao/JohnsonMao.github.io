import { render, screen } from '#/tests/__helpers__/test-utils';
import mockNavigation from '#/tests/navigation';
import InfiniteList from '@/app/[lang]/posts/InfiniteList';

describe('InfiniteList component', () => {
  it('should render correct element', () => {
    const generateMockPosts = (count: number): DataFrontmatter[] =>
      new Array(count).fill(null).map((_, i) => ({
        id: `test-id-${i}`,
        title: `test-title-${i}`,
        date: '2024/1/4',
        description: `test-description-${i}`,
        categories: [],
        tags: [],
      }));
    mockNavigation.searchParams.mockReturnValue(new URLSearchParams());
    render(<InfiniteList items={generateMockPosts(20)} />);
    const link = screen.getByRole('link', { name: 'More Posts' });
    const list = screen.getByRole('list');
    expect(link).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });
});
