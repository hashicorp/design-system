/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { ID_PREFIX } from '../../label/index.gts';

import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorSignature } from '../../error/index.gts';
import type { HdsFormFieldSignature } from '../../field/index.gts';
import type { HdsFormHelperTextSignature } from '../../helper-text/index.gts';
import type { HdsFormLabelSignature } from '../../label/index.gts';
import type { HdsFormSuperSelectMultipleBaseSignature } from './base.ts';
import type { Select as PowerSelect } from 'ember-power-select/components/power-select';
import type { HdsYieldSignature } from '../../../yield/index.ts';

export interface HdsFormSuperSelectMultipleFieldSignature {
  Args: HdsFormSuperSelectMultipleBaseSignature['Args'] &
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

export default class HdsFormSuperSelectMultipleField extends Component<HdsFormSuperSelectMultipleFieldSignature> {
  get idPrefix(): string {
    return ID_PREFIX;
  }
}
