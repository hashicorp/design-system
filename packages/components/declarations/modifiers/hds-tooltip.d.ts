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
export default class HdsTooltipModifier extends Modifier<import("ember-modifier/-private/signature.js").DefaultSignature> {
    constructor(owner: any, args: any);
    didSetup: boolean;
    interval: null;
    needsTabIndex: boolean;
    tooltip: null;
    hideOnEsc: {
        name: string;
        defaultValue: boolean;
        fn({ hide }: {
            hide: any;
        }): {
            onShow(): void;
            onHide(): void;
        };
    };
    modify(element: any, positional: any, named: any): void;
    #private;
}
import Modifier from 'ember-modifier';
//# sourceMappingURL=hds-tooltip.d.ts.map