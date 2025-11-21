import { render, screen } from '@testing-library/react';
import Page, { generateMetadata } from '@/app/[lang]/(home)/page';

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => [],
}));

describe('Root page component', () => {
  it('should render correct element', async () => {
    const page = await Page({
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({}),
    });
    render(page);
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({}),
    });
    expect(metadata).toStrictEqual({
      title: {
        template: '%s - Home',
        default: 'Home',
      },
    });
  });
});
