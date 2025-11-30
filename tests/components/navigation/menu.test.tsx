import { render, screen } from '#/tests/__helpers__/test-utils';
import mockNavigation from '#/tests/navigation';
import Menu, { MenuProps } from '@/components/navigation/menu';

describe('Menu component', () => {
  it('should render correct element', () => {
    const menu: MenuProps['menu'] = [
      { text: 'Home', href: '/' },
      { text: 'Post', href: '/posts' },
    ];
    mockNavigation.pathname.mockReturnValue('/');
    render(<Menu menu={menu} />);
    const nav = screen.getByRole('navigation');
    const linkA = screen.getByRole('link', { name: menu[0].text });
    const linkB = screen.getByRole('link', { name: menu[1].text });
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');
    expect(linkA).toHaveTextContent(menu[0].text);
    expect(linkA).toHaveAttribute('href', '/en');
    expect(linkB).toHaveTextContent(menu[1].text);
    expect(linkB).toHaveAttribute('href', '/en/posts');
  });

  it.each([
    ['Home', 'Post', '/'],
    ['Post', 'Home', '/posts'],
    ['Home', 'Post', '/'],
    ['Post', 'Home', '/posts'],
    ['Post', 'Home', '/posts/test'],
  ])('should render correct active link based on the pathname "%s"', (activeLinkText, otherLinkText, expectedPathname) => {
    const menu: MenuProps['menu'] = [
      { text: 'Home', href: '/' },
      { text: 'Post', href: '/posts' },
    ];
    mockNavigation.pathname.mockReturnValue(expectedPathname);
    render(<Menu menu={menu} />);
    const activeLink = screen.getByRole('link', { name: activeLinkText });
    const otherLink = screen.getByRole('link', { name: otherLinkText });
    expect(activeLink).toHaveClass('neon-text');
    expect(otherLink).not.toHaveClass('neon-text');
  });
});
