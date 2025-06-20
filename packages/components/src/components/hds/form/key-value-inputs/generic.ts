/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export interface HdsFormKeyValueInputsGenericSignature {
  Args: {
    onInsert?: (element: HTMLDivElement) => void;
    onRemove?: (element: HTMLDivElement) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormKeyValueInputsGeneric extends Component<HdsFormKeyValueInputsGenericSignature> {
  private _element!: HTMLDivElement;

  private _onInsert = modifier((element: HTMLDivElement) => {
    this._element = element;
    if (this.args.onInsert) {
      this.args.onInsert(element);
    }

    return () => {
      if (this.args.onRemove) {
        this.args.onRemove(element);
      }
    };
  });
}
