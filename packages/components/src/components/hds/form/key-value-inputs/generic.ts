/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export interface HdsFormKeyValueInputsGenericSignature {
  Args: {
    onInsert?: () => void;
    onRemove?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormKeyValueInputsGeneric extends Component<HdsFormKeyValueInputsGenericSignature> {
  private _onInsert = modifier(() => {
    if (this.args.onInsert) {
      this.args.onInsert();
    }

    return () => {
      if (this.args.onRemove) {
        this.args.onRemove();
      }
    };
  });
}
