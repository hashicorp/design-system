/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsFormCheckboxBase } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const SubSectionBaseControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Unchecked">
      <HdsFormCheckboxBase aria-label="Unchecked checkbox" />
    </SF.Item>
    <SF.Item @label="Checked">
      <HdsFormCheckboxBase checked="checked" aria-label="Checked checkbox" />
    </SF.Item>
    <SF.Item @label="Indeterminate">
      <HdsFormCheckboxBase
        indeterminate={{true}}
        aria-label="Indeterminate checkbox"
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>States (Base / Disabled)</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{capitalize state}}>
        <ShwGrid
          @columns={{3}}
          mock-state-value={{state}}
          mock-state-selector="input"
          as |SG|
        >
          <SG.Item>
            <HdsFormCheckboxBase aria-label="Checkbox" />
          </SG.Item>
          <SG.Item>
            <HdsFormCheckboxBase
              checked="checked"
              aria-label="Checked checkbox"
            />
          </SG.Item>
          <SG.Item>
            <HdsFormCheckboxBase
              indeterminate={{true}}
              aria-label="Indeterminate checkbox"
            />
          </SG.Item>
          {{#unless (eq state "focus")}}
            <SG.Item>
              <HdsFormCheckboxBase
                disabled="disabled"
                aria-label="Disabled checkbox"
              />
            </SG.Item>
            <SG.Item>
              <HdsFormCheckboxBase
                checked="checked"
                disabled="disabled"
                aria-label="Checked, disabled checkbox"
              />
            </SG.Item>
            <SG.Item>
              <HdsFormCheckboxBase
                indeterminate={{true}}
                disabled="disabled"
                aria-label="Indeterminate, disabled checkbox"
              />
            </SG.Item>
          {{/unless}}
        </ShwGrid>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH3>Custom layout</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="shw-component-form-checkbox-base-custom-layout">
        <label for="my-custom-checkbox-example">Custom label</label>
        <HdsFormCheckboxBase id="my-custom-checkbox-example" />
        <span>Some extra content</span>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseControl;
