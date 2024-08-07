/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
import type { HdsTextDisplaySignature } from '../text/display';
export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    titleTag?: HdsTextDisplaySignature['Args']['tag'];
    errorCode?: string;
    icon?: FlightIconSignature['Args']['name'];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateHeaderComponent extends Component<HdsApplicationStateHeaderSignature> {
  get titleTag() {
    return this.args.titleTag ?? 'div';
  }
}
