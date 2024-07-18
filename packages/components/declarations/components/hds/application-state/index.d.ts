/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsApplicationStateAlignValues } from './types.ts';
import type { ComponentLike } from '@glint/template';
import type { HdsApplicationStateAligns } from './types';
import type { HdsApplicationStateMediaSignature } from './media';
import type { HdsApplicationStateHeaderSignature } from './header';
import type { HdsApplicationStateBodySignature } from './body';
import type { HdsApplicationStateFooterSignature } from './footer';
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
export default class HdsApplicationStateComponent extends Component<HdsApplicationStateSignature> {
    get align(): "center" | "left" | HdsApplicationStateAlignValues.Center;
}
//# sourceMappingURL=index.d.ts.map