/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsButtonIndexComponent from './components/hds/button';
import type HdsInteractiveIndexComponent from './components/hds/interactive';

export default interface HdsComponentsRegistry {
  HdsButtonComponent: typeof HdsButtonIndexComponent;
  HdsInteractiveComponent: typeof HdsInteractiveIndexComponent;
}
