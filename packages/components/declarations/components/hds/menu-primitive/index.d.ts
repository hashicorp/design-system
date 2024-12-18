/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface MenuPrimitiveSignature {
    Args: {
        onClose?: (...args: any[]) => void;
    };
    Blocks: {
        toggle?: [
            {
                onClickToggle: (event: MouseEvent, ...args: any[]) => void;
                isOpen?: boolean;
            }
        ];
        content?: [
            {
                close: (...args: any[]) => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class MenuPrimitive extends Component<MenuPrimitiveSignature> {
    isOpen: boolean | undefined;
    toggleRef: HTMLElement | undefined;
    element: HTMLElement;
    constructor(owner: unknown, args: MenuPrimitiveSignature['Args']);
    didInsert(element: HTMLElement): void;
    onClickToggle(event: MouseEvent): void;
    onFocusOut(event: FocusEvent): void;
    onKeyUp(event: KeyboardEvent): void;
    close(): void;
}
//# sourceMappingURL=index.d.ts.map