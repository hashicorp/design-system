/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../icon';
import type { HdsInteractiveSignature } from '../interactive/';
export interface HdsAppHeaderHomeLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon: HdsIconSignature['Args']['name'];
        color?: string;
        ariaLabel: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsAppHeaderHomeLink extends Component<HdsAppHeaderHomeLinkSignature> {
    get ariaLabel(): string;
}
//# sourceMappingURL=home-link.d.ts.map