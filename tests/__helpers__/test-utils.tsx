import { type RenderOptions, render } from '@testing-library/react';
import type { Locale, Messages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import React, { act, type ReactElement } from 'react';
import enMessages from '#/content/i18n/messages/en.json';
import zhMessages from '#/content/i18n/messages/zh.json';
import { HeaderHeightProvider } from '@/contexts/header-height-context';

// Messages 映射
const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  zh: zhMessages,
};

// 自定義 render 函數的選項
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: Locale;
  messages?: Messages;
}

/**
 * 自定義 render 函數，自動包裝 NextIntlClientProvider
 *
 * @param ui - 要渲染的 React 組件
 * @param options - 渲染選項，包括 locale 和 messages
 * @returns render 結果，與 @testing-library/react 的 render 相同
 *
 * @example
 * ```tsx
 * import { render, screen } from '#/tests/__helpers__/test-utils';
 *
 * it('renders with i18n', () => {
 *   render(<MyComponent />);
 *   expect(screen.getByText('Hello')).toBeInTheDocument();
 * });
 *
 * it('renders with custom locale', () => {
 *   render(<MyComponent />, { locale: 'zh' });
 *   expect(screen.getByText('你好')).toBeInTheDocument();
 * });
 * ```
 */
const customRender = (
  ui: ReactElement,
  {
    locale = 'en',
    messages = messagesMap[locale],
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: React.PropsWithChildren) => {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HeaderHeightProvider>{children}</HeaderHeightProvider>
      </NextIntlClientProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';

export const mocked = (fn: unknown) => fn as jest.Mock;

export { customRender as render, act };
