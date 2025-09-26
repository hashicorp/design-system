/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsDropdownListItemGeneric } from '@hashicorp/design-system-components/components';

const SubSectionListItemsGeneric: TemplateOnlyComponent = <template>
  <ShwTextH3>Generic</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="some generic content here"
              @width="200"
              @height="40"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionListItemsGeneric;
