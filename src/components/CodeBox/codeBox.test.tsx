import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodeBox from '.';

describe('CodeBox component', () => {
  it('should render correct element', () => {
    // Arrange
    const code = 'should render correct element';
    render(<CodeBox>{code}</CodeBox>);
    const copyButton = screen.getByRole('button');
    const codeBox = screen.getByText(code);
    // Assert
    expect(copyButton).toBeInTheDocument();
    expect(codeBox).toBeInTheDocument();
    expect(codeBox).toHaveTextContent(code);
    expect(codeBox.tagName).toBe('PRE');
  });

  it('should correctly copy the text when clicked', async () => {
    // Arrange
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const code = 'should correctly copy the text when clicked';
    render(<CodeBox>{code}</CodeBox>);
    const copyButton = screen.getByRole('button');
    expect(screen.queryByText('複製成功！')).toHaveClass('opacity-0');
    // Act
    await userEvent.click(copyButton);
    await userEvent.click(copyButton);
    // Assert
    expect(screen.queryByText('複製成功！')).not.toHaveClass('opacity-0');
    expect(navigator.clipboard.writeText).toBeCalledTimes(2);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    await waitFor(
      () => {
        expect(screen.queryByText('複製成功！')).toHaveClass('opacity-0');
      },
      { timeout: 2000 }
    );
  });
});
