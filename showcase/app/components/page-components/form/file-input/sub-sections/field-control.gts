/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsFormFileInputField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

export interface SubSectionFieldControlSignature {
  Args: {
    showHighlight: boolean;
  };
}

const SubSectionFieldControl: TemplateOnlyComponent<SubSectionFieldControlSignature> =
  <template>
    <ShwTextH2>“Field” control</ShwTextH2>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-file-input-layout-highlight'
        }}"
    >
      <ShwTextH3>Content</ShwTextH3>

      <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
        <SG.Item @label="Only label">
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label text</F.Label>
          </HdsFormFileInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text">
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
          </HdsFormFileInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text with link">
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text
              <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
          </HdsFormFileInputField>
        </SG.Item>
        <SG.Item @label="Label + Error">
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label</F.Label>
            <F.Error>This is the error</F.Error>
          </HdsFormFileInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Error">
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error>This is the error</F.Error>
          </HdsFormFileInputField>
        </SG.Item>
        <SG.Item @label="Label + Helper text + Errors">
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Error as |E|>
              <E.Message>First error message</E.Message>
              <E.Message>Second error message</E.Message>
            </F.Error>
          </HdsFormFileInputField>
        </SG.Item>
      </ShwGrid>
    </div>

    <ShwDivider @level={{2}} />

    <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
      <SG.Item @label="Disabled">
        <HdsFormFileInputField disabled={{true}} as |F|>
          <F.Label>This is the label text</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </HdsFormFileInputField>
      </SG.Item>
    </ShwGrid>

    <ShwDivider />
  </template>;

export default SubSectionFieldControl;
