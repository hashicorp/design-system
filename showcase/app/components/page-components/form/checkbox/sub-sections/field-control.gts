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
  HdsFormCheckboxField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionFieldControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Field" control</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormCheckboxField as |F|>
        <F.Label>This is the label text</F.Label>
      </HdsFormCheckboxField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormCheckboxField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormCheckboxField>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <HdsFormCheckboxField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
      </HdsFormCheckboxField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormCheckboxField as |F|>
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </HdsFormCheckboxField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormCheckboxField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormCheckboxField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
      <HdsFormCheckboxField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </HdsFormCheckboxField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Disabled">
      <HdsFormCheckboxField disabled as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormCheckboxField>
    </SG.Item>
    <SG.Item @label="Disabled / Checked">
      <HdsFormCheckboxField disabled checked="checked" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormCheckboxField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionFieldControl;
