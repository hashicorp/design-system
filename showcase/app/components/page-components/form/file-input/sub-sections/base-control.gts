/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsFormFileInputBase } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

export interface SubSectionBaseControlSignature {
  Args: {
    showHighlight: boolean;
  };
}

const SubSectionBaseControl: TemplateOnlyComponent<SubSectionBaseControlSignature> =
  <template>
    <ShwTextH2>“Base” control</ShwTextH2>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-file-input-layout-highlight'
        }}"
    >
      <ShwFlex @gap="2rem" as |SF|>
        <SF.Item>
          <HdsFormFileInputBase aria-label="Base" />
        </SF.Item>
      </ShwFlex>

      <ShwTextH3>States</ShwTextH3>

      <ShwFlex @gap="2rem" as |SF|>
        {{#each STATES as |state|}}
          <SF.Item @label={{state}}>
            <HdsFormFileInputBase
              mock-state-value={{state}}
              aria-label={{state}}
            />
          </SF.Item>
        {{/each}}
        <SF.Item @label="disabled">
          <HdsFormFileInputBase
            mock-state-value="disabled"
            disabled
            aria-label="disabled"
          />
        </SF.Item>
      </ShwFlex>

    </div>

    <ShwDivider />
  </template>;

export default SubSectionBaseControl;
