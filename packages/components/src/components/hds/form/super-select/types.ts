/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { PowerSelectArgs } from 'ember-power-select/components/power-select';

import type { FloatingUIOptions } from '../../../../modifiers/hds-anchored-position.ts';

export enum HdsFormSuperSelectHorizontalPositionValues {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type HdsFormSuperSelectHorizontalPositions =
  `${HdsFormSuperSelectHorizontalPositionValues}`;

// map SuperSelect's `horizontalPosition` values to anchoredPositionModifier's `placement` values
export const HdsFormSuperSelectHorizontalPositionToPlacementValues: Record<
  // SuperSelect's `horizontalPosition` values
  HdsFormSuperSelectHorizontalPositionValues,
  FloatingUIOptions['placement']
> = {
  [HdsFormSuperSelectHorizontalPositionValues.Left]: 'bottom-start',
  [HdsFormSuperSelectHorizontalPositionValues.Center]: 'bottom',
  [HdsFormSuperSelectHorizontalPositionValues.Right]: 'bottom-end',
};

type HdsFormSuperSelectInferenceArgs =
  | 'options'
  | 'selected'
  | 'onChange'
  | 'extra';

export interface HdsFormSuperSelectBaseArgs<
  T,
  IsMultiple extends boolean,
  TExtra,
> extends Omit<
    PowerSelectArgs<T, IsMultiple, TExtra>,
    'resultCountMessage' | 'multiple' | HdsFormSuperSelectInferenceArgs
  > {
  // `T` and `TExtra` are inferred from these args, and TypeScript can't infer type parameters through `Omit`, so they're declared directly
  options?: PowerSelectArgs<T, IsMultiple, TExtra>['options'];
  selected?: PowerSelectArgs<T, IsMultiple, TExtra>['selected'];
  onChange: PowerSelectArgs<T, IsMultiple, TExtra>['onChange'];
  extra?: PowerSelectArgs<T, IsMultiple, TExtra>['extra'];
  showAfterOptions?: boolean;
  afterOptionsContent?: string;
  resultCountMessage?:
    | string
    | PowerSelectArgs<T, IsMultiple, TExtra>['resultCountMessage'];
  dropdownMaxWidth?: string;
  matchTriggerWidth?: boolean;
  isInvalid?: boolean;
}
