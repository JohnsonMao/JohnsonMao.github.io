import { render, screen } from '@testing-library/react';
import List from '.';

describe('List component', () => {
  it('should render correct element', () => {
    const items = [
      { id: 'id_1', text: 'text_1' },
      { id: 'id_2', text: 'text_2' },
    ];

    const Component = (data: (typeof items)[number]) => <div>{data.text}</div>;

    render(<List render={Component} items={items} />);

    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
    expect(list.childNodes.length).toBe(items.length);
    expect(list).toHaveTextContent(items[0].text);
    expect(list).toHaveTextContent(items[1].text);
  });
});
