/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { array, get, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { eq, notEq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';
import { deepTracked } from 'ember-deep-tracked';
import { tracked } from '@glimmer/tracking';

import MockApp from 'showcase/components/mock/app';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsButton,
  HdsForm,
  HdsFormFileInputField,
  HdsFormKeyValueInputs,
  HdsFormSelectField,
  HdsFormTextareaField,
  HdsFormTextInputField,
  HdsFormToggleField,
  HdsPageHeader,
  HdsStepperNav,
} from '@hashicorp/design-system-components/components';

type PluginBinaryData = {
  os: string;
  id: number;
};

const DEFAULT_DATA = [
  {
    os: 'darwin - arm64',
    id: 1,
  },
  {
    os: 'linux - 386',
    id: 2,
  },
  {
    os: 'windows - amd64',
    id: 3,
  },
];

export default class FramelessDemoInForm extends Component {
  @tracked sampleData = DEFAULT_DATA;
  @deepTracked formErrors: { pluginBinaryFile?: string }[] = [];

  onDeleteRowClick = (item: unknown) => {
    this.sampleData = this.sampleData.filter(
      (data) => data.id !== (item as PluginBinaryData).id,
    );
  };

  onAddRowClick = () => {
    this.sampleData = [
      ...this.sampleData,
      {
        os: '',
        id: this.sampleData.length + 1,
      },
    ];
  };

  onSubmitForm = (event: Event) => {
    event.preventDefault();

    const formElement = document.getElementById(
      'create-plugin-form',
    ) as HTMLFormElement;

    let hasErrors = false;

    const pluginFileInputs = formElement.querySelectorAll(
      'input[name="plugin-file"]',
    );
    pluginFileInputs.forEach((input, index) => {
      const inputHtmlElement = input as HTMLInputElement;

      if (inputHtmlElement.files?.length === 0) {
        this.formErrors[index] = {
          ...this.formErrors[index],
          pluginBinaryFile: 'File is required',
        };
        hasErrors = true;
      } else {
        this.formErrors[index] = {
          ...this.formErrors[index],
          pluginBinaryFile: undefined,
        };
      }
    });

    if (!hasErrors && formElement) {
      const data = new FormData(formElement);
      alert('Form submitted successfully');
      console.log('Form Data:', Object.fromEntries(data.entries()));
    }
  };

  <template>
    {{pageTitle "KeyValueInputs full form demo - Frameless"}}

    <MockApp>
      <:main>
        <div {{style margin-bottom="24px"}}>
          <HdsPageHeader as |PH|>
            <PH.Title>Create a Vault plugin</PH.Title>
            <PH.Breadcrumb>
              <HdsBreadcrumb>
                <HdsBreadcrumbItem @text="Level" />
                <HdsBreadcrumbItem @text="Level" />
                <HdsBreadcrumbItem @text="Registry" />
                <HdsBreadcrumbItem @text="Create a plugin" />
              </HdsBreadcrumb>
            </PH.Breadcrumb>
            <PH.IconTile @logo="vault" />
          </HdsPageHeader>
        </div>
        <HdsStepperNav
          @currentStep={{0}}
          @steps={{array
            (hash title="Details")
            (hash title="Support")
            (hash title="Vetting")
          }}
          @ariaLabel="Create a Vault plugin"
          {{style margin-top="48px"}}
        >
          <:body>
            <HdsForm
              id="create-plugin-form"
              {{on "submit" this.onSubmitForm}}
              as |FORM|
            >
              <FORM.Section>
                <FORM.SectionMultiFieldGroup>
                  <HdsFormTextInputField name="plugin-name" as |F|>
                    <F.Label>Plugin name</F.Label>
                    <F.HelperText>A short, descriptive, and easily discoverable
                      phrase</F.HelperText>
                  </HdsFormTextInputField>

                  <HdsFormSelectField @width="100%" name="plugin-type" as |F|>
                    <F.Label>Type of plugin</F.Label>
                    <F.HelperText>Type should match SDK choice</F.HelperText>
                    <F.Options>
                      <option>Authentication method</option>
                    </F.Options>
                  </HdsFormSelectField>
                </FORM.SectionMultiFieldGroup>
              </FORM.Section>

              <FORM.Section>
                <FORM.SectionMultiFieldGroup>
                  <HdsFormTextInputField name="plugin-version" as |F|>
                    <F.Label>Plugin version</F.Label>
                    <F.HelperText>Use semantic versioning: Major.Minor.Patch</F.HelperText>
                  </HdsFormTextInputField>

                  <HdsFormSelectField
                    @width="100%"
                    name="plugin-compatability"
                    as |F|
                  >
                    <F.Label>Vault compatability</F.Label>
                    <F.HelperText>The oldest compatible version of Vault</F.HelperText>
                    <F.Options>
                      <option>1.16.2</option>
                    </F.Options>
                  </HdsFormSelectField>
                </FORM.SectionMultiFieldGroup>
              </FORM.Section>

              <FORM.Section>

                <HdsFormToggleField
                  {{style margin-top="16px"}}
                  name="plugin-enterprise-only"
                  as |F|
                >
                  <F.Label>Enterprise only</F.Label>
                </HdsFormToggleField>

                <HdsFormTextareaField name="plugin-description" as |F|>
                  <F.Label>Description</F.Label>
                  <F.HelperText>A short summary of the capabilities of this
                    plugin</F.HelperText>
                  <F.CharacterCount>140 characters allowed</F.CharacterCount>
                </HdsFormTextareaField>

                <HdsFormKeyValueInputs
                  @data={{this.sampleData}}
                  @isOptional={{true}}
                  {{style margin-top="24px"}}
                >
                  <:header as |H|>
                    <H.Legend>Plugin binaries</H.Legend>
                    <H.HelperText>
                      A zipped binary file for each supported OS and
                      Architecture pair
                    </H.HelperText>
                  </:header>

                  <:row as |R|>
                    {{#if (notEq R.rowIndex undefined)}}
                      {{! @glint-expect-error - with the if statement above, we know R.rowIndex is defined }}
                      {{#let (get this.formErrors R.rowIndex) as |rowErrors|}}
                        <R.Field as |F|>
                          <F.Label>OS and architecture</F.Label>
                          <F.Select name="plugin-os">
                            <option></option>
                            <option
                              selected={{if
                                (eq "darwin - arm64" R.rowData.os)
                                true
                              }}
                            >darwin - arm64</option>
                            <option
                              selected={{if
                                (eq "linux - 386" R.rowData.os)
                                true
                              }}
                            >linux - 386</option>
                            <option
                              selected={{if
                                (eq "windows - amd64" R.rowData.os)
                                true
                              }}
                            >windows - amd64</option>
                          </F.Select>
                        </R.Field>

                        {{#let (get rowErrors "pluginFile") as |fileError|}}
                          <R.Field
                            @isInvalid={{(if (notEq fileError undefined) true)}}
                            as |F|
                          >
                            <F.Label>File</F.Label>
                            <F.FileInput name="plugin-file" />
                            {{#if (notEq fileError undefined)}}
                              <F.Error>
                                {{! @glint-expect-error - file error is unknown type for some reason }}
                                {{fileError}}
                              </F.Error>
                            {{/if}}
                          </R.Field>
                        {{/let}}
                        <R.DeleteRowButton @onClick={{this.onDeleteRowClick}} />
                      {{/let}}
                    {{/if}}
                  </:row>

                  <:footer as |F|>
                    <F.AddRowButton
                      @text="Add configuration"
                      @onClick={{this.onAddRowClick}}
                    />
                  </:footer>
                </HdsFormKeyValueInputs>

                <HdsFormFileInputField name="plugin-documentation" as |F|>
                  <F.Label>Plugin documentation</F.Label>
                  <F.HelperText>A one-page introductory guide. Accepted formats:
                    .xml, .html, .txt</F.HelperText>
                </HdsFormFileInputField>

              </FORM.Section>
              <FORM.Footer as |FF|>
                <FF.ButtonSet>
                  <HdsButton
                    @text="Submit"
                    type="submit"
                    form="create-plugin-form"
                  />
                  <HdsButton
                    @text="Cancel"
                    @color="secondary"
                    form="create-plugin-form"
                  />
                </FF.ButtonSet>
              </FORM.Footer>
            </HdsForm>
          </:body>
        </HdsStepperNav>
      </:main>
    </MockApp>
  </template>
}
