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

import type { HdsFormLabelSignature } from '../form/label/index.ts';
import type { HdsFormHelperTextSignature } from '../form/helper-text/index.ts';
import type { HdsFormErrorSignature } from '../form/error/index.ts';
import type { HdsYieldSignature } from '../yield/index.ts';
import type { HdsFormSelectBaseSignature } from '../form/select/base.ts';
import type { HdsFormTextInputBaseSignature } from '../form/text-input/base.ts';
import type { HdsFormFieldSignature } from '../form/field/index.ts';

export interface HdsKeyValuePairFieldSignature {
  Args: HdsFormFieldSignature['Args'] & {
    isHeaderHidden?: boolean;
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

export default class HdsKeyValuePairField extends Component<HdsKeyValuePairFieldSignature> {
  private _id = guidFor(this);

  //   get classNames(): string {
  //   const classes: string[] = ["hds-key-value-pair-field"];

  //   if (this.args.isDesktop) {
  //     classes.push("sr-only");
  //   }

  //   return classes.join(' ');
  // }
}
