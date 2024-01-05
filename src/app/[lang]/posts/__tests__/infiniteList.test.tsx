import { render, screen } from '@testing-library/react';
import InfiniteList from '../InfiniteList';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '';
  },
}));

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
    render(<InfiniteList items={generateMockPosts(20)} />);

    const link = screen.getByRole('link', { name: '更多文章' });
    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
