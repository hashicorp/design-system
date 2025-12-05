/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsIconTile } from '@hashicorp/design-system-components/components';
import {
  SIZES,
  PRODUCTS,
} from '@hashicorp/design-system-components/components/hds/icon-tile/index';

const SubSectionLogo: TemplateOnlyComponent = <template>
  <ShwTextH2>Logo</ShwTextH2>

  <ShwGrid @columns={{5}} as |SG|>
    {{#each PRODUCTS as |product|}}
      <SG.Item @label={{product}}>
        <ShwFlex as |SF2|>
          {{#each SIZES as |size|}}
            <SF2.Item>
              <HdsIconTile @logo={{product}} @size={{size}} />
            </SF2.Item>
          {{/each}}
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>;

export default SubSectionLogo;
