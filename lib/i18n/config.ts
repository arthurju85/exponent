export type Locale = (typeof locales)[number];

export const locales = [
  'en',      // English (default)
  'zh-CN',   // Simplified Chinese
  'zh-HK',   // Traditional Chinese (Hong Kong)
  'ja',      // Japanese
] as const;

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-HK': '繁體中文 (香港)',
  'ja': '日本語',
};

export const localeFlags: Record<Locale, string> = {
  'en': '🇺🇸',
  'zh-CN': '🇨🇳',
  'zh-HK': '🇭🇰',
  'ja': '🇯🇵',
};
