/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
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

      <ShwGrid @columns={{3}} @gap="2rem" as |SG|>
        {{#each STATES as |state|}}
          <SG.Item @label={{state}}>
            <HdsFormFileInputBase
              mock-state-value={{state}}
              aria-label={{state}}
            />
          </SG.Item>
        {{/each}}
        <SG.Item @label="disabled">
          <HdsFormFileInputBase
            mock-state-value="disabled"
            disabled
            aria-label="disabled"
          />
        </SG.Item>
      </ShwGrid>

    </div>

    <ShwDivider />
  </template>;

export default SubSectionBaseControl;
