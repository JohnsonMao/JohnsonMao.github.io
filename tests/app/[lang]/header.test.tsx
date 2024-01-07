import { act, render, screen, waitFor } from '@testing-library/react';
import Header, { Avatar } from '@/app/[lang]/Header';

const scrollDownTo = (to: number) => {
  act(() => {
    window.scrollY = to - 1;
    window.dispatchEvent(new Event('scroll'));
    window.scrollY = to;
    window.dispatchEvent(new Event('scroll'));
  });
}
const scrollUpTo = (to: number) => {
  act(() => {
    window.scrollY = to + 1;
    window.dispatchEvent(new Event('scroll'));
    window.scrollY = to;
    window.dispatchEvent(new Event('scroll'));
  });
}

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

    scrollDownTo(20);
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
    });

    scrollDownTo(99);
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
    });

    scrollDownTo(150);
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '50px' });
    });

    scrollDownTo(800);
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '50px' });
    });

    scrollUpTo(500);
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '300px' });
    });

    scrollUpTo(0);
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '300px' });
    });
  });
});
