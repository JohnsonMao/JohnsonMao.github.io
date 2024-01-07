import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodeBox from '@/components/CodeBox';

const mockCopy = jest.fn();

jest.mock('@/utils/clipboard', () => ({
  copyToClipboard: async (props: string) => mockCopy(props),
}));

describe('CodeBox component', () => {
  it('should render correct element', () => {
    const code = 'should render correct element';
    render(<CodeBox>{code}</CodeBox>);
    const copyButton = screen.getByRole('button');
    const codeBox = screen.getByText(code);
    expect(copyButton).toBeInTheDocument();
    expect(codeBox).toBeInTheDocument();
    expect(codeBox).toHaveTextContent(code);
    expect(codeBox.tagName).toBe('PRE');
  });

  it('should correctly copy the text when clicked', async () => {
    const code = 'should correctly copy the text when clicked';
    render(<CodeBox>{code}</CodeBox>);
    const copyButton = screen.getByRole('button');
    const user = userEvent.setup();
    expect(screen.queryByText('複製成功！')).toHaveClass('opacity-0');

    await act(() => user.click(copyButton));
    await act(() => user.click(copyButton));
    expect(screen.queryByText('複製成功！')).not.toHaveClass('opacity-0');
    expect(mockCopy).toHaveBeenCalledTimes(2);
    expect(mockCopy).toHaveBeenCalledWith(code);
    await waitFor(
      () => {
        expect(screen.queryByText('複製成功！')).toHaveClass('opacity-0');
      },
      { timeout: 2000 }
    );
  });
});
