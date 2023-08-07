type DateOrDateString = Date | `${number}/${number}/${number}`;

type DataType = '__mocks__/pass_case' | '__mocks__/same_id_case' | 'posts';

type DataFrontmatter = {
  readonly title: string;
  readonly date: DateOrDateString;
  readonly categories: string[][];
  readonly tags: string[];
  readonly excerpt: string;
  readonly image?: string | URL;
};
