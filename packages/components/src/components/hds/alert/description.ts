/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export interface HdsAlertDescriptionSignature {
  Args: {
    onInsert: (element: HdsAlertDescriptionSignature['Element']) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAlertDescription extends Component<HdsAlertDescriptionSignature> {
  private _registerElement = modifier(
    (element: HdsAlertDescriptionSignature['Element']) => {
      this.args.onInsert(element);
    }
  );
}
