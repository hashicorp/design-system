/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';

export interface HdsFormKeyValueInputsYieldSignature {
  Args: {
    onInsert?: (element: HTMLDivElement) => void;
    onRemove?: (element: HTMLDivElement) => void;
    rowIndex: number;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormKeyValueInputsYield extends Component<HdsFormKeyValueInputsYieldSignature> {
  private _element!: HTMLDivElement;

  constructor(owner: Owner, args: HdsFormKeyValueInputsYieldSignature['Args']) {
    super(owner, args);

    registerDestructor(this, (): void => {
      if (this.args.onRemove) {
        this.args.onRemove(this._element);
      }
    });
  }

  private _onInsert = modifier((element: HTMLDivElement) => {
    this._element = element;
    if (this.args.onInsert) {
      this.args.onInsert(element);
    }
  });
}
