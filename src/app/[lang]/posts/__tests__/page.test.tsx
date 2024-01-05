import { render, screen } from '@testing-library/react';
import en from '~/i18n/locales/en';
import Page, { generateMetadata } from '../page';

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => [],
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

describe('Posts page', () => {
  it('should render correct element', async () => {
    // Arrange
    const page = await Page({ params: { lang: 'en' } });
    render(page);
    const heading = await screen.findByRole('heading', { level: 1 });
    // Assert
    expect(heading).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    // Arrange
    const metadata = await generateMetadata({
      params: { lang: 'en' },
    });
    // Assert
    expect(metadata).toStrictEqual({ title: en.common.posts });
  });
});
