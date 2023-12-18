import { BsCalendar4Week } from 'react-icons/bs';
import { MdOutlineWidgets } from 'react-icons/md';
import { AiOutlineTags } from 'react-icons/ai';

import { H2 } from '@/components/Heading';
import Image from '@/components/Image';
import Link from '@/components/Link';
import { formatDate } from '@/utils/date';

type ArticleProps = DataFrontmatter;

function Article({
  id,
  title,
  date,
  categories,
  tags,
  description,
  image,
}: ArticleProps) {
  const formattedDate = formatDate(date);

  return (
    <article className="flex gap-6">
      <div className="relative h-48 w-1/3 shrink-0">
        {image && (
          <Image
            className="h-full object-cover"
            src={image}
            alt={`${title} cover`}
            fill
          />
        )}
      </div>
      <div className="prose prose-zinc dark:prose-invert">
        <H2>
          <Link href={`/posts/${id}`}>{title}</Link>
        </H2>
        <p className="multiline-ellipsis">{description}</p>
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
                  className="whitespace-nowrap"
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
              <Link key={tag} className="whitespace-nowrap" href="/">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Article;
