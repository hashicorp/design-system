/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type { HdsInteractiveSignature } from '../interactive/';
import { HdsTagColorValues } from './types.ts';

import type { HdsTagColors } from './types.ts';

export const COLORS: string[] = Object.values(HdsTagColorValues);
export const DEFAULT_COLOR = HdsTagColorValues.Primary;

interface HdsTagIndexSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
    ariaLabel?: string;
    color?: HdsTagColors;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
  };
  Element: HTMLElement;
}

export default class HdsTagIndexComponent extends Component<HdsTagIndexSignature> {
  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  get onDismiss() {
    const { onDismiss } = this.args;

    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return false;
    }
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the tag. If no text value is defined, an error will be thrown.
   */
  get text() {
    const { text } = this.args;

    assert('@text for "Hds::Tag" must have a valid value', text !== undefined);

    return text;
  }

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Dismiss'
   */
  get ariaLabel() {
    const tagAriaLabel = this.args.ariaLabel ?? 'Dismiss';
    return tagAriaLabel + ' ' + this.args.text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    if (this.args.href || this.args.route) {
      const { color = DEFAULT_COLOR } = this.args;
      assert(
        `@color for "Hds::Tag" must be one of the following: ${COLORS.join(
          ', '
        )}; received: ${color}`,
        COLORS.includes(color)
      );
      return color;
    } else if (this.args.color) {
      assert(
        '@color can only be applied to "Hds::Tag" along with either @href or @route',
        this.args.href || this.args.route
      );
    }
    return false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-tag'];

    // add a class based on the @color argument
    if (this.color) {
      classes.push(`hds-tag--color-${this.color}`);
    }

    return classes.join(' ');
  }
}
