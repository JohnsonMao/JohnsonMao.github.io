import Link from 'next/link';
import getFormattedDate from '@/lib/formatDate';

type PostItemProps = {
  post: IPost & { id: string };
};

function PostItem({ post }: PostItemProps) {
  const { id, title, date, excerpt } = post;
  const formattedDate = getFormattedDate(date);

  return (
    <li key={id} className="mt-4 text-2xl dark:text-white/90">
      <Link
        className="underline hover:text-black/70 dark:hover:text-white/90"
        href={`/posts/${id}`}
      >
        {title}
      </Link>
      <p>{excerpt}</p>
      <p className="mt-1 text-sm">{formattedDate}</p>
    </li>
  );
}

export default PostItem;
