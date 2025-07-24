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
export declare const HORIZONTAL_POSITION_MAPPING: Record<HdsFormSuperSelectHorizontalPositionValues, import("@floating-ui/dom").Placement | undefined>;
export interface HdsFormSuperSelectMultipleBaseSignature {
    Args: Omit<PowerSelectSignature['Args'], 'resultCountMessage'> & {
        showAfterOptions?: boolean;
        afterOptionsContent?: string;
        resultCountMessage?: string | PowerSelectSignature['Args']['resultCountMessage'];
        dropdownMaxWidth?: string;
        matchTriggerWidth?: boolean;
        isInvalid?: boolean;
    };
    Blocks: PowerSelectSignature['Blocks'];
    Element: PowerSelectSignature['Element'];
}
export default class HdsFormSuperSelectMultipleBase extends Component<HdsFormSuperSelectMultipleBaseSignature> {
    private _powerSelectAPI?;
    private _showOnlySelected;
    private _showNoSelectedMessage;
    get horizontalPosition(): HdsFormSuperSelectHorizontalPositions;
    get selectedCount(): string;
    get optionsCount(): string;
    get resultCountMessageText(): string;
    get resultCountMessageFunction(): PowerSelectSignature['Args']['resultCountMessage'];
    calculatePosition(trigger: Element, content: HTMLElement): CalculatePositionResult;
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
    showSelected(): void;
    showAll(): void;
    clearSelected(): void;
    get showAfterOptions(): boolean;
    get searchPlaceholder(): string;
    get styles(): Record<string, string>;
    get classNames(): string;
}
