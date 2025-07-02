/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { fn } from '@ember/helper';
import { set } from '@ember/object';
// import { tracked } from '@glimmer/tracking';
import { tracked, TrackedObject } from 'tracked-built-ins';
// import { eq } from 'ember-truth-helpers';
// import style from 'ember-style-modifier/modifiers/style';

// HDS components
import {
  HdsForm,
  HdsFormTextInputField,
  HdsFormTextareaField,
  HdsFormKeyValueInputs,
  HdsButton,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsFormSignature } from '@hashicorp/design-system-components/components/hds/form/index';

export interface MockComponentsFormKeyValueInputsWithValidationAndLimitSignature {
  Args: {
    showIntro?: boolean;
  };
}

interface TagItem {
  id: number;
  'tag-name': string;
  'tag-description': string;
  validationMessage?: string | null;
}

interface FormModel {
  'entity-name': {
    value: string;
    validationMessage?: string | null;
  };
  'entity-description': {
    value: string;
    validationMessage?: string | null;
  };
  'tags-list': {
    value: TagItem[];
    validationMessage?: string | null;
  };
}

const EMPTY_MODEL: FormModel = {
  'entity-name': { value: '' },
  'entity-description': { value: '' },
  'tags-list': { value: [] },
};

export default class MockComponentsFormKeyValueInputsWithValidationAndLimit extends Component<MockComponentsFormKeyValueInputsWithValidationAndLimitSignature> {
  showIntro = this.args.showIntro ?? true;
  // https://github.com/hashicorp/cloud-ui/blob/main/engines/iam/addon/components/groups/form.gts
  // https://github.com/hashicorp/cloud-ui/blob/main/engines/role-assignments/addon/components/page/create.gts
  @tracked model: FormModel = new TrackedObject({ ...EMPTY_MODEL });
  formElement: HdsFormSignature['Element'] | null = null;

  formElementRef = modifier((element: HdsFormSignature['Element']) => {
    this.formElement = element;
  });

  updateModel = (event: Event) => {
    console.log('updateModel invoked');
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (target) {
      const field = target.name;
      if (field === 'entity-name' || field === 'entity-description') {
        set(this.model, `${field}.value`, target.value);
      } else {
        console.log(target, field);
      }
    }
  };

  canDeleteRow = () => {
    return true;
  };

  canAddRow = () => {
    return this.model['tags-list'].value.length < 5;
  };

  onAddRowClick = () => {
    console.log('onAddRowClick invoked');
    const currTagsList = this.model['tags-list'].value;
    currTagsList.push({
      id: currTagsList.length + 1,
      'tag-name': '',
      'tag-description': '',
    });
    set(this.model, 'tags-list.value', currTagsList);
  };

  onDeleteRowClick = (item) => {
    console.log('onAddRowClick invoked');
    this.model['tags-list'].value = this.model['tags-list'].value.filter(
      (row) => row.id !== item.id,
    );
  };

  onSubmitButtonClick = () => {
    // console.log('onSubmitButtonClick invoked');
    let isValid = true;

    // VALIDATION VIA DOM STATUS

    const inputEntityNameElement = this.formElement?.querySelector(
      'input[name="entity-name"]',
    ) as HTMLInputElement;
    if (inputEntityNameElement && inputEntityNameElement.value.trim() === '') {
      // TODO not sure why `this.model['entity-name'].validationMessage =` doesn't work
      set(
        this.model,
        'entity-name.validationMessage',
        'The {entity} name is required',
      );
      isValid = false;
    } else {
      set(this.model, 'entity-name.validationMessage', null);
    }

    const inputEntityDescriptionElement = this.formElement?.querySelector(
      'textarea[name="entity-description"]',
    ) as HTMLTextAreaElement;
    if (
      inputEntityDescriptionElement &&
      inputEntityDescriptionElement.value.length > 256
    ) {
      // TODO not sure why `this.model['entity-name'].validationMessage =` doesn't work
      set(
        this.model,
        'entity-description.validationMessage',
        'The {entity} description is longer than allowed',
      );
      isValid = false;
    } else {
      set(this.model, 'entity-description.validationMessage', null);
    }

    // VALIDATION VIA MODEL

    if (this.model['tags-list'].value.length === 0) {
      set(
        this.model,
        'tags-list.validationMessage',
        'At least one tag needs to be assigned to the {entity}',
      );
      isValid = false;
    } else {
      set(this.model, 'tags-list.validationMessage', null);
    }

    if (isValid) {
      window.alert('Form submission succeeded!');
    }
  };

  onCancelButtonClick = () => {
    // this.formElement.reset();
    this.model = { ...EMPTY_MODEL };
  };

  <template>
    {{#if this.showIntro}}
      <pre>TODO add intro here</pre>
    {{/if}}
    <HdsForm {{this.formElementRef}} as |FORM|>
      <FORM.Header as |FH|>
        <FH.Title>Create a new {entity}</FH.Title>
        <FH.Description>You can create a new {entity} by providing a name, an
          optional description, and a set of up to 4 different tags.</FH.Description>
      </FORM.Header>
      <FORM.Section>
        <HdsFormTextInputField
          @isRequired={{true}}
          name="entity-name"
          @value={{this.model.entity-name.value}}
          {{on "input" this.updateModel}}
          as |F|
        >
          <F.Label>Name</F.Label>
          <F.HelperText>Provide a name for the {entity} you want to create.</F.HelperText>
          {{#if this.model.entity-name.validationMessage}}
            <F.Error>{{this.model.entity-name.validationMessage}}</F.Error>
          {{/if}}
        </HdsFormTextInputField>
        <HdsFormTextareaField
          @isOptional={{true}}
          name="entity-description"
          @value={{this.model.entity-description.value}}
          {{on "input" this.updateModel}}
          as |F|
        >
          <F.Label>Description</F.Label>
          <F.HelperText>A brief description of the {entity}, up to 256
            characters</F.HelperText>
          <F.CharacterCount @maxLength={{256}} />
          {{#if this.model.entity-description.validationMessage}}
            <F.Error
            >{{this.model.entity-description.validationMessage}}</F.Error>
          {{/if}}
        </HdsFormTextareaField>
        <HdsFormKeyValueInputs
          @isRequired={{true}}
          {{! this.model.tags-list.value }}
          @data={{this.model.tags-list.value}}
        >
          <:header as |H|>
            <H.Legend>List of associated tags</H.Legend>
            <H.HelperText>The tags associated with the {entity}. Each tag needs
              to be unique.</H.HelperText>
          </:header>

          <:row as |R|>
            <R.Field @isRequired={{true}} as |F|>
              <F.Label>Tag name</F.Label>
              <F.TextInput
                name="tag-name-{{R.rowIndex}}"
                @value={{R.rowData.tag-name}}
                {{on "input" this.updateModel}}
              />
              {{#if true}}
                <F.Error>TODO add here error message</F.Error>
              {{/if}}
            </R.Field>
            <R.Field @isOptional={{true}} as |F|>
              <F.Label>Tag description</F.Label>
              <F.TextInput
                name="tag-description-{{R.rowIndex}}"
                @value={{R.rowData.tag-description}}
                {{on "input" this.updateModel}}
              />
            </R.Field>
            {{#if (eq this.canDeleteRow true)}}
              <R.DeleteRowButton @onClick={{this.onDeleteRowClick}} />
            {{/if}}
          </:row>
          <:footer as |F|>
            <pre>this.canAddRow = {{this.canAddRow}}</pre>
            {{#if this.canAddRow}}
              <pre>this.canAddRow = {{this.canAddRow}}</pre>
              <F.AddRowButton @text="Add tag" @onClick={{this.onAddRowClick}} />
            {{else}}
              <F.Alert as |A|>
                <A.Description>
                  You can only add up to 4 tags to an {entity}.
                </A.Description>
              </F.Alert>
            {{/if}}
            {{#if this.model.tags-list.validationMessage}}
              <F.Error>{{this.model.tags-list.validationMessage}}</F.Error>
            {{/if}}
          </:footer>
        </HdsFormKeyValueInputs>
      </FORM.Section>
      <FORM.Footer as |FF|>
        <FF.ButtonSet>
          <HdsButton @text="Submit" {{on "click" this.onSubmitButtonClick}} />
          <HdsButton
            @text="Cancel"
            @color="secondary"
            {{on "click" this.onCancelButtonClick}}
          />
        </FF.ButtonSet>
      </FORM.Footer>
    </HdsForm>
  </template>
}
