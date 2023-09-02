import { render, screen } from '@testing-library/react';

import Header, { HeaderProps } from '.';

describe('Header component', () => {
  it('should render correct element', () => {
    const logoAlt = 'test logo image alt';
    const menu: HeaderProps['menu'] = [
      { text: 'menu_A', href: '/posts/a' },
      { text: 'menu_B', href: '/posts/b' },
    ];

    render(
      <Header
        logoUrl="https://external.com/test.jpg"
        logoAlt={logoAlt}
        menu={menu}
      />
    );

    const header = screen.getByRole('navigation');
    const brandLink = screen.getByRole('img', { name: logoAlt });
    const linkA = screen.getByRole('link', { name: menu[0].text });
    const linkB = screen.getByRole('link', { name: menu[1].text });

    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('NAV');

    expect(brandLink).toBeInTheDocument();
    expect(brandLink.parentElement?.getAttribute('href')).toBe('/');

    expect(linkA).toHaveTextContent(menu[0].text);
    expect(linkA.getAttribute('href')).toBe(menu[0].href);

    expect(linkB).toHaveTextContent(menu[1].text);
    expect(linkB.getAttribute('href')).toBe(menu[1].href);
  });
});
