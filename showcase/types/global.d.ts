/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Carbon Icons — no @types package available, declare as module wildcard
declare module '@carbon/icons/es/*';

// Carbon Web Components — custom element type declarations
// Covers all components in .ai/migration/helios-to-carbon-component-map.json
declare module '@glint/template/globals' {
  interface HTMLElementTagNameMap {
    // Hds::Button
    'cds-button': HTMLElement;
    // Hds::Link::Standalone, Hds::Link::Inline
    'cds-link': HTMLElement;
    // Hds::Icon
    'cds-icon': HTMLElement;
    // Hds::Badge
    'cds-tag': HTMLElement;
    // Hds::Alert
    'cds-inline-notification': HTMLElement;
    // Hds::AppHeader
    'cds-header': HTMLElement;
    // Hds::AppHeader::HomeLink
    'cds-header-name': HTMLElement;
    // Hds::AppSideNav
    'cds-side-nav': HTMLElement;
    // Hds::AppSideNavList
    'cds-side-nav-items': HTMLElement;
    // Hds::Dropdown
    'cds-overflow-menu': HTMLElement;
    // Hds::Form::TextInput::Field
    'cds-text-input': HTMLElement;
    // Hds::Form
    'cds-form': HTMLElement;
    // Hds::Accordion
    'cds-accordion': HTMLElement;
    'cds-accordion-item': HTMLElement;
    // Hds::Modal
    'cds-modal': HTMLElement;
  }
}
