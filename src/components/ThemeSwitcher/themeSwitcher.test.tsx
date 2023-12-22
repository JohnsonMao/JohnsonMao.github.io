import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setDeviceTheme } from '~/tests/theme';

import ThemeSwitcher from '.';

function TestThemeComponent({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <ThemeSwitcher />
      {children}
    </ThemeProvider>
  );
}

describe('ThemeSwitch component', () => {
  it('should render correct element', async () => {
    // Arrange
    setDeviceTheme('light');
    render(<TestThemeComponent />);
    const button = screen.getByRole('button');
    // Assert
    expect(button).toBeInTheDocument();
  });

  it('should correctly switch the theme when clicked', async () => {
    // Arrange
    setDeviceTheme('dark');
    render(<TestThemeComponent />);
    const button = screen.getByRole('button');
    // Act
    await userEvent.click(button);
    // Assert
    expect(document.documentElement.getAttribute('style')).toBe(
      'color-scheme: light;'
    );
    // Act
    await userEvent.click(button);
    // Assert
    expect(document.documentElement.getAttribute('style')).toBe(
      'color-scheme: dark;'
    );
  });
});
