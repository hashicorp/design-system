/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsAlertSignature } from '../alert/';

export interface HdsToastSignature extends Omit<HdsAlertSignature, 'Args'> {
  Args: Omit<HdsAlertSignature['Args'], 'type'>;
}

export default class HdsToastComponent extends Component<HdsToastSignature> {}
