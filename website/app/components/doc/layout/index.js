/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

export const DIRECTIONS = ['horizontal', 'vertical'];
export const ALIGNMENTS = ['left', 'right', 'center', 'justify'];
export const CSS_UNITS = ['px', 'rem', 'em', '%'];

// sanitize & validate custom spacing value:
const regExStr =
  '^-?((\\d+)|(\\d+\\.\\d+)|(\\.\\d+))(' + CSS_UNITS.join('|') + ')$';
const cssUnitRegEx = new RegExp(regExStr, 'i');

export default class DocLayoutIndexComponent extends Component {
  /**
   * Get the direction for the component
   * Accepted values: 'horizontal', 'vertical'
   * @param direction
   * @type {string}
   * @default 'horizontal'
   */
  get direction() {
    let { direction = 'horizontal' } = this.args;

    assert(
      '@direction for "Doc::Layout" must have a valid value',
      DIRECTIONS.includes(direction),
    );

    return direction;
  }

  /**
   * Get the inline custom spacing style.
   * Accepted values: '1px', '2.4rem', '3em', '2%', etc.
   * @param spacing
   * @type {string} The "style" attribute to apply to the item.
   */
  get spacing() {
    let { spacing } = this.args;

    assert(
      `@spacing for "Doc::Layout" must include a number and one of the following CSS units: ${CSS_UNITS.join(
        ', ',
      )}; received: "${spacing}"`,
      spacing === undefined || spacing.match(cssUnitRegEx),
    );

    if (spacing !== undefined) {
      return htmlSafe(`--doc-layout-spacing: ${spacing}`);
    }

    return undefined;
  }

  /**
   * Get the align value for the component
   * Accepted values: 'left', 'right', 'center', 'justify'
   * @param align
   * @type {string}
   * @default 'left'
   */
  get align() {
    let { align = 'left' } = this.args;

    assert(
      '@align for "Doc::Layout" must have a valid value',
      ALIGNMENTS.includes(align),
    );

    return align;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['doc-layout'];

    // add a class based on the @direction argument
    classes.push(`doc-layout--direction-${this.direction}`);

    // add a class based on the @align argument
    classes.push(`doc-layout--align-${this.align}`);

    return classes.join(' ');
  }
}
