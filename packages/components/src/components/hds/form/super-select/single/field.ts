/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { ID_PREFIX } from '../../label/index.ts';

import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorSignature } from '../../error/index.ts';
import type { HdsFormFieldSignature } from '../../field/index.ts';
import type { HdsFormHelperTextSignature } from '../../helper-text/index.ts';
import type { HdsFormLabelSignature } from '../../label';
import type { HdsFormSuperSelectSingleBaseSignature } from './base.ts';
import type { Select as PowerSelect } from 'ember-power-select/components/power-select';
import type { HdsYieldSignature } from '../../../yield/index.ts';

interface HdsFormSuperSelectSingleFieldSignature {
  Args: HdsFormSuperSelectSingleBaseSignature['Args'] &
    HdsFormFieldSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        Options?: ComponentLike<HdsYieldSignature>;
        options?: unknown;
        select?: PowerSelect;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

export default class HdsFormSuperSelectSingleField extends Component<HdsFormSuperSelectSingleFieldSignature> {
  get idPrefix(): string {
    return ID_PREFIX;
  }
}
