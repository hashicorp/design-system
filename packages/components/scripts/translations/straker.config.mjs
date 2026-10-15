/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const SOURCE_LOCALE = 'en-us';

// globalization pipeline language codes mapped to ember-intl locales
export const LANGUAGES = Object.freeze({
  fr: 'fr-fr',
});

export function toEmberLocale(language) {
  if (!Object.hasOwn(LANGUAGES, language)) {
    throw new Error(
      `Unsupported language "${language}"; expected one of: ${Object.keys(LANGUAGES).join(', ')}`
    );
  }

  return LANGUAGES[language];
}
