/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsStepperNavStepIds, HdsStepperNavPanelIds } from '../types.ts';
export interface HdsStepperNavPanelSignature {
    Args: {
        currentStep: number;
        isNavInteractive?: boolean;
        stepIds?: HdsStepperNavStepIds;
        panelIds?: HdsStepperNavPanelIds;
        didInsertNode?: () => void;
        willDestroyNode?: (element: HTMLElement) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class HdsStepperNavPanel extends Component<HdsStepperNavPanelSignature> {
    private _panelId;
    private _elementId?;
    private _setUpPanel;
    get isNavInteractive(): boolean;
    get nodeIndex(): number | undefined;
    get coupledStepId(): string | undefined;
    get isVisible(): boolean;
    didInsertNode(element: HTMLElement): void;
    willDestroyNode(element: HTMLElement): void;
}
