import type { IPostWithId } from '@utils/posts';
import PostItem from './PostItem';

type PostListProps = {
  posts: IPostWithId[];
};

function PostList({ posts }: PostListProps) {
  return (
    <section className="mx-auto mt-6 max-w-4xl">
      <ul className="w-full">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

export default PostList;
