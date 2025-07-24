import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { didInsertGridCell, updateTabbableChildren } from './hds-advanced-table-cell/dom-management.js';
import { handleGridCellKeyPress } from './hds-advanced-table-cell/keyboard-navigation.js';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsAdvancedTableCellModifier extends Modifier {
  // have a copy of shouldTrapFocus internally so the correct value is used when update tabbable children
  _shouldTrapFocus = false;
  _didSetup = false;
  _element = undefined;
  _observer = undefined;
  _keydownHandler;
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, () => {
      this._observer?.disconnect();
      this._element?.removeEventListener('keydown', this._keydownHandler);
      this._element = undefined;
    });
  }
  modify(element, positional, named) {
    this._shouldTrapFocus = named.shouldTrapFocus;
    if (!this._didSetup) {
      this.#setupObserver(element, positional, named);
      named.setCellElement(element);
      this._didSetup = true;
      this._element = element;
    }
  }
  #setupObserver(element, _positional, named) {
    const {
      handleEnableFocusTrap
    } = named;
    didInsertGridCell(element);
    this._keydownHandler = event => {
      handleGridCellKeyPress(event, handleEnableFocusTrap);
    };
    element.addEventListener('keydown', this._keydownHandler);
    this._observer = new MutationObserver(() => {
      updateTabbableChildren(element, this._shouldTrapFocus);
    });
    this._observer.observe(element, {
      childList: true,
      subtree: true
    });
  }
}

export { HdsAdvancedTableCellModifier as default };
//# sourceMappingURL=hds-advanced-table-cell.js.map
