import path from 'path';

const IS_TEST_MODE = process.env.NODE_ENV === 'test';

export const MOCKS_DIRECTORY = path.join(process.cwd(), '__mocks__');

export const PASS_CASE_DIRECTORY = path.join(
  MOCKS_DIRECTORY,
  'posts',
  'pass_case'
);

export const SAME_ID_CASE_DIRECTORY = path.join(
  MOCKS_DIRECTORY,
  'posts',
  'same_id_case'
);

export const POSTS_DIRECTORY = IS_TEST_MODE
  ? PASS_CASE_DIRECTORY
  : path.join(process.cwd(), 'markdown', 'posts');
