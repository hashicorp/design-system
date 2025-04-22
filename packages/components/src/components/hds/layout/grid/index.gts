/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';
import { element } from 'ember-element-helper';
import style from 'ember-style-modifier';

import type { ComponentLike } from '@glint/template';
import type { HdsLayoutGridItemSignature } from './item.gts';

import { HdsLayoutGridAlignValues, HdsLayoutGridGapValues } from './types.ts';

import type {
  HdsLayoutGridAligns,
  HdsLayoutGridGaps,
  AvailableTagNames,
  AvailableElements,
} from './types.ts';
import { hash } from '@ember/helper';
import HdsLayoutGridItem from './item.gts';

export const ALIGNS: string[] = Object.values(HdsLayoutGridAlignValues);
export const GAPS: string[] = Object.values(HdsLayoutGridGapValues);

export interface HdsLayoutGridSignature {
  Args: {
    tag?: AvailableTagNames;
    columnMinWidth?: string;
    align?: HdsLayoutGridAligns;
    gap?: HdsLayoutGridGaps | [HdsLayoutGridGaps, HdsLayoutGridGaps];
  };
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsLayoutGridItemSignature>;
      },
    ];
  };
  Element: AvailableElements;
}

export default class HdsLayoutGrid extends Component<HdsLayoutGridSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get align(): HdsLayoutGridAligns | undefined {
    const { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Layout::Grid" must be one of the following: ${ALIGNS.join(
          ', '
        )}; received: ${align}`,
        ALIGNS.includes(align)
      );
    }

    return align;
  }

  get gap():
    | [HdsLayoutGridGaps]
    | [HdsLayoutGridGaps, HdsLayoutGridGaps]
    | undefined {
    const { gap } = this.args;

    if (gap) {
      assert(
        `@gap for "Hds::Layout::Grid" must be a single value or an array of two values of one of the following: ${GAPS.join(
          ', '
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        )}; received: ${gap}`,
        (!Array.isArray(gap) && GAPS.includes(gap)) ||
          (Array.isArray(gap) &&
            gap.length === 2 &&
            GAPS.includes(gap[0]) &&
            GAPS.includes(gap[1]))
      );
      return Array.isArray(gap) ? gap : [gap];
    } else {
      return undefined;
    }
  }

  get inlineStyles(): Record<string, unknown> {
    const inlineStyles: {
      '--hds-layout-grid-column-min-width'?: string;
    } = {};

    if (this.args.columnMinWidth) {
      inlineStyles['--hds-layout-grid-column-min-width'] =
        this.args.columnMinWidth;
    }
    return inlineStyles;
  }

  get classNames(): string {
    const classes = ['hds-layout-grid'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-layout-grid--align-items-${this.align}`);
    }

    // add a class based on the @gap argument
    if (this.gap) {
      if (this.gap.length === 2) {
        classes.push(`hds-layout-grid--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-grid--column-gap-${this.gap[1]}`);
      } else if (this.gap.length === 1) {
        classes.push(`hds-layout-grid--row-gap-${this.gap[0]}`);
        classes.push(`hds-layout-grid--column-gap-${this.gap[0]}`);
      }
    }

    return classes.join(' ');
  }

  <template>
    {{! Dynamically generating an HTML tag in Ember creates a dynamic component class (with the corresponding tagName), while rendering a plain HTML element requires less computing cycles for Ember (you will notice it doesn't add the ember-view class to it).}}
    {{#if (eq this.componentTag "div")}}
      <div class={{this.classNames}} {{style this.inlineStyles}} ...attributes>
        {{yield (hash Item=HdsLayoutGridItem)}}
      </div>
    {{else}}
      {{#let (element this.componentTag) as |Tag|}}
        <Tag
          class={{this.classNames}}
          {{style this.inlineStyles}}
          ...attributes
        >
          {{yield (hash Item=HdsLayoutGridItem)}}
        </Tag>
      {{/let}}
    {{/if}}
  </template>
}
