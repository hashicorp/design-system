/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { element } from 'ember-element-helper';
import style from 'ember-style-modifier';

import type { AvailableTagNames, AvailableElements } from './types.ts';

export interface HdsLayoutGridItemSignature {
  Args: {
    tag?: AvailableTagNames;
    colspan?: number;
    rowspan?: number;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class HdsLayoutGridItem extends Component<HdsLayoutGridItemSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-layout-grid-column-span'?: string;
      '--hds-layout-grid-row-span'?: string;
    } = {};

    if (this.args.colspan) {
      inlineStyles['--hds-layout-grid-column-span'] =
        this.args.colspan.toString();
    }
    if (this.args.rowspan) {
      inlineStyles['--hds-layout-grid-row-span'] = this.args.rowspan.toString();
    }

    return inlineStyles;
  }

  <template>
    {{!
  Dynamically generating an HTML tag in Ember creates a dynamic component class (with the corresponding tagName), while rendering
  a plain HTML element requires less computing cycles for Ember (you will notice it doesn't add the ember-view class to it).
}}
    {{#if (eq this.componentTag "div")}}
      <div
        class="hds-layout-grid-item"
        {{style this.inlineStyles}}
        ...attributes
      >
        {{yield}}
      </div>
    {{else}}
      {{#let (element this.componentTag) as |Tag|}}
        <Tag
          class="hds-layout-grid-item"
          {{style this.inlineStyles}}
          ...attributes
        >
          {{yield}}
        </Tag>
      {{/let}}
    {{/if}}
  </template>
}
