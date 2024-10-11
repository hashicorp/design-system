/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../text/body';
interface HdsFlyoutDescriptionSignature {
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
export default class HdsFlyoutDescription extends Component<HdsFlyoutDescriptionSignature> {
    constructor(owner: unknown);
}
export {};
//# sourceMappingURL=description.d.ts.map