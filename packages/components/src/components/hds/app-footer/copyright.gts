/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import HdsIcon from '../icon/index.gts';
import HdsTextBody from '../text/body.gts';

export interface HdsAppFooterCopyrightSignature {
  Args: {
    year?: string;
  };
  Element: HTMLDivElement;
}

export default class HdsAppFooterCopyright extends Component<HdsAppFooterCopyrightSignature> {
  /**
   * @param year
   * @type {string}
   * @description The copyright year
   * @default The current year (calculated via `Date()`)
   */
  get year(): string | number {
    return this.args.year ?? new Date().getFullYear();
  }

  <template>
    <div class="hds-app-footer__copyright" ...attributes>
      <HdsIcon @name="hashicorp" />
      <HdsTextBody @tag="span" @size="100">©
        {{this.year}}
        HashiCorp</HdsTextBody>
    </div>
  </template>
}
