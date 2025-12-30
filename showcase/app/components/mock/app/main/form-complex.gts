/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import style from 'ember-style-modifier/modifiers/style';

import type Owner from '@ember/owner';

// HDS components
import {
  HdsButton,
  HdsButtonSet,
  HdsFormCheckboxGroup,
  HdsFormFileInputField,
  HdsFormMaskedInputField,
  HdsFormRadioGroup,
  HdsFormRadioCardGroup,
  HdsFormSelectField,
  HdsFormSuperSelectSingleField,
  HdsFormSuperSelectMultipleField,
  HdsFormTextInputField,
  HdsFormTextareaField,
  HdsFormToggleField,
  HdsLinkInline,
  HdsSeparator,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

const RADIOCARDS = [
  {
    value: '1',
    label: 'Radio card label 1',
    badge: 'Badge',
    checked: true,
    description: 'Radio card description 1',
    generic: 'Radio card custom content 1',
  },
  {
    value: '2',
    label: 'Radio card label 2',
    badge: 'Badge',
    description: 'Radio card description 2',
    generic: 'Radio card custom content 2',
  },
  {
    value: '3',
    label: 'Radio card label 3',
    badge: 'Badge',
    description: 'Radio card description 3',
    generic: 'Radio card custom content 3',
  },
];

const SUPERSELECT1_OPTIONS = [
  {
    size: 'Extra Small',
    description: '2 vCPU | 1 GiB RAM',
    price: '$0.02',
  },
  {
    size: 'Small',
    description: '2 vCPU | 2 GiB RAM',
    price: '$0.04',
    disabled: true,
  },
  {
    size: 'Medium',
    description: '4 vCPU | 4 GiB RAM',
    price: '$0.08',
    disabled: true,
  },
  { size: 'Large', description: '8 vCPU | 8 GiB RAM', price: '$0.16' },
  {
    size: 'Extra Large',
    description: '16 vCPU | 16 GiB RAM',
    price: '$0.32',
  },
];
const SELECTED_SUPERSELECT1_OPTION = SUPERSELECT1_OPTIONS[1];

const SUPERSELECT2_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const SELECTED_SUPERSELECT2_OPTIONS = [
  SUPERSELECT2_OPTIONS[0],
  SUPERSELECT2_OPTIONS[1],
];

const noop = () => {};

export interface MockAppMainFormComplexSignature {
  Args: {
    showAll?: boolean;
    showErrors?: boolean;
    showIntro?: boolean;
    showCheckbox?: boolean;
    showFileInput?: boolean;
    showMaskedInput?: boolean;
    showRadio?: boolean;
    showRadioCard?: boolean;
    showSelect?: boolean;
    showSuperSelect?: boolean;
    showTextarea?: boolean;
    showTextInput?: boolean;
    showToggle?: boolean;
    showButtons?: boolean;
  };
  Element: HTMLDivElement;
}

export default class MockAppMainFormComplex extends Component<MockAppMainFormComplexSignature> {
  _showIntro;
  _showCheckbox;
  _showFileInput;
  _showMaskedInput;
  _showRadio;
  _showRadioCard;
  _showSelect;
  _showSuperSelect;
  _showTextarea;
  _showTextInput;
  _showToggle;
  _showButtons;
  _showErrors;

  constructor(owner: Owner, args: MockAppMainFormComplexSignature['Args']) {
    super(owner, args);
    this._showIntro = this.args.showIntro ?? this.args.showAll ?? false;
    this._showCheckbox = this.args.showCheckbox ?? this.args.showAll ?? false;
    this._showFileInput = this.args.showFileInput ?? this.args.showAll ?? false;
    this._showMaskedInput =
      this.args.showMaskedInput ?? this.args.showAll ?? false;
    this._showRadio = this.args.showRadio ?? this.args.showAll ?? false;
    this._showRadioCard = this.args.showRadioCard ?? this.args.showAll ?? false;
    this._showSelect = this.args.showSelect ?? this.args.showAll ?? false;
    this._showSuperSelect =
      this.args.showSuperSelect ?? this.args.showAll ?? false;
    this._showTextarea = this.args.showTextarea ?? this.args.showAll ?? false;
    this._showToggle = this.args.showToggle ?? this.args.showAll ?? false;
    this._showErrors = this.args.showErrors ?? this.args.showAll ?? false;
    // we want at least something to be visible by default
    this._showTextInput = this.args.showTextInput ?? this.args.showAll ?? true;
    this._showButtons = this.args.showButtons ?? this.args.showAll ?? true;
  }

  <template>
    <div ...attributes>
      <form
        {{style
          display="flex"
          flex-direction="column"
          gap="16px"
          max-width="400px"
        }}
      >
        {{#if this._showIntro}}
          <HdsTextDisplay @tag="h4" @size="400">Lorem ipsum dolor sit amet</HdsTextDisplay>
          <HdsTextBody @tag="p" @size="200">Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Excepturi
            <HdsLinkInline @href="#" @color="primary">aperiam a molestias
              quisquam</HdsLinkInline>
            sapiente alias corporis sit aliquid similique esse illum at itaque
            ducimus, eligendi eos. Iure dolor eos
            <HdsLinkInline @href="#" @color="secondary">cumque autem placeat</HdsLinkInline></HdsTextBody>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showTextInput}}
          <HdsFormTextInputField @isRequired={{true}} @value="Lorem" as |F|>
            <F.Label>Text input</F.Label>
            <F.HelperText>Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.</F.HelperText>
          </HdsFormTextInputField>
          <HdsFormTextInputField
            @value=""
            @isInvalid={{this._showErrors}}
            as |F|
          >
            <F.Label>Another text input</F.Label>
            <F.HelperText>Reiciendis exercitationem quod deserunt inventore</F.HelperText>
            {{#if this._showErrors}}
              <F.Error>Excepturi aperiam a molestias</F.Error>
            {{/if}}
          </HdsFormTextInputField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showCheckbox}}
          <HdsFormCheckboxGroup
            @layout="horizontal"
            @name="control-horizontal-01"
            as |G|
          >
            <G.Legend>Checkbox group</G.Legend>
            <G.CheckboxField as |F|>
              <F.Label>Label of control #1</F.Label>
            </G.CheckboxField>
            <G.CheckboxField checked="checked" as |F|>
              <F.Label>Label of control #2</F.Label>
            </G.CheckboxField>
            <G.CheckboxField indeterminate={{true}} as |F|>
              <F.Label>Label of control #3</F.Label>
            </G.CheckboxField>
          </HdsFormCheckboxGroup>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showFileInput}}
          <HdsFormFileInputField as |F|>
            <F.Label>File input</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormFileInputField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showMaskedInput}}
          <HdsFormMaskedInputField
            @value="Masked input"
            @isInvalid={{this._showErrors}}
            as |F|
          >
            <F.Label>Masked input</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            {{#if this._showErrors}}
              <F.Error as |E|>
                <E.Message>First error message</E.Message>
                <E.Message>Second error message</E.Message>
              </F.Error>
            {{/if}}
          </HdsFormMaskedInputField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showRadio}}
          <HdsFormRadioGroup @name="control-vertical-03" as |G|>
            <G.Legend>Radio group</G.Legend>
            <G.RadioField as |F|>
              <F.Label>Label of control #1</F.Label>
              <F.HelperText>Helper text for control #1</F.HelperText>
            </G.RadioField>
            <G.RadioField checked="checked" as |F|>
              <F.Label>Label of control #2</F.Label>
              <F.HelperText>Helper text for control #2</F.HelperText>
            </G.RadioField>
            <G.RadioField as |F|>
              <F.Label>Label of control #3</F.Label>
              <F.HelperText>Helper text for control #3</F.HelperText>
            </G.RadioField>
          </HdsFormRadioGroup>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showRadioCard}}
          <HdsFormRadioCardGroup
            @name="radio-card-default"
            @controlPosition="left"
            @layout="vertical"
            as |G|
          >
            <G.Legend>Radio cards</G.Legend>
            {{#each RADIOCARDS as |item|}}
              <G.RadioCard
                @checked={{item.checked}}
                @value={{item.value}}
                as |R|
              >
                <R.Icon @name="hexagon" />
                <R.Label>{{item.label}}</R.Label>
                <R.Badge @text={{item.badge}} />
                <R.Description>{{item.description}}</R.Description>
              </G.RadioCard>
            {{/each}}
          </HdsFormRadioCardGroup>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showSelect}}
          <HdsFormSelectField as |F|>
            <F.Label>Select</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Options>
              <option selected>Lorem ipsum dolor</option>
              <option>Sine qua non est</option>
            </F.Options>
          </HdsFormSelectField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showSuperSelect}}
          <HdsFormSuperSelectSingleField
            @options={{SUPERSELECT1_OPTIONS}}
            @selected={{SELECTED_SUPERSELECT1_OPTION}}
            @onChange={{noop}}
            @verticalPosition="below"
            as |F|
          >
            <F.Label>SuperSelect #1</F.Label>
            <F.Options>
              {{#let F.options as |option|}}
                <div class="shw-component-form-super-select-option-rich-header">
                  {{! @glint-ignore }}
                  <strong>{{option.size}}</strong>
                  {{! @glint-ignore }}
                  <strong>{{option.price}}</strong>
                </div>
                {{! @glint-ignore }}
                <div>{{option.description}}</div>
              {{/let}}
            </F.Options>
          </HdsFormSuperSelectSingleField>
          <HdsFormSuperSelectMultipleField
            @options={{SUPERSELECT2_OPTIONS}}
            @selected={{SELECTED_SUPERSELECT2_OPTIONS}}
            @onChange={{noop}}
            @verticalPosition="below"
            @isOptional={{true}}
            as |F|
          >
            <F.Label>SuperSelect #2</F.Label>
            {{! @glint-ignore }}
            {{F.options}}
          </HdsFormSuperSelectMultipleField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showTextarea}}
          <HdsFormTextareaField
            @value="Ut enim ad minim veniam, quis nostrud exercitation ullamco"
            as |F|
          >
            <F.Label>Textarea</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormTextareaField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showToggle}}
          <HdsFormToggleField checked="checked" as |F|>
            <F.Label>Toggle</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormToggleField>
          <HdsSeparator @spacing="0" />
        {{/if}}

        {{#if this._showButtons}}
          <HdsButtonSet>
            <HdsButton type="submit" @text="Submit" />
            <HdsButton @color="secondary" @text="Cancel" />
          </HdsButtonSet>
        {{/if}}
      </form>

    </div>
  </template>
}
