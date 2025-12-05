/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTextAlignValues, HdsTextColorValues } from './types.ts';
import type {
  HdsTextAligns,
  HdsTextColors,
  HdsTextGroups,
  HdsTextSizes,
  HdsTextTags,
  HdsTextWeights,
} from './types.ts';

export const COLORS: HdsTextColors[] = Object.values(HdsTextColorValues);
export const ALIGNS: HdsTextAligns[] = Object.values(HdsTextAlignValues);

// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsTextSignature {
  Args: {
    size: HdsTextSizes;
    tag?: HdsTextTags;
    weight?: HdsTextWeights;
    align?: HdsTextAligns;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    color?: HdsTextColors | string | undefined;
    group: HdsTextGroups;
  };
  Element: AvailableElements;
  Blocks: {
    default: [];
  };
}

export default class HdsText extends Component<HdsTextSignature> {
  // Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
  get componentTag(): HdsTextTags {
    const { tag = 'span' } = this.args;

    return tag;
  }

  // Sets the "variant" (style) for the text
  get variant(): string {
    const { group, size } = this.args;

    // notice: for performance reasons we don't do any other extra check on these values
    // we assume they've already been validated by the "parent" components
    return `${group}-${size}`;
  }

  // Sets the alignment of the text
  get align(): HdsTextAligns | undefined {
    const { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Text" must be one of the following: ${ALIGNS.join(
          ', '
        )}; received: ${align}`,
        ALIGNS.includes(align)
      );
    }

    return align;
  }

  // Sets the color of the text as pre-defined value
  get predefinedColor(): HdsTextColors | undefined {
    const { color } = this.args;

    if (color && COLORS.includes(color as HdsTextColors)) {
      return color as HdsTextColors;
    } else {
      return undefined;
    }
  }

  // Sets the color of the text as custom value (via inline style)
  get customColor(): string | undefined {
    const { color } = this.args;

    if (color && !COLORS.includes(color as HdsTextColors)) {
      return color as HdsTextColors;
    } else {
      return undefined;
    }
  }

  get classNames(): string {
    const classes = ['hds-text'];

    // add a (helper) class based on the "group + size" variant
    classes.push(`hds-typography-${this.variant}`);

    // add a (helper) class based on the @weight argument
    if (this.args.weight) {
      classes.push(`hds-font-weight-${this.args.weight}`);
    }

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-text--align-${this.align}`);
    }

    // add a (helper) class based on the @color argument (if pre-defined)
    if (this.predefinedColor) {
      classes.push(`hds-foreground-${this.predefinedColor}`);
    }

    return classes.join(' ');
  }
}
