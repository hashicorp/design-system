/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsTabs } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';

const SubSectionSizes: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsTabs @size={{size}} as |T|>
          <T.Tab>One</T.Tab>
          <T.Tab>Two</T.Tab>
          <T.Tab>Three</T.Tab>

          <T.Panel><ShwPlaceholder @text="Content one" @height="50" /></T.Panel>
          <T.Panel><ShwPlaceholder @text="Content two" @height="50" /></T.Panel>
          <T.Panel><ShwPlaceholder
              @text="Content three"
              @height="50"
            /></T.Panel>
        </HdsTabs>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionSizes;
