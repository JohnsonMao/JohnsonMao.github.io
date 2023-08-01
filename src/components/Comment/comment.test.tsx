import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Comment from '.';
import {
  setDeviceTheme,
  TestThemeComponent,
} from '../ThemeSwitch/themeSwitch.test';

describe('Comment component', () => {
  it('should render correct element', async () => {
    setDeviceTheme('light');

    render(
      <TestThemeComponent>
        <Comment data-testid="comment" />
      </TestThemeComponent>
    );

    const comment = screen.getByTestId('comment');
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(comment).toBeInTheDocument();
  });
});
