/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsAppFooterLegalLinksSignature {
    Args: {
        ariaLabel?: string;
        hrefForTerms?: string;
        hrefForPrivacy?: string;
        hrefForSecurity?: string;
        hrefForSupport?: string;
        hrefForAccessibility?: string;
    };
    Element: HTMLUListElement;
}
export default class HdsAppFooterLegalLinksComponent extends Component<HdsAppFooterLegalLinksSignature> {
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Legal links'
     */
    get ariaLabel(): string;
    /**
     * @param hrefForSupport
     * @type {string}
     * @description The href value of the "Support" link
     */
    get hrefForSupport(): string;
    /**
     * @param hrefForTerms
     * @type {string}
     * @description The href value of the "Terms" link
     */
    get hrefForTerms(): string;
    /**
     * @param hrefForPrivacy
     * @type {string}
     * @description The href value of the "Privacy" link
     */
    get hrefForPrivacy(): string;
    /**
     * @param hrefForSecurity
     * @type {string}
     * @description The href value of the "Security" link
     */
    get hrefForSecurity(): string;
    /**
     * @param hrefForAccessibility
     * @type {string}
     * @description The href value of the "Accessibility" link
     */
    get hrefForAccessibility(): string;
}
//# sourceMappingURL=legal-links.d.ts.map