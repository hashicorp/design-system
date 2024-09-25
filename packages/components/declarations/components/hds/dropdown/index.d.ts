/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsDropdownPositionValues } from './types.ts';
import type { ComponentLike } from '@glint/template';
import type { MenuPrimitiveSignature } from '../menu-primitive';
import type { HdsDropdownFooterSignature } from './footer';
import type { HdsDropdownHeaderSignature } from './header';
import type { HdsDropdownListItemCheckboxSignature } from './list-item/checkbox';
import type { HdsDropdownListItemCheckmarkSignature } from './list-item/checkmark';
import type { HdsDropdownListItemCopyItemSignature } from './list-item/copy-item';
import type { HdsDropdownListItemDescriptionSignature } from './list-item/description';
import type { HdsDropdownListItemGenericSignature } from './list-item/generic';
import type { HdsDropdownListItemInteractiveSignature } from './list-item/interactive';
import type { HdsDropdownListItemRadioSignature } from './list-item/radio';
import type { HdsDropdownListItemSeparatorSignature } from './list-item/separator';
import type { HdsDropdownListItemTitleSignature } from './list-item/title';
import type { HdsDropdownToggleButtonSignature } from './toggle/button';
import type { HdsDropdownToggleIconSignature } from './toggle/icon';
import type { HdsDropdownPositions } from './types';
import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';
export declare const DEFAULT_POSITION = HdsDropdownPositionValues.BottomRight;
export declare const POSITIONS: string[];
export interface HdsDropdownSignature {
    Args: MenuPrimitiveSignature['Args'] & {
        height?: string;
        isInline?: boolean;
        isOpen?: boolean;
        listPosition?: HdsDropdownPositions;
        width?: string;
        enableCollisionDetection?: FloatingUIOptions['enableCollisionDetection'];
    };
    Blocks: {
        default: [
            {
                Footer?: ComponentLike<HdsDropdownFooterSignature>;
                Header?: ComponentLike<HdsDropdownHeaderSignature>;
                Checkbox?: ComponentLike<HdsDropdownListItemCheckboxSignature>;
                Checkmark?: ComponentLike<HdsDropdownListItemCheckmarkSignature>;
                CopyItem?: ComponentLike<HdsDropdownListItemCopyItemSignature>;
                Description?: ComponentLike<HdsDropdownListItemDescriptionSignature>;
                Generic?: ComponentLike<HdsDropdownListItemGenericSignature>;
                Interactive?: ComponentLike<HdsDropdownListItemInteractiveSignature>;
                Radio?: ComponentLike<HdsDropdownListItemRadioSignature>;
                Separator?: ComponentLike<HdsDropdownListItemSeparatorSignature>;
                Title?: ComponentLike<HdsDropdownListItemTitleSignature>;
                ToggleButton?: ComponentLike<HdsDropdownToggleButtonSignature>;
                ToggleIcon?: ComponentLike<HdsDropdownToggleIconSignature>;
                close?: () => void;
            }
        ];
    };
    Element: MenuPrimitiveSignature['Element'];
}
export default class HdsDropdown extends Component<HdsDropdownSignature> {
    /**
     * @param listPosition
     * @type {string}
     * @default bottom-right
     * @description Determines the position of the "list"
     */
    get listPosition(): HdsDropdownPositions;
    get enableCollisionDetection(): FloatingUIOptions['enableCollisionDetection'];
    get anchoredPositionOptions(): {
        placement: FloatingUIOptions['placement'];
        offsetOptions: FloatingUIOptions['offsetOptions'];
        enableCollisionDetection: FloatingUIOptions['enableCollisionDetection'];
    };
    /**
     * Get the class names to apply to the element
     * @method classNames
     * @return {string} The "class" attribute to apply to the root element
     */
    get classNames(): string;
    /**
     * Get the class names to apply to the content
     * @method classNamesContent
     * @return {string} The "class" attribute to apply to the disclosed content
     */
    get classNamesContent(): string;
    didInsertList(element: HTMLUListElement): void;
}
//# sourceMappingURL=index.d.ts.map