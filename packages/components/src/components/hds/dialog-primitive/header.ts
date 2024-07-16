/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export interface HdsDialogPrimitiveHeaderSignature {
  Args: {
    contextualClassPrefix?: string;
    id?: string;
    tagline?: string;
    icon?: FlightIconSignature['Args']['name'] | false;
    onDismiss?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const NOOP = () => {};

export default class HdsDialogPrimitiveHeaderComponent extends Component<HdsDialogPrimitiveHeaderSignature> {
  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  get onDismiss() {
    const { onDismiss } = this.args;

    // notice: this is a guard used in case the button is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the main components as a yielded component, so the onDismiss handler is always defined
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
    }
  }
}
