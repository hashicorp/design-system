/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsFormToggleField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionFieldElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Field" control</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormToggleField as |F|>
        <F.Label>This is the label text</F.Label>
      </HdsFormToggleField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormToggleField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormToggleField>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <HdsFormToggleField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
      </HdsFormToggleField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormToggleField as |F|>
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </HdsFormToggleField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormToggleField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormToggleField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
      <HdsFormToggleField checked="checked" as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </HdsFormToggleField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Disabled / Checked">
      <HdsFormToggleField checked="checked" disabled={{true}} as |F|>
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormToggleField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionFieldElement;
