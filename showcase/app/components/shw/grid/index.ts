/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

import type { ComponentLike } from '@glint/template';
import type { LabelComponentSignature } from '../label';
import type { SafeString } from '@ember/template';
import type { GridItemComponentSignature } from './item';

interface GridComponentSignature {
  Args: {
    columns: 2 | 3 | 4 | 5 | 6 | 7;
    forceMinWidth?: boolean;
    gap: string;
    grow?: boolean;
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<LabelComponentSignature>;
        Item?: ComponentLike<GridItemComponentSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class GridIndexComponent extends Component<GridComponentSignature> {
  get columns(): number {
    const { columns } = this.args;

    assert('@columns for "Shw::Grid" must be defined', columns !== undefined);

    return columns;
  }

  get itemsStyle(): SafeString | undefined {
    const styles = [];
    styles.push(`gap: ${this.args.gap ? this.args.gap : '1rem'}`);
    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  get classNames(): string {
    const classes = ['shw-grid'];

    // add a class based on the @columns argument
    classes.push(`shw-grid--cols-${this.columns}`);

    return classes.join(' ');
  }
}
