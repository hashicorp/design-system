/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import type { IntlService } from 'ember-intl';
import type { FormatMessageParameters } from 'ember-intl/-private/formatjs';

export type HdsIntlTOptions = FormatMessageParameters[1] & {
  default: string;
  htmlSafe?: boolean | undefined;
  locale?: string | undefined;
};

export default class HdsIntlService extends Service {
  @service('intl') declare intl:IntlService;

  t(key: string, options: HdsIntlTOptions): string {
    const { default: defaultString, ...restOptions } = options;

    assert(
      'HdsIntlService requires a key as the first positional argument',
      typeof key === 'string' && isPresent(key)
    );

    // try to use ember-intl if available and a translation key exists
    if (this.intl !== undefined) {
      const localeIsSet = this.intl.locales && this.intl.locales.length > 0;

      if (localeIsSet && this.intl.exists(key)) {
        return this.intl.t(key, restOptions);
      }
    }

    return defaultString;
  }
}
