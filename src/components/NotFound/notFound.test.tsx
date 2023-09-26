import { render, screen } from '@testing-library/react';

import en from '~/i18n/locales/en';
import NotFound from '.';

const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('NotFound component', () => {
  it('should render correct element', async () => {
    mockPathname.mockReturnValueOnce('/en/test/path');

    render(<NotFound />);

    const heading = await screen.findByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(en.notFound.message)
  });
});
