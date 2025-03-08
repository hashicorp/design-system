/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsTabsTabIds, HdsTabsPanelIds } from './types';
export interface HdsTabsTabSignature {
    Args: {
        tabIds?: HdsTabsTabIds;
        panelIds?: HdsTabsPanelIds;
        selectedTabIndex?: number;
        icon?: IconName;
        count?: string;
        isSelected?: boolean;
        didInsertNode?: (element: HTMLButtonElement, isSelected?: boolean) => void;
        didUpdateNode?: (nodeIndex: number, isSelected?: boolean) => void;
        willDestroyNode?: (element: HTMLButtonElement) => void;
        onClick?: (event: MouseEvent, tabIndex: number) => void;
        onKeyUp?: (nodeIndex: number, event: KeyboardEvent) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLLIElement;
}
export default class HdsTabsTab extends Component<HdsTabsTabSignature> {
    /**
     * Generate a unique ID for the Tab
     * @return {string}
     * @param _tabId
     */
    private _tabId;
    get nodeIndex(): number | undefined;
    /**
     * Determine if the tab is the selected tab
     * @return {boolean}
     * @default false (1st tab is selected by default)
     */
    get isSelected(): boolean;
    /**
     * Get the ID of the panel coupled/associated with the tab (it's used by the `aria-controls` attribute)
     * @returns string}
     */
    get coupledPanelId(): string | undefined;
    didInsertNode(element: HTMLButtonElement, positional: [boolean?]): void;
    didUpdateNode(): void;
    willDestroyNode(element: HTMLButtonElement): void;
    onClick(event: MouseEvent): false | undefined;
    onKeyUp(event: KeyboardEvent): void;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=tab.d.ts.map