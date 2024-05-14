/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsAlertIndexComponent from './components/hds/alert';
import type HdsAlertDescriptionComponent from './components/hds/alert/description';
import type HdsAlertTitleComponent from './components/hds/alert/title';
import type HdsBadgeIndexComponent from './components/hds/badge';
import type HdsBadgeCountIndexComponent from './components/hds/badge-count';
import type HdsButtonIndexComponent from './components/hds/button';
import type HdsCardContainerComponent from './components/hds/card/container.ts';
import type HdsDisclosurePrimitiveComponent from './components/hds/disclosure-primitive';
import type HdsDismissButtonIndexComponent from './components/hds/dismiss-button';
import type HdsIconTileIndexComponent from './components/hds/icon-tile';
import type HdsInteractiveIndexComponent from './components/hds/interactive';
import type HdsLinkInlineComponent from './components/hds/link/inline';
import type HdsLinkStandaloneComponent from './components/hds/link/standalone';
import type HdsTextIndexComponent from './components/hds/text';
import type HdsTextBodyComponent from './components/hds/text/body';
import type HdsTextDisplayComponent from './components/hds/text/display';
import type HdsToastComponent from './components/hds/toast';
import type HdsTextCodeComponent from './components/hds/text/code';
import type HdsYieldComponent from './components/hds/yield';
import type HdsLinkToModelsHelper from './helpers/hds-link-to-models';
import type HdsLinkToQueryHelper from './helpers/hds-link-to-query';

export default interface HdsComponentsRegistry {
  // Alert
  'Hds::Alert': typeof HdsAlertIndexComponent;
  'hds/alert': typeof HdsAlertIndexComponent;
  HdsAlert: typeof HdsAlertIndexComponent;

  'Hds::Alert::Description': typeof HdsAlertDescriptionComponent;
  'hds/alert/description': typeof HdsAlertDescriptionComponent;
  HdsAlertDescription: typeof HdsAlertDescriptionComponent;

  'Hds::Alert::Title': typeof HdsAlertTitleComponent;
  'hds/alert/title': typeof HdsAlertTitleComponent;
  HdsAlertTitle: typeof HdsAlertTitleComponent;

  // Badge
  'Hds::Badge': typeof HdsBadgeIndexComponent;
  'hds/badge': typeof HdsBadgeIndexComponent;
  HdsBadge: typeof HdsBadgeIndexComponent;

  // BadgeCount
  'Hds::Badge::Count': typeof HdsBadgeCountIndexComponent;
  'hds/badge-count': typeof HdsBadgeCountIndexComponent;
  HdsBadgeCount: typeof HdsBadgeCountIndexComponent;

  // Button
  'Hds::Button': typeof HdsButtonIndexComponent;
  'hds/button': typeof HdsButtonIndexComponent;
  HdsButton: typeof HdsButtonIndexComponent;

  // Card
  'Hds::Card': typeof HdsCardContainerComponent;
  'hds/card': typeof HdsCardContainerComponent;
  HdsCard: typeof HdsCardContainerComponent;

  // Disclosure Primitive
  'Hds::DisclosurePrimitive': typeof HdsDisclosurePrimitiveComponent;
  'hds/disclosure-primitive': typeof HdsDisclosurePrimitiveComponent;
  HdsDisclosurePrimitive: typeof HdsDisclosurePrimitiveComponent;

  // Dismiss button
  'Hds::DismissButton': typeof HdsDismissButtonIndexComponent;
  'hds/dismiss-button': typeof HdsDismissButtonIndexComponent;
  HdsDismissButton: typeof HdsDismissButtonIndexComponent;

  // IconTile
  'Hds::IconTile': typeof HdsIconTileIndexComponent;
  'hds/icon-tile': typeof HdsIconTileIndexComponent;
  HdsIconTile: typeof HdsIconTileIndexComponent;

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

  // Toast
  'Hds::Toast': typeof HdsToastComponent;
  'hds/toast': typeof HdsToastComponent;
  HdsToast: typeof HdsToastComponent;

  // Yield
  'Hds::Yield': typeof HdsYieldComponent;
  'hds/yield': typeof HdsYieldComponent;
  HdsYield: typeof HdsYieldComponent;

  // Helpers
  'hds-link-to-models': typeof HdsLinkToModelsHelper;
  'hds-link-to-query': typeof HdsLinkToQueryHelper;
}
