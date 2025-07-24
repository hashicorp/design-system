/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsStepperListStepSignature } from './step';
import type { HdsStepperTitleTags } from '../types.ts';
export interface HdsStepperListSignature {
    Args: {
        titleTag?: HdsStepperTitleTags;
        ariaLabel: string;
    };
    Blocks: {
        default: [
            {
                Step?: ComponentLike<HdsStepperListStepSignature>;
            }
        ];
    };
    Element: HTMLElement;
}
export default class HdsStepperList extends Component<HdsStepperListSignature> {
    private _stepIds;
    get titleTag(): HdsStepperTitleTags;
    didInsertStep(element: HTMLElement): void;
    willDestroyStep(element: HTMLElement): void;
}
