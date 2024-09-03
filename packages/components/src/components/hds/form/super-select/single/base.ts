/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import anchoredPositionModifier from '../../../../../modifiers/hds-anchored-position.ts';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {
  HdsFormSuperSelectHorizontalPositionValues,
  HdsFormSuperSelectHorizontalPositionToPlacementValues,
} from '../types.ts';

import type { PowerSelectSignature } from 'ember-power-select/components/power-select';
import type { Select as PowerSelect } from 'ember-power-select/components/power-select';
import type { CalculatePositionResult } from 'ember-basic-dropdown/utils/calculate-position';
import type { HdsFormSuperSelectHorizontalPositions } from '../types.ts';

export const DEFAULT_HORIZONTAL_POSITION: string =
  HdsFormSuperSelectHorizontalPositionValues.Left;
export const HORIZONTAL_POSITION_MAPPING =
  HdsFormSuperSelectHorizontalPositionToPlacementValues;

export interface HdsFormSuperSelectSingleBaseSignature {
  Args: PowerSelectSignature['Args'] & {
    showAfterOptions?: boolean;
    afterOptionsContent?: string;
    resultCountMessage?: string;
    dropdownMaxWidth?: string;
    matchTriggerWidth?: boolean;
    isInvalid?: boolean;
  };
  Blocks: PowerSelectSignature['Blocks'];
  Element: PowerSelectSignature['Element'];
}

export default class HdsFormSuperSelectSingleBase extends Component<HdsFormSuperSelectSingleBaseSignature> {
  @tracked powerSelectAPI?: PowerSelect;

  get horizontalPosition(): HdsFormSuperSelectHorizontalPositions {
    const { horizontalPosition = DEFAULT_HORIZONTAL_POSITION } = this.args;
    return horizontalPosition as HdsFormSuperSelectHorizontalPositions;
  }

  get resultCountMessage(): string {
    return `${this.powerSelectAPI?.resultsCount || 0} total`;
  }

  /**
   * This action sets the powerSelectAPI property and optionally calls a registerAPI function.
   *
   * @param {Object} powerSelectAPI - The API object for the PowerSelect component.
   *
   * If a `registerAPI` function is passed in through the component's arguments,
   * this function will be called with the `powerSelectAPI` as its argument.
   * This allows parent components or controllers to have access to the PowerSelect API.
   *
   * The `powerSelectAPI` is also stored on the component instance and used in `clearSelected`
   */
  @action
  setPowerSelectAPI(powerSelectAPI: PowerSelect): void {
    if (typeof this.args.registerAPI === 'function') {
      this.args.registerAPI(powerSelectAPI);
    }
    this.powerSelectAPI = powerSelectAPI;
  }

  @action calculatePosition(
    trigger: Element,
    content: HTMLElement
  ): CalculatePositionResult {
    // use `hds-anchored-position` to calculate and set position
    // @ts-expect-error: known issue with type of invocation
    anchoredPositionModifier(content, [trigger], {
      placement: HORIZONTAL_POSITION_MAPPING[this.horizontalPosition],
      offsetOptions: 4,
      enableCollisionDetection: true,
    });
    // prevent PowerSelect from setting position
    return {
      horizontalPosition: 'auto',
      verticalPosition: 'auto',
      style: {},
    };
  }

  /**
   * Determine if `@afterOptionsComponent` gets displayed
   * @param showAfterOptions
   * @type {boolean}
   * @default false
   */
  get showAfterOptions(): boolean | string {
    return this.args.showAfterOptions ?? this.args.afterOptionsContent ?? false;
  }

  /**
   * Get the search placeholder text
   * @param searchPlaceholder
   * @type {string}
   * @default 'Search'
   */
  get searchPlaceholder(): string {
    return this.args.searchPlaceholder ?? 'Search';
  }

  /**
   * Get the maxWidth to apply to the dropdown
   * @param dropdownMaxWidth
   * @type {string}
   * @default 'none'
   */
  get dropdownMaxWidthStyle(): Record<string, string> {
    const maxWidthStyle: { [key: string]: string } = {};
    if (this.args.dropdownMaxWidth) {
      maxWidthStyle['--hds-form-super-select-dropdown-max-width'] =
        this.args.dropdownMaxWidth;
    }
    return maxWidthStyle;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-form-super-select', 'hds-form-super-select-single'];

    // add a class based on the @matchTriggerWidth argument or whether dropdownMaxWidth is set
    if (this.args.matchTriggerWidth === false || this.args.dropdownMaxWidth) {
      classes.push('hds-form-super-select--dropdown-content-auto-width');
    }

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-super-select--is-invalid`);
    }

    return classes.join(' ');
  }
}
