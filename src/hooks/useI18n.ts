import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Dictionary, getDictionary } from '~/i18n';
import zhTW from '~/i18n/locales/zh-TW';
import getLocale from '@/utils/getLocale';

function useI18n() {
  const pathname = usePathname();
  const lang = getLocale(pathname);
  const [dict, setDict] = useState<Dictionary>(zhTW);

  useEffect(() => {
    getDictionary(lang).then((data) => setDict(data));
  }, [lang]);

  return { lang, dict };
}

export default useI18n;
