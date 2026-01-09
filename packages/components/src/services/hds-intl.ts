/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Service from '@ember/service';
import { getOwner } from '@ember/owner';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import type { IntlService } from 'ember-intl';

type IntlTOptions = Parameters<IntlService['t']>[1];

export type HdsIntlTOptions = IntlTOptions & {
  default: string;
};

export default class HdsIntlService extends Service {
  get intl(): IntlService | undefined {
    const owner = getOwner(this);

    if (
      typeof owner?.factoryFor === 'function' &&
      owner.factoryFor('service:intl')
    ) {
      return owner.lookup('service:intl');
    }

    return undefined;
  }

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
