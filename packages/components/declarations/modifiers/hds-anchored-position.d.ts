/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { Placement, Strategy, OffsetOptions, FlipOptions, ShiftOptions, AutoPlacementOptions, ArrowOptions, Middleware } from '@floating-ui/dom';
export declare const DEFAULT_PLACEMENT = "bottom";
export declare const PLACEMENTS: Placement[];
export type FloatingUIOptions = {
    placement?: Placement;
    strategy?: Strategy;
    offsetOptions?: OffsetOptions;
    flipOptions?: FlipOptions;
    shiftOptions?: ShiftOptions;
    autoPlacementOptions?: AutoPlacementOptions;
    middlewareExtra?: Middleware[];
    enableCollisionDetection?: boolean | 'shift' | 'flip' | 'auto';
    arrowElement?: ArrowOptions['element'];
    arrowPadding?: ArrowOptions['padding'];
};
export declare const getFloatingUIOptions: (options: FloatingUIOptions) => {
    placement: Placement;
    strategy: Strategy;
    middleware: Middleware[];
};
declare const _default: import("ember-modifier").FunctionBasedModifier<{
    Element: HTMLElement;
    Args: {
        Named: FloatingUIOptions & {
            arrowSelector?: string | undefined;
        };
        Positional: [HTMLElement | SVGElement];
    };
}>;
export default _default;
//# sourceMappingURL=hds-anchored-position.d.ts.map