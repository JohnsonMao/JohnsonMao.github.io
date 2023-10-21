import { act, render, screen, waitFor } from '@testing-library/react';
import Header from '.';

describe('Header component', () => {
  const avatar = {
    src: 'https://external.com/test.jpg',
    alt: 'test avatar image alt',
  };

  it('should render correct element', () => {
    render(<Header avatar={avatar} menu={[]} />);

    const nav = screen.getByRole('navigation');
    const brandLink = screen.getByRole('img', { name: avatar.alt });

    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');

    expect(brandLink).toBeInTheDocument();
    expect(brandLink.parentElement).toHaveAttribute('href', '/');
  });

  it('should hide header on scroll down and show on scroll up', async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 50,
    });

    render(<Header avatar={avatar} menu={[]} scrollThreshold={100} />);

    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    act(() => {
      window.scrollY = 19;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '80px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.4' });
    });

    act(() => {
      window.scrollY = 98;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 99;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '1px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1' });
    });

    act(() => {
      window.scrollY = 149;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '150px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1' });
    });

    act(() => {
      window.scrollY = 251;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 250;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '200px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1' });
    });

    act(() => {
      window.scrollY = 1;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '200px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '100px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.5' });
    });
  });

  it('should calculate the correct styles even when `clientHeight` is `undefined`', async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: undefined,
    });

    render(<Header avatar={avatar} menu={[]} scrollThreshold={100} />);

    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '200px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1' });
    });
  });
});
