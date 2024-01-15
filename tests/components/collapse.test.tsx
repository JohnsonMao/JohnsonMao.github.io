import { render, screen, waitFor } from '@testing-library/react';
import { Globals } from '@react-spring/web';
import Collapse from '@/components/Collapse';

describe('Collapse component', () => {
  beforeAll(() => {
    Globals.assign({ skipAnimation: true });
  });

  it('should render correct element', async () => {
    render(
      <Collapse isOpen data-testid="collapse">
        Test
      </Collapse>
    );
    const collapse = screen.getByTestId('collapse');

    expect(collapse).toBeInTheDocument();
    expect(collapse).toHaveTextContent('Test');
  });

  it('should update Collapse component styles on re-render', async () => {
    const { rerender } = render(
      <Collapse isOpen={false} data-testid="collapse">
        Test
      </Collapse>
    );
    const collapse = screen.getByTestId('collapse');

    await waitFor(() => expect(collapse).toHaveStyle('opacity: 0.6'));

    rerender(
      <Collapse isOpen={true} data-testid="collapse">
        Test
      </Collapse>
    );

    await waitFor(() => expect(collapse).toHaveStyle('opacity: 1'));
  });
});
