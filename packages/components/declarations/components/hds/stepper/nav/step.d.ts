/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsStepperNavStatusesValues } from '../types.ts';
import type { HdsStepperNavPanelIds, HdsStepperNavStatuses, HdsStepperNavStepIds, HdsStepperStatuses, HdsStepperTitleTags } from '../types.ts';
export declare const MAPPING_STATUS_TO_INDICATOR_STATUS: Record<HdsStepperNavStatusesValues, import("../types.ts").HdsStepperStatusesValues>;
export declare const MAPPING_STATUS_TO_SR_ONLY_TEXT: Record<HdsStepperNavStatusesValues, string>;
export interface HdsStepperNavStepSignature {
    Args: {
        currentStep: number;
        isNavInteractive?: boolean;
        titleTag?: HdsStepperTitleTags;
        stepIds?: HdsStepperNavStepIds;
        panelIds?: HdsStepperNavPanelIds;
        didInsertNode?: () => void;
        willDestroyNode?: (element: HTMLButtonElement) => void;
        onStepChange?: (event: MouseEvent, nodeIndex: number) => void;
        onKeyUp?: (nodeIndex: number, event: KeyboardEvent) => void;
    };
    Blocks: {
        title: [];
        description?: [];
    };
    Element: HTMLElement;
}
export default class HdsStepperNavStep extends Component<HdsStepperNavStepSignature> {
    private _stepId;
    private _elementId?;
    private _setUpStep;
    get titleTag(): HdsStepperTitleTags;
    get isNavInteractive(): boolean;
    get nodeIndex(): number | undefined;
    get stepNumber(): number | undefined;
    get coupledPanelId(): string | undefined;
    get status(): HdsStepperNavStatuses;
    get stepIndicatorStatus(): HdsStepperStatuses;
    get statusSrOnlyText(): string;
    get isInteractive(): boolean;
    didInsertNode(element: HTMLButtonElement): void;
    willDestroyNode(element: HTMLButtonElement): void;
    onStepChange(event: MouseEvent): false | undefined;
    onKeyUp(event: KeyboardEvent): void;
    get classNames(): string;
}
