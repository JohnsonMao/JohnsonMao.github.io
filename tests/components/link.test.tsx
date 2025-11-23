import type { Route } from 'next';
import { render, screen } from '#/tests/__helpers__/test-utils';
import mockNavigation from '#/tests/navigation';
import Link from '@/components/Link';

describe('Link component', () => {
  it.each([
    ['?q=test', 'The query link text', '?q=test'],
    ['#anchor', 'The anchor link text', '#anchor'],
    ['/internal', 'The internal link text', '/en/internal'],
    ['https://external.com', 'The external link text', 'https://external.com'],
    [{ pathname: '/internal' }, 'The object href text', '/en/internal'],
  ])('should render correct element', (href, name, expectedHref) => {
    render(<Link href={href as Route}>{name}</Link>);
    const link = screen.getByRole('link', { name });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(name);
    expect(link).toHaveAttribute('href', expectedHref);
    expect(link.tagName).toBe('A');
  });

  it.each([
    ['/internal', '/en/internal'],
    ['/en/internal', '/en/internal'],
    ['/zh/internal', '/en/internal'], // 測試環境默認 locale 是 'en'，所以會轉換為 /en/internal
    ['/fr/internal', '/en/internal'],
  ])('should render correct link element with pathname %s', (pathname, expected) => {
    const name = 'internal link';
    const href = '/internal';
    mockNavigation.pathname.mockReturnValueOnce(pathname);
    render(<Link href={href}>{name}</Link>);
    const link = screen.getByRole('link', { name });
    expect(link).toHaveAttribute('href', expected);
  });
});
