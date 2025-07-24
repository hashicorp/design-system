/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';
export interface HdsModalHeaderSignature {
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
export default class HdsModalHeader extends Component<HdsModalHeaderSignature> {
    constructor(owner: Owner, args: HdsModalHeaderSignature['Args']);
}
