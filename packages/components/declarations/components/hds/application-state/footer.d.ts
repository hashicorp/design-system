/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsLinkStandaloneSignature } from '../link/standalone';
export interface HdsApplicationStateFooterSignature {
    Args: {
        hasDivider?: boolean;
    };
    Blocks: {
        default?: [
            {
                LinkStandalone?: ComponentLike<HdsLinkStandaloneSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsApplicationStateFooterComponent extends Component<HdsApplicationStateFooterSignature> {
    /**
     * Indicate if the footer should have a top border or not.
     *
     * @param hasDivider
     * @type {boolean}
     * @default false
     */
    get hasDivider(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=footer.d.ts.map