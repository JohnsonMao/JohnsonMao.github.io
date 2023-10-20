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

    render(<Header avatar={avatar} menu={[]} scrollThreshold={120} />);

    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '100.00px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.42' });
    });

    act(() => {
      window.scrollY = 170;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '-50px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '0.00px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.00' });
    });

    act(() => {
      window.scrollY = 140;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '-20px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '0.00px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.00' });
    });

    act(() => {
      window.scrollY = 80;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '40.00px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.17' });
    });

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '120.00px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.50' });
    });
  });

  it('should calculate the correct styles even when `clientHeight` is `undefined`', async () => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: undefined,
    });

    render(<Header avatar={avatar} menu={[]} scrollThreshold={120} />);

    const header = screen.getByRole('banner');

    expect(header.tagName).toBe('HEADER');

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
      expect(header).toHaveStyle({ '--avatar-translate-y': '0.00px' });
      expect(header).toHaveStyle({ '--avatar-scale': '1.00' });
    });
  });
});
