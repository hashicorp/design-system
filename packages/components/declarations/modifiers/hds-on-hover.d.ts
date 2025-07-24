/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { PositionalArgs } from 'ember-modifier';
export interface HdsOnHoverModifierSignature {
    Element: HTMLElement;
    Args: {
        Positional: [
            onEnter: (args: unknown) => unknown,
            onLeave?: (args: unknown) => unknown
        ];
    };
}
export default class HdsOnHoverModifier extends Modifier<HdsOnHoverModifierSignature> {
    modify(element: HTMLDivElement, positional: PositionalArgs<HdsOnHoverModifierSignature>): void;
}
