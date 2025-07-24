/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSignature } from '../icon';
import type { HdsInteractiveSignature } from '../interactive/';
export interface HdsAppHeaderHomeLinkSignature {
    Args: HdsInteractiveSignature['Args'] & {
        icon: HdsIconSignature['Args']['name'];
        isIconOnly?: boolean;
        color?: string;
        text: string;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsAppHeaderHomeLink extends Component<HdsAppHeaderHomeLinkSignature> {
    get text(): string;
    get icon(): HdsIconSignature['Args']['name'];
    get isIconOnly(): boolean;
}
