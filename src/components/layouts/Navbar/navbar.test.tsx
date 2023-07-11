import { render, screen } from '@testing-library/react';

import Navbar, { NavbarProps } from '.';

describe('Navbar component', () => {
  it('should render correct element', () => {
    const title: NavbarProps['title'] = 'Title';
    const menu: NavbarProps['menu'] = [
      { title: 'menu_A', url: '/a' },
      { title: 'menu_B', url: '/b' },
    ];

    render(<Navbar title={title} menu={menu} />);

    const navbar = screen.getByRole('navigation');
    const brandLink = screen.getByRole('link', { name: title });
    const linkA = screen.getByRole('link', { name: menu[0].title });
    const linkB = screen.getByRole('link', { name: menu[1].title });

    expect(navbar).toBeInTheDocument();
    expect(navbar.tagName).toBe('NAV');

    expect(brandLink).toHaveTextContent(title);
    expect(brandLink.getAttribute('href')).toBe('/');

    expect(linkA).toHaveTextContent(menu[0].title);
    expect(linkA.getAttribute('href')).toBe(menu[0].url);

    expect(linkB).toHaveTextContent(menu[1].title);
    expect(linkB.getAttribute('href')).toBe(menu[1].url);
  });
});
