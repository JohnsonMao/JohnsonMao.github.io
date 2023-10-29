import { render, screen } from '@testing-library/react';
import en from '~/i18n/locales/en';
import Page, { generateMetadata } from '../page';

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => []
}));

describe('Posts page component', () => {
  it('should render correct element', async () => {
    const page = await Page({
      params: { lang: 'en' },
    });

    render(page);

    const heading = await screen.findByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({
      params: { lang: 'en' },
    });

    expect(metadata).toStrictEqual({ title: en.common.posts });
  });
});