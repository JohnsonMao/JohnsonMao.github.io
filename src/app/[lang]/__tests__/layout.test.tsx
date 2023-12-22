import { render, screen } from '@testing-library/react';
import { locales } from '~/i18n';
import mockPathname from '~/tests/navigation';
import Layout, { generateMetadata, generateStaticParams } from '../layout';

describe('I18n layout', () => {
  it('should render correct element', async () => {
    // Arrange
    const testText = 'Test layout component';
    mockPathname.mockReturnValueOnce('/');
    const layout = await Layout({
      children: <h2>{testText}</h2>,
      params: { lang: 'en' }
    });
    render(layout);
    const testChildren = await screen.findByRole('heading');
    const header = await screen.findByRole('banner');
    const nav = await screen.findByRole('navigation');
    const footer = await screen.findByRole('contentinfo');
    // Assert
    expect(testChildren).toHaveTextContent(testText);
    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    // Arrange
    const metadata = await generateMetadata({
      params: { lang: 'en' },
    });
    // Assert
    expect(metadata).toBeTruthy();
  });

  it('should generate correct static params', async () => {
    // Arrange
    const staticParams = await generateStaticParams();
    const expected = locales.map(lang => ({ lang }));
    // Assert
    expect(staticParams).toStrictEqual(expected);
  });
});
