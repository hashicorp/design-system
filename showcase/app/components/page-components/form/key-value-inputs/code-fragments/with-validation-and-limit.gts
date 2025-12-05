/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { or } from 'ember-truth-helpers';
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

import type { HdsFormSignature } from '@hashicorp/design-system-components/components/hds/form/index';

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

const EMPTY_TAG_ITEM: TagItem = {
  id: 0,
  'tag-name': '',
  'tag-description': '',
};

const EMPTY_MODEL: FormModel = {
  'entity-name': { value: '' },
  'entity-description': { value: '' },
  'tags-list': { value: [structuredClone(EMPTY_TAG_ITEM)] },
};

export interface CodeFragmentWithValidationAndLimitSignature {
  Args: {
    collapseInstructions?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithValidationAndLimit extends Component<CodeFragmentWithValidationAndLimitSignature> {
  collapseInstructions = this.args.collapseInstructions ?? false;
  @tracked alwaysShowDeleteButtonOnFirstRow = false;

  // Some examples of how the key-value pattern is implemented in the consumers' codebases:
  // - https://github.com/hashicorp/cloud-ui/blob/main/engines/iam/addon/components/groups/form.gts
  // - https://github.com/hashicorp/cloud-ui/blob/main/engines/role-assignments/addon/components/page/create.gts
  @deepTracked model: FormModel = structuredClone(EMPTY_MODEL);

  formElement: HdsFormSignature['Element'] | null = null;
  setFormElementRef = modifier((element: HdsFormSignature['Element']) => {
    this.formElement = element;
  });

  onInputUpdateModel = (event: Event) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (target) {
      const field = target.name;
      if (field === 'entity-name' || field === 'entity-description') {
        this.model[field].value = target.value;
      } else {
        const match = field.match(/^(tag-name|tag-description)-(\d+)$/);
        if (match) {
          const key = match[1] as 'tag-name' | 'tag-description';
          const index = Number(match[2]);
          if (
            key &&
            index !== undefined &&
            this.model['tags-list'].value[index]
          ) {
            this.model['tags-list'].value[index][key] = target.value;
          }
        }
      }
    }
  };

  get canAddRow() {
    return this.model['tags-list'].value.length < 4;
  }

  onAddRowClick = () => {
    this.model['tags-list'].value.push({
      id: this.model['tags-list'].value.length + 1,
      'tag-name': '',
      'tag-description': '',
    });
  };

  get canDeleteRow() {
    if (this.model['tags-list'].value.length === 1) {
      const row = this.model['tags-list'].value[0];
      if (row) {
        return (
          row['tag-name'].trim() !== '' || row['tag-description'].trim() !== ''
        );
      }
    } else {
      return this.model['tags-list'].value.length > 1;
    }
  }

  onDeleteRowClick = (_rowData: unknown, rowIndex: number) => {
    if (rowIndex < 0 || rowIndex >= this.model['tags-list'].value.length) {
      console.error(
        'Trying to delete a row with index out of boundaries of the `@data` array',
      );
    } else if (rowIndex === 0 && this.model['tags-list'].value.length === 1) {
      this.model['tags-list'].value = [structuredClone(EMPTY_TAG_ITEM)];
    } else {
      // Remove the item at the specific index
      this.model['tags-list'].value.splice(rowIndex, 1);
    }
  };

  onSubmitButtonClick = () => {
    let isValid = true;

    // VALIDATION VIA DOM QUERIES

    const inputEntityNameElement = this.formElement?.querySelector(
      'input[name="entity-name"]',
    ) as HTMLInputElement;
    if (inputEntityNameElement && inputEntityNameElement.value.trim() === '') {
      this.model['entity-name'].validationMessage =
        'The {entity} name is required';
      isValid = false;
    } else {
      this.model['entity-name'].validationMessage = null;
    }

    const inputEntityDescriptionElement = this.formElement?.querySelector(
      'textarea[name="entity-description"]',
    ) as HTMLTextAreaElement;
    if (
      inputEntityDescriptionElement &&
      inputEntityDescriptionElement.value.length > 256
    ) {
      this.model['entity-description'].validationMessage =
        'The {entity} description is longer than allowed';
      isValid = false;
    } else {
      this.model['entity-description'].validationMessage = null;
    }

    // VALIDATION VIA MODEL

    if (this.model['tags-list'].value.length === 0) {
      this.model['tags-list'].validationMessage =
        'At least one tag needs to be assigned to the {entity}';
      isValid = false;
    } else {
      this.model['tags-list'].validationMessage = null;
      // count all the distinct tag names
      const tagNameCounts: Record<string, number> = {};
      this.model['tags-list'].value.forEach((row: TagItem) => {
        const tagName = row['tag-name'].trim();
        tagNameCounts[tagName] = (tagNameCounts[tagName] || 0) + 1;
      });
      // validate against empty tag names or duplicates
      this.model['tags-list'].value.forEach((row: TagItem) => {
        const tagName = row['tag-name'].trim();
        if (row['tag-name'].trim() === '') {
          // we use `set` for the nested property, to trigger a mutation on the tracked object
          row.validationMessage = 'The tag name is required';
          isValid = false;
        } else if (tagNameCounts[tagName] && tagNameCounts[tagName] > 1) {
          row.validationMessage = 'The tag name is duplicated';
          isValid = false;
        } else {
          row.validationMessage = null;
        }
      });
    }

    if (isValid) {
      window.alert('✅ Form submission succeeded!');
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
        <CodeFragmentWithDemoInstructions @demo="validation-and-limit" />
      </HdsReveal>
    {{else}}
      <CodeFragmentWithDemoInstructions @demo="validation-and-limit" />
    {{/if}}
    <div ...attributes>
      <HdsForm {{this.setFormElementRef}} as |FORM|>
        <FORM.Header as |FH|>
          <FH.Title>Create a new {entity}</FH.Title>
          <FH.Description>You can create a new {entity} by providing a name, an
            optional description, and a set of up to 4 different tags.</FH.Description>
        </FORM.Header>
        <FORM.Section>
          <HdsFormTextInputField
            @isRequired={{true}}
            @isInvalid={{if this.model.entity-name.validationMessage true}}
            name="entity-name"
            @value={{this.model.entity-name.value}}
            {{on "input" this.onInputUpdateModel}}
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
            @isInvalid={{if
              this.model.entity-description.validationMessage
              true
            }}
            name="entity-description"
            @value={{this.model.entity-description.value}}
            {{on "input" this.onInputUpdateModel}}
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
            @data={{this.model.tags-list.value}}
          >
            <:header as |H|>
              <H.Legend>List of associated tags</H.Legend>
              <H.HelperText>The tags associated with the {entity}. Each tag
                needs to be unique.</H.HelperText>
            </:header>

            <:row as |R|>
              <R.Field
                @isRequired={{true}}
                @isInvalid={{if R.rowData.validationMessage true}}
                as |F|
              >
                <F.Label>Tag name</F.Label>
                <F.TextInput
                  name="tag-name-{{R.rowIndex}}"
                  @value={{R.rowData.tag-name}}
                  {{on "input" this.onInputUpdateModel}}
                />
                {{#if R.rowData.validationMessage}}
                  <F.Error>{{R.rowData.validationMessage}}</F.Error>
                {{/if}}
              </R.Field>
              <R.Field @isOptional={{true}} as |F|>
                <F.Label>Tag description</F.Label>
                <F.TextInput
                  name="tag-description-{{R.rowIndex}}"
                  @value={{R.rowData.tag-description}}
                  {{on "input" this.onInputUpdateModel}}
                />
              </R.Field>
              {{#if
                (or this.alwaysShowDeleteButtonOnFirstRow this.canDeleteRow)
              }}
                <R.DeleteRowButton @onClick={{this.onDeleteRowClick}} />
              {{/if}}
            </:row>
            <:footer as |F|>
              {{#if this.canAddRow}}
                <F.AddRowButton
                  @text="Add tag"
                  @onClick={{this.onAddRowClick}}
                />
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
          <div
            {{style
              display="flex"
              align-items="center"
              justify-content="space-between"
            }}
          >
            <FF.ButtonSet>
              <HdsButton
                @text="Submit"
                {{on "click" this.onSubmitButtonClick}}
              />
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
