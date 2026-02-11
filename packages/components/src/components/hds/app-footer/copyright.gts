/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { concat } from '@ember/helper';

import hdsT from '../../../helpers/hds-t.ts';
import HdsIcon from '../icon/index.gts';
import HdsTextBody from '../text/body.gts';

export interface HdsAppFooterCopyrightSignature {
  Args: {
    year?: string;
  };
  Element: HTMLDivElement;
}

export default class HdsAppFooterCopyright extends Component<HdsAppFooterCopyrightSignature> {
  get year(): string | number {
    return this.args.year ?? new Date().getFullYear();
  }

  <template>
    <div class="hds-app-footer__copyright" ...attributes>
      <HdsIcon @name="hashicorp" />
      <HdsTextBody @tag="span" @size="100" @align="center">
        {{hdsT
          "hds.components.app-footer.copyright.copyright-text"
          default=(concat "© " this.year " HashiCorp, an IBM Company")
          year=this.year
        }}
      </HdsTextBody>
    </div>
  </template>
}
