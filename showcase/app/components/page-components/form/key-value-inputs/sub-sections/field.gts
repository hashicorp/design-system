/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { fn } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const EMPTY_DATA = [] as unknown[];

const DEFAULT_DATA = [
  {
    id: 1,
    key: {
      text: 'enterprise',
    },
    value: {
      text: '',
    },
  },
  {
    id: 2,
    key: {
      text: 'prod',
    },
    value: {
      text: 'This is a production tag',
    },
  },
  {
    id: 3,
    key: {
      text: 'beta',
    },
    value: {
      text: 'Feature includes beta',
    },
  },
];

const CONTROLS = [
  'text-input',
  'textarea',
  'masked-input',
  'select',
  'superselect-single',
  'superselect-multiple',
  'file-input',
];

const CASES = ['default', 'required', 'optional', 'error'];

const SUPERSELECT_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

export default class SubSectionField extends Component {
  @tracked superSelectSelectedOption = SUPERSELECT_OPTIONS[0];
  @tracked superSelectSelectedOptions = [
    SUPERSELECT_OPTIONS[0],
    SUPERSELECT_OPTIONS[1],
  ];

  <template>
    <ShwTextH3>Field</ShwTextH3>

    <ShwTextH4>Input types</ShwTextH4>

    <ShwFlex @direction="column" as |SF|>
      {{#each CONTROLS as |control|}}
        <SF.Item @label={{control}}>
          <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
            <:row as |R|>
              {{#each CASES as |case|}}
                <R.Field
                  @isRequired={{if (eq case "required") true}}
                  @isOptional={{if (eq case "optional") true}}
                  as |F|
                >
                  <F.Label>This is the legend</F.Label>
                  <F.HelperText>
                    {{#if (eq case "default")}}
                      Base (default)
                    {{else if (eq case "required")}}
                      With 'required' indicator
                    {{else if (eq case "optional")}}
                      With 'optional' indicator
                    {{else if (eq case "error")}}
                      With error message
                    {{/if}}
                  </F.HelperText>
                  {{#if (eq control "text-input")}}
                    <F.TextInput />
                  {{else if (eq control "textarea")}}
                    <F.Textarea />
                  {{else if (eq control "masked-input")}}
                    <F.MaskedInput />
                  {{else if (eq control "select")}}
                    <F.Select>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </F.Select>
                  {{else if (eq control "superselect-single")}}
                    <F.SuperSelectSingle
                      @onChange={{fn (mut this.superSelectSelectedOption)}}
                      @options={{SUPERSELECT_OPTIONS}}
                      @selected={{this.superSelectSelectedOption}}
                      @ariaLabel="Label"
                      as |option|
                    >
                      {{option}}
                    </F.SuperSelectSingle>
                  {{else if (eq control "superselect-multiple")}}
                    <F.SuperSelectMultiple
                      @onChange={{fn (mut this.superSelectSelectedOptions)}}
                      @options={{SUPERSELECT_OPTIONS}}
                      @selected={{this.superSelectSelectedOptions}}
                      @ariaLabel="Label"
                      as |option|
                    >
                      {{option}}
                    </F.SuperSelectMultiple>
                  {{else if (eq control "file-input")}}
                    <F.FileInput />
                  {{/if}}
                  {{#if (eq case "error")}}
                    <F.Error>This is the error message.</F.Error>
                  {{/if}}
                </R.Field>
              {{/each}}
            </:row>
          </HdsFormKeyValueInputs>
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH4>Alignment with and without helper text</ShwTextH4>

    <HdsFormKeyValueInputs @data={{EMPTY_DATA}}>
      <:header as |H|>
        <H.Legend>This is the legend</H.Legend>
      </:header>

      <:row as |R|>
        <R.Field as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text.</F.HelperText>
          <F.TextInput @value="Sample text" />
        </R.Field>
        <R.Field as |F|>
          <F.Label>Textarea</F.Label>
          <F.Textarea @value="Sample text" />
        </R.Field>
        <R.Field as |F|>
          <F.HelperText>This is the helper text.</F.HelperText>
          <F.MaskedInput aria-label="Masked input" @value="Sample text" />
        </R.Field>
        <R.Field as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text.</F.HelperText>
          <F.HelperText>This is another helper text.</F.HelperText>
          <F.TextInput @value="Sample text" />
        </R.Field>
        <R.DeleteRowButton />
      </:row>
    </HdsFormKeyValueInputs>

    <ShwDivider @level={{2}} />

    <ShwTextH4>With custom input widths</ShwTextH4>

    <HdsFormKeyValueInputs @data={{DEFAULT_DATA}}>
      <:header as |H|>
        <H.Legend>This is the legend</H.Legend>
      </:header>

      <:row as |R|>
        <R.Field @width="100px" as |F|>
          <F.Label>Width=100px</F.Label>
          <F.HelperText>Helper text.</F.HelperText>
          <F.TextInput @value="Sample text" />
        </R.Field>
        <R.Field @width="400px" as |F|>
          <F.Label>Width=400px</F.Label>
          <F.HelperText>Helper text.</F.HelperText>
          <F.Textarea @value="Sample text" />
        </R.Field>
        <R.Field @width="max-content" as |F|>
          <F.Label>Width=max-content</F.Label>
          <F.HelperText>Helper text.</F.HelperText>
          <F.MaskedInput @value="Sample text" />
        </R.Field>
        <R.DeleteRowButton />
      </:row>
    </HdsFormKeyValueInputs>

    <ShwDivider @level={{2}} />

    <ShwTextH4>With very long text as content</ShwTextH4>

    <HdsFormKeyValueInputs @data={{DEFAULT_DATA}}>
      <:header as |H|>
        <H.Legend>Custom input widths and very long content</H.Legend>
      </:header>

      <:row as |R|>
        <R.Field as |F|>
          <F.Label>Text Input</F.Label>
          <F.HelperText>Sample text.</F.HelperText>
          <F.TextInput
            @value="This is the first line of text.
            This is the second line of text that should go on multiple lines"
          />
        </R.Field>
        <R.Field as |F|>
          <F.Label>Textarea</F.Label>
          <F.HelperText>Sample text.</F.HelperText>
          <F.Textarea
            @value="This is the first line of text. This is the second line of text that should go on multiple lines"
          />
        </R.Field>
        <R.Field as |F|>
          <F.Label>Masked Input</F.Label>
          <F.HelperText>Sample text.</F.HelperText>
          <F.MaskedInput
            @value="This is the first line of text.
            This is the second line of text that should go on multiple lines"
          />
        </R.Field>
        <R.DeleteRowButton />
      </:row>
    </HdsFormKeyValueInputs>

    <ShwDivider @level={{2}} />

    <ShwTextH4>With very long text and custom input widths</ShwTextH4>

    <HdsFormKeyValueInputs @data={{DEFAULT_DATA}}>
      <:header as |H|>
        <H.Legend>Custom input widths and very long content</H.Legend>
      </:header>

      <:row as |R|>
        <R.Field @width="100px" as |F|>
          <F.Label>Text Input (100px)</F.Label>
          <F.HelperText>Sample text.</F.HelperText>
          <F.TextInput
            @value="This is the first line of text.
            This is the second line of text that should go on multiple lines"
          />
        </R.Field>
        <R.Field @width="400px" as |F|>
          <F.Label>Textarea (400px)</F.Label>
          <F.HelperText>Sample text.</F.HelperText>
          <F.Textarea
            @value="This is the first line of text. This is the second line of text that should go on multiple lines"
          />
        </R.Field>
        <R.Field @width="max-content" as |F|>
          <F.Label>Masked Input (max-content)</F.Label>
          <F.HelperText>Sample text.</F.HelperText>
          <F.MaskedInput
            @value="This is the first line of text.
            This is the second line of text that should go on multiple lines"
          />
        </R.Field>
        <R.DeleteRowButton />
      </:row>
    </HdsFormKeyValueInputs>

    <ShwDivider />
  </template>
}
