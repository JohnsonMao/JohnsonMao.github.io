import { render, screen } from '@testing-library/react';
import mockPathname from '~/tests/navigation';
import Menu, { MenuProps } from '../Menu';

describe('Menu component', () => {
  it('should render correct element', () => {
    // Arrange
    const menu: MenuProps['menu'] = [
      { text: 'Home', href: '/' },
      { text: 'Post', href: '/posts' },
    ];
    mockPathname.mockReturnValue('/');
    render(<Menu menu={menu} />);
    const nav = screen.getByRole('navigation');
    const linkA = screen.getByRole('link', { name: menu[0].text });
    const linkB = screen.getByRole('link', { name: menu[1].text });
    // Assert
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');
    expect(linkA).toHaveTextContent(menu[0].text);
    expect(linkA).toHaveAttribute('href', menu[0].href);
    expect(linkB).toHaveTextContent(menu[1].text);
    expect(linkB).toHaveAttribute('href', menu[1].href);
  });

  it.each([
    ['Home', 'Post', '/'],
    ['Post', 'Home', '/posts'],
    ['Home', 'Post', '/en'],
    ['Post', 'Home', '/en/posts'],
    ['Post', 'Home', '/en/posts/test'],
  ])(
    'should render correct active link based on the pathname "%s"',
    (activeLinkText, otherLinkText, pathname) => {
      // Arrange
      const menu: MenuProps['menu'] = [
        { text: 'Home', href: '/' },
        { text: 'Post', href: '/posts' },
      ];
      mockPathname.mockReturnValue(pathname);
      render(<Menu menu={menu} />);
      const activeLink = screen.getByRole('link', { name: activeLinkText });
      const otherLink = screen.getByRole('link', { name: otherLinkText });
      const activeClassName = 'neon-text';
      // Assert
      expect(activeLink).toHaveClass(activeClassName);
      expect(otherLink).not.toHaveClass(activeClassName);
    }
  );
});
