import en from '#/content/i18n/messages/en.json';
import { render, screen } from '#/tests/__helpers__/test-utils';
import mockNavigation from '#/tests/navigation';
import Page, { generateMetadata } from '@/app/[lang]/posts/page';

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => [],
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn((namespace: string) => {
    const messages = namespace === 'common' ? en.common : en.postsPage;
    return (key: string) => messages[key as keyof typeof messages];
  }),
}));

describe('Posts page', () => {
  beforeEach(() => {
    mockNavigation.searchParams.mockReturnValue(new URLSearchParams());
  });

  it('should render correct element', async () => {
    const page = await Page();
    render(page);
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata();
    expect(metadata).toStrictEqual({ title: en.common.posts });
  });
});
