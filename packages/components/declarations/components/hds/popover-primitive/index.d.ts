/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';
import type { ModifierLike } from '@glint/template';
export interface HdsPopoverPrimitiveSignature {
    Args: {
        isOpen?: boolean;
        enableSoftEvents?: boolean;
        enableClickEvents?: boolean;
        onOpen?: () => void;
        onClose?: () => void;
    };
    Blocks: {
        default: [
            {
                setupPrimitiveContainer: ModifierLike<SetupPrimitiveContainerModifier>;
                setupPrimitiveToggle: ModifierLike<SetupPrimitiveToggleModifier>;
                setupPrimitivePopover: ModifierLike<SetupPrimitivePopoverModifier>;
                toggleElement?: HTMLButtonElement;
                popoverElement?: HTMLElement;
                isOpen: boolean;
                showPopover: () => void;
                hidePopover: () => void;
                togglePopover: () => void;
            }
        ];
    };
}
interface SetupPrimitiveContainerModifier {
    Element: HTMLElement;
}
export interface SetupPrimitiveToggleModifier {
    Element: HTMLButtonElement;
}
export interface SetupPrimitivePopoverModifier {
    Element: HTMLElement;
    Args: {
        Positional: [];
        Named: {
            anchoredPositionOptions: FloatingUIOptions;
        };
    };
}
export default class HdsPopoverPrimitive extends Component<HdsPopoverPrimitiveSignature> {
    private _isOpen;
    private _isClosing;
    private _containerElement?;
    private _toggleElement?;
    private _popoverElement?;
    enableSoftEvents: boolean;
    enableClickEvents: boolean;
    private _timer?;
    constructor(owner: unknown, args: HdsPopoverPrimitiveSignature['Args']);
    setupPrimitiveContainer: import("ember-modifier").FunctionBasedModifier<{
        Element: HTMLElement;
        Args: {
            Named: import("ember-modifier/-private/signature").EmptyObject;
            Positional: [];
        };
    }>;
    setupPrimitiveToggle: import("ember-modifier").FunctionBasedModifier<{
        Element: HTMLButtonElement;
        Args: {
            Named: import("ember-modifier/-private/signature").EmptyObject;
            Positional: [];
        };
    }>;
    setupPrimitivePopover: import("ember-modifier").FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: {
                anchoredPositionOptions: FloatingUIOptions;
            };
        };
        Element: HTMLElement;
    }>;
    showPopover(): void;
    hidePopover(): void;
    togglePopover(): void;
    onBeforeTogglePopover(event: ToggleEvent): void;
    onTogglePopover(event: ToggleEvent): void;
    onMouseEnter(): void;
    onFocusIn(): void;
    onMouseLeave(): void;
    onFocusOut(event: FocusEvent): void;
}
export {};
//# sourceMappingURL=index.d.ts.map