/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';

import HdsFormlabelComponent from '../form/label/index.ts';
import HdsFormHelperTextComponent from '../form/helper-text/index.ts';
import HdsFormErrorComponent from '../form/error/index.ts';
import HdsFormSelectBaseComponent from '../form/select/base.ts';
import HdsFormTextInputBaseComponent from '../form/text-input/base.ts';
import type { HdsYieldSignature } from '../yield/index.ts';


export interface HdsKeyValuePairCellSignature {
  Args: {
    rowIndex?: number;
    rowData?: unknown;
    cellId?: string;
  };
  Blocks: {
    default: [
      {
        Label?: WithBoundArgs<
          typeof HdsFormlabelComponent,
          'contextualClass' | 'controlId'
        >;
        HelperText?: WithBoundArgs<
          typeof HdsFormHelperTextComponent,
          'contextualClass' | 'controlId'
        >;
        SelectBase?: WithBoundArgs<
          typeof HdsFormSelectBaseComponent,
          'id'
        >;
        TextInputBase?: WithBoundArgs<
          typeof HdsFormTextInputBaseComponent,
          'id'
        >;
        Generic?: ComponentLike<HdsYieldSignature>;
        Error?: WithBoundArgs<
          typeof HdsFormErrorComponent,
          'contextualClass' | 'controlId'
        >;
        rowIndex?: number,
        rowData?: unknown,
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsKeyValuePairCell extends Component<HdsKeyValuePairCellSignature> {
  get controlId(): string {
    // todo here we need to come up with a way to generate a unique ID based on row/cell combination
    return this.args.cellId ? `rowIndex-${this.args.cellId}` : 'some unique ID';
  }
}

