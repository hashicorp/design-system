/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsAlertSignature } from '../alert/';

export interface HdsToastSignature extends Omit<HdsAlertSignature, 'Args'> {
  Args: Omit<HdsAlertSignature['Args'], 'type'>;
}

const HdsToastComponent = TemplateOnlyComponent<HdsToastSignature>();

export default HdsToastComponent;
