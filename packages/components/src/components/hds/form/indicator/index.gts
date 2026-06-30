/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsBadge from '../../badge/index.gts';
import hdsT from '../../../../helpers/hds-t.ts';

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
      <span class={{this.classNames}}>
        ({{hdsT
          "hds.components.form.common.optional_field_indicator"
          default="Optional"
        }})
      </span>
    {{/if}}
    {{#if @isRequired}}
      &nbsp;<HdsBadge
        aria-hidden="true"
        class={{this.classNames}}
        @size="small"
        @color="neutral"
        @text={{hdsT
          "hds.components.form.common.required_field_indicator"
          default="Required"
        }}
      />
    {{/if}}
  </template>
}
