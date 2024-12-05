/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

//components
import type HdsAccordionComponent from './components/hds/accordion';
import type HdsAccordionItemComponent from './components/hds/accordion/item';
import type HdsAccordionItemButtonComponent from './components/hds/accordion/item/button';
import type HdsAdvancedTableComponent from './components/hds/advanced-table';
import type HdsAdvancedTableTdComponent from './components/hds/advanced-table/td';
import type HdsAdvancedTableThButtonExpandComponent from './components/hds/advanced-table/th-button-expand';
import type HdsAdvancedTableThButtonSortComponent from './components/hds/advanced-table/th-button-sort';
import type HdsAdvancedTableThComponent from './components/hds/advanced-table/th';
import type HdsAdvancedTableThButtonTooltipComponent from './components/hds/advanced-table/th-button-tooltip';
import type HdsAdvancedTableThSortComponent from './components/hds/advanced-table/th-sort';
import type HdsAdvancedTableThSelectableComponent from './components/hds/advanced-table/th-selectable';
import type HdsAdvancedTableTrExpandableGroupComponent from './components/hds/advanced-table/tr-expandable-group.ts';
import type HdsAdvancedTableTrComponent from './components/hds/advanced-table/tr';
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
import type HdsBreadcrumbComponent from './components/hds/breadcrumb/index.ts';
import type HdsBreadcrumbItemComponent from './components/hds/breadcrumb/item';
import type HdsBreadcrumbTruncationComponent from './components/hds/breadcrumb/truncation.ts';
import type HdsButtonComponent from './components/hds/button';
import type HdsButtonSetComponent from './components/hds/button-set';
import type HdsAppFrameComponent from './components/hds/app-frame';
import type HdsAppFrameFooterComponent from './components/hds/app-frame/parts/footer';
import type HdsAppFrameHeaderComponent from './components/hds/app-frame/parts/header';
import type HdsAppFrameMainComponent from './components/hds/app-frame/parts/main';
import type HdsAppFrameModalsComponent from './components/hds/app-frame/parts/modals';
import type HdsAppFrameSidebarComponent from './components/hds/app-frame/parts/sidebar';

import type HdsAppSideNavComponent from './components/hds/app-side-nav';
import type HdsAppSideNavToggleButtonComponent from './components/hds/app-side-nav/toggle-button';
import type HdsAppSideNavPortalComponent from './components/hds/app-side-nav/portal';
import type HdsAppSideNavPortalTargetComponent from './components/hds/app-side-nav/portal/target';
import type HdsAppSideNavListComponent from './components/hds/app-side-nav/list';
import type HdsAppSideNavListBackLinkComponent from './components/hds/app-side-nav/list/back-link';
import type HdsAppSideNavListItemComponent from './components/hds/app-side-nav/list/item';
import type HdsAppSideNavListLinkComponent from './components/hds/app-side-nav/list/link';
import type HdsAppSideNavListTitleComponent from './components/hds/app-side-nav/list/title';

import type HdsApplicationStateComponent from './components/hds/application-state';
import type HdsApplicationStateBodyComponent from './components/hds/application-state/body';
import type HdsApplicationStateFooterComponent from './components/hds/application-state/footer';
import type HdsApplicationStateHeaderComponent from './components/hds/application-state/header';
import type HdsApplicationStateMediaComponent from './components/hds/application-state/media';
import type HdsCardContainerComponent from './components/hds/card/container.ts';
import type HdsCodeBlockComponent from './components/hds/code-block';
import type HdsCodeBlockCopyButtonComponent from './components/hds/code-block/copy-button';
import type HdsCodeBlockDescriptionComponent from './components/hds/code-block/description';
import type HdsCodeBlockTitleComponent from './components/hds/code-block/title';
import type HdsCopyButtonComponent from './components/hds/copy/button/index';
import type HdsCopySnippetComponent from './components/hds/copy/snippet';
import type HdsDisclosurePrimitiveComponent from './components/hds/disclosure-primitive';
import type HdsDialogPrimitiveBodyComponent from './components/hds/dialog-primitive/body';
import type HdsDialogPrimitiveDescriptionComponent from './components/hds/dialog-primitive/description';
import type HdsDialogPrimitiveFooterComponent from './components/hds/dialog-primitive/footer';
import type HdsDialogPrimitiveHeaderComponent from './components/hds/dialog-primitive/header';
import type HdsDialogPrimitiveOverlayComponent from './components/hds/dialog-primitive/overlay';
import type HdsDialogPrimitiveWrapperComponent from './components/hds/dialog-primitive/wrapper';
import type HdsDismissButtonComponent from './components/hds/dismiss-button';
import type HdsDropdownComponent from './components/hds/dropdown';
import type HdsDropdownFooterComponent from './components/hds/dropdown/footer';
import type HdsDropdownHeaderComponent from './components/hds/dropdown/header';
import type HdsDropdownListItemCheckboxComponent from './components/hds/dropdown/list-item/checkbox';
import type HdsDropdownListItemCheckmarkComponent from './components/hds/dropdown/list-item/checkmark';
import type HdsDropdownListItemCopyItemComponent from './components/hds/dropdown/list-item/copy-item';
import type HdsDropdownListItemDescriptionComponent from './components/hds/dropdown/list-item/description';
import type HdsDropdownListItemGenericComponent from './components/hds/dropdown/list-item/generic';
import type HdsDropdownListItemInteractiveComponent from './components/hds/dropdown/list-item/interactive';
import type HdsDropdownListItemRadioComponent from './components/hds/dropdown/list-item/radio';
import type HdsDropdownListItemSeparatorComponent from './components/hds/dropdown/list-item/separator';
import type HdsDropdownListItemTitleComponent from './components/hds/dropdown/list-item/title';
import type HdsDropdownToggleButtonComponent from './components/hds/dropdown/toggle/button';
import type HdsDropdownToggleChevronComponent from './components/hds/dropdown/toggle/chevron';
import type HdsDropdownToggleIconComponent from './components/hds/dropdown/toggle/icon';
import type HdsFlyoutBodyComponent from './components/hds/flyout/body';
import type HdsFlyoutDescriptionComponent from './components/hds/flyout/description';
import type HdsFlyoutFooterComponent from './components/hds/flyout/footer';
import type HdsFlyoutHeaderComponent from './components/hds/flyout/header';
import type HdsFlyoutComponent from './components/hds/flyout';
import type HdsFormCharacterCountComponent from './components/hds/form/character-count';
import type HdsFormCheckboxBaseComponent from './components/hds/form/checkbox/base';
import type HdsFormCheckboxFieldComponent from './components/hds/form/checkbox/field';
import type HdsFormCheckboxGroupComponent from './components/hds/form/checkbox/group';
import type HdsFormErrorComponent from './components/hds/form/error';
import type HdsFormErrorMessageComponent from './components/hds/form/error/message';
import type HdsFormFieldComponent from './components/hds/form/field';
import type HdsFormFieldsetComponent from './components/hds/form/fieldset';
import type HdsFormFileInputBaseComponent from './components/hds/form/file-input/base';
import type HdsFormFileInputFieldComponent from './components/hds/form/file-input/field';
import type HdsFormHelperTextComponent from './components/hds/form/helper-text';
import type HdsFormIndicatorComponent from './components/hds/form/indicator';
import type HdsFormLabelComponent from './components/hds/form/label';
import type HdsFormLegendComponent from './components/hds/form/legend';
import type HdsFormMaskedInputBaseComponent from './components/hds/form/masked-input/base';
import type HdsFormMaskedInputFieldComponent from './components/hds/form/masked-input/field';
import type HdsFormRadioBaseComponent from './components/hds/form/radio/base';
import type HdsFormRadioFieldComponent from './components/hds/form/radio/field';
import type HdsFormRadioGroupComponent from './components/hds/form/radio/group';
import type HdsFormRadioCardComponent from './components/hds/form/radio-card';
import type HdsFormRadioCardDescriptionComponent from './components/hds/form/radio-card/description';
import type HdsFormRadioCardGroupComponent from './components/hds/form/radio-card/group';
import type HdsFormRadioCardLabelComponent from './components/hds/form/radio-card/label';
import type HdsFormSelectBaseComponent from './components/hds/form/select/base';
import type HdsFormSelectFieldComponent from './components/hds/form/select/field';
import type HdsFormSuperSelectAfterOptionsComponent from './components/hds/form/super-select/after-options';
import type HdsFormSuperSelectOptionGroupComponent from './components/hds/form/super-select/option-group';
import type HdsFormSuperSelectPlaceholderComponent from './components/hds/form/super-select/placeholder';
import type HdsFormSuperSelectSingleBaseComponent from './components/hds/form/super-select/single/base';
import type HdsFormSuperSelectSingleFieldComponent from './components/hds/form/super-select/single/field';
import type HdsFormSuperSelectMultipleBaseComponent from './components/hds/form/super-select/multiple/base';
import type HdsFormSuperSelectMultipleFieldComponent from './components/hds/form/super-select/multiple/field';
import type HdsFormTextInputBaseComponent from './components/hds/form/text-input/base';
import type HdsFormTextInputFieldComponent from './components/hds/form/text-input/field';
import type HdsFormTextareaBaseComponent from './components/hds/form/textarea/base';
import type HdsFormTextareaFieldComponent from './components/hds/form/textarea/field';
import type HdsFormToggleBaseComponent from './components/hds/form/toggle/base';
import type HdsFormToggleFieldComponent from './components/hds/form/toggle/field';
import type HdsFormToggleGroupComponent from './components/hds/form/toggle/group';
import type HdsFormVisibilityToggleComponent from './components/hds/form/visibility-toggle';
import type HdsIconComponent from './components/hds/icon';
import type HdsIconTileComponent from './components/hds/icon-tile';
import type HdsInteractiveComponent from './components/hds/interactive';
import type HdsLinkInlineComponent from './components/hds/link/inline';
import type HdsLinkStandaloneComponent from './components/hds/link/standalone';
import type HdsMenuPrimitiveComponent from './components/hds/menu-primitive';
import type HdsModalBodyComponent from './components/hds/modal/body';
import type HdsModalFooterComponent from './components/hds/modal/footer';
import type HdsModalHeaderComponent from './components/hds/modal/header';
import type HdsModalComponent from './components/hds/modal/';
import type HdsPageHeaderComponent from './components/hds/page-header';
import type HdsPageHeaderActionsComponent from './components/hds/page-header/actions';
import type HdsPageHeaderBadgesComponent from './components/hds/page-header/badges';
import type HdsPageHeaderDescriptionComponent from './components/hds/page-header/description';
import type HdsPageHeaderSubtitleComponent from './components/hds/page-header/subtitle';
import type HdsPageHeaderTitleComponent from './components/hds/page-header/title';
import type HdsPaginationCompactComponent from './components/hds/pagination/compact/index';
import type HdsPaginationControlInfoComponent from './components/hds/pagination/info/index';
import type HdsPaginationControlArrowComponent from './components/hds/pagination/nav/arrow';
import type HdsPaginationControlEllipsisComponent from './components/hds/pagination/nav/ellipsis';
import type HdsPaginationControlNumberComponent from './components/hds/pagination/nav/number';
import type HdsPaginationNumberedComponent from './components/hds/pagination/numbered/index';
import type HdsPaginationSizeSelectorComponent from './components/hds/pagination/size-selector/index';
import type HdsPopoverPrimitiveComponent from './components/hds/popover-primitive';
import type HdsRevealComponent from './components/hds/reveal';
import type HdsRevealToggleButtonComponent from './components/hds/reveal/toggle/button';
import type HdsRichTooltipComponent from './components/hds/rich-tooltip/index.ts';
import type HdsRichTooltipBubbleComponent from './components/hds/rich-tooltip/bubble.ts';
import type HdsRichTooltipToggleComponent from './components/hds/rich-tooltip/toggle.ts';
import type HdsSegmentedGroupComponent from './components/hds/segmented-group';
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
import type HdsTableComponent from './components/hds/table';
import type HdsTableTdComponent from './components/hds/table/td';
import type HdsTableThButtonSortComponent from './components/hds/table/th-button-sort';
import type HdsTableThComponent from './components/hds/table/th';
import type HdsTableThButtonTooltipComponent from './components/hds/table/th-button-tooltip';
import type HdsTableThSortComponent from './components/hds/table/th-sort';
import type HdsTableThSelectableComponent from './components/hds/table/th-selectable';
import type HdsTableTrComponent from './components/hds/table/tr';
import type HdsTabsComponent from './components/hds/tabs';
import type HdsTabsPanelComponent from './components/hds/tabs/panel';
import type HdsTabsTabComponent from './components/hds/tabs/tab';
import type HdsTextComponent from './components/hds/text';
import type HdsTextBodyComponent from './components/hds/text/body';
import type HdsTextDisplayComponent from './components/hds/text/display';
import type HdsTagComponent from './components/hds/tag';
import type HdsTooltipButtonComponent from './components/hds/tooltip-button';
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
import type HdsTooltipModifier from './modifiers/hds-tooltip.ts';

export default interface HdsComponentsRegistry {
  // ----- COMPONENTS ---------------------------------------------------

  // Accordion
  'Hds::Accordion': typeof HdsAccordionComponent;
  'hds/accordion': typeof HdsAccordionComponent;

  'Hds::Accordion::Item': typeof HdsAccordionItemComponent;
  'hds/accordion/item': typeof HdsAccordionItemComponent;

  'Hds::Accordion::Item::Button': typeof HdsAccordionItemButtonComponent;
  'hds/accordion/item/button': typeof HdsAccordionItemButtonComponent;

  // Advanced Table
  'Hds::AdvancedTable': typeof HdsAdvancedTableComponent;
  'hds/advanced-table': typeof HdsAdvancedTableComponent;
  'Hds::AdvancedTable::Td': typeof HdsAdvancedTableTdComponent;
  'hds/advanced-table/td': typeof HdsAdvancedTableTdComponent;
  'Hds::AdvancedTable::Th': typeof HdsAdvancedTableThComponent;
  'hds/advanced-table/th': typeof HdsAdvancedTableThComponent;
  'Hds::AdvancedTable::TrExpandableGroup': typeof HdsAdvancedTableTrExpandableGroupComponent;
  'hds/advanced-table/tr-expandable-group': typeof HdsAdvancedTableTrExpandableGroupComponent;
  'Hds::AdvancedTable::Tr': typeof HdsAdvancedTableTrComponent;
  'hds/advanced-table/tr': typeof HdsAdvancedTableTrComponent;
  'Hds::AdvancedTable::ThButtonExpand': typeof HdsAdvancedTableThButtonExpandComponent;
  'hds/advanced-table/th-button-expand': typeof HdsAdvancedTableThButtonExpandComponent;
  'Hds::AdvancedTable::ThButtonSort': typeof HdsAdvancedTableThButtonSortComponent;
  'hds/advanced-table/th-button-sort': typeof HdsAdvancedTableThButtonSortComponent;
  'Hds::AdvancedTable::ThButtonTooltip': typeof HdsAdvancedTableThButtonTooltipComponent;
  'hds/advanced-table/th-button-tooltip': typeof HdsAdvancedTableThButtonTooltipComponent;
  'Hds::AdvancedTable::ThSort': typeof HdsAdvancedTableThSortComponent;
  'hds/advanced-table/th-sort': typeof HdsAdvancedTableThSortComponent;
  'Hds::AdvancedTable::ThSelectable': typeof HdsAdvancedTableThSelectableComponent;
  'hds/advanced-table/th-selectable': typeof HdsAdvancedTableThSelectableComponent;

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

  // AppSideNav
  'Hds::AppSideNav': typeof HdsAppSideNavComponent;
  'hds/app-side-nav': typeof HdsAppSideNavComponent;
  HdsAppSideNav: typeof HdsAppSideNavComponent;

  'Hds::AppSideNav::ToggleButton': typeof HdsAppSideNavToggleButtonComponent;
  'hds/app-side-nav/toggle-button': typeof HdsAppSideNavToggleButtonComponent;
  HdsAppSideNavToggleButton: typeof HdsAppSideNavToggleButtonComponent;

  'Hds::AppSideNav::Portal': typeof HdsAppSideNavPortalComponent;
  'hds/app-side-nav/portal': typeof HdsAppSideNavPortalComponent;
  HdsAppSideNavPortal: typeof HdsAppSideNavPortalComponent;

  'Hds::AppSideNav::Portal::Target': typeof HdsAppSideNavPortalTargetComponent;
  'hds/app-side-nav/portal/target': typeof HdsAppSideNavPortalTargetComponent;
  HdsAppSideNavPortalTarget: typeof HdsAppSideNavPortalTargetComponent;

  'Hds::AppSideNav::List': typeof HdsAppSideNavListComponent;
  'hds/app-side-nav/list': typeof HdsAppSideNavListComponent;
  HdsAppSideNavList: typeof HdsAppSideNavListComponent;

  'Hds::AppSideNav::List::BackLink': typeof HdsAppSideNavListBackLinkComponent;
  'hds/app-side-nav/list/back-link': typeof HdsAppSideNavListBackLinkComponent;
  HdsAppSideNavListBackLink: typeof HdsAppSideNavListBackLinkComponent;

  'Hds::AppSideNav::List::Item': typeof HdsAppSideNavListItemComponent;
  'hds/app-side-nav/list/item': typeof HdsAppSideNavListItemComponent;
  HdsAppSideNavListItem: typeof HdsAppSideNavListItemComponent;

  'Hds::AppSideNav::List::Link': typeof HdsAppSideNavListLinkComponent;
  'hds/app-side-nav/list/link': typeof HdsAppSideNavListLinkComponent;
  HdsAppSideNavListLink: typeof HdsAppSideNavListLinkComponent;

  'Hds::AppSideNav::List::Title': typeof HdsAppSideNavListTitleComponent;
  'hds/app-side-nav/list/title': typeof HdsAppSideNavListTitleComponent;
  HdsAppSideNavListTitle: typeof HdsAppSideNavListTitleComponent;

  // ApplicationState
  'Hds::ApplicationState': typeof HdsApplicationStateComponent;
  'hds/application-state': typeof HdsApplicationStateComponent;

  'Hds::ApplicationState::Header': typeof HdsApplicationStateHeaderComponent;
  'hds/application-state/header': typeof HdsApplicationStateHeaderComponent;

  'Hds::ApplicationState::Body': typeof HdsApplicationStateBodyComponent;
  'hds/application-state/body': typeof HdsApplicationStateBodyComponent;

  'Hds::ApplicationState::Footer': typeof HdsApplicationStateFooterComponent;
  'hds/application-state/footer': typeof HdsApplicationStateFooterComponent;

  'Hds::ApplicationState::Media': typeof HdsApplicationStateMediaComponent;
  'hds/application-state/media': typeof HdsApplicationStateMediaComponent;

  // Badge
  'Hds::Badge': typeof HdsBadgeComponent;
  'hds/badge': typeof HdsBadgeComponent;

  // BadgeCount
  'Hds::BadgeCount': typeof HdsBadgeCountComponent;
  'hds/badge-count': typeof HdsBadgeCountComponent;

  // Breadcrumb
  'Hds::Breadcrumb': typeof HdsBreadcrumbComponent;
  'hds/breadcrumb': typeof HdsBreadcrumbComponent;

  'Hds::Breadcrumb::Item': typeof HdsBreadcrumbItemComponent;
  'hds/breadcrumb/item': typeof HdsBreadcrumbItemComponent;

  'Hds::Breadcrumb::Truncation': typeof HdsBreadcrumbTruncationComponent;
  'hds/breadcrumb/truncation': typeof HdsBreadcrumbTruncationComponent;

  // Button
  'Hds::Button': typeof HdsButtonComponent;
  'hds/button': typeof HdsButtonComponent;

  // ButtonSet
  'Hds::ButtonSet': typeof HdsButtonSetComponent;
  'hds/button-set': typeof HdsButtonSetComponent;

  // Card
  'Hds::Card': typeof HdsCardContainerComponent;
  'hds/card': typeof HdsCardContainerComponent;

  // Code Block
  'Hds::CodeBlock': typeof HdsCodeBlockComponent;
  'hds/code-block': typeof HdsCodeBlockComponent;

  'Hds::CodeBlock::CopyButton': typeof HdsCodeBlockCopyButtonComponent;
  'hds/code-block/copy-button': typeof HdsCodeBlockCopyButtonComponent;

  'Hds::CodeBlock::Description': typeof HdsCodeBlockDescriptionComponent;
  'hds/code-block/description': typeof HdsCodeBlockDescriptionComponent;

  'Hds::CodeBlock::Title': typeof HdsCodeBlockTitleComponent;
  'hds/code-block/title': typeof HdsCodeBlockTitleComponent;

  // Copy Button
  'Hds::Copy::Button': typeof HdsCopyButtonComponent;
  'hds/copy/button': typeof HdsCopyButtonComponent;

  // Copy Snippet
  'Hds::Copy::Snippet': typeof HdsCopySnippetComponent;
  'hds/copy/snippet': typeof HdsCopySnippetComponent;

  // DIALOG

  // DialogPrimitiveBody
  'Hds::DialogPrimitive::Body': typeof HdsDialogPrimitiveBodyComponent;
  'hds/dialog-primitive/body': typeof HdsDialogPrimitiveBodyComponent;

  // DialogPrimitiveDescription
  'Hds::DialogPrimitive::Description': typeof HdsDialogPrimitiveDescriptionComponent;
  'hds/dialog-primitive/description': typeof HdsDialogPrimitiveDescriptionComponent;

  // DialogPrimitiveFooter
  'Hds::DialogPrimitive::Footer': typeof HdsDialogPrimitiveFooterComponent;
  'hds/dialog-primitive/footer': typeof HdsDialogPrimitiveFooterComponent;

  // DialogPrimitiveHeader
  'Hds::DialogPrimitive::Header': typeof HdsDialogPrimitiveHeaderComponent;
  'hds/dialog-primitive/header': typeof HdsDialogPrimitiveHeaderComponent;

  // DialogPrimitiveOverlay
  'Hds::DialogPrimitive::Overlay': typeof HdsDialogPrimitiveOverlayComponent;
  'hds/dialog-primitive/overlay': typeof HdsDialogPrimitiveOverlayComponent;

  // DialogPrimitiveWrapper
  'Hds::DialogPrimitive::Wrapper': typeof HdsDialogPrimitiveWrapperComponent;
  'hds/dialog-primitive/wrapper': typeof HdsDialogPrimitiveWrapperComponent;

  // DisclosurePrimitive
  'Hds::DisclosurePrimitive': typeof HdsDisclosurePrimitiveComponent;
  'hds/disclosure-primitive': typeof HdsDisclosurePrimitiveComponent;

  // DismissButton
  'Hds::DismissButton': typeof HdsDismissButtonComponent;
  'hds/dismiss-button': typeof HdsDismissButtonComponent;

  // Dropdown
  'Hds::Dropdown': typeof HdsDropdownComponent;
  'hds/dropdown': typeof HdsDropdownComponent;

  // Dropdown Footer
  'Hds::Dropdown::Footer': typeof HdsDropdownFooterComponent;
  'hds/dropdown/footer': typeof HdsDropdownFooterComponent;

  // Dropdown Header
  'Hds::Dropdown::Header': typeof HdsDropdownHeaderComponent;
  'hds/dropdown/header': typeof HdsDropdownHeaderComponent;

  // Dropdown ListItem Checkbox
  'Hds::Dropdown::ListItem::Checkbox': typeof HdsDropdownListItemCheckboxComponent;
  'hds/dropdown/list-item/checkbox': typeof HdsDropdownListItemCheckboxComponent;

  // Dropdown ListItem Checkmark
  'Hds::Dropdown::ListItem::Checkmark': typeof HdsDropdownListItemCheckmarkComponent;
  'hds/dropdown/list-item/checkmark': typeof HdsDropdownListItemCheckmarkComponent;

  // Dropdown ListItem CopyItem
  'Hds::Dropdown::ListItem::CopyItem': typeof HdsDropdownListItemCopyItemComponent;
  'hds/dropdown/list-item/copy-item': typeof HdsDropdownListItemCopyItemComponent;

  // Dropdown ListItem Description
  'Hds::Dropdown::ListItem::Description': typeof HdsDropdownListItemDescriptionComponent;
  'hds/dropdown/list-item/description': typeof HdsDropdownListItemDescriptionComponent;

  // Dropdown ListItem Generic
  'Hds::Dropdown::ListItem::Generic': typeof HdsDropdownListItemGenericComponent;
  'hds/dropdown/list-item/generic': typeof HdsDropdownListItemGenericComponent;

  // Dropdown ListItem Interactive
  'Hds::Dropdown::ListItem::Interactive': typeof HdsDropdownListItemInteractiveComponent;
  'hds/dropdown/list-item/interactive': typeof HdsDropdownListItemInteractiveComponent;

  // Dropdown ListItem Radio
  'Hds::Dropdown::ListItem::Radio': typeof HdsDropdownListItemRadioComponent;
  'hds/dropdown/list-item/radio': typeof HdsDropdownListItemRadioComponent;

  // Dropdown ListItem Separator
  'Hds::Dropdown::ListItem::Separator': typeof HdsDropdownListItemSeparatorComponent;
  'hds/dropdown/list-item/separator': typeof HdsDropdownListItemSeparatorComponent;

  // Dropdown ListItem Title
  'Hds::Dropdown::ListItem::Title': typeof HdsDropdownListItemTitleComponent;
  'hds/dropdown/list-item/title': typeof HdsDropdownListItemTitleComponent;

  // Dropdown Toggle Button
  'Hds::Dropdown::Toggle::Button': typeof HdsDropdownToggleButtonComponent;
  'hds/dropdown/toggle/button': typeof HdsDropdownToggleButtonComponent;

  // Dropdown Toggle Chevron
  'Hds::Dropdown::Toggle::Chevron': typeof HdsDropdownToggleChevronComponent;
  'hds/dropdown/toggle/chevron': typeof HdsDropdownToggleChevronComponent;

  // Dropdown Toggle Icon
  'Hds::Dropdown::Toggle::Icon': typeof HdsDropdownToggleIconComponent;
  'hds/dropdown/toggle/icon': typeof HdsDropdownToggleIconComponent;

  // Flyout
  'Hds::Flyout': typeof HdsFlyoutComponent;
  'hds/flyout': typeof HdsFlyoutComponent;

  'Hds::Flyout::Body': typeof HdsFlyoutBodyComponent;
  'hds/flyout/body': typeof HdsFlyoutBodyComponent;

  'Hds::Flyout::Description': typeof HdsFlyoutDescriptionComponent;
  'hds/flyout/description': typeof HdsFlyoutDescriptionComponent;

  'Hds::Flyout::Footer': typeof HdsFlyoutFooterComponent;
  'hds/flyout/footer': typeof HdsFlyoutFooterComponent;

  'Hds::Flyout::Header': typeof HdsFlyoutHeaderComponent;
  'hds/flyout/header': typeof HdsFlyoutHeaderComponent;

  // FORM

  // Form CharacterCount
  'Hds::Form::CharacterCount': typeof HdsFormCharacterCountComponent;
  'hds/form/character-count': typeof HdsFormCharacterCountComponent;

  // Form Checkbox
  'Hds::Form::Checkbox::Base': typeof HdsFormCheckboxBaseComponent;
  'hds/form/checkbox/base': typeof HdsFormCheckboxBaseComponent;

  'Hds::Form::Checkbox::Field': typeof HdsFormCheckboxFieldComponent;
  'hds/form/checkbox/field': typeof HdsFormCheckboxFieldComponent;

  'Hds::Form::Checkbox::Group': typeof HdsFormCheckboxGroupComponent;
  'hds/form/checkbox/group': typeof HdsFormCheckboxGroupComponent;

  // Form Error
  'Hds::Form::Error': typeof HdsFormErrorComponent;
  'hds/form/error': typeof HdsFormErrorComponent;

  // Form Error Message
  'Hds::Form::Error::Message': typeof HdsFormErrorMessageComponent;
  'hds/form/error/message': typeof HdsFormErrorMessageComponent;

  // Form Field
  'Hds::Form::Field': typeof HdsFormFieldComponent;
  'hds/form/field': typeof HdsFormFieldComponent;

  // Form Fieldset
  'Hds::Form::Fieldset': typeof HdsFormFieldsetComponent;
  'hds/form/fieldset': typeof HdsFormFieldsetComponent;

  // Form FileInput
  'Hds::Form::FileInput::Base': typeof HdsFormFileInputBaseComponent;
  'hds/form/file-input/base': typeof HdsFormFileInputBaseComponent;

  'Hds::Form::FileInput::Field': typeof HdsFormFileInputFieldComponent;
  'hds/form/file-input/field': typeof HdsFormFileInputFieldComponent;

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

  // Form MaskedInput
  'Hds::Form::MaskedInput::Base': typeof HdsFormMaskedInputBaseComponent;
  'hds/form/masked-input/base': typeof HdsFormMaskedInputBaseComponent;

  'Hds::Form::MaskedInput::Field': typeof HdsFormMaskedInputFieldComponent;
  'hds/form/masked-input/field': typeof HdsFormMaskedInputFieldComponent;

  // Form Radio
  'Hds::Form::Radio::Base': typeof HdsFormRadioBaseComponent;
  'hds/form/radio/base': typeof HdsFormRadioBaseComponent;

  'Hds::Form::Radio::Field': typeof HdsFormRadioFieldComponent;
  'hds/form/radio/field': typeof HdsFormRadioFieldComponent;

  'Hds::Form::Radio::Group': typeof HdsFormRadioGroupComponent;
  'hds/form/radio/group': typeof HdsFormRadioGroupComponent;

  // Form RadioCard
  'Hds::Form::RadioCard': typeof HdsFormRadioCardComponent;
  'hds/form/radio-card': typeof HdsFormRadioCardComponent;

  'Hds::Form::RadioCard::Description': typeof HdsFormRadioCardDescriptionComponent;
  'hds/form/radio-card/description': typeof HdsFormRadioCardDescriptionComponent;

  'Hds::Form::RadioCard::Group': typeof HdsFormRadioCardGroupComponent;
  'hds/form/radio-card/group': typeof HdsFormRadioCardGroupComponent;

  'Hds::Form::RadioCard::Label': typeof HdsFormRadioCardLabelComponent;
  'hds/form/radio-card/label': typeof HdsFormRadioCardLabelComponent;

  // Form Select
  'Hds::Form::Select::Base': typeof HdsFormSelectBaseComponent;
  'hds/form/select/base': typeof HdsFormSelectBaseComponent;

  'Hds::Form::Select::Field': typeof HdsFormSelectFieldComponent;
  'hds/form/select/field': typeof HdsFormSelectFieldComponent;

  // Form Super Select
  'Hds::Form::SuperSelect::AfterOptions': typeof HdsFormSuperSelectAfterOptionsComponent;
  'hds/form/super-select/after-options': typeof HdsFormSuperSelectAfterOptionsComponent;

  'Hds::Form::SuperSelect::OptionGroup': typeof HdsFormSuperSelectOptionGroupComponent;
  'hds/form/super-select/option-group': typeof HdsFormSuperSelectOptionGroupComponent;

  'Hds::Form::SuperSelect::Placeholder': typeof HdsFormSuperSelectPlaceholderComponent;
  'hds/form/super-select/placeholder': typeof HdsFormSuperSelectPlaceholderComponent;

  'Hds::Form::SuperSelect::Single::Base': typeof HdsFormSuperSelectSingleBaseComponent;
  'hds/form/super-select/single/base': typeof HdsFormSuperSelectSingleBaseComponent;

  'Hds::Form::SuperSelect::Single::Field': typeof HdsFormSuperSelectSingleFieldComponent;
  'hds/form/super-select/single/field': typeof HdsFormSuperSelectSingleFieldComponent;

  'Hds::Form::SuperSelect::Multiple::Base': typeof HdsFormSuperSelectMultipleBaseComponent;
  'hds/form/super-select/multiple/base': typeof HdsFormSuperSelectMultipleBaseComponent;

  'Hds::Form::SuperSelect::Multiple::Field': typeof HdsFormSuperSelectMultipleFieldComponent;
  'hds/form/super-select/multiple/field': typeof HdsFormSuperSelectMultipleFieldComponent;

  // Form TextInput
  'Hds::Form::TextInput::Base': typeof HdsFormTextInputBaseComponent;
  'hds/form/text-input/base': typeof HdsFormTextInputBaseComponent;

  'Hds::Form::TextInput::Field': typeof HdsFormTextInputFieldComponent;
  'hds/form/text-input/field': typeof HdsFormTextInputFieldComponent;

  // Form Textarea
  'Hds::Form::Textarea::Base': typeof HdsFormTextareaBaseComponent;
  'hds/form/textarea/base': typeof HdsFormTextareaBaseComponent;

  'Hds::Form::Textarea::Field': typeof HdsFormTextareaFieldComponent;
  'hds/form/textarea/field': typeof HdsFormTextareaFieldComponent;

  // Form Toggle
  'Hds::Form::Toggle::Base': typeof HdsFormToggleBaseComponent;
  'hds/form/toggle/base': typeof HdsFormToggleBaseComponent;

  'Hds::Form::Toggle::Field': typeof HdsFormToggleFieldComponent;
  'hds/form/toggle/field': typeof HdsFormToggleFieldComponent;

  'Hds::Form::Toggle::Group': typeof HdsFormToggleGroupComponent;
  'hds/form/toggle/group': typeof HdsFormToggleGroupComponent;

  // Form VisibilityToggle
  'Hds::Form::VisibilityToggle': typeof HdsFormVisibilityToggleComponent;
  'hds/form/visibility-toggle': typeof HdsFormVisibilityToggleComponent;

  // Icon
  'Hds::Icon': typeof HdsIconComponent;
  'hds/icon': typeof HdsIconComponent;

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

  // MenuPrimitive
  'Hds::MenuPrimitive': typeof HdsMenuPrimitiveComponent;
  'hds/menu-primitive': typeof HdsMenuPrimitiveComponent;

  // Modal
  'Hds::Modal': typeof HdsModalComponent;
  'hds/modal': typeof HdsModalComponent;

  'Hds::ModalBoty': typeof HdsModalBodyComponent;
  'hds/modal/body': typeof HdsModalBodyComponent;

  'Hds::ModalFooter': typeof HdsModalFooterComponent;
  'hds/modal/footer': typeof HdsModalFooterComponent;

  'Hds::ModalHeader': typeof HdsModalHeaderComponent;
  'hds/modal/header': typeof HdsModalHeaderComponent;

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

  // Pagination
  'Hds::Pagination::Compact': typeof HdsPaginationCompactComponent;
  'hds/pagination/compact': typeof HdsPaginationCompactComponent;

  'Hds::Pagination::Info': typeof HdsPaginationControlInfoComponent;
  'hds/pagination/info': typeof HdsPaginationControlInfoComponent;

  'Hds::Pagination::Nav::Arrow': typeof HdsPaginationControlArrowComponent;
  'hds/pagination/nav/arrow': typeof HdsPaginationControlArrowComponent;

  'Hds::Pagination::Nav::Ellipsis': typeof HdsPaginationControlEllipsisComponent;
  'hds/pagination/nav/ellipsis': typeof HdsPaginationControlEllipsisComponent;

  'Hds::Pagination::Nav::Number': typeof HdsPaginationControlNumberComponent;
  'hds/pagination/nav/number': typeof HdsPaginationControlNumberComponent;

  'Hds::Pagination::Numbered': typeof HdsPaginationNumberedComponent;
  'hds/pagination/numbered': typeof HdsPaginationNumberedComponent;

  'Hds::Pagination::SizeSelector': typeof HdsPaginationSizeSelectorComponent;
  'hds/pagination/size-selector': typeof HdsPaginationSizeSelectorComponent;

  // PopoverPrimitive
  'Hds::PopoverPrimitive': typeof HdsPopoverPrimitiveComponent;
  'hds/popover-primitive': typeof HdsPopoverPrimitiveComponent;

  // Reveal
  'Hds::Reveal': typeof HdsRevealComponent;
  'hds/reveal': typeof HdsRevealComponent;

  'Hds::Reveal::Toggle::Button': typeof HdsRevealToggleButtonComponent;
  'hds/reveal/toggle/button': typeof HdsRevealToggleButtonComponent;

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

  // Segmented Group
  'Hds::SegmentedGroup': typeof HdsSegmentedGroupComponent;
  'hds/segmented-group': typeof HdsSegmentedGroupComponent;

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

  // Table
  'Hds::Table': typeof HdsTableComponent;
  'hds/table': typeof HdsTableComponent;
  'Hds::Table::Td': typeof HdsTableTdComponent;
  'hds/table/td': typeof HdsTableTdComponent;
  'Hds::Table::Th': typeof HdsTableThComponent;
  'hds/table/th': typeof HdsTableThComponent;
  'Hds::Table::Tr': typeof HdsTableTrComponent;
  'hds/table/tr': typeof HdsTableTrComponent;
  'Hds::Table::ThButtonSort': typeof HdsTableThButtonSortComponent;
  'hds/table/th-button-sort': typeof HdsTableThButtonSortComponent;
  'Hds::Table::ThButtonTooltip': typeof HdsTableThButtonTooltipComponent;
  'hds/table/th-button-tooltip': typeof HdsTableThButtonTooltipComponent;
  'Hds::Table::ThSort': typeof HdsTableThSortComponent;
  'hds/table/th-sort': typeof HdsTableThSortComponent;
  'Hds::Table::ThSelectable': typeof HdsTableThSelectableComponent;
  'hds/table/th-selectable': typeof HdsTableThSelectableComponent;

  // Tabs
  'Hds::Tabs': typeof HdsTabsComponent;
  'hds/tabs': typeof HdsTabsComponent;

  'Hds::Tabs::Panel': typeof HdsTabsPanelComponent;
  'hds/tabs/panel': typeof HdsTabsPanelComponent;

  'Hds::Tabs::Tab': typeof HdsTabsTabComponent;
  'hds/tabs/tab': typeof HdsTabsTabComponent;

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

  // TooltipButton
  'Hds::TooltipButton': typeof HdsTooltipButtonComponent;
  'hds/tooltip-button': typeof HdsTooltipButtonComponent;

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

  // hds-tooltip
  'hds-tooltip': typeof HdsTooltipModifier;
}
