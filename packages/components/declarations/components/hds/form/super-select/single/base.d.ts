/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsFormSuperSelectHorizontalPositionValues } from '../types.ts';
import type { PowerSelectSignature } from 'ember-power-select/components/power-select';
import type { Select as PowerSelect } from 'ember-power-select/components/power-select';
import type { CalculatePositionResult } from 'ember-basic-dropdown/utils/calculate-position';
import type { HdsFormSuperSelectHorizontalPositions } from '../types.ts';
export declare const DEFAULT_HORIZONTAL_POSITION: string;
export declare const HORIZONTAL_POSITION_MAPPING: Record<HdsFormSuperSelectHorizontalPositionValues, import("@floating-ui/utils").Placement | undefined>;
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
    powerSelectAPI?: PowerSelect;
    get horizontalPosition(): HdsFormSuperSelectHorizontalPositions;
    get resultCountMessage(): string;
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
    setPowerSelectAPI(powerSelectAPI: PowerSelect): void;
    calculatePosition(trigger: Element, content: HTMLElement): CalculatePositionResult;
    /**
     * Determine if `@afterOptionsComponent` gets displayed
     * @param showAfterOptions
     * @type {boolean}
     * @default false
     */
    get showAfterOptions(): boolean | string;
    /**
     * Get the search placeholder text
     * @param searchPlaceholder
     * @type {string}
     * @default 'Search'
     */
    get searchPlaceholder(): string;
    /**
     * Get the maxWidth to apply to the dropdown
     * @param dropdownMaxWidth
     * @type {string}
     * @default 'none'
     */
    get dropdownMaxWidthStyle(): Record<string, string>;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=base.d.ts.map