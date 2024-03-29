type DateOrDateString = Date | `${number}/${number}/${number}`;

type DataDirType = 'posts';

type DataFrontmatter = {
  readonly id: string;
  readonly title: string;
  readonly date: DateOrDateString;
  readonly categories: string[][];
  readonly tags: string[];
  readonly description: string;
  readonly image?: string;
};

type Data = {
  id: string;
  content: React.ReactElement;
  frontmatter: DataFrontmatter;
};
