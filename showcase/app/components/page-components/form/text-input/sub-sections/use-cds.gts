/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsFormTextInputBase,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

const SubSectionUseCds: TemplateOnlyComponent = <template>
  <ShwTextH2>useCds</ShwTextH2>

  <p class="hds-typography-body-200">When
    <code>@useCds</code>
    is true the text input renders as a Carbon
    <code>cds-text-input</code>
    web component instead of the native HDS markup. On the
    <code>Field</code>
    variant, label / helper text / error / counter args drive the Carbon
    component's built-in slots and attributes.</p>

  <ShwTextH3>Base — HDS vs Carbon</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="HDS (default)">
      <HdsFormTextInputBase @value="Lorem ipsum" aria-label="hds base input" />
    </SF.Item>
    <SF.Item @label="useCds=true">
      <HdsFormTextInputBase
        @useCds={{true}}
        @value="Lorem ipsum"
        @label="Label"
        @helperText="Helper text"
      />
    </SF.Item>
    <SF.Item @label="useCds=true (invalid)">
      <HdsFormTextInputBase
        @useCds={{true}}
        @value="Lorem ipsum"
        @isInvalid={{true}}
        @label="Label"
        @invalidText="This is invalid"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Base — useCds with counter and password toggle</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="useCds=true with counter">
      <HdsFormTextInputBase
        @useCds={{true}}
        @value="Lorem ipsum"
        @label="With counter"
        @helperText="Up to 40 characters"
        @enableCounter={{true}}
        @maxCount={{40}}
      />
    </SF.Item>
    <SF.Item @label="useCds=true password (with visibility toggle)">
      <HdsFormTextInputBase
        @useCds={{true}}
        @type="password"
        @value="hunter2"
        @label="Password"
        @hasVisibilityToggle={{true}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Field — HDS vs Carbon</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="HDS (default)">
      <HdsFormTextInputField @value="Lorem ipsum">
        <:label>This is the label text</:label>
        <:helperText>This is the helper text</:helperText>
      </HdsFormTextInputField>
    </SF.Item>
    <SF.Item @label="useCds=true">
      <HdsFormTextInputField
        @useCds={{true}}
        @value="Lorem ipsum"
        @label="This is the label text"
        @helperText="This is the helper text"
      />
    </SF.Item>
    <SF.Item @label="useCds=true (invalid)">
      <HdsFormTextInputField
        @useCds={{true}}
        @value="Lorem ipsum"
        @isInvalid={{true}}
        @label="This is the label"
        @invalidText="This is the error"
      />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionUseCds;
