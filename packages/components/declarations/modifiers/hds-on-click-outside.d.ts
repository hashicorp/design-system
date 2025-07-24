/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type Owner from '@ember/owner';
import type { ArgsFor, PositionalArgs } from 'ember-modifier';
export interface HdsOnClickOutsideSignature {
    Args: {
        Positional: [() => void];
    };
    Element: HTMLElement;
}
export default class HdsOnClickOutsideModifier extends Modifier<HdsOnClickOutsideSignature> {
    private _element?;
    clickOutsideHandler: (event: MouseEvent) => void;
    constructor(owner: Owner, args: ArgsFor<HdsOnClickOutsideSignature>);
    modify(element: HTMLElement, positional: PositionalArgs<HdsOnClickOutsideSignature>): void;
}
