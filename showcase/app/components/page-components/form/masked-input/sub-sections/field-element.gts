/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsFormMaskedInputField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithControlledValue from 'showcase/components/page-components/form/masked-input/code-fragments/with-controlled-value';

const SubSectionFieldElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Field" control</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text with link">
      <HdsFormMaskedInputField @value="Lorem ipsum dolor" as |F|>
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text
          <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Copy Button + Error">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        @hasCopyButton={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>Multiline</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Only label">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        as |F|
      >
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text link">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        as |F|
      >
        <F.Label>This is the label text</F.Label>
        <F.HelperText>This is the helper text with a
          <HdsLinkInline @href="#">link</HdsLinkInline></F.HelperText>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Copy Button + Error">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        @hasCopyButton={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Error">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.Error>This is the error</F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Error">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error>This is the error</F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Errors">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        @isInvalid={{true}}
        as |F|
      >
        <F.Label>This is the label</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Error as |E|>
          <E.Message>First error message</E.Message>
          <E.Message>Second error message</E.Message>
        </F.Error>
      </HdsFormMaskedInputField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Character count</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Character count">
      <CodeFragmentWithControlledValue @value="Lorem ipsum dolor" as |CF|>
        <CF.CharacterCount @maxLength={{100}} />
      </CodeFragmentWithControlledValue>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Character count (custom)">
      <CodeFragmentWithControlledValue @value="Lorem ipsum dolor" as |CF|>
        <CF.HelperText>This is the helper text</CF.HelperText>
        <CF.CharacterCount @maxLength={{100}} as |CC|>
          Entered
          {{CC.currentLength}}
          out of
          {{CC.maxLength}}
          characters
        </CF.CharacterCount>
      </CodeFragmentWithControlledValue>
    </SG.Item>
    <SG.Item @label="Label + Copy Button + Character count + Error">
      <CodeFragmentWithControlledValue
        @value="Lorem ipsum dolor sit amet"
        @hasCopyButton={{true}}
        @hasValidation={{true}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>Multiline</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Character count">
      <CodeFragmentWithControlledValue
        @value="Lorem ipsum dolor"
        @isMultiline={{true}}
        as |CF|
      >
        <CF.CharacterCount @maxLength={{100}} />
      </CodeFragmentWithControlledValue>
    </SG.Item>
    <SG.Item @label="Label + Helper text + Character count (custom)">
      <CodeFragmentWithControlledValue
        @value="Lorem ipsum dolor"
        @isMultiline={{true}}
        as |CF|
      >
        <CF.HelperText>This is the helper text</CF.HelperText>
        <CF.CharacterCount @maxLength={{100}} as |CC|>
          Entered
          {{CC.currentLength}}
          out of
          {{CC.maxLength}}
          characters
        </CF.CharacterCount>
      </CodeFragmentWithControlledValue>
    </SG.Item>
    <SG.Item @label="Label + Copy Button + Character count + Error">
      <CodeFragmentWithControlledValue
        @value="Lorem ipsum dolor sit amet"
        @isMultiline={{true}}
        @hasCopyButton={{true}}
        @hasValidation={{true}}
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Required">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        @isRequired={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Optional">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        @isOptional={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>Multiline</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Label + Required">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        @isRequired={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Label + Optional">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        @isOptional={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwTextH4>Single line</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Readonly Optional">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        readonly={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Disabled">
      <HdsFormMaskedInputField
        @value="Lorem ipsum dolor"
        disabled={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>Multiline</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Readonly">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        readonly={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
    <SG.Item @label="Disabled">
      <HdsFormMaskedInputField
        @isMultiline={{true}}
        @value="Lorem ipsum dolor"
        disabled={{true}}
        as |F|
      >
        <F.Label>This is the label text</F.Label>
      </HdsFormMaskedInputField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionFieldElement;
