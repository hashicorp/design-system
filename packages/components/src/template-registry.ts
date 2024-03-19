/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsButtonIndexComponent from './components/hds/button';
import type HdsDismissButtonIndexComponent from './components/hds/dismiss-button';
import type HdsInteractiveIndexComponent from './components/hds/interactive';
import type HdsLinkInlineComponent from './components/hds/link/inline';
import type HdsLinkStandaloneComponent from './components/hds/link/standalone';
import type HdsTextIndexComponent from './components/hds/text';
import type HdsTextBodyComponent from './components/hds/text/body';
import type HdsTextDisplayComponent from './components/hds/text/display';
import type HdsTextCodeComponent from './components/hds/text/code';
import type HdsYieldComponent from './components/hds/yield';
import type HdsLinkToModelsHelper from './helpers/hds-link-to-models';
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

  // Link Inline
  'Hds::Link::Inline': typeof HdsLinkInlineComponent;
  'hds/link/inline': typeof HdsLinkInlineComponent;
  HdsLinkInline: typeof HdsLinkInlineComponent;

  // Link Standalone
  'Hds::Link::Standalone': typeof HdsLinkStandaloneComponent;
  'hds/link/standalone': typeof HdsLinkStandaloneComponent;
  HdsLinkStandalone: typeof HdsLinkStandaloneComponent;

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

  // Yield
  'Hds::Yield': typeof HdsYieldComponent;
  'hds/yield': typeof HdsYieldComponent;
  HdsYield: typeof HdsYieldComponent;

  // Helpers
  'hds-link-to-models': typeof HdsLinkToModelsHelper;
  'hds-link-to-query': typeof HdsLinkToQueryHelper;
}
