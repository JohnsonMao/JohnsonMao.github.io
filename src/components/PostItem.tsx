import Link from 'next/link';
import Image from 'next/image';
import { BsCalendar4Week } from 'react-icons/bs';
import { MdOutlineWidgets } from 'react-icons/md';
import { AiOutlineTags } from 'react-icons/ai';
import getFormattedDate from '@utils/formatDate';

type PostItemProps = {
  post: IPost & { id: string };
};

function PostItem({ post }: PostItemProps) {
  const { id, title, date, categories, tags, excerpt, index_img } = post;
  const formattedDate = getFormattedDate(date);

  return (
    <li key={id} className="mt-4 text-2xl dark:text-white/90">
      <article className="flex gap-6">
        <div className="relative h-48 w-1/3 shrink-0">
          <Image
            className="object-cover"
            src={index_img}
            alt={`${title} cover`}
            fill
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold dark:text-white/90">
            <Link
              className="underline hover:text-black/70 dark:hover:text-white/70"
              href={`/posts/${id}`}
            >
              {title}
            </Link>
          </h2>
          <p className="my-3 text-base">{excerpt}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-1">
              <BsCalendar4Week />
              <time className="whitespace-nowrap">{formattedDate}</time>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <MdOutlineWidgets />
              {categories.map((category) =>
                category.map((tag) => (
                  <Link
                    key={category + tag}
                    className="whitespace-nowrap hover:text-black/70 dark:hover:text-white/70"
                    href="/"
                  >
                    {tag}
                  </Link>
                ))
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <AiOutlineTags />
              {tags.map((tag) => (
                <Link
                  key={tag}
                  className="whitespace-nowrap hover:text-black/70 dark:hover:text-white/70"
                  href="/"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default PostItem;
