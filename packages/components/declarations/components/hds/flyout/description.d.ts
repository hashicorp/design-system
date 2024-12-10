/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../text/body';
export interface HdsFlyoutDescriptionSignature {
    Args: never;
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
export default class HdsFlyoutDescription extends Component<HdsFlyoutDescriptionSignature> {
    constructor(owner: unknown, args: HdsFlyoutDescriptionSignature['Args']);
}
//# sourceMappingURL=description.d.ts.map