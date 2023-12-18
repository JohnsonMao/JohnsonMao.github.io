import { render, screen } from '@testing-library/react';

import { formatDate } from '@/utils/date';
import Article from '../Article';

describe('Article component', () => {
  it('should render correct element', () => {
    const data: DataFrontmatter = {
      id: 'test_id',
      title: 'title test',
      date: '2023/09/09',
      image: 'https://external.com/test.jpg',
      categories: [
        ['categories_A', 'categories_A_1'],
        ['categories_B', 'categories_B_1'],
      ],
      tags: ['tag_A', 'tag_B'],
      description: 'description test',
    };

    render(<Article {...data} />);

    const article = screen.getByRole('article');
    const image = screen.getByRole('img');
    const heading = screen.getByRole('heading');

    expect(article).toBeInTheDocument();
    expect(image).toHaveAttribute('src', data.image);
    expect(image).toHaveAttribute('alt', `${data.title} cover`);
    expect(heading).toHaveTextContent(data.title);
    expect(article).toHaveTextContent(formatDate(data.date));
    expect(article).toHaveTextContent(data.description);
  });
});
