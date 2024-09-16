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
import type { HdsFormSuperSelectMultipleBaseSignature } from './base.ts';
import type { Select as PowerSelect } from 'ember-power-select/components/power-select';
import type { HdsYieldSignature } from '../../../yield/index.ts';

interface HdsFormSuperSelectMultipleFieldSignature {
  Args: HdsFormSuperSelectMultipleBaseSignature['Args'] &
    HdsFormFieldSignature['Args'];
  Blocks: {
    default: [
      {
        Label?: ComponentLike<HdsFormLabelSignature>;
        HelperText?: ComponentLike<HdsFormHelperTextSignature>;
        Error?: ComponentLike<HdsFormErrorSignature>;
        Options?: ComponentLike<HdsYieldSignature>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options?: any;
        select?: PowerSelect;
      },
    ];
  };
  Element: HdsFormFieldSignature['Element'];
}

export default class HdsFormSuperSelectMultipleField extends Component<HdsFormSuperSelectMultipleFieldSignature> {
  get idPrefix(): string {
    return ID_PREFIX;
  }
}
