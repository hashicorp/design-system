/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsFormFileInputField } from '@hashicorp/design-system-components/components';

export interface SubSectionContainersSignature {
  Args: {
    showHighlight: boolean;
  };
}

const SubSectionContainers: TemplateOnlyComponent<SubSectionContainersSignature> =
  <template>
    <ShwTextH2>Containers</ShwTextH2>

    <div
      class="{{if
          @showHighlight
          'shw-component-form-file-input-layout-highlight'
        }}"
    >
      <ShwFlex @gap="2rem" as |SF|>
        <SF.Item
          @label="Within a fixed-width container"
          {{style width="220px"}}
        >
          <HdsFormFileInputField as |F|>
            <F.Label>This is the label text</F.Label>
            <F.HelperText>This is the helper text with longer wrapping text</F.HelperText>
          </HdsFormFileInputField>
        </SF.Item>
      </ShwFlex>
    </div>
  </template>;

export default SubSectionContainers;
