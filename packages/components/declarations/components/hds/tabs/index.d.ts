/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsTabsTabSignature } from './tab';
import type { HdsTabsPanelSignature } from './panel';
import type { HdsTabsTabIds, HdsTabsPanelIds, HdsTabsSizes } from './types.ts';
export declare const DEFAULT_SIZE: HdsTabsSizes;
export declare const SIZES: HdsTabsSizes[];
interface HdsTabsSignature {
    Args: {
        size?: HdsTabsSizes;
        onClickTab?: (event: MouseEvent, tabIndex: number) => void;
        selectedTabIndex?: HdsTabsTabSignature['Args']['selectedTabIndex'];
        isParentVisible?: boolean;
    };
    Blocks: {
        default: [
            {
                Tab?: ComponentLike<HdsTabsTabSignature>;
                Panel?: ComponentLike<HdsTabsPanelSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsTabsComponent extends Component<HdsTabsSignature> {
    tabNodes: HTMLButtonElement[];
    tabIds: HdsTabsTabIds;
    panelNodes: HTMLElement[];
    panelIds: HdsTabsPanelIds;
    _selectedTabIndex: number;
    selectedTabId?: string;
    isControlled: boolean;
    /**
     * Sets the size of Tabs
     * Accepted values: medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): HdsTabsSizes;
    constructor(owner: unknown, args: HdsTabsSignature['Args']);
    get selectedTabIndex(): number;
    set selectedTabIndex(value: number);
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    didInsert(): void;
    didUpdateSelectedTabIndex(): void;
    didUpdateSelectedTabId(): void;
    didUpdateParentVisibility(): void;
    didInsertTab(element: HTMLButtonElement, isSelected?: boolean): void;
    didUpdateTab(tabIndex: number, isSelected?: boolean): void;
    willDestroyTab(element: HTMLButtonElement): void;
    didInsertPanel(element: HTMLElement, panelId: string): void;
    willDestroyPanel(element: HTMLElement): void;
    onClick(event: MouseEvent, tabIndex: number): void;
    onKeyUp(tabIndex: number, event: KeyboardEvent): void;
    focusTab(tabIndex: number, event: KeyboardEvent): void;
    setTabIndicator(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map