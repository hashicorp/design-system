/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Helper from '@ember/component/helper';
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
    hdsIntl: HdsIntlService;
    compute(positional: HdsTHelperSignature['Args']['Positional'], named: HdsTHelperSignature['Args']['Named']): HdsTHelperSignature['Return'];
}
export {};
