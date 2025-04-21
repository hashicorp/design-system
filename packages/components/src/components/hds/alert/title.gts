/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { element } from 'ember-element-helper';
import { HdsAlertTitleTagValues } from './types.ts';

import type { HdsAlertTitleTags } from './types.ts';

export interface HdsAlertTitleSignature {
  Args: {
    tag?: HdsAlertTitleTags;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAlertTitle extends Component<HdsAlertTitleSignature> {
  get componentTag(): HdsAlertTitleTags {
    return this.args.tag ?? HdsAlertTitleTagValues.Div;
  }

  // IMPORTANT: we removed any extra newlines before/after the `let` to reduce the issues with unexpected whitespaces (see https://github.com/hashicorp/design-system/pull/1652)
  <template>
    {{#let (element this.componentTag) as |Tag|}}<Tag
        class="hds-alert__title hds-typography-body-200 hds-font-weight-semibold"
        ...attributes
      >{{yield}}</Tag>{{/let}}
  </template>
}
