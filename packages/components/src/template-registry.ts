/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsLinkToModelsHelper from './helpers/hds-link-to-models';
import type HdsButtonIndexComponent from './components/hds/button';
import type HdsDismissButtonIndexComponent from './components/hds/dismiss-button';
import type HdsInteractiveIndexComponent from './components/hds/interactive';
import type HdsLinkToQueryHelper from './helpers/hds-link-to-query';
import type HdsTextIndexComponent from './components/hds/text';
import type HdsTextBodyComponent from './components/hds/text/body';
import type HdsTextDisplayComponent from './components/hds/text/display';
import type HdsTextCodeComponent from './components/hds/text/code';

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

  // Text
  'Hds::Text': typeof HdsTextIndexComponent;
  'hds/text': typeof HdsTextIndexComponent;
  HdsText: typeof HdsTextIndexComponent;
  'Hds::Text::Body': typeof HdsTextBodyComponent;
  'hds/text/body': typeof HdsTextBodyComponent;
  HdsTextBody: typeof HdsTextBodyComponent;
  'Hds::Text::Display': typeof HdsTextDisplayComponent;
  'hds/text/display': typeof HdsTextDisplayComponent;
  HdsTextDisplay: typeof HdsTextDisplayComponent;
  'Hds::Text::Code': typeof HdsTextCodeComponent;
  'hds/text/code': typeof HdsTextCodeComponent;
  HdsTextCode: typeof HdsTextCodeComponent;

  // Helpers
  'hds-link-to-models': typeof HdsLinkToModelsHelper;
  'hds-link-to-query': typeof HdsLinkToQueryHelper;
}
