import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { intlConfig } from '@/messages/config';
 
const { locales } = intlConfig;
 
export default getRequestConfig(async ({locale}) => {
  const baseLocale = new Intl.Locale(locale).baseName;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(baseLocale)) notFound();
 
  return {
    messages: (await import(`./messages/${baseLocale}.json`)).default
  };
});
