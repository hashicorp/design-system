/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

export const DIRECTIONS = ['horizontal', 'vertical'];
type Direction = (typeof DIRECTIONS)[number];

export const ALIGNMENTS = ['left', 'right', 'center', 'justify'];
type Alignment = (typeof ALIGNMENTS)[number];

export const CSS_UNITS = ['px', 'rem', 'em', '%'];

// sanitize & validate custom spacing value:
const regExStr =
  '^-?((\\d+)|(\\d+\\.\\d+)|(\\.\\d+))(' + CSS_UNITS.join('|') + ')$';
const cssUnitRegEx = new RegExp(regExStr, 'i');

interface DocLayoutSignature {
  Args: {
    direction?: Direction;
    spacing?: string;
    align?: Alignment;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocLayout extends Component<DocLayoutSignature> {
  get direction() {
    const { direction = 'horizontal' } = this.args;

    assert(
      '@direction for "Doc::Layout" must have a valid value',
      DIRECTIONS.includes(direction),
    );

    return direction;
  }

  get spacing() {
    const { spacing } = this.args;

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

  get align() {
    const { align = 'left' } = this.args;

    assert(
      '@align for "Doc::Layout" must have a valid value',
      ALIGNMENTS.includes(align),
    );

    return align;
  }

  get classNames() {
    const classes = ['doc-layout'];

    classes.push(`doc-layout--direction-${this.direction}`);
    classes.push(`doc-layout--align-${this.align}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} style={{this.spacing}} ...attributes>
      {{yield}}
    </div>
  </template>
}
