/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  get OPTIONS() {
    return [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
      'London (eu-west-2)',
      'Frankfurt (eu-central-1)',
    ];
  }

  get SELECTED() {
    return ['Oregon (us-west-2)'];
  }

  get SELECTEDMULTIPLE() {
    return [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
    ];
  }

  // notice: this is used as "noop" function for the onDismiss callback of the SuperSelect component
  @action
  noop() {
    //
  }
}
