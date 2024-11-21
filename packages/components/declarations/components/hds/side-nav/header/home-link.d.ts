/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/';
export interface HdsSideNavHeaderHomeLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon: HdsIconSignature['Args']['name'];
        color?: string;
        ariaLabel: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsSideNavHeaderHomeLink extends Component<HdsSideNavHeaderHomeLinkSignature> {
    /**
     * @param ariaLabel
     * @type {string}
     * @description The value of `aria-label`
     */
    get ariaLabel(): string;
}
//# sourceMappingURL=home-link.d.ts.map