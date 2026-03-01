/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

import ShwTextH2 from 'showcase/components/shw/text/h2';

const Index: TemplateOnlyComponent = <template>
  <div class="shw-landing-lists">
    <div>
      <ShwTextH2>Foundations</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-foundations.typography">
            Typography
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-foundations.elevation">
            Elevation
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-foundations.focus-ring">
            Focus ring
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-foundations.breakpoints">
            Breakpoints
          </LinkTo>
        </li>
      </ol>

      <ShwTextH2>Internationalization</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-internationalization.translation">
            Translation
          </LinkTo>
        </li>
      </ol>
    </div>

    <div>
      <ShwTextH2>Components</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-components.accordion">
            Accordion
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.advanced-table">
            AdvancedTable
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.alert">
            Alert
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.app-footer">
            AppFooter
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.app-header">
            AppHeader
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.app-side-nav">
            AppSideNav
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.application-state">
            Application State
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.badge">
            Badge
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.badge-count">
            BadgeCount
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.breadcrumb">
            Breadcrumb
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.button">
            Button
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.button-set">
            ButtonSet
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.card">
            Card
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.code-block">
            CodeBlock
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.code-editor">
            CodeEditor
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.composite">
            Composite
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.copy.button">
            Copy::Button
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.copy.snippet">
            Copy::Snippet
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.dropdown">
            Dropdown
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.filter-bar">
            FilterBar
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.flyout">
            Flyout
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.icon">
            Icon
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.icon-tile">
            IconTile
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.link.inline">
            Link::Inline
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.link.standalone">
            Link::Standalone
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.modal">
            Modal
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.page-header">
            PageHeader
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.pagination">
            Pagination
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.reveal">
            Reveal
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.rich-tooltip">
            RichTooltip
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.segmented-group">
            SegmentedGroup
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.separator">
            Separator
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.stepper.indicator">
            Stepper::Indicator
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.stepper.list">
            Stepper::List
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.stepper.nav">
            Stepper::Nav
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.table">
            Table
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.tabs">
            Tabs
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.tag">
            Tag
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.text">
            Text
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.time">
            Time
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.toast">
            Toast
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.tooltip">
            Tooltip
          </LinkTo>
        </li>
      </ol>
    </div>

    <div>
      <ShwTextH2>Form components</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-components.form.layout">
            Form / Layout
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.base-elements">
            Form / Base elements
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.checkbox">
            Form::Checkbox
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.file-input">
            Form::FileInput
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.key-value-inputs.index">
            Form::KeyValueInputs
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.masked-input">
            Form::MaskedInput
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.radio">
            Form::Radio
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.radio-card">
            Form::RadioCard
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.select">
            Form::Select
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.super-select">
            Form::SuperSelect
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.text-input">
            Form::TextInput
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.textarea">
            Form::Textarea
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-components.form.toggle">
            Form::Toggle
          </LinkTo>
        </li>
      </ol>

      <ShwTextH2>Layouts</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-layouts.app-frame">
            AppFrame
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-layouts.flex">
            Layout::Flex
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-layouts.grid">
            Layout::Grid
          </LinkTo>
        </li>
      </ol>
      <ShwTextH2>Overrides</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-overrides.power-select">
            PowerSelect
          </LinkTo>
        </li>
      </ol>

      <ShwTextH2>Utilities</ShwTextH2>
      <ol class="shw-text-body">
        <li>
          <LinkTo @route="page-utilities.dialog-primitive">
            DialogPrimitive
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-utilities.disclosure-primitive">
            DisclosurePrimitive
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-utilities.dismiss-button">
            DismissButton
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-utilities.interactive">
            Interactive
          </LinkTo>
        </li>
        <li>
          <LinkTo @route="page-utilities.popover-primitive">
            PopoverPrimitive
          </LinkTo>
        </li>
      </ol>
    </div>
  </div>
</template>;

export default Index;
