/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Modifier from 'ember-modifier';
import type { ArgsFor, PositionalArgs } from 'ember-modifier';
import type Owner from '@ember/owner';
export interface HdsAdvancedTableCellModifierSignature {
    Args: {
        Named: {
            handleEnableFocusTrap: () => void;
            shouldTrapFocus: boolean;
            setCellElement: (el: HTMLDivElement) => void;
        };
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableCellModifier extends Modifier<HdsAdvancedTableCellModifierSignature> {
    #private;
    private _shouldTrapFocus;
    private _didSetup;
    private _element;
    private _observer;
    private _keydownHandler;
    constructor(owner: Owner, args: ArgsFor<HdsAdvancedTableCellModifierSignature>);
    modify(element: HTMLDivElement, positional: PositionalArgs<HdsAdvancedTableCellModifierSignature>, named: HdsAdvancedTableCellModifierSignature['Args']['Named']): void;
}
