import { act, render, screen, waitFor } from '@testing-library/react';
import Header, { Avatar } from '../Header';

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
    // Arrange
    render(<Header avatar={avatar} />);
    const brandLink = screen.getByRole('img');
    // Assert
    expect(brandLink).toBeInTheDocument();
    expect(brandLink.parentElement).toHaveAttribute('href', '/');
  });

  it('should hide header on scroll down and show on scroll up', async () => {
    // Arrange
    render(<Header avatar={avatar} scrollThreshold={100} />);
    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');

    // Act
    scrollDownTo(20);
    // Assert
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
    });
    // Act
    scrollDownTo(99);
    // Assert
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '0px' });
    });
    // Act
    scrollDownTo(150);
    // Assert
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '50px' });
    });
    // Act
    scrollDownTo(800);
    // Assert
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '50px' });
    });
    // Act
    scrollUpTo(500);
    // Assert
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '300px' });
    });
    // Act
    scrollUpTo(0);
    // Assert
    await waitFor(() => {
      expect(header).toHaveStyle({ '--header-translate-y': '300px' });
    });
  });
});
