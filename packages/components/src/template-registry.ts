/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

//components
import type HdsAccordionComponent from './components/hds/accordion';
import type HdsAccordionItemComponent from './components/hds/accordion/item';
import type HdsAccordionItemButtonComponent from './components/hds/accordion/item/button';
import type HdsAlertComponent from './components/hds/alert';
import type HdsAlertDescriptionComponent from './components/hds/alert/description';
import type HdsAlertTitleComponent from './components/hds/alert/title';
import type HdsAppHeaderComponent from './components/hds/app-header';
import type HdsAppHeaderHomeLinkComponent from './components/hds/app-header/home-link';
import type HdsAppHeaderMenuButtonComponent from './components/hds/app-header/menu-button';
import type HdsAppFooterComponent from './components/hds/app-footer';
import type HdsAppFooterCopyrightComponent from './components/hds/app-footer/copyright';
import type HdsAppFooterItemComponent from './components/hds/app-footer/item';
import type HdsAppFooterLegalLinksComponent from './components/hds/app-footer/legal-links';
import type HdsAppFooterLinkComponent from './components/hds/app-footer/link';
import type HdsAppFooterStatusLinkComponent from './components/hds/app-footer/status-link';
import type HdsBadgeComponent from './components/hds/badge';
import type HdsBadgeCountComponent from './components/hds/badge-count';
import type HdsButtonComponent from './components/hds/button';
import type HdsButtonSetComponent from './components/hds/button-set';
import type HdsAppFrameComponent from './components/hds/app-frame';
import type HdsAppFrameFooterComponent from './components/hds/app-frame/parts/footer';
import type HdsAppFrameHeaderComponent from './components/hds/app-frame/parts/header';
import type HdsAppFrameMainComponent from './components/hds/app-frame/parts/main';
import type HdsAppFrameModalsComponent from './components/hds/app-frame/parts/modals';
import type HdsAppFrameSidebarComponent from './components/hds/app-frame/parts/sidebar';
import type HdsApplicationStateComponent from './components/hds/application-state';
import type HdsApplicationStateBodyComponent from './components/hds/application-state/body';
import type HdsApplicationStateFooterComponent from './components/hds/application-state/footer';
import type HdsApplicationStateHeaderComponent from './components/hds/application-state/header';
import type HdsCardContainerComponent from './components/hds/card/container.ts';
import type HdsCopyButtonComponent from './components/hds/copy/button/index';
import type HdsCopySnippetComponent from './components/hds/copy/snippet';
import type HdsDisclosurePrimitiveComponent from './components/hds/disclosure-primitive';
import type HdsDismissButtonComponent from './components/hds/dismiss-button';
import type HdsFormCharacterCountComponent from './components/hds/form/character-count';
import type HdsFormErrorComponent from './components/hds/form/error';
import type HdsFormErrorMessageComponent from './components/hds/form/error/message';
import type HdsFormFieldComponent from './components/hds/form/field';
import type HdsFormHelperTextComponent from './components/hds/form/helper-text';
import type HdsFormIndicatorComponent from './components/hds/form/indicator';
import type HdsFormLabelComponent from './components/hds/form/label';
import type HdsFormLegendComponent from './components/hds/form/legend';
import type HdsFormVisibilityToggleComponent from './components/hds/form/visibility-toggle';
import type HdsIconTileComponent from './components/hds/icon-tile';
import type HdsInteractiveComponent from './components/hds/interactive';
import type HdsLinkInlineComponent from './components/hds/link/inline';
import type HdsLinkStandaloneComponent from './components/hds/link/standalone';
import type HdsPageHeaderComponent from './components/hds/page-header';
import type HdsPageHeaderActionsComponent from './components/hds/page-header/actions';
import type HdsPageHeaderBadgesComponent from './components/hds/page-header/badges';
import type HdsPageHeaderDescriptionComponent from './components/hds/page-header/description';
import type HdsPageHeaderSubtitleComponent from './components/hds/page-header/subtitle';
import type HdsPageHeaderTitleComponent from './components/hds/page-header/title';
import type HdsPopoverPrimitiveComponent from './components/hds/popover-primitive';
import type HdsRevealComponent from './components/hds/reveal';
import type HdsRevealToggleButtonComponent from './components/hds/reveal/toggle/button';
import type HdsRichTooltipComponent from './components/hds/rich-tooltip/index.ts';
import type HdsRichTooltipBubbleComponent from './components/hds/rich-tooltip/bubble.ts';
import type HdsRichTooltipToggleComponent from './components/hds/rich-tooltip/toggle.ts';
import type HdsSeparatorComponent from './components/hds/separator';
import type HdsSideNavComponent from './components/hds/side-nav';
import type HdsSideNavBaseComponent from './components/hds/side-nav/base';
import type HdsSideNavToggleButtonComponent from './components/hds/side-nav/toggle-button';
import type HdsSideNavPortalComponent from './components/hds/side-nav/portal';
import type HdsSideNavPortalTargetComponent from './components/hds/side-nav/portal/target';
import type HdsSideNavHeaderComponent from './components/hds/side-nav/header';
import type HdsSideNavHeaderHomeLinkComponent from './components/hds/side-nav/header/home-link';
import type HdsSideNavHeaderIconButtonComponent from './components/hds/side-nav/header/icon-button';
import type HdsSideNavListComponent from './components/hds/side-nav/list';
import type HdsSideNavListBackLinkComponent from './components/hds/side-nav/list/back-link';
import type HdsSideNavListItemComponent from './components/hds/side-nav/list/item';
import type HdsSideNavListLinkComponent from './components/hds/side-nav/list/link';
import type HdsSideNavListTitleComponent from './components/hds/side-nav/list/title';
import type HdsStepperStepIndicatorComponent from './components/hds/stepper/step/indicator';
import type HdsStepperTaskIndicatorComponent from './components/hds/stepper/task/indicator';
import type HdsTabsComponent from './components/hds/tabs';
import type HdsTabsPanelComponent from './components/hds/tabs/panel';
import type HdsTabsTabComponent from './components/hds/tabs/tab';
import type HdsTextComponent from './components/hds/text';
import type HdsTextBodyComponent from './components/hds/text/body';
import type HdsTextDisplayComponent from './components/hds/text/display';
import type HdsTagComponent from './components/hds/tag';
import type HdsToastComponent from './components/hds/toast';
import type HdsTextCodeComponent from './components/hds/text/code';
import type HdsYieldComponent from './components/hds/yield';

// helpers
import type HdsLinkToModelsHelper from './helpers/hds-link-to-models.ts';
import type HdsLinkToQueryHelper from './helpers/hds-link-to-query.ts';

// modifiers
import type HdsAnchoredPositionModifier from './modifiers/hds-anchored-position.ts';
import type HdsClipboardModifier from './modifiers/hds-clipboard.ts';
import type HdsRegisterEventModifier from './modifiers/hds-register-event.ts';

export default interface HdsComponentsRegistry {
  // ----- COMPONENTS ---------------------------------------------------

  // Accordion
  'Hds::Accordion': typeof HdsAccordionComponent;
  'hds/accordion': typeof HdsAccordionComponent;

  'Hds::Accordion::Item': typeof HdsAccordionItemComponent;
  'hds/accordion/item': typeof HdsAccordionItemComponent;

  'Hds::Accordion::Item::Button': typeof HdsAccordionItemButtonComponent;
  'hds/accordion/item/button': typeof HdsAccordionItemButtonComponent;

  // Alert
  'Hds::Alert': typeof HdsAlertComponent;
  'hds/alert': typeof HdsAlertComponent;

  'Hds::Alert::Description': typeof HdsAlertDescriptionComponent;
  'hds/alert/description': typeof HdsAlertDescriptionComponent;

  'Hds::Alert::Title': typeof HdsAlertTitleComponent;
  'hds/alert/title': typeof HdsAlertTitleComponent;

  // AppHeader
  'Hds::AppHeader': typeof HdsAppHeaderComponent;
  'hds/app-header': typeof HdsAppHeaderComponent;

  'Hds::AppHeader::HomeLink': typeof HdsAppHeaderHomeLinkComponent;
  'hds/app-header/home-link': typeof HdsAppHeaderHomeLinkComponent;

  'Hds::AppHeader::MenuButton': typeof HdsAppHeaderMenuButtonComponent;
  'hds/app-header/menu-button': typeof HdsAppHeaderMenuButtonComponent;

  // AppFooter
  'Hds::AppFooter': typeof HdsAppFooterComponent;
  'hds/app-footer': typeof HdsAppFooterComponent;

  'Hds::AppFooter::Copyright': typeof HdsAppFooterCopyrightComponent;
  'hds/app-footer/copyright': typeof HdsAppFooterCopyrightComponent;

  'Hds::AppFooter::Item': typeof HdsAppFooterItemComponent;
  'hds/app-footer/item': typeof HdsAppFooterItemComponent;

  'Hds::AppFooter::LegalLinks': typeof HdsAppFooterLegalLinksComponent;
  'hds/app-footer/legal-links': typeof HdsAppFooterLegalLinksComponent;

  'Hds::AppFooter::Link': typeof HdsAppFooterLinkComponent;
  'hds/app-footer/link': typeof HdsAppFooterLinkComponent;

  'Hds::AppFooter::StatusLink': typeof HdsAppFooterStatusLinkComponent;
  'hds/app-footer/status-link': typeof HdsAppFooterStatusLinkComponent;

  // AppFrame
  'Hds::AppFrame': typeof HdsAppFrameComponent;
  'hds/app-frame': typeof HdsAppFrameComponent;

  'Hds::AppFrame::Footer': typeof HdsAppFrameFooterComponent;
  'hds/app-frame/parts/footer': typeof HdsAppFrameFooterComponent;

  'Hds::AppFrame::Header': typeof HdsAppFrameHeaderComponent;
  'hds/app-frame/parts/header': typeof HdsAppFrameHeaderComponent;

  'Hds::AppFrame::Main': typeof HdsAppFrameMainComponent;
  'hds/app-frame/parts/main': typeof HdsAppFrameMainComponent;

  'Hds::AppFrame::Modals': typeof HdsAppFrameModalsComponent;
  'hds/app-frame/parts/modals': typeof HdsAppFrameModalsComponent;

  'Hds::AppFrame::Sidebar': typeof HdsAppFrameSidebarComponent;
  'hds/app-frame/parts/sidebar': typeof HdsAppFrameSidebarComponent;

  // ApplicationState
  'Hds::ApplicationState': typeof HdsApplicationStateComponent;
  'hds/application-state': typeof HdsApplicationStateComponent;

  'Hds::ApplicationState::Header': typeof HdsApplicationStateHeaderComponent;
  'hds/application-state/header': typeof HdsApplicationStateHeaderComponent;

  'Hds::ApplicationState::Body': typeof HdsApplicationStateBodyComponent;
  'hds/application-state/body': typeof HdsApplicationStateBodyComponent;

  'Hds::ApplicationState::Footer': typeof HdsApplicationStateFooterComponent;
  'hds/application-state/footer': typeof HdsApplicationStateFooterComponent;

  // Badge
  'Hds::Badge': typeof HdsBadgeComponent;
  'hds/badge': typeof HdsBadgeComponent;

  // BadgeCount
  'Hds::BadgeCount': typeof HdsBadgeCountComponent;
  'hds/badge-count': typeof HdsBadgeCountComponent;

  // Button
  'Hds::Button': typeof HdsButtonComponent;
  'hds/button': typeof HdsButtonComponent;

  // ButtonSet
  'Hds::ButtonSet': typeof HdsButtonSetComponent;
  'hds/button-set': typeof HdsButtonSetComponent;

  // Card
  'Hds::Card': typeof HdsCardContainerComponent;
  'hds/card': typeof HdsCardContainerComponent;

  // Copy Button
  'Hds::Copy::Button': typeof HdsCopyButtonComponent;
  'hds/copy/button': typeof HdsCopyButtonComponent;

  // Copy Snippet
  'Hds::Copy::Snippet': typeof HdsCopySnippetComponent;
  'hds/copy/snippet': typeof HdsCopySnippetComponent;

  // DisclosurePrimitive
  'Hds::DisclosurePrimitive': typeof HdsDisclosurePrimitiveComponent;
  'hds/disclosure-primitive': typeof HdsDisclosurePrimitiveComponent;

  // DismissButton
  'Hds::DismissButton': typeof HdsDismissButtonComponent;
  'hds/dismiss-button': typeof HdsDismissButtonComponent;

  // FORM

  // Form CharacterCount
  'Hds::Form::CharacterCount': typeof HdsFormCharacterCountComponent;
  'hds/form/character-count': typeof HdsFormCharacterCountComponent;

  // Form Error
  'Hds::Form::Error': typeof HdsFormErrorComponent;
  'hds/form/error': typeof HdsFormErrorComponent;

  // Form Error Message
  'Hds::Form::Error::Message': typeof HdsFormErrorMessageComponent;
  'hds/form/error/message': typeof HdsFormErrorMessageComponent;

  // Form Field
  'Hds::Form::Field': typeof HdsFormFieldComponent;
  'hds/form/field': typeof HdsFormFieldComponent;

  // Form HelperText
  'Hds::Form::HelperText': typeof HdsFormHelperTextComponent;
  'hds/form/helper-text': typeof HdsFormHelperTextComponent;

  // Form Indicator
  'Hds::Form::Indicator': typeof HdsFormIndicatorComponent;
  'hds/form/indicator': typeof HdsFormIndicatorComponent;

  // Form Label
  'Hds::Form::Label': typeof HdsFormLabelComponent;
  'hds/form/label': typeof HdsFormLabelComponent;

  // Form Legend
  'Hds::Form::Legend': typeof HdsFormLegendComponent;
  'hds/form/legend': typeof HdsFormLegendComponent;

  // Form VisibilityToggle
  'Hds::Form::VisibilityToggle': typeof HdsFormVisibilityToggleComponent;
  'hds/form/visibility-toggle': typeof HdsFormVisibilityToggleComponent;

  // IconTile
  'Hds::IconTile': typeof HdsIconTileComponent;
  'hds/icon-tile': typeof HdsIconTileComponent;

  // Interactive
  'Hds::Interactive': typeof HdsInteractiveComponent;
  'hds/interactive': typeof HdsInteractiveComponent;

  // Link Inline
  'Hds::Link::Inline': typeof HdsLinkInlineComponent;
  'hds/link/inline': typeof HdsLinkInlineComponent;

  // Link Standalone
  'Hds::Link::Standalone': typeof HdsLinkStandaloneComponent;
  'hds/link/standalone': typeof HdsLinkStandaloneComponent;

  // PageHeader
  'Hds::PageHeader': typeof HdsPageHeaderComponent;
  'hds/page-header': typeof HdsPageHeaderComponent;

  'Hds::PageHeader::Actions': typeof HdsPageHeaderActionsComponent;
  'hds/page-header/actions': typeof HdsPageHeaderActionsComponent;

  'Hds::PageHeader::Badges': typeof HdsPageHeaderBadgesComponent;
  'hds/page-header/badges': typeof HdsPageHeaderBadgesComponent;

  'Hds::PageHeader::Description': typeof HdsPageHeaderDescriptionComponent;
  'hds/page-header/description': typeof HdsPageHeaderDescriptionComponent;

  'Hds::PageHeader::Subtitle': typeof HdsPageHeaderSubtitleComponent;
  'hds/page-header/subtitle': typeof HdsPageHeaderSubtitleComponent;

  'Hds::PageHeader::Title': typeof HdsPageHeaderTitleComponent;
  'hds/page-header/title': typeof HdsPageHeaderTitleComponent;

  // PopoverPrimitive
  'Hds::PopoverPrimitive': typeof HdsPopoverPrimitiveComponent;
  'hds/popover-primitive': typeof HdsPopoverPrimitiveComponent;

  // Reveal
  'Hds::Reveal': typeof HdsRevealComponent;
  'hds/reveal': typeof HdsRevealComponent;

  'Hds::Reveal::Toggle::Button': typeof HdsRevealToggleButtonComponent;
  'hds/reveal/toggle/button': typeof HdsRevealToggleButtonComponent;

  // Separator
  'Hds::Separator': typeof HdsSeparatorComponent;
  'hds/separator': typeof HdsSeparatorComponent;

  // SideNav
  'Hds::SideNav': typeof HdsSideNavComponent;
  'hds/side-nav': typeof HdsSideNavComponent;
  HdsSideNav: typeof HdsSideNavComponent;

  'Hds::SideNav::Base': typeof HdsSideNavBaseComponent;
  'hds/side-nav/base': typeof HdsSideNavBaseComponent;
  HdsSideNavBase: typeof HdsSideNavBaseComponent;

  'Hds::SideNav::ToggleButton': typeof HdsSideNavToggleButtonComponent;
  'hds/side-nav/toggle-button': typeof HdsSideNavToggleButtonComponent;
  HdsSideNavToggleButton: typeof HdsSideNavToggleButtonComponent;

  'Hds::SideNav::Portal': typeof HdsSideNavPortalComponent;
  'hds/side-nav/portal': typeof HdsSideNavPortalComponent;
  HdsSideNavPortal: typeof HdsSideNavPortalComponent;

  'Hds::SideNav::Portal::Target': typeof HdsSideNavPortalTargetComponent;
  'hds/side-nav/portal/target': typeof HdsSideNavPortalTargetComponent;
  HdsSideNavPortalTarget: typeof HdsSideNavPortalTargetComponent;

  'Hds::SideNav::Header': typeof HdsSideNavHeaderComponent;
  'hds/side-nav/header': typeof HdsSideNavHeaderComponent;
  HdsSideNavHeader: typeof HdsSideNavHeaderComponent;

  'Hds::SideNav::Header::HomeLink': typeof HdsSideNavHeaderHomeLinkComponent;
  'hds/side-nav/header/home-link': typeof HdsSideNavHeaderHomeLinkComponent;
  HdsSideNavHeaderHomeLink: typeof HdsSideNavHeaderHomeLinkComponent;

  'Hds::SideNav::Header::IconButton': typeof HdsSideNavHeaderIconButtonComponent;
  'hds/side-nav/header/icon-button': typeof HdsSideNavHeaderIconButtonComponent;
  HdsSideNavHeaderIconButton: typeof HdsSideNavHeaderIconButtonComponent;

  'Hds::SideNav::List': typeof HdsSideNavListComponent;
  'hds/side-nav/list': typeof HdsSideNavListComponent;
  HdsSideNavList: typeof HdsSideNavListComponent;

  'Hds::SideNav::List::BackLink': typeof HdsSideNavListBackLinkComponent;
  'hds/side-nav/list/back-link': typeof HdsSideNavListBackLinkComponent;
  HdsSideNavListBackLink: typeof HdsSideNavListBackLinkComponent;

  'Hds::SideNav::List::Item': typeof HdsSideNavListItemComponent;
  'hds/side-nav/list/item': typeof HdsSideNavListItemComponent;
  HdsSideNavListItem: typeof HdsSideNavListItemComponent;

  'Hds::SideNav::List::Link': typeof HdsSideNavListLinkComponent;
  'hds/side-nav/list/link': typeof HdsSideNavListLinkComponent;
  HdsSideNavListLink: typeof HdsSideNavListLinkComponent;

  'Hds::SideNav::List::Title': typeof HdsSideNavListTitleComponent;
  'hds/side-nav/list/title': typeof HdsSideNavListTitleComponent;
  HdsSideNavListTitle: typeof HdsSideNavListTitleComponent;

  // Stepper
  'Hds::Stepper::Step::Indicator': typeof HdsStepperStepIndicatorComponent;
  'hds/stepper/step/indicator': typeof HdsStepperStepIndicatorComponent;

  'Hds::Stepper::Task::Indicator': typeof HdsStepperTaskIndicatorComponent;
  'hds/stepper/task/indicator': typeof HdsStepperTaskIndicatorComponent;

  // Tabs
  'Hds::Tabs': typeof HdsTabsComponent;
  'hds/tabs': typeof HdsTabsComponent;

  'Hds::Tabs::Panel': typeof HdsTabsPanelComponent;
  'hds/tabs/panel': typeof HdsTabsPanelComponent;

  'Hds::Tabs::Tab': typeof HdsTabsTabComponent;
  'hds/tabs/tab': typeof HdsTabsTabComponent;

  // RichTooltip
  'Hds::RichTooltip': typeof HdsRichTooltipComponent;
  'hds/rich-tooltip': typeof HdsRichTooltipComponent;
  HdsRichTooltip: typeof HdsRichTooltipComponent;

  'Hds::RichTooltip::Bubble': typeof HdsRichTooltipBubbleComponent;
  'hds/rich-tooltip/bubble': typeof HdsRichTooltipBubbleComponent;
  HdsRichTooltipBubble: typeof HdsRichTooltipBubbleComponent;

  'Hds::RichTooltip::Toggle': typeof HdsRichTooltipToggleComponent;
  'hds/rich-tooltip/toggle': typeof HdsRichTooltipToggleComponent;
  HdsRichTooltipToggle: typeof HdsRichTooltipToggleComponent;

  // Text
  'Hds::Text': typeof HdsTextComponent;
  'hds/text': typeof HdsTextComponent;
  'Hds::Text::Body': typeof HdsTextBodyComponent;
  'hds/text/body': typeof HdsTextBodyComponent;
  'Hds::Text::Display': typeof HdsTextDisplayComponent;
  'hds/text/display': typeof HdsTextDisplayComponent;
  'Hds::Text::Code': typeof HdsTextCodeComponent;
  'hds/text/code': typeof HdsTextCodeComponent;

  // Tag
  'Hds::Tag': typeof HdsTagComponent;
  'hds/tag': typeof HdsTagComponent;

  // Toast
  'Hds::Toast': typeof HdsToastComponent;
  'hds/toast': typeof HdsToastComponent;

  // Yield
  'Hds::Yield': typeof HdsYieldComponent;
  'hds/yield': typeof HdsYieldComponent;

  // ----- HELPERS ------------------------------------------------------

  // hds-link-to-models
  'hds-link-to-models': typeof HdsLinkToModelsHelper;

  // hds-link-to-query
  'hds-link-to-query': typeof HdsLinkToQueryHelper;

  // ----- MODIFIERS ----------------------------------------------------

  // hds-anchored-position
  'hds-anchored-position': typeof HdsAnchoredPositionModifier;

  // hds-clipboard
  'hds-clipboard': typeof HdsClipboardModifier;

  // hds-register-event
  'hds-register-event': typeof HdsRegisterEventModifier;
}
