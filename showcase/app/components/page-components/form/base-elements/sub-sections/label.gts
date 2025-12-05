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
  HdsFormLabel,
} from '@hashicorp/design-system-components/components';

const SubSectionLabel: TemplateOnlyComponent = <template>
  <ShwTextH2>Label</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormLabel>This is a simple label</HdsFormLabel>
    </SF.Item>
    <SF.Item @label="With required indicator">
      <HdsFormLabel @isRequired={{true}}>This is the label</HdsFormLabel>
    </SF.Item>
    <SF.Item @label="With optional indicator">
      <HdsFormLabel @isOptional={{true}}>This is the label</HdsFormLabel>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>)</SFI.Label>
      <HdsFormLabel>
        <div class="shw-component-form-base-elements-container-with-badge">
          This is the label
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </div>
      </HdsFormLabel>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator</SFI.Label>
      <HdsFormLabel @isRequired={{true}}>
        <div class="shw-component-form-base-elements-container-with-badge">
          This is the label
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </div>
      </HdsFormLabel>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and optional indicator</SFI.Label>
      <HdsFormLabel @isOptional={{true}}>
        <ShwOutliner
          class="shw-component-form-base-elements-container-with-badge"
        >
          This is the label
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </ShwOutliner>
      </HdsFormLabel>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel>This is a very long label text that should go on multiple
          lines</HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and required indicator"
    >
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel @isRequired={{true}}>This is a very long label text that
          should go on multiple lines</HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="With text that spans multiple lines and optional indicator"
    >
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel @isOptional={{true}}>This is a very long label text that
          should go on multiple lines</HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With text that spans multiple lines, structured content (eg. a
        <code>flex</code>
        layout and a
        <code>&lt;Badge&gt;</code>) and required indicator
      </SFI.Label>
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormLabel @isRequired={{true}}>
          This is a very long label text that should go on multiple lines
          <HdsBadge @size="small" @text="Some badge" @color="highlight" />
        </HdsFormLabel>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionLabel;
