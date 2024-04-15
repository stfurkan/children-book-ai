type IntlConfigType = {
  locales: string[];
  defaultLocale: string;
  localePrefix: 'as-needed' | 'always' | 'never';
};

export const intlConfig: IntlConfigType = {
  locales: ["en" ,"tr"],
  defaultLocale: "en",
  localePrefix: "as-needed"
};
