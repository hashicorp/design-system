/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface HdsFlyoutBodySignature {
    Args: never;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsFlyoutBody extends Component<HdsFlyoutBodySignature> {
    constructor(owner: Owner, args: HdsFlyoutBodySignature['Args']);
}
//# sourceMappingURL=body.d.ts.map