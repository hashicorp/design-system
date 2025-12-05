/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { eq, or } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import CodeFragmentWithDemoInstructions from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-demo-instructions';

import {
  HdsForm,
  HdsFormTextInputField,
  HdsFormTextareaField,
  HdsFormKeyValueInputs,
  HdsFormToggleField,
  HdsButton,
  HdsReveal,
} from '@hashicorp/design-system-components/components';

import type { PowerSelectSignature } from 'ember-power-select/components/power-select';

interface KvpItem {
  id: number;
  key: string;
  value: string | string[];
}

interface FormModel {
  'thing-name': string;
  'thing-description': string;
  'kvp-list': KvpItem[];
  validationMessage?: string | null;
}

const SUPERSELECT_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

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

export interface CodeFragmentWithDynamicInputsSignature {
  Args: {
    collapseInstructions?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithDynamicInputs extends Component<CodeFragmentWithDynamicInputsSignature> {
  collapseInstructions = this.args.collapseInstructions ?? false;
  @tracked alwaysShowDeleteButtonOnFirstRow = false;

  // Some examples of how the key-value pattern is implemented in the consumers' codebases:
  // - https://github.com/hashicorp/cloud-ui/blob/main/engines/iam/addon/components/groups/form.gts
  // - https://github.com/hashicorp/cloud-ui/blob/main/engines/role-assignments/addon/components/page/create.gts
  @deepTracked model: FormModel = structuredClone(EMPTY_MODEL);

  // we use the same function on all the different kind of inputs
  // except the SuperSelect, which returns a special set of arguments
  // see callback `onPowerSelectChangeUpdateModel` below
  onInputUpdateModel = (event: Event) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
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
            if (key === 'key') {
              // we reset the `value` field when the `key` is changed (via select)
              if (this.model['kvp-list'][index]['key'] === 'select') {
                this.model['kvp-list'][index]['value'] = [];
              } else {
                this.model['kvp-list'][index]['value'] = '';
              }
            }
          }
        }
      }
    }
  };

  onPowerSelectChangeUpdateModel: PowerSelectSignature['Args']['onChange'] = (
    selection: string,
    select,
  ) => {
    // Unfortunately PowerSelect doesn't provide access to the "input" element via its APIs
    // so we have to use a bit of DOM querying and rely on data attributes to get the name of the field
    const triggerElement = document.querySelector(
      `[data-ebd-id="${select.uniqueId}-trigger"]`,
    );
    const triggerName = triggerElement?.getAttribute('name');

    if (triggerName) {
      const match = triggerName.match(/^value-(\d+)$/);
      if (match) {
        const index = Number(match[1]);
        if (index !== undefined && this.model['kvp-list'][index]) {
          this.model['kvp-list'][index]['value'] = selection;
        }
      }
    } else {
      console.error(
        'Could not retrive `name` attribute of PowerSelect trigger instance',
      );
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
    if (this.model['kvp-list'].length === 1) {
      const row = this.model['kvp-list'][0];
      if (row) {
        const rowValue = row['value'];
        if (Array.isArray(rowValue)) {
          return rowValue.length > 0;
        } else {
          return rowValue.trim() !== '';
        }
      }
    } else {
      return this.model['kvp-list'].length > 1;
    }
  }

  onDeleteRowClick = (_rowData: unknown, rowIndex: number) => {
    if (rowIndex < 0 || rowIndex >= this.model['kvp-list'].length) {
      console.error(
        'Trying to delete a row with index out of boundaries of the `@data` array',
      );
    } else if (rowIndex === 0 && this.model['kvp-list'].length === 1) {
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
    } else {
      this.model['validationMessage'] = null;
    }

    if (isValid) {
      const data = new FormData(formElement);
      const dataObject = Object.fromEntries(data.entries());
      const dataJson = JSON.stringify(dataObject, null, 2);
      const modelJson = JSON.stringify(this.model, null, 2);
      window.alert(
        `✅ Form submission succeeded with data:\n\nFORM DATA:\n${dataJson}\n\nMODEL:\n${modelJson}`,
      );
    }
  };

  onResetButtonClick = () => {
    this.model = structuredClone(EMPTY_MODEL);
  };

  onToggleAlwaysShowDeleteButtonClick = () => {
    this.alwaysShowDeleteButtonOnFirstRow =
      !this.alwaysShowDeleteButtonOnFirstRow;
  };

  <template>
    {{#if this.collapseInstructions}}
      <HdsReveal
        @text="Show instructions"
        @textWhenOpen="Hide instructions"
        {{style margin="24px 0"}}
      >
        <CodeFragmentWithDemoInstructions />
      </HdsReveal>
    {{else}}
      <CodeFragmentWithDemoInstructions />
    {{/if}}
    <div ...attributes>
      <HdsForm
        id="add-thing-form"
        {{! we have added 'novalidate' so we can handle validation ourselves }}
        novalidate
        {{on "submit" this.onSubmitForm}}
        as |FORM|
      >
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
                <F.Select
                  name="key-{{R.rowIndex}}"
                  {{on "change" this.onInputUpdateModel}}
                >
                  <option
                    value=""
                    selected={{if (eq R.rowData.key "") true}}
                  ></option>
                  <option
                    value="textinput"
                    selected={{if (eq R.rowData.key "textinput") true}}
                  >Single line</option>
                  <option
                    value="textarea"
                    selected={{if (eq R.rowData.key "textarea") true}}
                  >Multiline</option>
                  <option
                    value="maskedinput"
                    selected={{if (eq R.rowData.key "maskedinput") true}}
                  >Masked text</option>
                  <option
                    value="select"
                    selected={{if (eq R.rowData.key "select") true}}
                  >Select from list</option>
                </F.Select>
              </R.Field>

              <R.Field as |F|>
                <F.Label>Value</F.Label>
                {{#if (eq R.rowData.key "textarea")}}
                  <F.Textarea
                    name="value-{{R.rowIndex}}"
                    {{! @glint-expect-error }}
                    @value={{R.rowData.value}}
                    {{on "input" this.onInputUpdateModel}}
                  />
                {{else if (eq R.rowData.key "maskedinput")}}
                  <F.MaskedInput
                    name="value-{{R.rowIndex}}"
                    {{! @glint-expect-error }}
                    @value={{R.rowData.value}}
                    {{on "input" this.onInputUpdateModel}}
                  />
                {{else if (eq R.rowData.key "select")}}
                  <F.SuperSelectMultiple
                    name="value-{{R.rowIndex}}"
                    @options={{SUPERSELECT_OPTIONS}}
                    @selected={{R.rowData.value}}
                    @onChange={{this.onPowerSelectChangeUpdateModel}}
                    @ariaLabel="Label"
                    as |option|
                  >
                    {{option}}
                  </F.SuperSelectMultiple>
                {{else}}
                  <F.TextInput
                    name="value-{{R.rowIndex}}"
                    {{! @glint-expect-error }}
                    @value={{R.rowData.value}}
                    {{on "input" this.onInputUpdateModel}}
                  />
                {{/if}}
              </R.Field>
              {{#if
                (or this.alwaysShowDeleteButtonOnFirstRow this.canDeleteRow)
              }}
                <R.DeleteRowButton @onClick={{this.onDeleteRowClick}} />
              {{/if}}
            </:row>
            <:footer as |F|>
              <F.AddRowButton
                @text="Add pair"
                @onClick={{this.onAddRowClick}}
              />
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
    </div>
  </template>
}
