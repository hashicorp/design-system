/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsFlyoutBodySignature {
    Args: never;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsFlyoutBody extends Component<HdsFlyoutBodySignature> {
    constructor(owner: unknown, args: HdsFlyoutBodySignature['Args']);
}
//# sourceMappingURL=body.d.ts.map