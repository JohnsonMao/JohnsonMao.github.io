import { act, render, screen, waitFor } from '@testing-library/react';
import Header, { HeaderProps } from '.';

const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('Header component', () => {
  const logo = {
    src: 'https://external.com/test.jpg',
    alt: 'test logo image alt',
  };
  const menu: HeaderProps['menu'] = [
    { text: 'Home', href: '/' },
    { text: 'Post', href: '/posts' },
  ];

  beforeEach(() => {
    mockPathname.mockClear();
  });

  it('should render correct element', () => {
    mockPathname.mockReturnValueOnce('/');

    render(<Header logo={logo} menu={menu} />);

    const nav = screen.getByRole('navigation');
    const brandLink = screen.getByRole('img', { name: logo.alt });
    const linkA = screen.getByRole('link', { name: menu[0].text });
    const linkB = screen.getByRole('link', { name: menu[1].text });

    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');

    expect(brandLink).toBeInTheDocument();
    expect(brandLink.parentElement).toHaveAttribute('href', '/');

    expect(linkA).toHaveTextContent(menu[0].text);
    expect(linkA).toHaveAttribute('href', menu[0].href);

    expect(linkB).toHaveTextContent(menu[1].text);
    expect(linkB).toHaveAttribute('href', menu[1].href);
  });

  it('should hide header on scroll down and show on scroll up', async () => {
    mockPathname.mockReturnValueOnce('/');

    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 50,
    });

    render(<Header logo={logo} menu={[]} />);

    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--tw-translate-y': '0px' });
    });

    act(() => {
      window.scrollY = 170;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--tw-translate-y': '-50px' });
    });

    act(() => {
      window.scrollY = 140;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--tw-translate-y': '-20px' });
    });

    act(() => {
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--tw-translate-y': '0px' });
    });
  });

  it.each([
    ['/', menu[0].text],
    ['/posts', menu[1].text],
    ['/en', menu[0].text],
    ['/en/posts', menu[1].text],
    ['/en/posts/test', menu[1].text],
  ])(
    'should render correct active link based on the pathname "%s"',
    (pathname, activeLinkText) => {
      mockPathname.mockReturnValueOnce(pathname);

      render(<Header logo={logo} menu={menu} />);

      const links = screen.getAllByRole('link');
      const activeClassName = 'text-blue-500 hover:text-blue-500';

      links.forEach((link) => {
        if (link.textContent === activeLinkText) {
          expect(link).toHaveClass(activeClassName);
        } else {
          expect(link).not.toHaveClass(activeClassName);
        }
      });
    }
  );
});
