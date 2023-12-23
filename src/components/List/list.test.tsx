import { render, screen } from '@testing-library/react';
import List from '.';

describe('List component', () => {
  it('should render correct element', () => {
    // Arrange
    const items = [
      { id: 'id_1', text: 'text_1' },
      { id: 'id_2', text: 'text_2' },
    ];
    render(<List Item={(data) => data.text} items={items} />);
    const list = screen.getByRole('list');
    // Assert
    expect(list).toBeInTheDocument();
    expect(list.childNodes.length).toBe(items.length);
    expect(list).toHaveTextContent(items[0].text);
    expect(list).toHaveTextContent(items[1].text);
  });
});
