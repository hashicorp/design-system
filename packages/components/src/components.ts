/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// This file is use to expose public components/subcomponents and their types to the consumers of this package.

// -----------------------------------------------------------
// ### COMPONENTS
// -----------------------------------------------------------

// Accordion
export { default as HdsAccordion } from './components/hds/accordion/index.ts';
export { default as HdsAccordionItem } from './components/hds/accordion/item/index.ts';
export * from './components/hds/accordion/types.ts';

// Advanced Table
export { default as HdsAdvancedTable } from './components/hds/advanced-table/index.ts';
export { default as HdsAdvancedTableTd } from './components/hds/advanced-table/td.ts';
export { default as HdsAdvancedTableTh } from './components/hds/advanced-table/th.ts';
export { default as HdsAdvancedTableThButtonExpand } from './components/hds/advanced-table/th-button-expand.ts';
export { default as HdsAdvancedTableThButtonSort } from './components/hds/advanced-table/th-button-sort.ts';
export { default as HdsAdvancedTableThButtonTooltip } from './components/hds/advanced-table/th-button-tooltip.ts';
export { default as HdsAdvancedTableThSelectable } from './components/hds/advanced-table/th-selectable.ts';
export { default as HdsAdvancedTableThSort } from './components/hds/advanced-table/th-sort.ts';
export { default as HdsAdvancedTableTrExpandableGroup } from './components/hds/advanced-table/tr-expandable-group.ts';
export { default as HdsAdvancedTableTr } from './components/hds/advanced-table/tr.ts';
export * from './components/hds/advanced-table/types.ts';

// Alert
export { default as HdsAlert } from './components/hds/alert/index.ts';
export { default as HdsAlertDescription } from './components/hds/alert/description.ts';
export { default as HdsAlertTitle } from './components/hds/alert/title.ts';
export * from './components/hds/alert/types.ts';

// AppFooter
export { default as HdsAppFooter } from './components/hds/app-footer/index.ts';
export { default as HdsAppFooterCopyright } from './components/hds/app-footer/copyright.ts';
export { default as HdsAppFooterItem } from './components/hds/app-footer/item.ts';
export { default as HdsAppFooterLegalLinks } from './components/hds/app-footer/legal-links.ts';
export { default as HdsAppFooterLink } from './components/hds/app-footer/link.ts';
export { default as HdsAppFooterStatusLink } from './components/hds/app-footer/status-link.ts';
export * from './components/hds/app-footer/types.ts';

// AppHeader
export { default as HdsAppHeader } from './components/hds/app-header/index.ts';
export { default as HdsAppHeaderHomeLink } from './components/hds/app-header/home-link.ts';
export { default as HdsAppHeaderMenuButton } from './components/hds/app-header/menu-button.ts';

// ApplicationState
export { default as HdsApplicationState } from './components/hds/application-state/index.ts';
export { default as HdsApplicationStateBody } from './components/hds/application-state/body.ts';
export { default as HdsApplicationStateFooter } from './components/hds/application-state/footer.ts';
export { default as HdsApplicationStateHeader } from './components/hds/application-state/header.ts';
export { default as HdsApplicationStateMedia } from './components/hds/application-state/media.ts';
export * from './components/hds/application-state/types.ts';

// Badge
export { default as HdsBadge } from './components/hds/badge/index.ts';
export * from './components/hds/badge/types.ts';

// BadgeCount
export { default as HdsBadgeCount } from './components/hds/badge-count/index.ts';
export * from './components/hds/badge-count/types.ts';

// Breadcrumb
export { default as HdsBreadcrumb } from './components/hds/breadcrumb/index.ts';
export { default as HdsBreadcrumbItem } from './components/hds/breadcrumb/item.ts';
export { default as HdsBreadcrumbTruncation } from './components/hds/breadcrumb/truncation.ts';

// Button
export { default as HdsButton } from './components/hds/button/index.ts';

// ButtonSet
export { default as HdsButtonSet } from './components/hds/button-set/index.ts';

// Card
export { default as HdsCardContainer } from './components/hds/card/container.ts';
export * from './components/hds/card/types.ts';

// CodeBlock
export { default as HdsCodeBlock } from './components/hds/code-block/index.ts';
export { default as HdsCodeBlockCopyButton } from './components/hds/code-block/copy-button.ts';
export { default as HdsCodeBlockDescription } from './components/hds/code-block/description.ts';
export { default as HdsCodeBlockTitle } from './components/hds/code-block/title.ts';
export * from './components/hds/code-block/types.ts';

// CopyButton
export { default as HdsCopyButton } from './components/hds/copy/button/index.ts';
export * from './components/hds/copy/button/types.ts';

// CopySnippet
export { default as HdsCopySnippet } from './components/hds/copy/snippet/index.ts';
export * from './components/hds/copy/snippet/types.ts';

// Dropdown
export { default as HdsDropdown } from './components/hds/dropdown/index.ts';
export { default as HdsDropdownFooter } from './components/hds/dropdown/footer.ts';
export { default as HdsDropdownHeader } from './components/hds/dropdown/header.ts';
export { default as HdsDropdownListItemCheckbox } from './components/hds/dropdown/list-item/checkbox.ts';
export { default as HdsDropdownListItemCheckmark } from './components/hds/dropdown/list-item/checkmark.ts';
export { default as HdsDropdownListItemCopyItem } from './components/hds/dropdown/list-item/copy-item.ts';
export { default as HdsDropdownListItemDescription } from './components/hds/dropdown/list-item/description.ts';
export { default as HdsDropdownListItemGeneric } from './components/hds/dropdown/list-item/generic.ts';
export { default as HdsDropdownListItemInteractive } from './components/hds/dropdown/list-item/interactive.ts';
export { default as HdsDropdownListItemRadio } from './components/hds/dropdown/list-item/radio.ts';
export { default as HdsDropdownListItemSeparator } from './components/hds/dropdown/list-item/separator.ts';
export { default as HdsDropdownListItemTitle } from './components/hds/dropdown/list-item/title.ts';
export { default as HdsDropdownToggleButton } from './components/hds/dropdown/toggle/button.ts';
export { default as HdsDropdownToggleIcon } from './components/hds/dropdown/toggle/icon.ts';
export * from './components/hds/dropdown/list-item/types.ts';
export * from './components/hds/dropdown/toggle/types.ts';
export * from './components/hds/dropdown/types.ts';

// Flyout
export { default as HdsFlyout } from './components/hds/flyout/index.ts';
export * from './components/hds/flyout/types.ts';

// Form > Base elements
export { default as HdsFormCharacterCount } from './components/hds/form/character-count/index.ts';
export { default as HdsFormError } from './components/hds/form/error/index.ts';
export { default as HdsFormErrorMessage } from './components/hds/form/error/message.ts';
export { default as HdsFormField } from './components/hds/form/field/index.ts';
export { default as HdsFormFieldset } from './components/hds/form/fieldset/index.ts';
export { default as HdsFormHelperText } from './components/hds/form/helper-text/index.ts';
export { default as HdsFormIndicator } from './components/hds/form/indicator/index.ts';
export { default as HdsFormLabel } from './components/hds/form/label/index.ts';
export { default as HdsFormLegend } from './components/hds/form/legend/index.ts';
export { default as HdsFormVisibilityToggle } from './components/hds/form/visibility-toggle/index.ts';
export * from './components/hds/form/field/types.ts';
export * from './components/hds/form/fieldset/types.ts';

// Form > Checkbox
export { default as HdsFormCheckboxBase } from './components/hds/form/checkbox/base.ts';
export { default as HdsFormCheckboxField } from './components/hds/form/checkbox/field.ts';
export { default as HdsFormCheckboxGroup } from './components/hds/form/checkbox/group.ts';

// Form > FileInput
export { default as HdsFormFileInputBase } from './components/hds/form/file-input/base.ts';
export { default as HdsFormFileInputField } from './components/hds/form/file-input/field.ts';

// Form > MaskedInput
export { default as HdsFormMaskedInputBase } from './components/hds/form/masked-input/base.ts';
export { default as HdsFormMaskedInputField } from './components/hds/form/masked-input/field.ts';

// Form > Radio
export { default as HdsFormRadioBase } from './components/hds/form/radio/base.ts';
export { default as HdsFormRadioField } from './components/hds/form/radio/field.ts';
export { default as HdsFormRadioGroup } from './components/hds/form/radio/group.ts';

// Form > RadioCard
export { default as HdsFormRadioCard } from './components/hds/form/radio-card/index.ts';
export { default as HdsFormRadioCardGroup } from './components/hds/form/radio-card/group.ts';
export { default as HdsFormRadioCardDescription } from './components/hds/form/radio-card/description.ts';
export { default as HdsFormRadioCardLabel } from './components/hds/form/radio-card/label.ts';
export * from './components/hds/form/radio-card/types.ts';

// Form > Select
export { default as HdsFormSelectBase } from './components/hds/form/select/base.ts';
export { default as HdsFormSelectField } from './components/hds/form/select/field.ts';

// Form > SuperSelect
export { default as HdsFormSuperSelectSingleBase } from './components/hds/form/super-select/single/base.ts';
export { default as HdsFormSuperSelectSingleField } from './components/hds/form/super-select/single/field.ts';
export { default as HdsFormSuperSelectMultipleBase } from './components/hds/form/super-select/multiple/base.ts';
export { default as HdsFormSuperSelectMultipleField } from './components/hds/form/super-select/multiple/field.ts';
export { default as HdsFormSuperSelectAfterOptions } from './components/hds/form/super-select/after-options.ts';
export { default as HdsFormSuperSelectOptionGroup } from './components/hds/form/super-select/option-group.ts';
export { default as HdsFormSuperSelectPlaceholder } from './components/hds/form/super-select/placeholder.ts';
export * from './components/hds/form/super-select/types.ts';

// Form > Textarea
export { default as HdsFormTextareaBase } from './components/hds/form/textarea/base.ts';
export { default as HdsFormTextareaField } from './components/hds/form/textarea/field.ts';

// Form > TextInput
export { default as HdsFormTextInputBase } from './components/hds/form/text-input/base.ts';
export { default as HdsFormTextInputField } from './components/hds/form/text-input/field.ts';
export * from './components/hds/form/text-input/types.ts';

// Form > Toggle
export { default as HdsFormToggleBase } from './components/hds/form/toggle/base.ts';
export { default as HdsFormToggleField } from './components/hds/form/toggle/field.ts';
export { default as HdsFormToggleGroup } from './components/hds/form/toggle/group.ts';

// Icon
export { default as HdsIcon } from './components/hds/icon/index.ts';
export * from './components/hds/icon/types.ts';

// IconTile
export { default as HdsIconTile } from './components/hds/icon-tile/index.ts';
export * from './components/hds/icon-tile/types.ts';

// Link
export { default as HdsLinkInline } from './components/hds/link/inline.ts';
export { default as HdsLinkStandalone } from './components/hds/link/standalone.ts';
export * from './components/hds/link/types.ts';

// Modal
export { default as HdsModal } from './components/hds/modal/index.ts';
export * from './components/hds/modal/types.ts';

// PageHeader
export { default as HdsPageHeader } from './components/hds/page-header/index.ts';
export { default as HdsPageHeaderActions } from './components/hds/page-header/actions.ts';
export { default as HdsPageHeaderBadges } from './components/hds/page-header/badges.ts';
export { default as HdsPageHeaderDescription } from './components/hds/page-header/description.ts';
export { default as HdsPageHeaderSubtitle } from './components/hds/page-header/subtitle.ts';
export { default as HdsPageHeaderTitle } from './components/hds/page-header/title.ts';

// Pagination
export { default as HdsPaginationCompact } from './components/hds/pagination/compact/index.ts';
export { default as HdsPaginationInfo } from './components/hds/pagination/info/index.ts';
export { default as HdsPaginationNavArrow } from './components/hds/pagination/nav/arrow.ts';
export { default as HdsPaginationNavEllipsis } from './components/hds/pagination/nav/ellipsis.ts';
export { default as HdsPaginationNavNumber } from './components/hds/pagination/nav/number.ts';
export { default as HdsPaginationNumbered } from './components/hds/pagination/numbered/index.ts';
export { default as HdsPaginationSizeSelector } from './components/hds/pagination/size-selector/index.ts';
export * from './components/hds/pagination/types.ts';

// Reveal
export { default as HdsReveal } from './components/hds/reveal/index.ts';
export { default as HdsRevealToggleButton } from './components/hds/reveal/toggle/button.ts';

// RichTooltip
export { default as HdsRichTooltip } from './components/hds/rich-tooltip/index.ts';
export { default as HdsRichTooltipBubble } from './components/hds/rich-tooltip/bubble.ts';
export { default as HdsRichTooltipToggle } from './components/hds/rich-tooltip/toggle.ts';
export * from './components/hds/rich-tooltip/types.ts';

// SegmentedGroup
export { default as HdsSegmentedGroup } from './components/hds/segmented-group/index.ts';

// Separator
export { default as HdsSeparator } from './components/hds/separator/index.ts';
export * from './components/hds/separator/types.ts';

// SideNav
export { default as HdsSideNav } from './components/hds/side-nav/index.ts';
export { default as HdsSideNavBase } from './components/hds/side-nav/base.ts';
export { default as HdsSideNavHeader } from './components/hds/side-nav/header/index.ts';
export { default as HdsSideNavHeaderHomeLink } from './components/hds/side-nav/header/home-link.ts';
export { default as HdsSideNavHeaderIconButton } from './components/hds/side-nav/header/icon-button.ts';
export { default as HdsSideNavList } from './components/hds/side-nav/list/index.ts';
export { default as HdsSideNavListBackLink } from './components/hds/side-nav/list/back-link.ts';
export { default as HdsSideNavListItem } from './components/hds/side-nav/list/item.ts';
export { default as HdsSideNavListLink } from './components/hds/side-nav/list/link.ts';
export { default as HdsSideNavListTitle } from './components/hds/side-nav/list/title.ts';
export { default as HdsSideNavPortal } from './components/hds/side-nav/portal/index.ts';
export { default as HdsSideNavPortalTarget } from './components/hds/side-nav/portal/target.ts';
export { default as HdsSideNavToggleButton } from './components/hds/side-nav/toggle-button.ts';

// Stepper
export { default as HdsStepperStepIndicator } from './components/hds/stepper/step/indicator.ts';
export { default as HdsStepperTaskIndicator } from './components/hds/stepper/task/indicator.ts';
export * from './components/hds/stepper/types.ts';

// Table
export { default as HdsTable } from './components/hds/table/index.ts';
export { default as HdsTableTd } from './components/hds/table/td.ts';
export { default as HdsTableTh } from './components/hds/table/th.ts';
export { default as HdsTableThButtonSort } from './components/hds/table/th-button-sort.ts';
export { default as HdsTableThButtonTooltip } from './components/hds/table/th-button-tooltip.ts';
export { default as HdsTableThSelectable } from './components/hds/table/th-selectable.ts';
export { default as HdsTableThSort } from './components/hds/table/th-sort.ts';
export { default as HdsTableTr } from './components/hds/table/tr.ts';
export * from './components/hds/table/types.ts';

// Tabs
export { default as HdsTabs } from './components/hds/tabs/index.ts';
export { default as HdsTabsPanel } from './components/hds/tabs/panel.ts';
export { default as HdsTabsTab } from './components/hds/tabs/tab.ts';
export * from './components/hds/tabs/types.ts';

// Tag
export { default as HdsTag } from './components/hds/tag/index.ts';
export * from './components/hds/tag/types.ts';

// Text
export { default as HdsText } from './components/hds/text/index.ts';
export { default as HdsTextBody } from './components/hds/text/body.ts';
export { default as HdsTextCode } from './components/hds/text/code.ts';
export { default as HdsTextDisplay } from './components/hds/text/display.ts';
export * from './components/hds/text/types.ts';

// Time
export { default as HdsTime } from './components/hds/time/index.ts';
export { default as HdsTimeSingle } from './components/hds/time/single.ts';
export { default as HdsTimeRange } from './components/hds/time/range.ts';
export * from './services/hds-time-types.ts';

// Toast
export { default as HdsToast } from './components/hds/toast/index.ts';

// TooltipButton
export { default as HdsTooltipButton } from './components/hds/tooltip-button/index.ts';
export * from './components/hds/tooltip-button/types.ts';

// -----------------------------------------------------------
// ### LAYOUTS
// -----------------------------------------------------------

// AppFrame
export { default as HdsAppFrame } from './components/hds/app-frame/index.ts';
export { default as HdsAppFrameFooter } from './components/hds/app-frame/parts/footer.ts';
export { default as HdsAppFrameHeader } from './components/hds/app-frame/parts/header.ts';
export { default as HdsAppFrameMain } from './components/hds/app-frame/parts/main.ts';
export { default as HdsAppFrameModals } from './components/hds/app-frame/parts/modals.ts';
export { default as HdsAppFrameSidebar } from './components/hds/app-frame/parts/sidebar.ts';

// -----------------------------------------------------------
// ### UTILITIES
// -----------------------------------------------------------

// DialogPrimitive
export { default as HdsDialogPrimitiveBody } from './components/hds/dialog-primitive/body.ts';
export { default as HdsDialogPrimitiveDescription } from './components/hds/dialog-primitive/description.ts';
export { default as HdsDialogPrimitiveFooter } from './components/hds/dialog-primitive/footer.ts';
export { default as HdsDialogPrimitiveHeader } from './components/hds/dialog-primitive/header.ts';
export { default as HdsDialogPrimitiveOverlay } from './components/hds/dialog-primitive/overlay.ts';
export { default as HdsDialogPrimitiveWrapper } from './components/hds/dialog-primitive/wrapper.ts';
export * from './components/hds/dialog-primitive/types.ts';

// DisclosurePrimitive
export { default as HdsDisclosurePrimitive } from './components/hds/disclosure-primitive/index.ts';

// DismissButton
export { default as HdsDismissButton } from './components/hds/dismiss-button/index.ts';

// Interactive
export { default as HdsInteractive } from './components/hds/interactive/index.ts';

// MenuPrimitive
export { default as HdsMenuPrimitive } from './components/hds/menu-primitive/index.ts';

// PopoverPrimitive
export { default as HdsPopoverPrimitive } from './components/hds/popover-primitive/index.ts';
