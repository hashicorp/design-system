/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
export interface HdsTestComponentSignature {
    Args: {};
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsTestComponent extends Component<HdsTestComponentSignature> {
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map