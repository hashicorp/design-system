/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import PowerSelectComponent from 'ember-power-select/components/power-select';
import { ID_PREFIX } from '../../label/index';

export default class HdsSuperSelectMultipleFieldComponent extends PowerSelectComponent {
  get idPrefix() {
    return ID_PREFIX;
  }
}
