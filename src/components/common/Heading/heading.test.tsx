import { render, screen } from '@testing-library/react';

import Heading from '.';

describe('Heading component', () => {
  it('should render correct element', () => {
    const name = 'The heading text';

    render(<Heading>{name}</Heading>);

    const heading = screen.getByRole('heading', { name });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(name);
    expect(heading.tagName).toBe('H2');
  });
});
