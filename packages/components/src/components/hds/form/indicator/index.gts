/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsTextBody from '../../text/body.gts';
import HdsBadge from '../../badge/index.gts';

import type { HdsTextBodySignature } from '../../text/body.gts';
import type { HdsBadgeSignature } from '../../badge/index.gts';

export interface HdsFormIndicatorSignature {
  Args: {
    isOptional?: boolean;
    isRequired?: boolean;
  };
  Element: HdsTextBodySignature['Element'] | HdsBadgeSignature['Element'];
}

export default class HdsFormIndicator extends Component<HdsFormIndicatorSignature> {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-form-indicator'];

    if (this.args.isOptional) {
      // add speficic class for "optional" indicator
      classes.push('hds-form-indicator--optional');
    }

    return classes.join(' ');
  }

  <template>
    {{#if @isOptional}}
      <HdsTextBody
        class={{this.classNames}}
        tag="span"
        @size="100"
        @weight="regular"
      >(Optional)</HdsTextBody>
    {{/if}}
    {{#if @isRequired}}
      &nbsp;<HdsBadge
        aria-hidden="true"
        class={{this.classNames}}
        @size="small"
        @color="neutral"
        @text="Required"
      />
    {{/if}}
  </template>
}
