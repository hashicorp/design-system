/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import CodeFragmentWithMultipleFieldElement from 'showcase/components/page-components/form/super-select/code-fragments/with-multiple-field-element';

import {
  HdsLayoutFlex,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionMultipleFieldElement: TemplateOnlyComponent = <template>
  <ShwTextH2>FormSuperSelectMultipleField</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <CodeFragmentWithMultipleFieldElement @isSelected={{true}} as |CF|>
        <CF.Label>Lorem ipsum dolor</CF.Label>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <CodeFragmentWithMultipleFieldElement @isSelected={{true}} as |CF|>
        <CF.Label>This is the label</CF.Label>
        <CF.HelperText>This is the helper text</CF.HelperText>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <CodeFragmentWithMultipleFieldElement @isSelected={{true}} as |CF|>
        <CF.Label>This is the label</CF.Label>
        <CF.HelperText>
          This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline>
        </CF.HelperText>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <CodeFragmentWithMultipleFieldElement
        @isSelected={{true}}
        @isInvalid={{true}}
        as |CF|
      >
        <CF.Label>This is the label</CF.Label>
        <CF.Error>This is the error</CF.Error>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <CodeFragmentWithMultipleFieldElement
        @isSelected={{true}}
        @isInvalid={{true}}
        as |CF|
      >
        <CF.Label>This is the label</CF.Label>
        <CF.HelperText>This is the helper text</CF.HelperText>
        <CF.Error>This is the error</CF.Error>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
      <CodeFragmentWithMultipleFieldElement
        @isSelected={{true}}
        @isInvalid={{true}}
        as |CF|
      >
        <CF.Label>This is the label</CF.Label>
        <CF.HelperText>This is the helper text</CF.HelperText>
        <CF.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </CF.Error>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="With legend + Required">
      <CodeFragmentWithMultipleFieldElement
        @isSelected={{true}}
        @isRequired={{true}}
        as |CF|
      >
        <CF.Label>Lorem ipsum dolor</CF.Label>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
    <SG.Item @label="With legend + Optional">
      <CodeFragmentWithMultipleFieldElement
        @isSelected={{true}}
        @isOptional={{true}}
        as |CF|
      >
        <CF.Label>Lorem ipsum dolor</CF.Label>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Disabled">
      <CodeFragmentWithMultipleFieldElement
        @isSelected={{true}}
        @disabled={{true}}
        as |CF|
      >
        <CF.Label>Lorem ipsum dolor</CF.Label>
        <CF.HelperText>This is the helper text</CF.HelperText>
      </CodeFragmentWithMultipleFieldElement>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Complex content</ShwTextH3>

  <ShwFlex {{style padding-bottom="15em"}} @direction="row" as |SF|>
    <SF.Item {{style flex="1"}} @label="Rich content w/o custom selectedItems">
      <CodeFragmentWithMultipleFieldElement
        @options="cluster-size"
        @isSelected={{true}}
        @hasRichContent={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        as |CF|
      >
        <CF.Label>Label</CF.Label>
        <CF.Options>
          {{#let CF.options as |option|}}
            <HdsLayoutFlex @justify="space-between" @align="center">
              {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
              <strong>{{option.size}}</strong>
              {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
              <strong>{{option.price}}/hr</strong>
            </HdsLayoutFlex>
            {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
            <div>{{option.description}}</div>
          {{/let}}
        </CF.Options>
      </CodeFragmentWithMultipleFieldElement>
    </SF.Item>
    <SF.Item {{style flex="1"}} @label="Rich content with custom selectedItems">
      <CodeFragmentWithMultipleFieldElement
        @options="cluster-size"
        @isSelected={{true}}
        @hasRichContent={{true}}
        @hasSelectedItemComponent={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        as |CF|
      >
        <CF.Label>Label</CF.Label>
        <CF.Options>
          {{#let CF.options as |option|}}
            <HdsLayoutFlex @justify="space-between" @align="center">
              {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
              <strong>{{option.size}}</strong>
              {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
              <strong>{{option.price}}/hr</strong>
            </HdsLayoutFlex>
            {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
            <div>{{option.description}}</div>
          {{/let}}
        </CF.Options>
      </CodeFragmentWithMultipleFieldElement>
    </SF.Item>
    <SF.Item {{style flex="1"}} @label="Grouped options">
      <CodeFragmentWithMultipleFieldElement
        @options="grouped"
        @isSelected={{true}}
        @initiallyOpened={{true}}
        @verticalPosition="below"
        as |CF|
      >
        <CF.Label>Label</CF.Label>
        <CF.Options>
          {{! @glint-expect-error - https://hashicorp.atlassian.net/browse/HDS-5090 }}
          {{CF.options}}
        </CF.Options>
      </CodeFragmentWithMultipleFieldElement>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionMultipleFieldElement;
