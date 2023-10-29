import { render, screen } from '@testing-library/react';
import { locales } from '~/i18n';
import mockPathname from '~/tests/navigation';
import Layout, { generateMetadata, generateStaticParams } from '../layout';

describe('I18n layout component', () => {
  it('should render correct element', async () => {
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

    expect(testChildren).toHaveTextContent(testText);
    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({
      params: { lang: 'en' },
    });

    expect(metadata).toBeTruthy();
  });

  it('should generate correct static params', async () => {
    const staticParams = await generateStaticParams();
    const expected = locales.map(lang => ({ lang }));

    expect(staticParams).toStrictEqual(expected);
  });
});
