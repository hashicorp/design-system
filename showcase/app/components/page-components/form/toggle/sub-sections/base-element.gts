/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsFormToggleBase } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus'];

const SubSectionBaseElement: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Unchecked">
      <HdsFormToggleBase aria-label="Unchecked toggle" />
    </SF.Item>
    <SF.Item @label="Checked">
      <HdsFormToggleBase checked="checked" aria-label="Checked toggle" />
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
            <HdsFormToggleBase aria-label="Toggle" />
          </SG.Item>
          <SG.Item>
            <HdsFormToggleBase checked="checked" aria-label="Checked toggle" />
          </SG.Item>
          {{#unless (eq state "focus")}}
            <SG.Item>
              <HdsFormToggleBase
                disabled="disabled"
                aria-label="Disabled toggle"
              />
            </SG.Item>
            <SG.Item>
              <HdsFormToggleBase
                checked="checked"
                disabled="disabled"
                aria-label="Checked, disabled toggle"
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
      <div class="shw-component-form-toggle-base-custom-layout">
        <label for="my-custom-toggle-example">Custom label</label>
        <HdsFormToggleBase id="my-custom-toggle-example" />
        <span>Some extra content</span>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseElement;
