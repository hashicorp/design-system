/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../text/body';
import type Owner from '@ember/owner';
export interface HdsFlyoutDescriptionSignature {
    Args: never;
    Blocks: {
        default: [];
    };
    Element: HdsTextBodySignature['Element'];
}
export default class HdsFlyoutDescription extends Component<HdsFlyoutDescriptionSignature> {
    constructor(owner: Owner, args: HdsFlyoutDescriptionSignature['Args']);
}
//# sourceMappingURL=description.d.ts.map