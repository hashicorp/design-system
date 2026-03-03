/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { updateTabbableChildren } from './hds-advanced-table-cell/dom-management.ts';
import { focusable } from 'tabbable';

import type Owner from '@ember/owner';
import type { ArgsFor, PositionalArgs } from 'ember-modifier';

export interface HdsAdvancedTableCellModifierSignature {
  Args: {
    Named: {
      shouldTrapFocus: boolean;
      handleEnableFocusTrap: () => void;
      setCellElement?: (el: HTMLDivElement) => void;
    };
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableCellModifier extends Modifier<HdsAdvancedTableCellModifierSignature> {
  // have a copy of shouldTrapFocus internally so the correct value is used when update tabbable children
  private _shouldTrapFocus = false;
  private _didSetup = false;
  private _element: HTMLDivElement | undefined = undefined;
  private _observer: MutationObserver | undefined = undefined;
  private _keydownHandler!: (event: KeyboardEvent) => void;

  constructor(
    owner: Owner,
    args: ArgsFor<HdsAdvancedTableCellModifierSignature>
  ) {
    super(owner, args);

    registerDestructor(this, () => {
      this._observer?.disconnect();
      this._element?.removeEventListener('keydown', this._keydownHandler);
      this._element = undefined;
    });
  }

  modify(
    element: HdsAdvancedTableCellModifierSignature['Element'],
    positional: PositionalArgs<HdsAdvancedTableCellModifierSignature>,
    named: HdsAdvancedTableCellModifierSignature['Args']['Named']
  ): void {
    this._shouldTrapFocus = named.shouldTrapFocus;

    if (!this._didSetup) {
      this.#setupObserver(element, positional, named);

      named.setCellElement?.(element);

      this._didSetup = true;
      this._element = element;
    }
  }

  #setupObserver(
    element: HdsAdvancedTableCellModifierSignature['Element'],
    _positional: PositionalArgs<HdsAdvancedTableCellModifierSignature>,
    named: HdsAdvancedTableCellModifierSignature['Args']['Named']
  ): void {
    const { handleEnableFocusTrap } = named;

    // suppress tabbable children on initial setup
    updateTabbableChildren(element);

    // only handle Enter key for action mode (focus trap activation)
    this._keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const cellFocusableChildren = focusable(element);

        if (cellFocusableChildren.length > 0) {
          for (let i = 0; i < cellFocusableChildren.length; i++) {
            const child = cellFocusableChildren[i];

            if (child?.hasAttribute('data-advanced-table-child-focusable')) {
              child.setAttribute('tabindex', '0');
            }
          }

          element.setAttribute('tabindex', '-1');

          handleEnableFocusTrap();
        }
      }
    };

    element.addEventListener('keydown', this._keydownHandler);

    this._observer = new MutationObserver(() => {
      updateTabbableChildren(element, this._shouldTrapFocus);
    });

    this._observer.observe(element, {
      childList: true,
      subtree: true,
    });
  }
}
