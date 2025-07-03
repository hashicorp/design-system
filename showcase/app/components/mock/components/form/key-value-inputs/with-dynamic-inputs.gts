/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { eq, or } from 'ember-truth-helpers';
import style from 'ember-style-modifier/modifiers/style';

// HDS components
import {
  HdsForm,
  HdsFormTextInputField,
  HdsFormTextareaField,
  HdsFormKeyValueInputs,
  HdsFormToggleField,
  HdsButton,
} from '@hashicorp/design-system-components/components';

// SHW components
// import ShwTextH1 from '../../../../shw/text/h1';
// import ShwTextH2 from '../../../../shw/text/h2';
import ShwTextH3 from '../../../../shw/text/h3';
import ShwTextH4 from '../../../../shw/text/h4';
// import ShwTextBody from '../../../../shw/text/body';
import ShwLabel from '../../../../shw/label';

// types
import type { HdsFormSignature } from '@hashicorp/design-system-components/components/hds/form/index';

export interface MockComponentsFormKeyValueInputsWithDynamicInputsSignature {
  Args: {
    showIntro?: boolean;
  };
}

interface KvpItem {
  id: number;
  key: string;
  value: string;
}

interface FormModel {
  'thing-name': string;
  'thing-description': string;
  'kvp-list': KvpItem[];
  validationMessage?: string | null;
}

const SUPERSELECT_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const SUPERSELECT_SELECTED_OPTION = SUPERSELECT_OPTIONS[0];

const EMPTY_KVP_ITEM: KvpItem = {
  id: 0,
  key: '',
  value: '',
};

const EMPTY_MODEL: FormModel = {
  'thing-name': '',
  'thing-description': '',
  'kvp-list': [structuredClone(EMPTY_KVP_ITEM)],
};

export default class MockComponentsFormKeyValueInputsWithDynamicInputs extends Component<MockComponentsFormKeyValueInputsWithDynamicInputsSignature> {
  showIntro = this.args.showIntro ?? true;
  @tracked alwaysShowDeleteButtonOnFirstRow = false;

  // https://github.com/hashicorp/cloud-ui/blob/main/engines/iam/addon/components/groups/form.gts
  // https://github.com/hashicorp/cloud-ui/blob/main/engines/role-assignments/addon/components/page/create.gts
  @deepTracked model: FormModel = structuredClone(EMPTY_MODEL);

  onDynamicInputChange = (event: Event) => {
    console.log('onDynamicInputChange invoked', event.target.value);
  };

  onInputUpdateModel = (event: Event) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (target) {
      const field = target.name;
      if (field === 'thing-name' || field === 'thing-description') {
        this.model[field] = target.value;
      } else {
        const match = field.match(/^(key|value)-(\d+)$/);
        if (match) {
          const key = match[1] as 'key' | 'value';
          const index = Number(match[2]);
          if (key && index !== undefined && this.model['kvp-list'][index]) {
            this.model['kvp-list'][index][key] = target.value;
          }
        }
      }
    }
  };

  onAddRowClick = () => {
    this.model['kvp-list'].push({
      id: this.model['kvp-list'].length + 1,
      key: '',
      value: '',
    });
  };

  get canDeleteRow() {
    return this.model['kvp-list'].length > 1;
  }

  onDeleteRowClick = (_rowData: unknown, rowIndex: number) => {
    if (rowIndex < 0 || rowIndex >= this.model['kvp-list'].length) {
      console.error(
        'Trying to delete a row with index out of boundaries of the `@data` array',
      );
    } else if (rowIndex === 0 && this.model['kvp-list'].length == 1) {
      this.model['kvp-list'] = [structuredClone(EMPTY_KVP_ITEM)];
    } else {
      // Remove the item at the specific index
      this.model['kvp-list'].splice(rowIndex, 1);
    }
  };

  onSubmitForm = (event: SubmitEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;

    // VALIDATION VIA MODEL

    let isValid = true;

    if (this.model['thing-name'].trim() === '') {
      this.model['validationMessage'] = 'The {thing} name is required';
      isValid = false;
    }

    if (isValid) {
      const data = new FormData(formElement);
      const dataObject = Object.fromEntries(data.entries());
      const dataJson = JSON.stringify(dataObject, null, 2);
      console.log('Form Data:', dataObject);
      window.alert(`✅ Form submission succeeded with data:\n\n${dataJson}`);
    }
  };

  onResetButtonClick = () => {
    this.model = structuredClone(EMPTY_MODEL);
  };

  onToggleAlwaysShowDeleteButtonClick = () => {
    this.alwaysShowDeleteButtonOnFirstRow =
      !this.alwaysShowDeleteButtonOnFirstRow;
  };

  // =====================================================

  <template>
    {{#if this.showIntro}}
      <ShwTextH3 @tag="h2">Example of
        <code>KeyValueInputs</code>
        within a
        <code>Form</code>, with dynamic inputs</ShwTextH3>
      <ShwTextH4 @tag="h3">Instructions</ShwTextH4>
      <ShwLabel {{style margin-bottom="32px"}}>
        You can use this example to test a few different things:
        <ul {{style line-height="1.5"}}>
          <li>TODO → Add instructions here</li>
        </ul>
      </ShwLabel>
    {{/if}}
    {{! We have added `novalidate` so we can handle validation ourselves }}
    <HdsForm id="add-thing-form" novalidate {{on "submit" this.onSubmitForm}} as |FORM|>
      <FORM.Header as |FH|>
        <FH.Title>Add a new {thing}</FH.Title>
        <FH.Description>You can create a new {thing} by providing a name, an
          optional description, and unlimited number of key-value pairs.</FH.Description>
      </FORM.Header>
      <FORM.Section>
        <HdsFormTextInputField
          @isRequired={{true}}
          @isInvalid={{if this.model.validationMessage true}}
          name="thing-name"
          @value={{this.model.thing-name}}
          {{on "input" this.onInputUpdateModel}}
          as |F|
        >
          <F.Label>Name</F.Label>
          <F.HelperText>Provide a name for the {thing} you want to create.</F.HelperText>
          {{#if this.model.validationMessage}}
            <F.Error>{{this.model.validationMessage}}</F.Error>
          {{/if}}
        </HdsFormTextInputField>
        <HdsFormTextareaField
          @isOptional={{true}}
          name="thing-description"
          @value={{this.model.thing-description}}
          {{on "input" this.onInputUpdateModel}}
          as |F|
        >
          <F.Label>Description</F.Label>
          <F.HelperText>A brief description of the {thing}</F.HelperText>
        </HdsFormTextareaField>
        <HdsFormKeyValueInputs @data={{this.model.kvp-list}}>
          <:header as |H|>
            <H.Legend>List of key-value pairs</H.Legend>
            <H.HelperText>The key-value pairs associated with the {thing}.</H.HelperText>
          </:header>

          <:row as |R|>
            <R.Field as |F|>
              <F.Label>Key</F.Label>
              <F.Select name="key-{{R.rowIndex}}" {{on "change" this.onDynamicInputChange}}>
                <option
                  value=""
                  {{! @glint-expect-error }}
                  selected={{if (eq R.rowData.key "") true}}
                ></option>
                <option
                  value="textinput"
                  {{! @glint-expect-error }}
                  selected={{if (eq R.rowData.key "textinput") true}}
                >Single line</option>
                <option
                  value="textarea"
                  {{! @glint-expect-error }}
                  selected={{if (eq R.rowData.key "textarea") true}}
                >Multiline</option>
                <option
                  value="select"
                  {{! @glint-expect-error }}
                  selected={{if (eq R.rowData.key "select") true}}
                >Tags</option>
              </F.Select>
            </R.Field>

            <R.Field as |F|>
              <F.Label>Value</F.Label>
              {{! @glint-expect-error }}
              {{#if (eq R.rowData.key "textarea")}}
                <F.Textarea
                  name="value-{{R.rowIndex}}"
                  {{! @glint-expect-error }}
                  @value={{R.rowData.value}}
                  {{on "input" this.onInputUpdateModel}}
                />
                {{! @glint-expect-error }}
              {{else if (eq R.rowData.key "select")}}
                <F.SuperSelectSingle
                  name="value-{{R.rowIndex}}"
                  @options={{SUPERSELECT_OPTIONS}}
                  @selected={{SUPERSELECT_SELECTED_OPTION}}
                  {{! @glint-expect-error }}
                  @value={{R.rowData.value}}
                  {{! TODO! }}
                  {{on "input" this.onInputUpdateModel}}
                  @onChange={{fn (mut SUPERSELECT_SELECTED_OPTION)}}
                  @ariaLabel="Label"
                  as |option|
                >
                  {{option}}
                </F.SuperSelectSingle>
              {{else}}
                <F.TextInput
                  name="value-{{R.rowIndex}}"
                  {{! @glint-expect-error }}
                  @value={{R.rowData.value}}
                  {{on "input" this.onInputUpdateModel}}
                />
              {{/if}}
            </R.Field>
            {{#if (or this.alwaysShowDeleteButtonOnFirstRow this.canDeleteRow)}}
              <R.DeleteRowButton @onClick={{this.onDeleteRowClick}} />
            {{/if}}
          </:row>
          <:footer as |F|>
            <F.AddRowButton @text="Add pair" @onClick={{this.onAddRowClick}} />
          </:footer>
        </HdsFormKeyValueInputs>
      </FORM.Section>
      <FORM.Footer as |FF|>
        <div
          {{style
            display="flex"
            align-items="center"
            justify-content="space-between"
          }}
        >
          <FF.ButtonSet>
            <HdsButton @text="Submit" type="submit" form="add-thing-form" />
            <HdsButton
              @text="Reset"
              @color="secondary"
              {{on "click" this.onResetButtonClick}}
            />
          </FF.ButtonSet>
          <HdsFormToggleField
            checked={{this.alwaysShowDeleteButtonOnFirstRow}}
            {{on "click" this.onToggleAlwaysShowDeleteButtonClick}}
            as |F|
          >
            <F.Label>Always show delete button on first row</F.Label>
          </HdsFormToggleField>
        </div>
      </FORM.Footer>
    </HdsForm>
  </template>
}
