type DateOrDateString = Date | `${number}/${number}/${number}`;

type DataDirType = 'posts';

type DataFrontmatter = {
  readonly id: string;
  readonly title: string;
  readonly date: DateOrDateString;
  readonly categories: string[][];
  readonly tags: string[];
  readonly excerpt: string;
  readonly image?: string;
};
