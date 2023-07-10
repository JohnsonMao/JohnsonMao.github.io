import { render, screen } from '@testing-library/react';

import PostList, { PostListProps } from '.';

describe('PostList component', () => {
  it('should render correct element', () => {
    const posts: PostListProps['posts'] = [
      {
        id: '2023-07-08-title-a',
        title: 'Title A',
        date: '2023/07/08',
        index_img: 'https://picsum.photos/seed/picsum/200/100',
        banner_img: 'https://picsum.photos/seed/picsum/200/100',
        categories: [['test']],
        tags: ['test'],
        excerpt: 'excerpt',
      },
      {
        id: '2023-07-09-title-b',
        title: 'Title B',
        date: '2023/07/09',
        index_img: 'https://picsum.photos/seed/picsum/200/100',
        banner_img: 'https://picsum.photos/seed/picsum/200/100',
        categories: [['test']],
        tags: ['test'],
        excerpt: 'excerpt',
      },
    ];

    render(<PostList posts={posts} />);

    const postList = screen.getByRole('list');

    expect(postList).toBeInTheDocument();
    expect(postList.tagName).toBe('UL');
    expect(postList.children.length).toBe(posts.length);
    expect(postList).toHaveTextContent(posts[0].title);
    expect(postList).toHaveTextContent(posts[1].title);
  });
});
