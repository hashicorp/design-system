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
export default class HdsPopoverPrimitiveComponent extends Component<HdsPopoverPrimitiveSignature> {
    isOpen: boolean;
    isClosing: boolean;
    containerElement?: HTMLElement;
    toggleElement?: HTMLButtonElement;
    popoverElement?: HTMLElement;
    enableSoftEvents: boolean;
    enableClickEvents: boolean;
    timer?: ReturnType<typeof setTimeout> | null;
    setupPrimitiveContainer: import("ember-modifier").FunctionBasedModifier<{
        Element: HTMLElement;
        Args: {
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
            Positional: [];
        };
    }>;
    setupPrimitiveToggle: import("ember-modifier").FunctionBasedModifier<{
        Element: HTMLButtonElement;
        Args: {
            Named: import("ember-modifier/-private/signature.js").EmptyObject;
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