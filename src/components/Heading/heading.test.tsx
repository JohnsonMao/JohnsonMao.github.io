import { render, screen } from '@testing-library/react';

import Heading, { H1, H2, H3, H4, H5, H6 } from '.';

describe('Heading component', () => {
  it('should render correct element', () => {
    const name = 'The heading text';

    render(<Heading as="h2">{name}</Heading>);

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(name);
    expect(heading.tagName).toBe('H2');
  });

  it.each([
    [H1, 'H1'],
    [H2, 'H2'],
    [H3, 'H3'],
    [H4, 'H4'],
    [H5, 'H5'],
    [H6, 'H6'],
  ])('should render correct tag name', (Component, expected) => {
    const name = `The ${expected} tag`;

    render(<Component>{name}</Component>);

    const heading = screen.getByRole('heading');

    expect(heading).toHaveTextContent(name);
    expect(heading.tagName).toBe(expected);
  });
});
