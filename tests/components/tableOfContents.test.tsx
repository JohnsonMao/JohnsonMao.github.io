import { render, screen } from '@testing-library/react';
import { H2, H3 } from '@/components/Heading';
import TableOfContents from '@/components/TableOfContents';

describe('TableOfContents component', () => {
  const mockIntersectionObserver = jest.fn();
  const mockObserverCallback = jest.fn();

  beforeEach(() => {
    mockIntersectionObserver.mockImplementation((callback) => {
      callback(mockObserverCallback());
      return {
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      };
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it('should render correct element', () => {
    const articleHeadings = [
      { Heading: H2, id: 'test-1' },
      { Heading: H3, id: 'test-2' },
      { Heading: H3, id: 'test-3' },
      { Heading: H2, id: 'test-4' },
      { Heading: H2, id: 'test-5' },
    ];
    mockObserverCallback.mockReturnValueOnce([]);
    render(
      <>
        <TableOfContents targetId="#test-id" />
        <article id="test-id">
          {articleHeadings.map(({ Heading, id }) => (
            <Heading key={id} id={id}>
              {id}
            </Heading>
          ))}
        </article>
      </>
    );
    const toc = screen.getByRole('navigation');
    const anchorLinks = toc.querySelectorAll('a');

    expect(toc).toBeInTheDocument();
    expect(anchorLinks.length).toBe(5);
    expect(anchorLinks[0]).toHaveAttribute('href', '#test-1');
    expect(anchorLinks[1]).toHaveAttribute('href', '#test-2');
    expect(anchorLinks[2]).toHaveAttribute('href', '#test-3');
    expect(anchorLinks[3]).toHaveAttribute('href', '#test-4');
    expect(anchorLinks[4]).toHaveAttribute('href', '#test-5');
  });

  it('should render correct TOC tree based on article headings', () => {
    const articleHeadings = [
      { Heading: H2, id: 'test-1' },
      { Heading: H3, id: 'test-2' },
      { Heading: H3, id: 'test-3' },
      { Heading: H2, id: 'test-4' },
      { Heading: H2, id: 'test-5' },
    ];
    mockObserverCallback.mockReturnValueOnce([]);
    render(
      <>
        <TableOfContents targetId="#test-id" />
        <article id="test-id">
          {articleHeadings.map(({ Heading, id }) => (
            <Heading key={id} id={id}>
              {id}
            </Heading>
          ))}
        </article>
      </>
    );
    const toc = screen.getByRole('navigation');
    const menu = toc.querySelectorAll('nav > ul > li');
    const subMenu = menu[0].querySelectorAll('li');

    expect(toc).toBeInTheDocument();
    expect(menu.length).toBe(3);
    expect(subMenu.length).toBe(2);
  });

  it('should apply the correct active class name', () => {
    const articleHeadings = [
      { Heading: H2, id: 'test-1' },
      { Heading: H3, id: 'test-2' },
      { Heading: H3, id: 'test-3' },
      { Heading: H2, id: 'test-4' },
      { Heading: H2, id: 'test-6' },
    ];
    mockObserverCallback.mockReturnValueOnce([
      {
        isIntersecting: false,
        target: { id: 'test-2' },
      },
      {
        isIntersecting: true,
        target: { id: 'test-3' },
      },
    ]);
    render(
      <>
        <TableOfContents targetId="#test-id" />
        <article id="test-id">
          {articleHeadings.map(({ Heading, id }) => (
            <Heading key={id} id={id}>
              {id}
            </Heading>
          ))}
        </article>
      </>
    );
    const toc = screen.getByRole('navigation');
    const anchorLinks = toc.querySelectorAll('a');
    const activeClassName = 'text-primary-500';

    expect(anchorLinks[0]).toHaveClass(activeClassName);
    expect(anchorLinks[1]).not.toHaveClass(activeClassName);
    expect(anchorLinks[2]).toHaveClass(activeClassName);
    expect(anchorLinks[3]).not.toHaveClass(activeClassName);
  });
});
