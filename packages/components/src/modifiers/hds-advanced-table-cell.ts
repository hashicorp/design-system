/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import type { ArgsFor, PositionalArgs } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
// import { tracked } from '@glimmer/tracking';

import {
  didInsertGridCell,
  updateTabbableChildren,
} from './hds-advanced-table-cell/dom-management.ts';
import { handleGridCellKeyPress } from './hds-advanced-table-cell/keyboard-navigation.ts';

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

function cleanup(instance: HdsAdvancedTableCellModifier): void {
  const { _observer } = instance;
  if (_observer) {
    _observer.disconnect();
  }
}

export default class HdsAdvancedTableCellModifier extends Modifier<HdsAdvancedTableCellModifierSignature> {
  // have a copy of shouldTrapFocus internally so the correct value is used when update tabbable children
  private _shouldTrapFocus = false;
  private _didSetup = false;
  _observer: MutationObserver | undefined = undefined;

  constructor(
    owner: unknown,
    args: ArgsFor<HdsAdvancedTableCellModifierSignature>
  ) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(
    element: HTMLDivElement,
    positional: PositionalArgs<HdsAdvancedTableCellModifierSignature>,
    named: HdsAdvancedTableCellModifierSignature['Args']['Named']
  ): void {
    this._shouldTrapFocus = named.shouldTrapFocus;

    if (!this._didSetup) {
      this.#setupObserver(element, positional, named);
      named.setCellElement(element);
      this._didSetup = true;
    }
  }

  #setupObserver(
    element: HdsAdvancedTableCellModifierSignature['Element'],
    _positional: PositionalArgs<HdsAdvancedTableCellModifierSignature>,
    named: HdsAdvancedTableCellModifierSignature['Args']['Named']
  ): void {
    const { handleEnableFocusTrap } = named;

    didInsertGridCell(element);
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      handleGridCellKeyPress(event, handleEnableFocusTrap);
    });

    this._observer = new MutationObserver(() => {
      updateTabbableChildren(element, this._shouldTrapFocus);
    });

    this._observer.observe(element, {
      childList: true,
      subtree: true,
    });
  }
}
