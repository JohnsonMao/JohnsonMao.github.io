import { render, screen } from '@testing-library/react';
import en from '~/i18n/locales/en';
import Page, { generateMetadata } from '../page';

jest.mock('@/utils/mdx', () => ({
  getAllDataFrontmatter: () => [],
}));

describe('Root page component', () => {
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
    expect(metadata).toStrictEqual({ title: en.common.home });
  });
});
