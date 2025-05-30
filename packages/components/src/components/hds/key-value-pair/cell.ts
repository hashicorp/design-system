/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import TemplateOnlyComponent from '@ember/component/template-only';
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
    controlId?: string;
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
        Select?: WithBoundArgs<
          typeof HdsFormSelectBaseComponent,
          // TODO! this should be the id passed down to the base control
          'width'
        >;
        TextInput?: WithBoundArgs<
          typeof HdsFormTextInputBaseComponent,
          // TODO! this should be the id passed down to the base control
          'width'
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

const HdsKeyValuePairCell =
  TemplateOnlyComponent<HdsKeyValuePairCellSignature>();

export default HdsKeyValuePairCell;
