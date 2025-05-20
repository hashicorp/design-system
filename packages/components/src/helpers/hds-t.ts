/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

import type { IntlService } from 'ember-intl';

interface HdsSafeTHelperNamedArgs {
  default: string;
  [key: string]: unknown;
}

interface HdsTHelperSignature {
  Args: {
    Positional: string[];
    Named: HdsSafeTHelperNamedArgs;
  };
  Return: string;
}

export default class HdsTHelper extends Helper<HdsTHelperSignature> {
  @service intl?: IntlService;

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
      const localeIsSet = isPresent(this.intl.locale);

      if (localeIsSet && this.intl.exists(key)) {
        return this.intl.t(key, options);
      }
    }

    return defaultString;
  }
}
