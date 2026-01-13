/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { element } from 'ember-element-helper';

import { HdsAlertTitleTagValues } from './types.ts';
import type { HdsAlertTitleTags } from './types';

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
  get componentTag() {
    return this.args.tag ?? HdsAlertTitleTagValues.Div;
  }

  <template>
    {{#let (element this.componentTag) as |Tag|}}<Tag
        class="hds-alert__title hds-typography-body-200 hds-font-weight-semibold"
        ...attributes
      >{{yield}}</Tag>{{/let}}
  </template>
}
