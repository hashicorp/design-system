/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsButtonIndexComponent from '../src/components/hds/button';
import type HdsInteractiveIndexComponent from '../src/components/hds/interactive';

export default interface HdsComponentsRegistry {
  HdsButtonComponent: typeof HdsButtonIndexComponent;
  HdsInteractiveComponent: typeof HdsInteractiveIndexComponent;
}
