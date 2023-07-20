import { render, screen } from '@testing-library/react';

import TableOfContents from '.';

jest.mock(
  'github-slugger',
  () =>
    class GithubSlugger {
      slug = (text: string) => text;
    }
);
jest.mock('@/hooks/useIntersectionObserver', () => () => [
  [
    {
      isIntersecting: false,
      target: { id: 'H2_2' },
    },
    {
      isIntersecting: true,
      target: { id: 'H3_2-1' },
    },
  ],
  () => undefined,
]);

describe('TableOfContents component', () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();

    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should render correct element', () => {
    const source = '# H1\n## H2_1\n### H3_1-1\n## H2_2\n### H3_2-1\n';

    render(<TableOfContents source={source} />);

    const anchorLinks = screen.getAllByRole('link');

    expect(anchorLinks.length).toBe(4);
    expect(anchorLinks[0]).toHaveAttribute('href', '#H2_1');
    expect(anchorLinks[1]).toHaveAttribute('href', '#H3_1-1');
    expect(anchorLinks[2]).toHaveAttribute('href', '#H2_2');
    expect(anchorLinks[3]).toHaveAttribute('href', '#H3_2-1');
    expect(anchorLinks[3]).toHaveClass('font-medium');
  });
});
