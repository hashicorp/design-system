/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsStepperStatusesValues } from '../types.ts';
import type { HdsStepperStatuses } from '../types.ts';
export declare const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export declare const STATUSES: string[];
interface HdsStepperStepIndicatorSignature {
    Args: {
        status: HdsStepperStatuses;
        isInteractive?: boolean;
        text: string;
    };
    Element: HTMLDivElement;
}
export default class HdsStepperStepIndicatorComponent extends Component<HdsStepperStepIndicatorSignature> {
    /**
     * @param status
     * @type {string}
     * @default "incomplete"
     */
    get status(): HdsStepperStatuses;
    /**
     * @param isInteractive
     * @type {boolean}
     * @default false
     */
    get isInteractive(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method IndicatorStep#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=indicator.d.ts.map