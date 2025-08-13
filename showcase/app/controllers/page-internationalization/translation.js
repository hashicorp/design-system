/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

const SERVICE_TRANSLATIONS = {
  title: {
    key: 'showcase.pages.internationalization.translation.title',
    default: 'Selected language (Fallback translation).',
  },
  body: {
    key: 'showcase.pages.internationalization.translation.body',
    default:
      'The text is displayed in the selected language (Fallback translation).',
  },
  primaryAction: {
    key: 'showcase.pages.internationalization.translation.actions.primary',
    default: 'Primary action (Fallback translation)',
  },
  secondaryAction: {
    key: 'showcase.pages.internationalization.translation.actions.secondary',
    default: 'Secondary action (Fallback translation)',
  },
};

export default class PageInternationalizationTranslationController extends Controller {
  @service intl;
  @service hdsIntl;

  @tracked lang = null;

  get hdsIntlTranslations() {
    return Object.entries(SERVICE_TRANSLATIONS).reduce(
      (acc, [key, translationKey]) => {
        acc[key] = this.hdsIntl.t(translationKey.key, {
          default: translationKey.default,
        });
        return acc;
      },
      {},
    );
  }

  get emberIntlTranslations() {
    return Object.entries(SERVICE_TRANSLATIONS).reduce(
      (acc, [key, translationKey]) => {
        acc[key] = this.intl.t(translationKey.key);
        return acc;
      },
      {},
    );
  }

  @action
  setLang(event) {
    const { value } = event.target;
    this.lang = value;

    try {
      this.intl.setLocale(value);
    } catch {
      // will throw an error if the locale is unset
    }
  }
}
