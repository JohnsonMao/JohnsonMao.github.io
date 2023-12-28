import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodeBox from '.';

const mockCopy = jest.fn();

jest.mock('@/utils/clipboard', () => ({
  copyToClipboard: async (props: string) => mockCopy(props),
}));

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
    const code = 'should correctly copy the text when clicked';
    render(<CodeBox>{code}</CodeBox>);
    const copyButton = screen.getByRole('button');
    const user = userEvent.setup();
    expect(screen.queryByText('複製成功！')).toHaveClass('opacity-0');
    // Act
    await act(() => user.click(copyButton));
    await act(() => user.click(copyButton));
    // Assert
    expect(screen.queryByText('複製成功！')).not.toHaveClass('opacity-0');
    expect(mockCopy).toBeCalledTimes(2);
    expect(mockCopy).toHaveBeenCalledWith(code);
    await waitFor(
      () => {
        expect(screen.queryByText('複製成功！')).toHaveClass('opacity-0');
      },
      { timeout: 2000 }
    );
  });
});
