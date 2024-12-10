/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive/';
export interface HdsSideNavHeaderIconButtonSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon: HdsIconSignature['Args']['name'];
        ariaLabel: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsSideNavHeaderIconButton extends Component<HdsSideNavHeaderIconButtonSignature> {
    constructor(owner: unknown, args: HdsSideNavHeaderIconButtonSignature['Args']);
    get ariaLabel(): string;
}
//# sourceMappingURL=icon-button.d.ts.map