/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwOutliner from 'showcase/components/shw/outliner';

import {
  HdsBadge,
  HdsFormLegend,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionLegend: TemplateOnlyComponent = <template>
  <ShwTextH2>Legend</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormLegend>This is a simple legend</HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>&lt;LinkInline&gt;</code></SFI.Label>
      <HdsFormLegend>This is a legend
        <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>&lt;LinkInline&gt;</code>
        and
        <code>secondary</code>
        color</SFI.Label>
      <HdsFormLegend>This is a legend
        <HdsLinkInline @route="index" @color="secondary">with a secondary link</HdsLinkInline></HdsFormLegend>
    </SF.Item>
    <SF.Item @label="With required indicator">
      <HdsFormLegend @isRequired={{true}}>This is a simple legend</HdsFormLegend>
    </SF.Item>
    <SF.Item @label="With optional indicator">
      <HdsFormLegend @isOptional={{true}}>This is a simple legend</HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>)
      </SFI.Label>
      <HdsFormLegend>
        <div class="shw-component-form-base-elements-container-with-badge">This
          is the legend
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </div>
      </HdsFormLegend>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator
      </SFI.Label>
      <div class="shw-component-form-base-elements-container-with-badge">
        <HdsFormLegend @isRequired={{true}}>
          This is the legend
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLegend>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and optional indicator
      </SFI.Label>
      <div class="shw-component-form-base-elements-container-with-badge">
        <HdsFormLegend @isOptional={{true}}>
          This is the legend
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLegend>
      </div>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend>This is a very long legend text that should go on
          multiple lines</HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and required indicator"
    >
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend @isRequired={{true}}>This is a very long legend text that
          should go on multiple lines</HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and optional indicator"
    >
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend @isOptional={{true}}>This is a very long legend text that
          should go on multiple lines</HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With text that spans multiple lines, structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator
      </SFI.Label>
      <ShwOutliner
        class="shw-component-form-base-elements-container-with-badge"
        {{style max-width="250px"}}
      >
        <HdsFormLegend @isRequired={{true}}>
          This is a very long legend text that should go on multiple lines
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLegend>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionLegend;
