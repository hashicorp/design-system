/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { ID_PREFIX } from '../../label/index.ts';

import type { HdsFormFieldSignature } from '../../field/index.ts';
import type { HdsFormSuperSelectMultipleBaseSignature } from './base.ts';

interface HdsFormSuperSelectMultipleFieldSignature {
  Args: HdsFormSuperSelectMultipleBaseSignature['Args'] &
    HdsFormFieldSignature['Args'];
  Blocks: {
    default: [unknown];
  };
  Element: HdsFormFieldSignature['Element'];
}

export default class HdsFormSuperSelectMultipleField extends Component<HdsFormSuperSelectMultipleFieldSignature> {
  get idPrefix(): string {
    return ID_PREFIX;
  }
}
