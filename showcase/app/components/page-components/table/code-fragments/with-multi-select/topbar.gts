/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';

export interface CodeFragmentWithMultiSelectTopbarSignature {
  Args: {
    isScopeExtended: boolean;
    isDebugging: boolean;
    onChangeScope?: (event: Event) => void;
    onChangeDebugging?: (event: Event) => void;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLElement;
}

export default class CodeFragmentWithMultiSelectTopbar extends Component<CodeFragmentWithMultiSelectTopbarSignature> {
  private _scopeInputId = 'scope-input-' + guidFor(this);
  private _debugInputId = 'debug-input-' + guidFor(this);

  onChangeScope = (event: Event): void => {
    const { onChangeScope } = this.args;
    if (typeof onChangeScope === 'function') {
      onChangeScope(event);
    }
  };

  onChangeDebugging = (event: Event): void => {
    const { onChangeDebugging } = this.args;
    if (typeof onChangeDebugging === 'function') {
      onChangeDebugging(event);
    }
  };

  <template>
    <div class="shw-component-table-demo-topbar">
      <div class="shw-component-table-demo-topbar__toggle">
        <input
          id={{this._scopeInputId}}
          type="checkbox"
          checked={{@isScopeExtended}}
          {{on "change" this.onChangeScope}}
        />
        <label for={{this._scopeInputId}}>Extend "Select All" scope to
          non-displayed rows</label>
      </div>
      <div class="shw-component-table-demo-topbar__toggle">
        <input
          id={{this._debugInputId}}
          type="checkbox"
          checked={{@isDebugging}}
          {{on "change" this.onChangeDebugging}}
        />
        <label for={{this._debugInputId}}>Show all rows' state</label>
      </div>
      <div class="shw-component-table-demo-topbar__action">
        {{yield}}
      </div>
    </div>
  </template>
}
