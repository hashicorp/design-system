/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsStepperStatusesValues } from '../types.ts';
import type { HdsStepperListStepIds, HdsStepperStatuses, HdsStepperTitleTags } from '../types.ts';
export declare const DEFAULT_STATUS = HdsStepperStatusesValues.Incomplete;
export declare const STATUSES: string[];
export declare const MAPPING_STATUS_TO_SR_ONLY_TEXT: Record<HdsStepperStatusesValues, string>;
export interface HdsStepperListStepSignature {
    Args: {
        status?: HdsStepperStatusesValues;
        titleTag?: HdsStepperTitleTags;
        stepIds?: HdsStepperListStepIds;
        didInsertNode?: (element: HTMLElement) => void;
        willDestroyNode?: (element: HTMLElement) => void;
    };
    Blocks: {
        title: [];
        description?: [];
        content?: [];
    };
    Element: HTMLElement;
}
export default class HdsStepperListStep extends Component<HdsStepperListStepSignature> {
    private _stepId;
    private _setUpStep;
    get stepNumber(): number | undefined;
    get status(): HdsStepperStatuses;
    get statusSrOnlyText(): string;
    get titleTag(): HdsStepperTitleTags;
    get classNames(): string;
}
