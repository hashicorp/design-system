/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../yield';
import type HdsAppFooterItemSignature from './legal-links';
import type HdsAppFooterLegalLinksSignature from './legal-links';
import type HdsAppFooterLinkSignature from './link';
import type HdsAppFooterStatusLinkSignature from './status-link';
import type { HdsAppFooterThemeTypes } from './types.ts';
export interface HdsAppFooterSignature {
    Args: {
        ariaLabel?: string;
        copyrightYear?: string;
        theme?: HdsAppFooterThemeTypes;
    };
    Blocks: {
        default: [
            {
                ExtraBefore?: ComponentLike<HdsYieldSignature>;
                StatusLink?: ComponentLike<HdsAppFooterStatusLinkSignature>;
                LegalLinks?: ComponentLike<HdsAppFooterLegalLinksSignature>;
                Link?: ComponentLike<HdsAppFooterLinkSignature>;
                Item?: ComponentLike<HdsAppFooterItemSignature>;
                ExtraAfter?: ComponentLike<HdsYieldSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAppFooterComponent extends Component<HdsAppFooterSignature> {
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Footer items'
     */
    get ariaLabel(): string;
    /**
     * @param theme
     * @type {HdsAppFooterThemeTypes}
     * @description The component theme
     * @default 'light'
     */
    get theme(): HdsAppFooterThemeTypes;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map