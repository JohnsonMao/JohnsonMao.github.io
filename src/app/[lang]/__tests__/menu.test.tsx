import { render, screen } from '@testing-library/react';
import mockPathname from '~/tests/navigation';
import Menu, { MenuProps } from '../Menu';

describe('Menu component', () => {
  const menu: MenuProps['menu'] = [
    { text: 'Home', href: '/' },
    { text: 'Post', href: '/posts' },
  ];

  it('should render correct element', () => {
    mockPathname.mockReturnValueOnce('/');

    render(<Menu menu={menu} />);

    const nav = screen.getByRole('navigation');
    const linkA = screen.getByRole('link', { name: menu[0].text });
    const linkB = screen.getByRole('link', { name: menu[1].text });

    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');

    expect(linkA).toHaveTextContent(menu[0].text);
    expect(linkA).toHaveAttribute('href', menu[0].href);

    expect(linkB).toHaveTextContent(menu[1].text);
    expect(linkB).toHaveAttribute('href', menu[1].href);
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

      render(<Menu menu={menu} />);

      const links = screen.getAllByRole('link');
      const activeClassName = 'text-primary-500';

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
