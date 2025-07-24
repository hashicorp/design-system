/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';
export interface HdsFlyoutHeaderSignature {
    Args: {
        id?: string;
        tagline?: string;
        onDismiss: (event: MouseEvent) => void;
        icon?: HdsIconSignature['Args']['name'];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsFlyoutHeader extends Component<HdsFlyoutHeaderSignature> {
    constructor(owner: Owner, args: HdsFlyoutHeaderSignature['Args']);
}
