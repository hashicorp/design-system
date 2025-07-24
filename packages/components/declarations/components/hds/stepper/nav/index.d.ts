/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type { HdsStepperTitleTags, HdsStepperNavStep } from '../types.ts';
import HdsStepperNavStepComponent from './step.ts';
import HdsStepperNavPanelComponent from './panel.ts';
export interface HdsStepperNavSignature {
    Args: {
        steps?: HdsStepperNavStep[];
        currentStep?: number;
        isInteractive?: boolean;
        titleTag?: HdsStepperTitleTags;
        ariaLabel: string;
        onStepChange?: (event: MouseEvent, stepNumber: number) => void;
    };
    Blocks: {
        body?: [];
        default: [
            {
                Step?: WithBoundArgs<typeof HdsStepperNavStepComponent, 'currentStep' | 'isNavInteractive' | 'titleTag' | 'stepIds' | 'panelIds' | 'didInsertNode' | 'willDestroyNode' | 'onStepChange' | 'onKeyUp'>;
                Panel?: WithBoundArgs<typeof HdsStepperNavPanelComponent, 'currentStep' | 'isNavInteractive' | 'stepIds' | 'panelIds' | 'didInsertNode' | 'willDestroyNode'>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsStepperNav extends Component<HdsStepperNavSignature> {
    private _stepIds;
    private _stepNodes;
    private _panelNodes;
    private _panelIds;
    private _element;
    private _setUpStepperNav;
    get currentStep(): number;
    get isInteractive(): boolean;
    get titleTag(): HdsStepperTitleTags;
    get inlineStyles(): Record<string, unknown>;
    get progressBarWidthStyle(): string;
    didInsertStep(): void;
    willDestroyStep(element: HTMLElement): void;
    didInsertPanel(): void;
    willDestroyPanel(element: HTMLElement): void;
    onKeyUp(currentStepIndex: number, event: KeyboardEvent): void;
    private updateSteps;
    private updatePanels;
    private findNextInteractiveStepIndex;
    private focusStep;
    get classNames(): string;
}
