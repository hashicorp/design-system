/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwOutliner from 'showcase/components/shw/outliner';

import {
  HdsFormHelperText,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const SubSectionBaseHelperText: TemplateOnlyComponent = <template>
  <ShwTextH2>Helper text</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormHelperText>This is the helper text, usually used jointly with the
        label.</HdsFormHelperText>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>&lt;LinkInline&gt;</code></SFI.Label>
      <HdsFormHelperText>This is a helper text
        <HdsLinkInline @route="index">with a link</HdsLinkInline></HdsFormHelperText>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>&lt;LinkInline&gt;</code>
        and
        <code>secondary</code>
        color</SFI.Label>
      <HdsFormHelperText>This is a helper text
        <HdsLinkInline @route="index" @color="secondary">with a secondary link</HdsLinkInline></HdsFormHelperText>
    </SF.Item>
    <SF.Item @label="With structured content (eg. HTML tags)">
      <HdsFormHelperText>
        A helper text may contain some
        <code>&lt;code&gt;</code>
        for example, or a
        <strong>&lt;strong&gt;</strong>.
      </HdsFormHelperText>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner {{style max-width="250px"}}>
        <HdsFormHelperText>This is a very long helper text that should go on
          multiple lines</HdsFormHelperText>
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseHelperText;
