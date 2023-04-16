'use client';

import PostItem from './PostItem';

type PostListProps = {
  posts: (IPost & { id: string })[];
};

function PostList({ posts }: PostListProps) {
  return (
    <section className="mx-auto mt-6 max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
      <ul className="w-full">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

export default PostList;
