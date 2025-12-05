/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsIconTile } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/icon-tile/index';

const SubSectionSize: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwGrid @columns={{2}} {{style width="fit-content"}} as |SG|>
    <SG.Item @label="With logo">
      <ShwFlex as |SF|>
        {{#each SIZES as |size|}}
          <SF.Item>
            <HdsIconTile @logo="boundary" @size={{size}} />
          </SF.Item>
        {{/each}}
      </ShwFlex>
    </SG.Item>
    <SG.Item @label="With icon">
      <ShwFlex as |SF|>
        {{#each SIZES as |size|}}
          <SF.Item>
            <HdsIconTile @icon="dashboard" @size={{size}} />
          </SF.Item>
        {{/each}}
      </ShwFlex>
    </SG.Item>
    <SG.Item @label="With logo + secondary icon">
      <ShwFlex as |SF|>
        {{#each SIZES as |size|}}
          <SF.Item>
            <HdsIconTile
              @logo="boundary"
              @size={{size}}
              @iconSecondary="plus"
            />
          </SF.Item>
        {{/each}}
      </ShwFlex>
    </SG.Item>
    <SG.Item @label="With icon + secondary icon">
      <ShwFlex as |SF|>
        {{#each SIZES as |size|}}
          <SF.Item>
            <HdsIconTile
              @icon="dashboard"
              @size={{size}}
              @iconSecondary="trash"
            />
          </SF.Item>
        {{/each}}
      </ShwFlex>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionSize;
