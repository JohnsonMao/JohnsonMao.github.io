import enMessages from '#/content/i18n/messages/en.json';
import { render, screen } from '#/tests/__helpers__/test-utils';
import mockNavigation from '#/tests/navigation';
import Layout, {
  generateMetadata,
  generateStaticParams,
  generateViewport,
} from '@/app/[lang]/layout';
import { routing } from '@/i18n/routing';

jest.mock('next-intl/server', () => ({
  getMessages: jest.fn(() => Promise.resolve(enMessages)),
  setRequestLocale: jest.fn(),
}));

describe('I18n layout', () => {
  it('should render correct element', async () => {
    const testText = 'Test layout component';
    mockNavigation.pathname.mockReturnValueOnce('/');
    const layout = await Layout({
      children: <h2>{testText}</h2>,
      params: Promise.resolve({ lang: 'en' }),
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

  it('should call notFound when locale is not supported in generateMetadata', async () => {
    await generateMetadata({
      params: Promise.resolve({ lang: 'not-supported' }),
      children: null,
    });
    expect(mockNavigation.notFound).toHaveBeenCalled();
  });

  it('should call notFound when locale is not supported in layout', async () => {
    await Layout({
      params: Promise.resolve({ lang: 'not-supported' }),
      children: null,
    });
    expect(mockNavigation.notFound).toHaveBeenCalled();
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en' }),
      children: null,
    });
    expect(metadata).toBeTruthy();
  });

  it('should generate correct metadata for default locale', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: routing.defaultLocale }),
      children: null,
    });
    expect(metadata).toBeTruthy();
    // 驗證預設語言的 URL 不包含語言前綴
    expect(metadata.alternates?.canonical).toBe('https://amao.vercel.app/');
  });

  it('should generate correct static params', async () => {
    const staticParams = await generateStaticParams();
    const expected = routing.locales.map((lang) => ({ lang }));
    expect(staticParams).toStrictEqual(expected);
  });

  it('should generate correct viewport', async () => {
    const viewport = generateViewport();
    expect(viewport).toBeTruthy();
  });
});
