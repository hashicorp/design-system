/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../icon';
import type { HdsDialogPrimitiveHeaderTitleTags } from './types';
export interface HdsDialogPrimitiveHeaderSignature {
    Args: {
        contextualClassPrefix?: string;
        id?: string;
        icon?: HdsIconSignature['Args']['name'];
        onDismiss?: (event: MouseEvent, ...args: any[]) => void;
        titleTag?: HdsDialogPrimitiveHeaderTitleTags;
        tagline?: string;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsDialogPrimitiveHeader extends Component<HdsDialogPrimitiveHeaderSignature> {
    get titleTag(): HdsDialogPrimitiveHeaderTitleTags;
    /**
     * @param onDismiss
     * @type {function}
     * @default () => {}
     */
    get onDismiss(): (event: MouseEvent, ...args: any[]) => void;
}
//# sourceMappingURL=header.d.ts.map