/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsCopyButtonSignature } from '../copy/button';
export interface HdsCodeBlockCopyButtonSignature {
    Args: {
        targetToCopy?: HdsCopyButtonSignature['Args']['targetToCopy'];
        text?: HdsCopyButtonSignature['Args']['text'];
    };
    Blocks: {
        default: [];
    };
    Element: HdsCopyButtonSignature['Element'];
}
export default class HdsCodeBlockCopyButton extends Component<HdsCodeBlockCopyButtonSignature> {
    get text(): HdsCopyButtonSignature['Args']['text'];
}
//# sourceMappingURL=copy-button.d.ts.map