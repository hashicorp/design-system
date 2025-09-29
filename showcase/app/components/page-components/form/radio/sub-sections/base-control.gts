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

import { HdsFormRadioBase } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const SubSectionBaseControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Unchecked">
      <HdsFormRadioBase aria-label="Unchecked radio" />
    </SF.Item>
    <SF.Item @label="Checked">
      <HdsFormRadioBase checked="checked" aria-label="Checked radio" />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>States (Base / Disabled)</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{capitalize state}}>
        <ShwGrid
          @columns={{2}}
          mock-state-value={{state}}
          mock-state-selector="input"
          as |SG|
        >
          <SG.Item>
            <HdsFormRadioBase aria-label="Radio" />
          </SG.Item>
          <SG.Item>
            <HdsFormRadioBase checked="checked" aria-label="Checked radio" />
          </SG.Item>
          {{#unless (eq state "focus")}}
            <SG.Item>
              <HdsFormRadioBase
                disabled="disabled"
                aria-label="Disabled radio"
              />
            </SG.Item>
            <SG.Item>
              <HdsFormRadioBase
                checked="checked"
                disabled="disabled"
                aria-label="Checked, disabled radio"
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
      <div class="shw-component-form-radio-base-custom-layout">
        <label>
          <strong>Some content</strong>
          <span>Some other content content</span>
          <div
            class="shw-component-form-radio-base-custom-layout__control-wrapper"
          >
            <HdsFormRadioBase id="my-custom-radio-example" />
          </div>
        </label>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseControl;
