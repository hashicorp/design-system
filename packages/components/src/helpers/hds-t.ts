/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Helper from '@ember/component/helper';
import { getOwner } from '@ember/owner';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

import type { IntlService } from 'ember-intl';
import type { FormatMessageParameters } from 'ember-intl/-private/formatjs';

interface HdsSafeTHelperNamedArgs {
  default: string;
}

interface HdsTHelperSignature {
  Args: {
    Positional: string[];
    Named: HdsSafeTHelperNamedArgs & FormatMessageParameters[1];
  };
  Return: string;
}

export default class HdsTHelper extends Helper<HdsTHelperSignature> {
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

  compute(
    positional: HdsTHelperSignature['Args']['Positional'],
    named: HdsTHelperSignature['Args']['Named']
  ): HdsTHelperSignature['Return'] {
    const key = positional[0];

    const isValidKey = typeof key === 'string' && key.trim() !== '';

    assert('Translation key must be a non-empty string.', isValidKey);

    const { default: defaultString, ...options } = named;

    // try to use ember-intl if available and a translation key exists
    if (this.intl !== undefined) {
      const localeIsSet = isPresent(this.intl.locales);

      if (localeIsSet && this.intl.exists(key)) {
        return this.intl.t(key, options);
      }
    }

    return defaultString;
  }
}
