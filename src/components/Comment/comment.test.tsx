import { render, screen } from '@testing-library/react';
import { GiscusProps } from '@giscus/react';
import giscusConfigs from '~/data/giscus';

import Comment from '.';

const getGiscusProps = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('@giscus/react', () => (props: GiscusProps) => {
  getGiscusProps(props);
  return null;
});
jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}));

describe('Comment component', () => {
  it.each(['light', 'dark'])('should render correct element', async (theme) => {
    mockUseTheme.mockReturnValue({ resolvedTheme: theme });

    render(<Comment data-testid="comment" />);

    const comment = screen.getByTestId('comment');
    const expectedProps = JSON.parse(JSON.stringify(giscusConfigs));

    expectedProps.theme = `noborder_${theme}`;

    expect(comment).toBeInTheDocument();
    expect(getGiscusProps).toHaveBeenCalledWith(expectedProps);
  });
});
