import { act, render, screen, waitFor } from '@testing-library/react';
import Header, { Avatar } from '../Header';

describe('Header component', () => {
  const avatar = (
    <Avatar src="https://external.com/test.jpg" alt="test avatar image alt" />
  );

  it('should render correct element', () => {
    render(<Header avatar={avatar} />);

    const brandLink = screen.getByRole('img');

    expect(brandLink).toBeInTheDocument();
    expect(brandLink.parentElement).toHaveAttribute('href', '/');
  });

  it('should hide header on scroll down and show on scroll up', async () => {
    render(<Header avatar={avatar} scrollThreshold={100} />);

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
    });

    act(() => {
      window.scrollY = 98;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 99;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
    });

    act(() => {
      window.scrollY = 149;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 150;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '50px' });
    });

    act(() => {
      window.scrollY = 299;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 300;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '50px' });
    });

    act(() => {
      window.scrollY = 501;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 500;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '300px' });
    });

    act(() => {
      window.scrollY = 1;
      window.dispatchEvent(new Event('scroll'));
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '300px' });
    });
  });
});
