/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import type { IntlService } from 'ember-intl';
import type HdsIntlService from '@hashicorp/design-system-components/services/hds-intl';
import type { PageInternationalizationTranslationModel } from 'showcase/routes/page-internationalization/translation';

type ServiceTranslation = {
  key: string;
  default: string;
};

type ServiceTranslationsMap = {
  title: ServiceTranslation;
  body: ServiceTranslation;
  primaryAction: ServiceTranslation;
  secondaryAction: ServiceTranslation;
};

type ServiceTranslationsOutput = {
  title: string;
  body: string;
  primaryAction: string;
  secondaryAction: string;
};

const SERVICE_TRANSLATIONS: ServiceTranslationsMap = {
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
  declare model: PageInternationalizationTranslationModel;

  @service intl!: IntlService;
  @service hdsIntl!: HdsIntlService;

  @tracked lang: string | undefined = undefined;

  get hdsIntlTranslations(): ServiceTranslationsOutput {
    return Object.entries(SERVICE_TRANSLATIONS).reduce(
      (acc, [key, translationKey]) => {
        acc[key as keyof ServiceTranslationsMap] = this.hdsIntl.t(
          translationKey.key,
          {
            default: translationKey.default,
          },
        );
        return acc;
      },
      {} as Record<keyof ServiceTranslationsMap, string>,
    );
  }

  get emberIntlTranslations(): ServiceTranslationsOutput {
    return Object.entries(SERVICE_TRANSLATIONS).reduce(
      (acc, [key, translationKey]) => {
        acc[key as keyof ServiceTranslationsMap] = this.intl.t(
          translationKey.key,
        );
        return acc;
      },
      {} as Record<keyof ServiceTranslationsMap, string>,
    );
  }

  @action
  setLang(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.lang = value;

    try {
      this.intl.setLocale(value);
    } catch {
      console.error(
        `No locale found for the provided language code. Using fallback translation.`,
      );
    }
  }
}
