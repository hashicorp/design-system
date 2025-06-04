/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';

export interface HdsFormKeyValuePairYieldSignature {
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

export default class HdsFormKeyValuePairYieldLabel extends Component<HdsFormKeyValuePairYieldSignature> {
  constructor(owner: Owner, args: HdsFormKeyValuePairYieldSignature['Args']) {
    super(owner, args);

    registerDestructor(this, (): void => {
      if (this.args.onRemove && this.args.rowIndex === 0) {
        this.args.onRemove(this.element as HTMLDivElement);
      }
    });
  }

  private _onInsert = modifier((element: HTMLDivElement) => {
    if (this.args.onInsert && this.args.rowIndex === 0) {
      this.args.onInsert(element);
    }
  });
}
