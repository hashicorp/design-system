/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsAlert,
  HdsButton,
  HdsButtonSet,
  HdsForm,
  HdsFormHeader,
  HdsFormHeaderTitle,
  HdsFormSection,
  HdsFormSectionHeader,
  HdsFormSelectField,
  HdsFormSeparator,
  HdsFormTextInputField,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';
import { SIZES as DISPLAY_AVAILABLE_SIZES } from '@hashicorp/design-system-components/components/hds/text/display';
import { DEFAULT_SIZE as FORM_HEADER_TITLE_DEFAULT_SIZE } from '@hashicorp/design-system-components/components/hds/form/header/title';

interface SubSectionComponentsSignature {
  Args: {
    toggleHighlight: () => void;
    showHighlight: boolean;
  };
}

const SubSectionComponents: TemplateOnlyComponent<SubSectionComponentsSignature> =
  <template>
    <ShwTextH2>Components</ShwTextH2>

    <ShwTextH3>Form</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>width</ShwTextH4>

    <ShwFlex
      @direction="column"
      @gap="2rem"
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements-and-placeholders'
        }}"
      as |SF|
    >
      {{#let (array undefined "32em" "100%" "none") as |sectionMaxWidths|}}
        {{#each sectionMaxWidths as |sectionMaxWidth|}}
          <SF.Item @label="" as |SFI|>
            <SFI.Label>
              {{#if sectionMaxWidth}}
                sectionMaxWidth={{sectionMaxWidth}}
              {{else}}
                default widths
              {{/if}}
            </SFI.Label>
            <HdsForm @sectionMaxWidth={{sectionMaxWidth}} as |FORM|>
              <FORM.Header>
                <ShwPlaceholder
                  @height="36px"
                  @text="Header"
                  @background="#e4c5f3"
                />
              </FORM.Header>
              <FORM.Section>
                <ShwPlaceholder
                  @height="36px"
                  @text="Section"
                  @background="#add8e6"
                />
              </FORM.Section>
              <FORM.Separator />
              <FORM.Section @isFullWidth={{true}}>
                <ShwPlaceholder
                  @height="36px"
                  @text="Section / Full width"
                  @background="#add8e6"
                />
              </FORM.Section>
              <FORM.Separator @isFullWidth={{true}} />
            </HdsForm>
          </SF.Item>
        {{/each}}
      {{/let}}
    </ShwFlex>

    <ShwTextH4>tag</ShwTextH4>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements-and-placeholders'
        }}"
    >
      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        <SG.Item @label="Form using default form tag">
          <HdsForm>
            <ShwPlaceholder @height="50px" @text="Form" />
          </HdsForm>
        </SG.Item>

        <SG.Item @label="Form using div tag">
          <HdsForm @tag="div">
            <ShwPlaceholder @height="50px" @text="Form" />
          </HdsForm>
        </SG.Item>
      </ShwGrid>
    </div>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Header w/ Title &amp; Description</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>width</ShwTextH4>

    <ShwFlex
      @direction="column"
      @gap="2rem"
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements-and-placeholders'
        }}"
      as |SF|
    >
      <SF.Item @label="isFullWidth=false (default)">
        <HdsForm as |FORM|>
          <FORM.Header>
            <ShwPlaceholder @height="2.4em" @text="HeaderTitle" />
            <ShwPlaceholder @height="2.4em" @text="HeaderDescription" />
          </FORM.Header>
        </HdsForm>
      </SF.Item>

      <SF.Item @label="inherited sectionMaxWidth=32em set on Form parent">
        <HdsForm @sectionMaxWidth="32em" as |FORM|>
          <FORM.Header>
            <ShwPlaceholder @height="2.4em" @text="HeaderTitle" />
            <ShwPlaceholder @height="2.4em" @text="HeaderDescription" />
          </FORM.Header>
        </HdsForm>
      </SF.Item>

      <SF.Item @label="isFullWidth=true">
        <HdsForm as |FORM|>
          <FORM.Header @isFullWidth={{true}}>
            <ShwPlaceholder @height="2.4em" @text="HeaderTitle" />
            <ShwPlaceholder @height="2.4em" @text="HeaderDescription" />
          </FORM.Header>
        </HdsForm>
      </SF.Item>
    </ShwFlex>

    <ShwTextH4>content</ShwTextH4>

    <ShwFlex
      @direction="column"
      @gap="1.4rem"
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
      as |SF|
    >
      <SF.Item as |SFI|>
        <SFI.Label>content yielded via <code>FORM</code></SFI.Label>
        <HdsForm as |FORM|>
          <FORM.Header>
            <FORM.HeaderTitle>Section header title</FORM.HeaderTitle>
            <FORM.HeaderDescription>
              Section Header description—lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quasi eum neque totam vel facere itaque
              necessitatibus quisquam omnis deserunt! Dicta, explicabo quia quis
              odio nesciunt quibusdam dolor obcaecati consequatur tenetur.
            </FORM.HeaderDescription>
          </FORM.Header>
        </HdsForm>
      </SF.Item>
      <SF.Item as |SFI|>
        <SFI.Label>content yielded via <code>FORM_SECTION</code></SFI.Label>
        <HdsForm>
          <HdsFormHeader as |FORM_HEADER|>
            <FORM_HEADER.Title>Section header title</FORM_HEADER.Title>
            <FORM_HEADER.Description>
              Section Header description—lorem ipsum dolor sit amet consectetur
              adipisicing elit. Quasi eum neque totam vel facere itaque
              necessitatibus quisquam omnis deserunt! Dicta, explicabo quia quis
              odio nesciunt quibusdam dolor obcaecati consequatur tenetur.
            </FORM_HEADER.Description>
          </HdsFormHeader>
        </HdsForm>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH4>HeaderTitle sizes</ShwTextH4>

    <ShwGrid @columns={{1}} @gap="1.4rem" as |SG|>
      {{#each DISPLAY_AVAILABLE_SIZES as |size|}}
        <SG.Item
          @label="size={{size}} {{if
            (eq size FORM_HEADER_TITLE_DEFAULT_SIZE)
            '(default)'
          }}"
        >
          <HdsFormHeaderTitle @size={{size}}>
            Form Header Title w/ size of ({{size}})
          </HdsFormHeaderTitle>
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Section</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>width</ShwTextH4>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements-and-placeholders'
        }}"
    >
      <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
        <SG.Item @label="isFullWidth=false (default)">
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionHeader>
                <ShwPlaceholder @height="2.4em" @text="SectionHeaderTitle" />
                <ShwPlaceholder
                  @height="2.4em"
                  @text="SectionHeaderDescription"
                />
              </FORM.SectionHeader>
              <ShwPlaceholder @height="2.4em" @text="FormField" />
              <ShwPlaceholder @height="2.4em" @text="FormField" />
              <ShwPlaceholder @height="2.4em" @text="FormField" />
            </FORM.Section>
          </HdsForm>
        </SG.Item>

        <SG.Item @label="inherited sectionMaxWidth=32em set on Form parent">
          <HdsForm @sectionMaxWidth="32em" as |FORM|>
            <FORM.Section>
              <FORM.SectionHeader>
                <ShwPlaceholder @height="2.4em" @text="SectionHeaderTitle" />
                <ShwPlaceholder
                  @height="2.4em"
                  @text="SectionHeaderDescription"
                />
              </FORM.SectionHeader>
              <ShwPlaceholder @height="2.4em" @text="FormField" />
              <ShwPlaceholder @height="2.4em" @text="FormField" />
              <ShwPlaceholder @height="2.4em" @text="FormField" />
            </FORM.Section>
          </HdsForm>
        </SG.Item>

        <SG.Item @label="isFullWidth=true">
          <HdsForm as |FORM|>
            <FORM.Section @isFullWidth={{true}}>
              <FORM.SectionHeader>
                <ShwPlaceholder @height="2.4em" @text="SectionHeaderTitle" />
                <ShwPlaceholder
                  @height="2.4em"
                  @text="SectionHeaderDescription"
                />
              </FORM.SectionHeader>
              <ShwPlaceholder @height="2.4em" @text="FormField" />
              <ShwPlaceholder @height="2.4em" @text="FormField" />
              <ShwPlaceholder @height="2.4em" @text="FormField" />
            </FORM.Section>
          </HdsForm>
        </SG.Item>
      </ShwGrid>
    </div>

    <ShwDivider @level={{2}} />

    <ShwTextH3>SectionHeader w/ Title &amp; Description</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>content</ShwTextH4>

    <ShwFlex
      @direction="column"
      @gap="1.4rem"
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
      as |SF|
    >
      <SF.Item as |SFI|>
        <SFI.Label>content yielded via <code>FORM</code></SFI.Label>
        <HdsForm as |FORM|>
          <FORM.Section>
            <FORM.SectionHeader>
              <FORM.SectionHeaderTitle>Section header title</FORM.SectionHeaderTitle>
              <FORM.SectionHeaderDescription>
                Section Header description—lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quasi eum neque totam vel facere
                itaque necessitatibus quisquam omnis deserunt! Dicta, explicabo
                quia quis odio nesciunt quibusdam dolor obcaecati consequatur
                tenetur.
              </FORM.SectionHeaderDescription>
            </FORM.SectionHeader>
          </FORM.Section>
        </HdsForm>
      </SF.Item>
      <SF.Item as |SFI|>
        <SFI.Label>content yielded via <code>FORM_SECTION</code></SFI.Label>
        <HdsForm>
          <HdsFormSection as |FORM_SECTION|>
            <FORM_SECTION.Header>
              <FORM_SECTION.HeaderTitle>Section header title</FORM_SECTION.HeaderTitle>
              <FORM_SECTION.HeaderDescription>
                Section Header description—lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quasi eum neque totam vel facere
                itaque necessitatibus quisquam omnis deserunt! Dicta, explicabo
                quia quis odio nesciunt quibusdam dolor obcaecati consequatur
                tenetur.
              </FORM_SECTION.HeaderDescription>
            </FORM_SECTION.Header>
          </HdsFormSection>
        </HdsForm>
      </SF.Item>
      <SF.Item as |SFI|>
        <SFI.Label>content yielded via
          <code>FORM_SECTION_HEADER</code></SFI.Label>
        <HdsForm>
          <HdsFormSection>
            <HdsFormSectionHeader as |FORM_SECTION_HEADER|>
              <FORM_SECTION_HEADER.Title>Section header title</FORM_SECTION_HEADER.Title>
              <FORM_SECTION_HEADER.Description>
                Section Header description—lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quasi eum neque totam vel facere
                itaque necessitatibus quisquam omnis deserunt! Dicta, explicabo
                quia quis odio nesciunt quibusdam dolor obcaecati consequatur
                tenetur.
              </FORM_SECTION_HEADER.Description>
            </HdsFormSectionHeader>
          </HdsFormSection>
        </HdsForm>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Section MultiFieldGroup & Item</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>Content</ShwTextH4>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
    >
      <ShwFlex @direction="column" @gap="2rem" as |SF|>
        <SF.Item @label="two fields / equal widths (default)">
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup>
                <HdsFormTextInputField as |F|>
                  <F.Label>Control 1</F.Label>
                  <F.HelperText>Lorem ipsum dolor sit amet consectetur.</F.HelperText>
                </HdsFormTextInputField>

                <HdsFormTextInputField as |F|>
                  <F.Label>Control 2</F.Label>
                </HdsFormTextInputField>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item @label="with one error">
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup>
                <HdsFormTextInputField as |F|>
                  <F.Label>Control 1</F.Label>
                  <F.HelperText>Lorem ipsum dolor sit amet consectetur.</F.HelperText>
                </HdsFormTextInputField>

                <HdsFormTextInputField as |F|>
                  <F.Label>Control 2</F.Label>
                  <F.Error>This is a field-level error</F.Error>
                </HdsFormTextInputField>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item @label="with two errors">
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup>
                <HdsFormTextInputField as |F|>
                  <F.Label>Control 1</F.Label>
                  <F.HelperText>Lorem ipsum dolor sit amet consectetur.</F.HelperText>
                </HdsFormTextInputField>

                <HdsFormTextInputField as |F|>
                  <F.Label>Control 2</F.Label>
                  <F.Error>This is a field-level error.</F.Error>
                  <F.Error>Yet another error example for a total of two.</F.Error>
                </HdsFormTextInputField>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item @label=" three fields / equal widths (default)">
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup>
                <HdsFormTextInputField as |F|>
                  <F.Label>Control 1</F.Label>
                </HdsFormTextInputField>
                <HdsFormTextInputField as |F|>
                  <F.Label>Control 2</F.Label>
                  <F.HelperText>Lorem ipsum dolor sit amet consectetur.</F.HelperText>
                </HdsFormTextInputField>
                <HdsFormTextInputField as |F|>
                  <F.Label>Control 3</F.Label>
                </HdsFormTextInputField>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item as |SFI|>
          <SFI.Label>with
            <code>Item</code>s / mixed widths (80% &amp; 20%)</SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup as |SMFG|>
                <SMFG.Item @width="80%">
                  <HdsFormTextInputField as |F|>
                    <F.Label>Control 1</F.Label>
                  </HdsFormTextInputField>
                </SMFG.Item>

                <SMFG.Item @width="20%">
                  <HdsFormTextInputField as |F|>
                    <F.Label>Control 2</F.Label>
                  </HdsFormTextInputField>
                </SMFG.Item>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item as |SFI|>
          <SFI.Label>with
            <code>Item</code>s / mixed widths (20% &amp; 80%) + custom width on
            <code>Field</code></SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup as |SMFG|>
                <SMFG.Item @width="20%">
                  <HdsFormTextInputField as |F|>
                    <F.Label>Control 1</F.Label>
                  </HdsFormTextInputField>
                </SMFG.Item>
                <SMFG.Item @width="80%">
                  <HdsFormTextInputField
                    @width="300px"
                    placeholder="This field has a custom width of 300px"
                    as |F|
                  >
                    <F.Label>Control 2</F.Label>
                    <F.HelperText>Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam</F.HelperText>
                  </HdsFormTextInputField>
                </SMFG.Item>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item as |SFI|>
          <SFI.Label>with
            <code>Item</code>s / mixed widths (100%, auto, 6em)</SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup as |SMFG|>
                <SMFG.Item @width="100%">
                  <HdsFormTextInputField as |F|>
                    <F.Label>City</F.Label>
                  </HdsFormTextInputField>
                </SMFG.Item>

                <SMFG.Item @width="auto">
                  <HdsFormSelectField as |F|>
                    <F.Label>State</F.Label>
                    <F.Options>
                      <option value="state-1">Ohio</option>
                      <option value="state-2">Massachusetts</option>
                      <option value="state-3">Washington</option>
                      <option value="state-4">Florida</option>
                      <option value="state-4">North Carolina</option>
                    </F.Options>
                  </HdsFormSelectField>
                </SMFG.Item>

                <SMFG.Item @width="6em">
                  <HdsFormTextInputField as |F|>
                    <F.Label>Zip</F.Label>
                  </HdsFormTextInputField>
                </SMFG.Item>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item as |SFI|>
          <SFI.Label>with
            <code>Item</code>s / mixed widths set on
            <code>Field</code>s (100%, auto, 6em)</SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup>
                <FORM.SectionMultiFieldGroupItem>
                  <HdsFormTextInputField @width="100%" as |F|>
                    <F.Label>City</F.Label>
                  </HdsFormTextInputField>
                </FORM.SectionMultiFieldGroupItem>

                <FORM.SectionMultiFieldGroupItem>
                  <HdsFormSelectField @width="auto" as |F|>
                    <F.Label>State</F.Label>
                    <F.Options>
                      <option value="state-1">Ohio</option>
                      <option value="state-2">Massachusetts</option>
                      <option value="state-3">Washington</option>
                      <option value="state-4">Florida</option>
                      <option value="state-4">North Carolina</option>
                    </F.Options>
                  </HdsFormSelectField>
                </FORM.SectionMultiFieldGroupItem>

                <FORM.SectionMultiFieldGroupItem>
                  <HdsFormTextInputField @width="6em" as |F|>
                    <F.Label>Zip</F.Label>
                  </HdsFormTextInputField>
                </FORM.SectionMultiFieldGroupItem>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>

        <SF.Item as |SFI|>
          <SFI.Label>without
            <code>Item</code>s / mixed widths set on
            <code>Field</code>s (100%, auto, 6em)</SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Section>
              <FORM.SectionMultiFieldGroup>
                <HdsFormTextInputField @width="100%" as |F|>
                  <F.Label>City</F.Label>
                </HdsFormTextInputField>

                <HdsFormSelectField @width="auto" as |F|>
                  <F.Label>State</F.Label>
                  <F.Options>
                    <option value="state-1">Ohio</option>
                    <option value="state-2">Massachusetts</option>
                    <option value="state-3">Washington</option>
                    <option value="state-4">Florida</option>
                    <option value="state-4">North Carolina</option>
                  </F.Options>
                </HdsFormSelectField>

                <HdsFormTextInputField @width="6em" as |F|>
                  <F.Label>Zip</F.Label>
                </HdsFormTextInputField>
              </FORM.SectionMultiFieldGroup>
            </FORM.Section>
          </HdsForm>
        </SF.Item>
      </ShwFlex>
    </div>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Separator</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>width</ShwTextH4>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
    >
      <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
        <SG.Item @label="isFullWidth=false (default)">
          <HdsForm {{style padding="16px 0"}} as |FORM|>
            <FORM.Separator />
          </HdsForm>
        </SG.Item>

        <SG.Item @label="inherited sectionMaxWidth=32em set on Form parent">
          <HdsForm @sectionMaxWidth="32em" {{style padding="16px 0"}} as |FORM|>
            <FORM.Separator />
          </HdsForm>
        </SG.Item>

        <SG.Item @label="isFullWidth=true">
          <HdsForm {{style padding="16px 0"}}>
            <HdsFormSeparator @isFullWidth={{true}} />
          </HdsForm>
        </SG.Item>
      </ShwGrid>
    </div>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Footer</ShwTextH3>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <ShwTextH4>width</ShwTextH4>

    <ShwFlex
      @direction="column"
      @gap="2rem"
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements-and-placeholders'
        }}"
      as |SF|
    >
      <SF.Item @label="isFullWidth=false (default)">
        <HdsForm as |FORM|>
          <FORM.Footer>
            <ShwPlaceholder @height="2.4em" @text="Footer" />
          </FORM.Footer>
        </HdsForm>
      </SF.Item>

      <SF.Item @label="inherited sectionMaxWidth=32em set on Form parent">
        <HdsForm @sectionMaxWidth="32em" as |FORM|>
          <FORM.Footer>
            <ShwPlaceholder @height="2.4em" @text="Footer" />
          </FORM.Footer>
        </HdsForm>
      </SF.Item>

      <SF.Item @label="isFullWidth=true">
        <HdsForm as |FORM|>
          <FORM.Footer @isFullWidth={{true}}>
            <ShwPlaceholder @height="2.4em" @text="Footer" />
          </FORM.Footer>
        </HdsForm>
      </SF.Item>
    </ShwFlex>

    <ShwTextH4>content</ShwTextH4>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
    >
      <ShwFlex
        @direction="column"
        @gap="2rem"
        class="{{if
            @showHighlight
            'shw-component-form-layout-highlight-elements-and-placeholders'
          }}"
        as |SF|
      >
        <SF.Item as |SFI|>
          <SFI.Label>With <code>HdsButtonSet</code></SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Footer>
              <HdsButtonSet>
                <HdsButton @text="Submit" type="submit" />
                <HdsButton @text="Cancel" @color="secondary" />
              </HdsButtonSet>
            </FORM.Footer>
          </HdsForm>
        </SF.Item>
        <SF.Item as |SFI|>
          <SFI.Label>With yielded <code>ButtonSet</code></SFI.Label>
          <HdsForm as |FORM|>
            <FORM.Footer as |FF|>
              <FF.ButtonSet>
                <HdsButton @text="Submit" type="submit" />
                <HdsButton @text="Cancel" @color="secondary" />
              </FF.ButtonSet>
            </FORM.Footer>
          </HdsForm>
        </SF.Item>
        <SF.Item @label="with extra content (eg. alert)">
          <HdsForm as |FORM|>
            <FORM.Footer>
              <HdsLayoutFlex @gap="32">
                <HdsButtonSet>
                  <HdsButton @text="Submit" type="submit" />
                  <HdsButton @text="Cancel" @color="secondary" />
                </HdsButtonSet>
                <HdsAlert
                  @color="highlight"
                  @icon="info-fill"
                  @type="compact"
                  as |A|
                >
                  <A.Description>Clusters are scoped to a single project for now
                    and cannot connect to other clusters in other projects.</A.Description>
                </HdsAlert>
              </HdsLayoutFlex>
            </FORM.Footer>
          </HdsForm>
        </SF.Item>
      </ShwFlex>
    </div>
  </template>;

export default SubSectionComponents;
