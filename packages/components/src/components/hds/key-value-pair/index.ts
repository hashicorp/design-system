/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';

import type { HdsFormFieldsetSignature } from '../form/fieldset';
import type { HdsFormLegendSignature } from '../form/legend';
import type { HdsFormHelperTextSignature } from '../form/helper-text';
import type { HdsFormErrorSignature } from '../form/error';
import type { HdsYieldSignature } from '../yield';
import type { HdsFormSelectFieldSignature } from '../form/select/field';
import type { HdsFormTextInputFieldSignature } from '../form/text-input/field';

export interface HdsKeyValuePairSignature {
  Args: HdsFormFieldsetSignature['Args'] & {
    data?: Array<unknown>;
  };
  Blocks: {
    default: [{
      Legend?: ComponentLike<HdsFormLegendSignature>;
      HelperText?: ComponentLike<HdsFormHelperTextSignature>;
      Error?: ComponentLike<HdsFormErrorSignature>;
      Generic?: ComponentLike<HdsYieldSignature>;
      FooterExtraBefore?: ComponentLike<HdsYieldSignature>;
      FooterExtraAfter?: ComponentLike<HdsYieldSignature>;
      Select?: ComponentLike<HdsFormSelectFieldSignature>;
      TextInput?: ComponentLike<HdsFormTextInputFieldSignature>;
      rowData?: unknown;
    }];
  };
  Element: HdsFormFieldsetSignature['Element'];
}

export default class HdsKeyValuePair extends Component<HdsKeyValuePairSignature> {
  // 
}
