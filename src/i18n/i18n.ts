import * as i18next from 'i18next';

/*
 * Create the i18next instance.
 *
 * For documentation, see: https://react.i18next.com/components/i18next-instance.html
 */
export const i18n = (locale?: string) => i18next
  .init({
    fallbackLng: 'en',
    lng: locale,
    ns: ['contents'],
    defaultNS: 'contents',

    interpolation: {
      prefix: '{',
      suffix: '}'
    },

    resources: {
      en: require('./en.json'),
      ru: require('./ru.json')
    }
  });
