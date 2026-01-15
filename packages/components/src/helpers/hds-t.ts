/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

import type HdsIntlService from '../services/hds-intl';
import type { HdsIntlTOptions } from '../services/hds-intl';

interface HdsTHelperSignature {
  Args: {
    Positional: string[];
    Named: HdsIntlTOptions;
  };
  Return: string;
}

export default class HdsTHelper extends Helper<HdsTHelperSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  compute(
    positional: HdsTHelperSignature['Args']['Positional'],
    named: HdsTHelperSignature['Args']['Named']
  ): HdsTHelperSignature['Return'] {
    const key = positional[0];

    assert(
      'Hds::T helper requires a key as the first positional argument',
      typeof key === 'string' && isPresent(key)
    );

    return this.hdsIntl.t(key, named);
  }
}
