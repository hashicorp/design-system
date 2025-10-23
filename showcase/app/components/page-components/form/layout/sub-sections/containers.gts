/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsForm,
  HdsFormSeparator,
} from '@hashicorp/design-system-components/components';

interface SubSectionContainersSignature {
  Args: {
    toggleHighlight: () => void;
    showHighlight: boolean;
  };
}

const SubSectionContainers: TemplateOnlyComponent<SubSectionContainersSignature> =
  <template>
    <ShwTextH2>Containers</ShwTextH2>

    <button
      type="button"
      class="shw-component-form-layout-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide layout highlight" "Show layout highlight"}}
    </button>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-layout-highlight-elements'
        }}"
    >
      <HdsForm as |FORM|>
        <FORM.Header>
          <FORM.HeaderTitle>
            <ShwPlaceholder
              @height="3.2em"
              @text="HeaderTitle"
              @background="#e4c5f3"
            />
          </FORM.HeaderTitle>
          <FORM.HeaderDescription>
            <ShwPlaceholder
              @height="4.8em"
              @text="HeaderDescription"
              @background="#e4c5f3"
            />
          </FORM.HeaderDescription>
        </FORM.Header>

        <FORM.Section as |FS|>
          <ShwPlaceholder
            @height="2.4em"
            @text="FormField"
            @background="#add8e6"
          />
          <ShwPlaceholder
            @height="2.4em"
            @text="FormField"
            @background="#add8e6"
          />

          <HdsFormSeparator />

          <FS.Header as |FSH|>
            <FSH.Title>
              <ShwPlaceholder
                @height="2.8em"
                @text="SectionHeaderTitle"
                @background="#e5ffd2"
              />
            </FSH.Title>
            <FORM.SectionHeaderDescription>
              <ShwPlaceholder
                @height="4.8em"
                @text="SectionHeaderDescription"
                @background="#e5ffd2"
              />
            </FORM.SectionHeaderDescription>
          </FS.Header>

          <ShwPlaceholder
            @height="2.4em"
            @text="FormField"
            @background="#add8e6"
          />
        </FORM.Section>

        <FORM.Section>
          <FORM.SectionMultiFieldGroup>
            <ShwPlaceholder
              @height="2.4em"
              @text="MultiFieldGroup Item 1"
              @background="#add8e6"
            />
            <ShwPlaceholder
              @height="2.4em"
              @text="MultiFieldGroup FormField 2"
              @background="#add8e6"
            />
          </FORM.SectionMultiFieldGroup>

          <FORM.SectionMultiFieldGroup as |SMFG|>
            <SMFG.Item @width="100%">
              <ShwPlaceholder
                @height="2.4em"
                @text="MultiFieldGroup Item 2"
                @background="#add8e6"
              />
            </SMFG.Item>

            <SMFG.Item @width="max-content">
              <ShwPlaceholder
                @height="2.4em"
                {{style padding="0 1em"}}
                @text="MultiFieldGroup Item 2"
                @background="#add8e6"
              />
            </SMFG.Item>
          </FORM.SectionMultiFieldGroup>
        </FORM.Section>

        <HdsFormSeparator />

        <FORM.Section>
          <ShwPlaceholder
            @height="2.4em"
            @text="FormField"
            @background="#add8e6"
          />
          <ShwPlaceholder
            @height="2.4em"
            @text="FormField"
            @background="#add8e6"
          />
          <ShwPlaceholder
            @height="2.4em"
            @text="FormField"
            @background="#add8e6"
          />
        </FORM.Section>

        <FORM.Footer>
          <ShwPlaceholder
            @height="2.25rem"
            @text="Form Footer"
            @background="#fff8d2"
          />
        </FORM.Footer>
      </HdsForm>
    </div>

    <ShwDivider />
  </template>;

export default SubSectionContainers;
