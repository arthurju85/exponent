import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { Locale, defaultLocale, locales } from '@/lib/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(COOKIE_NAME)?.value;

  if (locale && locales.includes(locale as Locale)) {
    return locale as Locale;
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
    now: new Date(),
  };
});
