import { render, screen } from '@testing-library/react';
import Container from '@/components/Container';

describe('Container component', () => {
  it.each([
    [undefined, 'DIV'],
    ['main', 'MAIN'],
  ] as const)('should render correct element', async (as, expectedTagName) => {
    render(<Container as={as} data-testid="container" />);
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe(expectedTagName);
  });
});
