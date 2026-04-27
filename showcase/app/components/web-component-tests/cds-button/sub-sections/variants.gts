/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsCdsButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

import {
  CDS_BUTTON_KIND_OPTIONS,
  CDS_BUTTON_SIZE_OPTIONS,
} from '@hashicorp/design-system-components/components/hds/cds-button/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Kind</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each CDS_BUTTON_KIND_OPTIONS as |kind|}}
      <SF.Item @label={{capitalize kind}}>
        <div>
          <HdsCdsButton @kind={{kind}}>
            Button
          </HdsCdsButton>
        </div>
        <div>
          <HdsCdsButton @kind={{kind}} aria-label="Icon only">
            <HdsIcon @name="plus" slot="icon" />
          </HdsCdsButton>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH2>Size</ShwTextH2>
  <ShwFlex as |SF|>
    {{#each CDS_BUTTON_SIZE_OPTIONS as |size|}}
      <SF.Item @label={{capitalize size}}>
        <div>
          <HdsCdsButton @size={{size}}>
            Button
          </HdsCdsButton>
        </div>
        <div>
          <HdsCdsButton @size={{size}} aria-label="Icon only">
            <HdsIcon @name="plus" slot="icon" />
          </HdsCdsButton>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionVariants;
