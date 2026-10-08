/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { service } from '@ember/service';

import HdsIcon from '../../icon/index.gts';

import type HdsIntlService from '../../../../services/hds-intl';

export interface HdsFormVisibilityToggleSignature {
  Args: {
    ariaLabel?: string;
    ariaMessageText?: string;
    ariaMessageTextWhenVisible?: string;
    isMasked?: boolean;
  };
  Element: HTMLButtonElement;
}

export default class HdsFormVisibilityToggle extends Component<HdsFormVisibilityToggleSignature> {
  @service declare readonly hdsIntl: HdsIntlService;

  get ariaLabel(): string {
    return (
      this.args.ariaLabel ??
      this.hdsIntl.t('hds.components.form.visibility-toggle.aria-label', {
        default: 'Toggle content visibility',
      })
    );
  }

  <template>
    <button
      class="hds-form-visibility-toggle"
      type="button"
      aria-label={{this.ariaLabel}}
      ...attributes
    >
      <HdsIcon @name={{if @isMasked "eye" "eye-off"}} @size="16" />
      <span class="sr-only" aria-live="polite">{{if
          @isMasked
          @ariaMessageText
          @ariaMessageTextWhenVisible
        }}</span>
    </button>
  </template>
}
