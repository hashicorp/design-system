/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTabsTabSignature } from './tab';
import type { HdsTabsPanelIds, HdsTabsTabIds } from './types';
export interface HdsTabsPanelSignature {
    Args: {
        tabIds: HdsTabsTabIds;
        panelIds: HdsTabsPanelIds;
        selectedTabIndex: HdsTabsTabSignature['Args']['selectedTabIndex'];
        didInsertNode: (element: HTMLElement, elementId: string) => void;
        willDestroyNode: (element: HTMLElement) => void;
    };
    Blocks: {
        default: [
            {
                isVisible: boolean;
            }
        ];
    };
    Element: HTMLElement;
}
export default class HdsTabsPanelComponent extends Component<HdsTabsPanelSignature> {
    /**
     * Generate a unique ID for the Panel
     * @return {string}
     */
    panelId: string;
    elementId?: string;
    get nodeIndex(): number | undefined;
    /**
     * Check the condition if the panel is visible (because the coupled/associated tab is selected) or not
     * @returns {boolean}
     */
    get isVisible(): boolean;
    /**
     * Get the ID of the tab coupled/associated with the panel (it's used by the `aria-labelledby` attribute)
     * @returns string}
     */
    get coupledTabId(): string | undefined;
    didInsertNode(element: HTMLElement): void;
    willDestroyNode(element: HTMLElement): void;
}
//# sourceMappingURL=panel.d.ts.map