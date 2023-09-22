import { render, screen } from '@testing-library/react';

import zhTW from '~/i18n/locales/zh-TW';
import NotFound from '.';

describe('NotFound component', () => {
  it('should render correct element', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(zhTW.notFound.message)
  });
});
