/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsFormHeaderTitleSignature } from './title.ts';
import type { HdsFormHeaderDescriptionSignature } from './description.ts';
export interface HdsFormHeaderSignature {
    Args: {
        isFullWidth?: boolean;
    };
    Blocks: {
        default: [
            {
                Title?: ComponentLike<HdsFormHeaderTitleSignature>;
                Description?: ComponentLike<HdsFormHeaderDescriptionSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsFormHeader extends Component<HdsFormHeaderSignature> {
    get classNames(): string;
}
