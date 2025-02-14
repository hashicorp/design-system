/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsApplicationStateAligns } from './types';
import type { HdsApplicationStateMediaSignature } from './media';
import type { HdsApplicationStateHeaderSignature } from './header';
import type { HdsApplicationStateBodySignature } from './body';
import type { HdsApplicationStateFooterSignature } from './footer';
export declare const ALIGNS: string[];
export interface HdsApplicationStateSignature {
    Args: {
        align?: HdsApplicationStateAligns;
    };
    Blocks: {
        default: [
            {
                Media?: ComponentLike<HdsApplicationStateMediaSignature>;
                Header?: ComponentLike<HdsApplicationStateHeaderSignature>;
                Body?: ComponentLike<HdsApplicationStateBodySignature>;
                Footer?: ComponentLike<HdsApplicationStateFooterSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsApplicationState extends Component<HdsApplicationStateSignature> {
    get align(): HdsApplicationStateAligns;
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map