/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

import type { ComponentLike } from '@glint/template';
import type { SafeString } from '@ember/template/-private/handlebars';
import type { LabelComponentSignature } from '../label';
import type { FlexItemComponentSignature } from './item';

interface FlexComponentSignature {
  Args: {
    gap?: string;
    direction?: 'row' | 'column';
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<LabelComponentSignature>;
        Item?: ComponentLike<FlexItemComponentSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class FlexIndexComponent extends Component<FlexComponentSignature> {
  direction = this.args.direction ?? 'row';

  get itemsStyle(): SafeString | undefined {
    const styles = [];
    if (this.args.gap) {
      styles.push(`gap: ${this.args.gap}`);
    }

    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  get classNames(): string {
    const classes = ['shw-flex'];

    // add a class based on the @direction argument
    classes.push(`shw-flex--direction-${this.direction}`);

    return classes.join(' ');
  }
}
