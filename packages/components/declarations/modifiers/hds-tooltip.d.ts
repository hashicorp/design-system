/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { ArgsFor } from 'ember-modifier';
import type { HideAll as TippyHideAll, Instance as TippyInstance, Props as TippyProps } from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';
export interface HdsTooltipModifierSignature {
    Args: {
        Positional: [string];
        Named: {
            options?: TippyProps;
        };
    };
    Element: HTMLElement;
}
/**
 *
 * `Tooltip` implements a modifier that uses Tippy.js to display a tooltip.
 *
 * Sample usage:
 * ```
 * <div {{hds-tooltip 'Text' options=(hash )}}>Hover me!</div>
 * ```
 *
 * @see https://atomiks.github.io/tippyjs
 * @class TooltipModifier
 *
 */
export default class HdsTooltipModifier extends Modifier<HdsTooltipModifierSignature> {
    #private;
    didSetup: boolean;
    interval: number | undefined;
    needsTabIndex: boolean;
    tooltip: TippyInstance | undefined;
    constructor(owner: unknown, args: ArgsFor<HdsTooltipModifierSignature>);
    hideOnEsc: {
        name: string;
        defaultValue: boolean;
        fn({ hide }: {
            hide: TippyHideAll;
        }): {
            onShow(): void;
            onHide(): void;
        };
    };
    modify(element: HdsTooltipModifierSignature['Element'], positional: HdsTooltipModifierSignature['Args']['Positional'], named: HdsTooltipModifierSignature['Args']['Named']): void;
}
//# sourceMappingURL=hds-tooltip.d.ts.map