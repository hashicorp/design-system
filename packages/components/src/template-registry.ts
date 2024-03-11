/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsLinkToModelsHelper from './helpers/hds-link-to-models';
import type HdsButtonIndexComponent from './components/hds/button';
import type HdsDismissButtonIndexComponent from './components/hds/dismiss-button';
import type HdsInteractiveIndexComponent from './components/hds/interactive';
import type HdsLinkToQueryHelper from './helpers/hds-link-to-query';

export default interface HdsComponentsRegistry {
  HdsInteractiveComponent: typeof HdsInteractiveIndexComponent;
  // Button
  'Hds::Button': typeof HdsButtonIndexComponent;
  'hds/button': typeof HdsButtonIndexComponent;
  HdsButton: typeof HdsButtonIndexComponent;

  // Dismiss button
  'Hds::DismissButton': typeof HdsDismissButtonIndexComponent;
  'hds/dismiss-button': typeof HdsDismissButtonIndexComponent;
  HdsDismissButton: typeof HdsDismissButtonIndexComponent;

  // Interactive
  'Hds::Interactive': typeof HdsInteractiveIndexComponent;
  'hds/interactive': typeof HdsInteractiveIndexComponent;
  HdsInteractive: typeof HdsInteractiveIndexComponent;

  // Helpers
  'hds-link-to-models': typeof HdsLinkToModelsHelper;
  'hds-link-to-query': typeof HdsLinkToQueryHelper;
}
