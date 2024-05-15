/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type HdsAccordionIndexComponent from './components/hds/accordion';
import type HdsAccordionItemIndexComponent from './components/hds/accordion/item';
import type HdsAccordionItemButtonComponent from './components/hds/accordion/item/button';
import type HdsAlertComponent from './components/hds/alert';
import type HdsAlertDescriptionComponent from './components/hds/alert/description';
import type HdsAlertTitleComponent from './components/hds/alert/title';
import type HdsBadgeComponent from './components/hds/badge';
import type HdsBadgeCountComponent from './components/hds/badge-count';
import type HdsButtonComponent from './components/hds/button';
import type HdsCardContainerComponent from './components/hds/card/container.ts';
import type HdsDisclosurePrimitiveComponent from './components/hds/disclosure-primitive';
import type HdsDismissButtonComponent from './components/hds/dismiss-button';
import type HdsIconTileComponent from './components/hds/icon-tile';
import type HdsInteractiveComponent from './components/hds/interactive';
import type HdsLinkInlineComponent from './components/hds/link/inline';
import type HdsLinkStandaloneComponent from './components/hds/link/standalone';
import type HdsRevealComponent from './components/hds/reveal';
import type HdsRevealToggleButtonComponent from './components/hds/reveal/toggle/button';
import type HdsTextComponent from './components/hds/text';
import type HdsTextBodyComponent from './components/hds/text/body';
import type HdsTextDisplayComponent from './components/hds/text/display';
import type HdsTagComponent from './components/hds/tag';
import type HdsToastComponent from './components/hds/toast';
import type HdsTextCodeComponent from './components/hds/text/code';
import type HdsYieldComponent from './components/hds/yield';
import type HdsLinkToModelsHelper from './helpers/hds-link-to-models';
import type HdsLinkToQueryHelper from './helpers/hds-link-to-query';

export default interface HdsComponentsRegistry {
  // Accordion
  'Hds::Accordion': typeof HdsAccordionIndexComponent;
  'hds/accordion': typeof HdsAccordionIndexComponent;
  HdsAccordion: typeof HdsAccordionIndexComponent;

  'Hds::Accordion::Item': typeof HdsAccordionItemButtonComponent;
  'hds/accordion/item': typeof HdsAccordionItemButtonComponent;
  HdsAccordionItem: typeof HdsAccordionItemIndexComponent;

  'Hds::Accordion::Item::Button': typeof HdsAccordionItemButtonComponent;
  'hds/accordion/item/button': typeof HdsAccordionItemButtonComponent;
  HdsAccordionItemButton: typeof HdsAccordionItemButtonComponent;

  // Alert
  'Hds::Alert': typeof HdsAlertComponent;
  'hds/alert': typeof HdsAlertComponent;
  HdsAlert: typeof HdsAlertComponent;

  'Hds::Alert::Description': typeof HdsAlertDescriptionComponent;
  'hds/alert/description': typeof HdsAlertDescriptionComponent;
  HdsAlertDescription: typeof HdsAlertDescriptionComponent;

  'Hds::Alert::Title': typeof HdsAlertTitleComponent;
  'hds/alert/title': typeof HdsAlertTitleComponent;
  HdsAlertTitle: typeof HdsAlertTitleComponent;

  // Badge
  'Hds::Badge': typeof HdsBadgeComponent;
  'hds/badge': typeof HdsBadgeComponent;
  HdsBadge: typeof HdsBadgeComponent;

  // BadgeCount
  'Hds::Badge::Count': typeof HdsBadgeCountComponent;
  'hds/badge-count': typeof HdsBadgeCountComponent;
  HdsBadgeCount: typeof HdsBadgeCountComponent;

  // Button
  'Hds::Button': typeof HdsButtonComponent;
  'hds/button': typeof HdsButtonComponent;
  HdsButton: typeof HdsButtonComponent;

  // Card
  'Hds::Card': typeof HdsCardContainerComponent;
  'hds/card': typeof HdsCardContainerComponent;
  HdsCard: typeof HdsCardContainerComponent;

  // Disclosure Primitive
  'Hds::DisclosurePrimitive': typeof HdsDisclosurePrimitiveComponent;
  'hds/disclosure-primitive': typeof HdsDisclosurePrimitiveComponent;
  HdsDisclosurePrimitive: typeof HdsDisclosurePrimitiveComponent;

  // Dismiss button
  'Hds::DismissButton': typeof HdsDismissButtonComponent;
  'hds/dismiss-button': typeof HdsDismissButtonComponent;
  HdsDismissButton: typeof HdsDismissButtonComponent;

  // IconTile
  'Hds::IconTile': typeof HdsIconTileComponent;
  'hds/icon-tile': typeof HdsIconTileComponent;
  HdsIconTile: typeof HdsIconTileComponent;

  // Interactive
  'Hds::Interactive': typeof HdsInteractiveComponent;
  'hds/interactive': typeof HdsInteractiveComponent;
  HdsInteractive: typeof HdsInteractiveComponent;

  // Link Inline
  'Hds::Link::Inline': typeof HdsLinkInlineComponent;
  'hds/link/inline': typeof HdsLinkInlineComponent;
  HdsLinkInline: typeof HdsLinkInlineComponent;

  // Link Standalone
  'Hds::Link::Standalone': typeof HdsLinkStandaloneComponent;
  'hds/link/standalone': typeof HdsLinkStandaloneComponent;
  HdsLinkStandalone: typeof HdsLinkStandaloneComponent;

  // Reveal
  'Hds::Reveal': typeof HdsRevealComponent;
  'hds/reveal': typeof HdsRevealComponent;
  HdsReveal: typeof HdsRevealComponent;

  'Hds::Reveal::Toggle::Button': typeof HdsRevealToggleButtonComponent;
  'hds/reveal/toggle/button': typeof HdsRevealToggleButtonComponent;
  HdsRevealToggleButtonComponent: typeof HdsRevealToggleButtonComponent;

  // Text
  'Hds::Text': typeof HdsTextComponent;
  'hds/text': typeof HdsTextComponent;
  HdsText: typeof HdsTextComponent;
  'Hds::Text::Body': typeof HdsTextBodyComponent;
  'hds/text/body': typeof HdsTextBodyComponent;
  HdsTextBody: typeof HdsTextBodyComponent;
  'Hds::Text::Display': typeof HdsTextDisplayComponent;
  'hds/text/display': typeof HdsTextDisplayComponent;
  HdsTextDisplay: typeof HdsTextDisplayComponent;
  'Hds::Text::Code': typeof HdsTextCodeComponent;
  'hds/text/code': typeof HdsTextCodeComponent;
  HdsTextCode: typeof HdsTextCodeComponent;

  // Tag
  'Hds::Tag': typeof HdsTagComponent;
  'hds/tag': typeof HdsTagComponent;
  HdsTag: typeof HdsTagComponent;

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
