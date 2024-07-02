export default class HdsPopoverPrimitiveComponent extends Component<any> {
    constructor(...args: any[]);
    isOpen: any;
    isClosing: boolean;
    enableSoftEvents: any;
    enableClickEvents: any;
    setupPrimitiveContainer: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
        };
        Element: Element;
    }>;
    containerElement: Element | undefined;
    setupPrimitiveToggle: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
        };
        Element: Element;
    }>;
    toggleElement: Element | undefined;
    setupPrimitivePopover: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
        };
        Element: Element;
    }>;
    popoverElement: Element | undefined;
    showPopover(): void;
    hidePopover(): void;
    togglePopover(): void;
    onBeforeTogglePopover(event: any): void;
    onTogglePopover(event: any): void;
    onMouseEnter(): void;
    onFocusIn(): void;
    onMouseLeave(): void;
    timer: number | undefined;
    onFocusOut(event: any): void;
}
import Component from '@glimmer/component';
export { PLACEMENTS, DEFAULT_PLACEMENT } from "../../../modifiers/hds-anchored-position.js";
//# sourceMappingURL=index.d.ts.map