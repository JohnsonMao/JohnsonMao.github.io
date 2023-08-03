import { render, screen } from '@testing-library/react';

import Link from '.';

const mockPathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

describe('Link component', () => {
  beforeEach(() => {
    mockPathname.mockClear();
  });

  it.each([
    ['#anchor', 'The anchor link text'],
    ['/internal', 'The internal link text'],
    ['https://external.com', 'The external link text'],
  ])('should render correct element', (href, name) => {
    render(<Link href={href}>{name}</Link>);

    const link = screen.getByRole('link', { name });

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(name);
    expect(link).toHaveAttribute('href', href);
    expect(link.tagName).toBe('A');
  });

  it.each([
    ['/internal', '/internal'],
    ['/en/internal', '/en/internal'],
    ['/zh-TW/internal', '/zh-TW/internal'],
    ['/fr-CH/internal', '/internal'],
  ])('should render correct link element with pathname %s', (pathname, expected) => {
    const name = 'internal link';
    const href = '/internal';

    mockPathname.mockReturnValueOnce(pathname);

    render(<Link href={href}>{name}</Link>);

    const link = screen.getByRole('link', { name });

    expect(link).toHaveAttribute('href', expected);
  });
});
