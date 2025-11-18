import { usePathname } from 'next/navigation';
import getLocale from '@/utils/getLocale';
import { defaultLocale } from '~/data/i18n';

/**
 * This hook retrieves the language setting based on the current pathname.
 */
function useI18n() {
  const pathname = usePathname();
  const lang = getLocale(pathname, defaultLocale);

  return { lang };
}

export default useI18n;
