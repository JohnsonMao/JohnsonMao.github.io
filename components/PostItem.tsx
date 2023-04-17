import Link from 'next/link';
import getFormattedDate from '@/lib/formatDate';
import { BsCalendarWeekFill } from 'react-icons/bs'

type PostItemProps = {
  post: IPost & { id: string };
};

function PostItem({ post }: PostItemProps) {
  const { id, title, date, excerpt } = post;
  const formattedDate = getFormattedDate(date);

  return (
    <li key={id} className="mt-4 text-2xl dark:text-white/90">
      <h2 className="text-2xl font-bold dark:text-white/90">
        <Link
          className="underline hover:text-black/70 dark:hover:text-white/90"
          href={`/posts/${id}`}
        >
          {title}
        </Link>
      </h2>
      <p className="my-3 text-base">{excerpt}</p>
      <div className="flex items-center text-sm">
        <BsCalendarWeekFill className="mr-2" />
        {formattedDate}
      </div>
    </li>
  );
}

export default PostItem;
