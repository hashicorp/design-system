/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

// This file is use to expose public components/subcomponents and their types to the consumers of this package.

// -----------------------------------------------------------
// ### COMPONENTS
// -----------------------------------------------------------

// Accordion
export { default as HdsAccordion } from './components/hds/accordion/index.gts';
export { default as HdsAccordionItem } from './components/hds/accordion/item/index.gts';
export * from './components/hds/accordion/types.ts';

// Advanced Table
export { default as HdsAdvancedTable } from './components/hds/advanced-table/index.ts';
export { default as HdsAdvancedTableTd } from './components/hds/advanced-table/td.ts';
export { default as HdsAdvancedTableTh } from './components/hds/advanced-table/th.ts';
export { default as HdsAdvancedTableThButtonSort } from './components/hds/advanced-table/th-button-sort.ts';
export { default as HdsAdvancedTableThButtonTooltip } from './components/hds/advanced-table/th-button-tooltip.ts';
export { default as HdsAdvancedTableThSelectable } from './components/hds/advanced-table/th-selectable.ts';
export { default as HdsAdvancedTableThSort } from './components/hds/advanced-table/th-sort.ts';
export { default as HdsAdvancedTableTr } from './components/hds/advanced-table/tr.ts';
export { default as HdsAdvancedTableThButtonExpand } from './components/hds/advanced-table/th-button-expand.ts';
export { default as HdsAdvancedTableExpandableTrGroup } from './components/hds/advanced-table/expandable-tr-group.ts';
export * from './components/hds/advanced-table/types.ts';

// Alert
export { default as HdsAlert } from './components/hds/alert/index.gts';
export { default as HdsAlertDescription } from './components/hds/alert/description.gts';
export { default as HdsAlertTitle } from './components/hds/alert/title.gts';
export * from './components/hds/alert/types.ts';

// AppFooter
export { default as HdsAppFooter } from './components/hds/app-footer/index.gts';
export { default as HdsAppFooterCopyright } from './components/hds/app-footer/copyright.gts';
export { default as HdsAppFooterItem } from './components/hds/app-footer/item.gts';
export { default as HdsAppFooterLegalLinks } from './components/hds/app-footer/legal-links.gts';
export { default as HdsAppFooterLink } from './components/hds/app-footer/link.gts';
export { default as HdsAppFooterStatusLink } from './components/hds/app-footer/status-link.gts';
export * from './components/hds/app-footer/types.ts';

// AppHeader
export { default as HdsAppHeader } from './components/hds/app-header/index.gts';
export { default as HdsAppHeaderHomeLink } from './components/hds/app-header/home-link.gts';
export { default as HdsAppHeaderMenuButton } from './components/hds/app-header/menu-button.gts';

// AppSideNav
export { default as HdsAppSideNav } from './components/hds/app-side-nav/index.ts';
export { default as HdsAppSideNavToggleButton } from './components/hds/app-side-nav/toggle-button.ts';
export { default as HdsAppSideNavPortal } from './components/hds/app-side-nav/portal/index.ts';
export { default as HdsAppSideNavPortalTarget } from './components/hds/app-side-nav/portal/target.ts';
export { default as HdsAppSideNavList } from './components/hds/app-side-nav/list/index.ts';
export { default as HdsAppSideNavListItem } from './components/hds/app-side-nav/list/item.ts';
export { default as HdsAppSideNavListBackLink } from './components/hds/app-side-nav/list/back-link.ts';
export { default as HdsAppSideNavListTitle } from './components/hds/app-side-nav/list/title.ts';
export { default as HdsAppSideNavListLink } from './components/hds/app-side-nav/list/link.ts';

// ApplicationState
export { default as HdsApplicationState } from './components/hds/application-state/index.gts';
export { default as HdsApplicationStateBody } from './components/hds/application-state/body.gts';
export { default as HdsApplicationStateFooter } from './components/hds/application-state/footer.gts';
export { default as HdsApplicationStateHeader } from './components/hds/application-state/header.gts';
export { default as HdsApplicationStateMedia } from './components/hds/application-state/media.gts';
export * from './components/hds/application-state/types.ts';

// Badge
export { default as HdsBadge } from './components/hds/badge/index.gts';
export * from './components/hds/badge/types.ts';

// BadgeCount
export { default as HdsBadgeCount } from './components/hds/badge-count/index.gts';
export * from './components/hds/badge-count/types.ts';

// Breadcrumb
export { default as HdsBreadcrumb } from './components/hds/breadcrumb/index.gts';
export { default as HdsBreadcrumbItem } from './components/hds/breadcrumb/item.gts';
export { default as HdsBreadcrumbTruncation } from './components/hds/breadcrumb/truncation.gts';

// Button
export { default as HdsButton } from './components/hds/button/index.gts';
export * from './components/hds/button/types.ts';

// ButtonSet
export { default as HdsButtonSet } from './components/hds/button-set/index.gts';

// Card
export { default as HdsCardContainer } from './components/hds/card/container.gts';
export * from './components/hds/card/types.ts';

// CodeBlock
export { default as HdsCodeBlock } from './components/hds/code-block/index.ts';
export { default as HdsCodeBlockCopyButton } from './components/hds/code-block/copy-button.ts';
export { default as HdsCodeBlockDescription } from './components/hds/code-block/description.ts';
export { default as HdsCodeBlockTitle } from './components/hds/code-block/title.ts';
export * from './components/hds/code-block/types.ts';

// CodeEditor
export { default as HdsCodeEditor } from './components/hds/code-editor/index.ts';
export { default as HdsCodeEditorDescription } from './components/hds/code-editor/description.ts';
export { default as HdsCodeEditorTitle } from './components/hds/code-editor/title.ts';
export { default as HdsCodeEditorFullScreenButton } from './components/hds/code-editor/full-screen-button.ts';

// CopyButton
export { default as HdsCopyButton } from './components/hds/copy/button/index.gts';
export * from './components/hds/copy/button/types.ts';

// CopySnippet
export { default as HdsCopySnippet } from './components/hds/copy/snippet/index.gts';
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

// FilterBar
export { default as HdsFilterBar } from './components/hds/filter-bar/index.ts';
export { default as HdsFilterBarActionsDropdown } from './components/hds/filter-bar/actions-dropdown.ts';
export { default as HdsFilterBarAppliedFilters } from './components/hds/filter-bar/applied-filters.ts';
export { default as HdsFilterBarFiltersDropdown } from './components/hds/filter-bar/filters-dropdown.ts';
export { default as HdsFilterBarFilterGroup } from './components/hds/filter-bar/filter-group/index.ts';
export { default as HdsFilterBarFilterGroupCheckbox } from './components/hds/filter-bar/filter-group/checkbox.ts';
export { default as HdsFilterBarFilterGroupClearButton } from './components/hds/filter-bar/filter-group/clear-button.ts';
export { default as HdsFilterBarFilterGroupDate } from './components/hds/filter-bar/filter-group/date.ts';
export { default as HdsFilterBarFilterGroupGeneric } from './components/hds/filter-bar/filter-group/generic.ts';
export { default as HdsFilterBarFilterGroupRadio } from './components/hds/filter-bar/filter-group/radio.ts';
export { default as HdsFilterBarFilterGroupNumerical } from './components/hds/filter-bar/filter-group/numerical.ts';
export { default as HdsFilterBarTabs } from './components/hds/filter-bar/tabs/index.ts';
export { default as HdsFilterBarTabsPanel } from './components/hds/filter-bar/tabs/panel.ts';
export { default as HdsFilterBarTabsTab } from './components/hds/filter-bar/tabs/tab.ts';
export * from './components/hds/filter-bar/types.ts';

// Flyout
export { default as HdsFlyout } from './components/hds/flyout/index.gts';
export * from './components/hds/flyout/types.ts';

// Form > Layout
export { default as HdsForm } from './components/hds/form/index.ts';
export { default as HdsFormFooter } from './components/hds/form/footer/index.ts';
export { default as HdsFormHeader } from './components/hds/form/header/index.ts';
export { default as HdsFormHeaderTitle } from './components/hds/form/header/title.ts';
export { default as HdsFormHeaderDescription } from './components/hds/form/header/description.ts';
export { default as HdsFormSection } from './components/hds/form/section/index.ts';
export { default as HdsFormSectionHeader } from './components/hds/form/section/header.ts';
export { default as HdsFormSectionMultiFieldGroup } from './components/hds/form/section/multi-field-group/index.ts';
export { default as HdsFormSectionMultiFieldGroupItem } from './components/hds/form/section/multi-field-group/item.ts';
export { default as HdsFormSeparator } from './components/hds/form/separator/index.ts';
export * from './components/hds/form/types.ts';

// Form > Base elements
export { default as HdsFormCharacterCount } from './components/hds/form/character-count/index.gts';
export { default as HdsFormError } from './components/hds/form/error/index.gts';
export { default as HdsFormErrorMessage } from './components/hds/form/error/message.gts';
export { default as HdsFormField } from './components/hds/form/field/index.gts';
export { default as HdsFormFieldset } from './components/hds/form/fieldset/index.gts';
export { default as HdsFormHelperText } from './components/hds/form/helper-text/index.gts';
export { default as HdsFormIndicator } from './components/hds/form/indicator/index.gts';
export { default as HdsFormLabel } from './components/hds/form/label/index.gts';
export { default as HdsFormLegend } from './components/hds/form/legend/index.gts';
export { default as HdsFormVisibilityToggle } from './components/hds/form/visibility-toggle/index.gts';
export * from './components/hds/form/field/types.ts';
export * from './components/hds/form/fieldset/types.ts';

// Form > Checkbox
export { default as HdsFormCheckboxBase } from './components/hds/form/checkbox/base.gts';
export { default as HdsFormCheckboxField } from './components/hds/form/checkbox/field.gts';
export { default as HdsFormCheckboxGroup } from './components/hds/form/checkbox/group.gts';

// Form > FileInput
export { default as HdsFormFileInputBase } from './components/hds/form/file-input/base.gts';
export { default as HdsFormFileInputField } from './components/hds/form/file-input/field.gts';

// Form > KeyValueInputs

export { default as HdsFormKeyValueInputs } from './components/hds/form/key-value-inputs/index.gts';
export { default as HdsFormKeyValueInputsAddRowButton } from './components/hds/form/key-value-inputs/add-row-button.gts';
export { default as HdsFormKeyValueInputsDeleteRowButton } from './components/hds/form/key-value-inputs/delete-row-button.gts';
export { default as HdsFormKeyValueInputsField } from './components/hds/form/key-value-inputs/field.gts';
export { default as HdsFormKeyValueInputsGeneric } from './components/hds/form/key-value-inputs/generic.gts';

// Form > MaskedInput
export { default as HdsFormMaskedInputBase } from './components/hds/form/masked-input/base.ts';
export { default as HdsFormMaskedInputField } from './components/hds/form/masked-input/field.ts';

// Form > Radio
export { default as HdsFormRadioBase } from './components/hds/form/radio/base.gts';
export { default as HdsFormRadioField } from './components/hds/form/radio/field.gts';
export { default as HdsFormRadioGroup } from './components/hds/form/radio/group.gts';

// Form > RadioCard
export { default as HdsFormRadioCard } from './components/hds/form/radio-card/index.gts';
export { default as HdsFormRadioCardGroup } from './components/hds/form/radio-card/group.gts';
export { default as HdsFormRadioCardDescription } from './components/hds/form/radio-card/description.gts';
export { default as HdsFormRadioCardLabel } from './components/hds/form/radio-card/label.gts';
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
export { default as HdsFormTextareaBase } from './components/hds/form/textarea/base.gts';
export { default as HdsFormTextareaField } from './components/hds/form/textarea/field.gts';

// Form > TextInput
export { default as HdsFormTextInputBase } from './components/hds/form/text-input/base.gts';
export { default as HdsFormTextInputField } from './components/hds/form/text-input/field.gts';
export * from './components/hds/form/text-input/types.ts';

// Form > Toggle
export { default as HdsFormToggleBase } from './components/hds/form/toggle/base.gts';
export { default as HdsFormToggleField } from './components/hds/form/toggle/field.gts';
export { default as HdsFormToggleGroup } from './components/hds/form/toggle/group.gts';

// Icon
export { default as HdsIcon } from './components/hds/icon/index.gts';
export * from './components/hds/icon/types.ts';

// IconTile
export { default as HdsIconTile } from './components/hds/icon-tile/index.gts';
export * from './components/hds/icon-tile/types.ts';

// Link
export { default as HdsLinkInline } from './components/hds/link/inline.gts';
export { default as HdsLinkStandalone } from './components/hds/link/standalone.gts';
export * from './components/hds/link/types.ts';

// Modal
export { default as HdsModal } from './components/hds/modal/index.gts';
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
export { default as HdsReveal } from './components/hds/reveal/index.gts';
export { default as HdsRevealToggleButton } from './components/hds/reveal/toggle/button.gts';

// RichTooltip
export { default as HdsRichTooltip } from './components/hds/rich-tooltip/index.ts';
export { default as HdsRichTooltipBubble } from './components/hds/rich-tooltip/bubble.ts';
export { default as HdsRichTooltipToggle } from './components/hds/rich-tooltip/toggle.ts';
export * from './components/hds/rich-tooltip/types.ts';

// SegmentedGroup
export { default as HdsSegmentedGroup } from './components/hds/segmented-group/index.gts';

// Separator
export { default as HdsSeparator } from './components/hds/separator/index.gts';
export * from './components/hds/separator/types.ts';

// Stepper
export { default as HdsStepperList } from './components/hds/stepper/list/index.gts';
export { default as HdsStepperListStep } from './components/hds/stepper/list/step.gts';
export { default as HdsStepperNav } from './components/hds/stepper/nav/index.gts';
export { default as HdsStepperNavPanel } from './components/hds/stepper/nav/panel.gts';
export { default as HdsStepperNavStep } from './components/hds/stepper/nav/step.gts';
export { default as HdsStepperStepIndicator } from './components/hds/stepper/step/indicator.gts';
export { default as HdsStepperTaskIndicator } from './components/hds/stepper/task/indicator.gts';
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
export { default as HdsTag } from './components/hds/tag/index.gts';
export * from './components/hds/tag/types.ts';

// Text
export { default as HdsText } from './components/hds/text/index.gts';
export { default as HdsTextBody } from './components/hds/text/body.gts';
export { default as HdsTextCode } from './components/hds/text/code.gts';
export { default as HdsTextDisplay } from './components/hds/text/display.gts';
export * from './components/hds/text/types.ts';

// Time
export { default as HdsTime } from './components/hds/time/index.ts';
export { default as HdsTimeSingle } from './components/hds/time/single.ts';
export { default as HdsTimeRange } from './components/hds/time/range.ts';
export * from './services/hds-time-types.ts';

// Toast
export { default as HdsToast } from './components/hds/toast/index.gts';

// TooltipButton
export { default as HdsTooltipButton } from './components/hds/tooltip-button/index.gts';
export * from './components/hds/tooltip-button/types.ts';

// -----------------------------------------------------------
// ### LAYOUTS
// -----------------------------------------------------------

// AppFrame
export { default as HdsAppFrame } from './components/hds/app-frame/index.gts';
export { default as HdsAppFrameFooter } from './components/hds/app-frame/parts/footer.gts';
export { default as HdsAppFrameHeader } from './components/hds/app-frame/parts/header.gts';
export { default as HdsAppFrameMain } from './components/hds/app-frame/parts/main.gts';
export { default as HdsAppFrameModals } from './components/hds/app-frame/parts/modals.gts';
export { default as HdsAppFrameSidebar } from './components/hds/app-frame/parts/sidebar.gts';

// Layout > Flex
export { default as HdsLayoutFlex } from './components/hds/layout/flex/index.ts';
export { default as HdsLayoutFlexItem } from './components/hds/layout/flex/item.ts';
export * from './components/hds/layout/flex/types.ts';

// Layout > Grid
export { default as HdsLayoutGrid } from './components/hds/layout/grid/index.ts';
export { default as HdsLayoutGridItem } from './components/hds/layout/grid/item.ts';
// we're being explicit with exports here as AvailableTagNames and AvailableElements are overlapping the Flex exports
export {
  HdsLayoutGridAlignValues,
  HdsLayoutGridGapValues,
  type HdsLayoutGridAligns,
  type HdsLayoutGridGaps,
} from './components/hds/layout/grid/types.ts';

// -----------------------------------------------------------
// ### UTILITIES
// -----------------------------------------------------------

// DialogPrimitive
export { default as HdsDialogPrimitiveBody } from './components/hds/dialog-primitive/body.gts';
export { default as HdsDialogPrimitiveDescription } from './components/hds/dialog-primitive/description.gts';
export { default as HdsDialogPrimitiveFooter } from './components/hds/dialog-primitive/footer.gts';
export { default as HdsDialogPrimitiveHeader } from './components/hds/dialog-primitive/header.gts';
export { default as HdsDialogPrimitiveOverlay } from './components/hds/dialog-primitive/overlay.gts';
export { default as HdsDialogPrimitiveWrapper } from './components/hds/dialog-primitive/wrapper.gts';
export * from './components/hds/dialog-primitive/types.ts';

// DisclosurePrimitive
export { default as HdsDisclosurePrimitive } from './components/hds/disclosure-primitive/index.gts';

// DismissButton
export { default as HdsDismissButton } from './components/hds/dismiss-button/index.gts';

// Interactive
export { default as HdsInteractive } from './components/hds/interactive/index.gts';

// PopoverPrimitive
export { default as HdsPopoverPrimitive } from './components/hds/popover-primitive/index.gts';
