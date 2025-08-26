/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import type HdsIntlService from '../../../services/hds-intl';

import HdsIcon from '../icon/index.gts';

export interface HdsDismissButtonSignature {
  Args: {
    ariaLabel?: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsDismissButton extends Component<HdsDismissButtonSignature> {
  @service hdsIntl!: HdsIntlService;

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t('hds.components.dismiss-button.aria-label', {
        default: 'Dismiss',
      })
    );
  }

  <template>
    <button
      class="hds-dismiss-button"
      type="button"
      aria-label={{this.ariaLabel}}
      ...attributes
    >
      <HdsIcon @name="x" @size="16" />
    </button>
  </template>
}
