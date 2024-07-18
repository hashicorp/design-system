/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsTabsTabIds } from './types';
export interface HdsTabsTabSignature {
    Args: {
        tabIds: HdsTabsTabIds;
        selectedTabIndex: number;
        icon?: IconName;
        count?: string;
        isSelected?: boolean;
        didInsertNode: (element: HTMLButtonElement, isSelected?: boolean) => void;
        didUpdateNode: (nodeIndex: number, isSelected?: boolean) => void;
        willDestroyNode: (element: HTMLButtonElement) => void;
        onClick: (event: MouseEvent, tabIndex: number) => void;
        onKeyUp: (nodeIndex: number, event: KeyboardEvent) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLLIElement;
}
export default class HdsTabsTabComponent extends Component<HdsTabsTabSignature> {
    /**
     * Generate a unique ID for the Tab
     * @return {string}
     */
    tabId: string;
    get nodeIndex(): number | undefined;
    /**
     * Determine if the tab is the selected tab
     * @return {boolean}
     * @default false (1st tab is selected by default)
     */
    get isSelected(): boolean;
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