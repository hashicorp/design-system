/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
// import { tracked } from '@glimmer/tracking';
// import type Owner from '@ember/owner';
// import { action } from '@ember/object';
// import { registerDestructor } from '@ember/destroyable';
import { guidFor } from '@ember/object/internals';

import type { HdsFormLabelSignature } from '../label/index.ts';
import type { HdsFormHelperTextSignature } from '../helper-text/index.ts';
import type { HdsFormErrorSignature } from '../error/index.ts';
import type { HdsYieldSignature } from '../../yield/index.ts';
import type { HdsFormSelectBaseSignature } from '../select/base.ts';
import type { HdsFormTextInputBaseSignature } from '../text-input/base.ts';
import type { HdsFormFieldSignature } from '../field/index.ts';

export interface HdsFormKeyValuePairFieldSignature {
  Args: HdsFormFieldSignature['Args'] & {
    //
  };
  Blocks: {
    default?: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
        Select?: ComponentLike<HdsFormSelectBaseSignature>;
        TextInput?: ComponentLike<HdsFormTextInputBaseSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormKeyValuePairField extends Component<HdsFormKeyValuePairFieldSignature> {
  private _id = guidFor(this);
}
