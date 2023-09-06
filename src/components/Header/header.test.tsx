import { act, render, screen, waitFor } from '@testing-library/react';
import Header, { HeaderProps } from '.';

describe('Header component', () => {
  it('should render correct element', () => {
    const logo = {
      src: 'https://external.com/test.jpg',
      alt: 'test logo image alt',
    };
    const menu: HeaderProps['menu'] = [
      { text: 'menu_A', href: '/posts/a' },
      { text: 'menu_B', href: '/posts/b' },
    ];

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
    const logo = {
      src: 'https://external.com/test.jpg',
      alt: 'test logo image alt',
    };
    const menu: HeaderProps['menu'] = [];

    render(<Header logo={logo} menu={menu} />);

    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveClass('-translate-y-full');
    });

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).not.toHaveClass('-translate-y-full');
    });
  });
});
