import { render, screen } from '@testing-library/react';

import Link from '.';

describe('Link component', () => {
  it('should render correct element', () => {
    const links = {
      anchor: {
        href: '#anchor',
        text: 'The anchor link text',
      },
      internal: {
        href: '/internal',
        text: 'The internal link text',
      },
      external: {
        href: 'https://external.com',
        text: 'The external link text',
      },
    };

    const keys: <T>(object: T) => (keyof T)[] = Object.keys;

    render(
      <>
        {keys(links).map((key) => (
          <Link key={key} href={links[key].href}>
            {links[key].text}
          </Link>
        ))}
      </>
    );

    const anchorLink = screen.getByRole('link', {
      name: links.anchor.text,
    });
    const internalLink = screen.getByRole('link', {
      name: links.internal.text,
    });
    const externalLink = screen.getByRole('link', {
      name: links.external.text,
    });

    expect(anchorLink).toBeInTheDocument();
    expect(anchorLink).toHaveTextContent(links.anchor.text);
    expect(anchorLink).toHaveAttribute('href', links.anchor.href);
    expect(anchorLink.tagName).toBe('A');

    expect(internalLink).toBeInTheDocument();
    expect(internalLink).toHaveTextContent(links.internal.text);
    expect(internalLink).toHaveAttribute('href', links.internal.href);
    expect(internalLink.tagName).toBe('A');

    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveTextContent(links.external.text);
    expect(externalLink).toHaveAttribute('href', links.external.href);
    expect(externalLink.tagName).toBe('A');
  });
});
