/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsButtonIndexComponent from '@hashicorp/design-system-components/components/hds/button';
import type HdsInteractiveIndexComponent from '@hashicorp/design-system-components/components/hds/interactive';

export default interface HdsComponentsRegistry {
  HdsButtonComponent: typeof HdsButtonIndexComponent;
  HdsInteractiveComponent: typeof HdsInteractiveIndexComponent;
}
