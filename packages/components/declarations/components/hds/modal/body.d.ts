/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface HdsModalBodySignature {
    Args: never;
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsModalBody extends Component<HdsModalBodySignature> {
    constructor(owner: Owner, args: HdsModalBodySignature['Args']);
}
