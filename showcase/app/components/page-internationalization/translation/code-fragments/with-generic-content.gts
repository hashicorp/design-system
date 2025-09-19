/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { service } from '@ember/service';
import { t } from 'ember-intl';
import type { IntlService } from 'ember-intl';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';
import hdsT from '@hashicorp/design-system-components/helpers/hds-t';

import type HdsIntlService from '@hashicorp/design-system-components/services/hds-intl';

enum IntlTranslationValues {
  HdsHelper = 'hds-helper',
  EmberIntlHelper = 'ember-intl-helper',
  HdsIntlService = 'hds-intl-service',
  EmberIntlService = 'ember-intl-service',
}

type IntlTranslation = `${IntlTranslationValues}`;

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

export interface CodeFragmentWithGenericContentSignature {
  Args: {
    lang?: string;
    translationType?: IntlTranslation;
  };
  Element: ['Element'];
}

export default class CodeFragmentWithGenericContentComponents extends Component<CodeFragmentWithGenericContentSignature> {
  @service declare readonly intl: IntlService;
  @service declare readonly hdsIntl: HdsIntlService;

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

  <template>
    <HdsApplicationState as |A|>
      {{#if (eq @translationType "ember-intl-helper")}}
        <A.Header
          @title={{t "showcase.pages.internationalization.translation.title"}}
          @icon="flag"
        />
        <A.Body
          @text={{t "showcase.pages.internationalization.translation.body"}}
        />
        <A.Footer as |F|>
          <F.Button
            @color="primary"
            @text={{t
              "showcase.pages.internationalization.translation.actions.primary"
            }}
          />
          <F.Button
            @color="secondary"
            @text={{t
              "showcase.pages.internationalization.translation.actions.secondary"
            }}
          />
        </A.Footer>
      {{else if (eq @translationType "hds-intl-service")}}
        <A.Header @title={{this.hdsIntlTranslations.title}} @icon="flag" />
        <A.Body @text={{this.hdsIntlTranslations.body}} />
        <A.Footer as |F|>
          <F.Button
            @color="primary"
            @text={{this.hdsIntlTranslations.primaryAction}}
          />
          <F.Button
            @color="secondary"
            @text={{this.hdsIntlTranslations.secondaryAction}}
          />
        </A.Footer>
      {{else if (eq @translationType "ember-intl-service")}}
        <A.Header @title={{this.emberIntlTranslations.title}} @icon="flag" />
        <A.Body @text={{this.emberIntlTranslations.body}} />
        <A.Footer as |F|>
          <F.Button
            @color="primary"
            @text={{this.emberIntlTranslations.primaryAction}}
          />
          <F.Button
            @color="secondary"
            @text={{this.emberIntlTranslations.secondaryAction}}
          />
        </A.Footer>
      {{else}}
        <A.Header
          @title={{hdsT
            "showcase.pages.internationalization.translation.title"
            default="Selected language (Fallback translation)."
          }}
          @icon="flag"
        />
        <A.Body
          @text={{hdsT
            "showcase.pages.internationalization.translation.body"
            default="The text is displayed in the selected language (Fallback translation)."
          }}
        />
        <A.Footer as |F|>
          <F.Button
            @color="primary"
            @text={{hdsT
              "showcase.pages.internationalization.translation.actions.primary"
              default="Primary action (Fallback translation)"
            }}
          />
          <F.Button
            @color="secondary"
            @text={{hdsT
              "showcase.pages.internationalization.translation.actions.secondary"
              default="Secondary action (Fallback translation)"
            }}
          />
        </A.Footer>
      {{/if}}
    </HdsApplicationState>
  </template>
}
