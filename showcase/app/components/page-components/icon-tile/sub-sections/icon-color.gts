/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { notEq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsIconTile } from '@hashicorp/design-system-components/components';
import {
  SIZES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/icon-tile/index';

const SubSectionIconColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Icon color</ShwTextH2>

  <ShwGrid @columns={{5}} as |SG|>
    {{#each COLORS as |color|}}
      {{! As agreed with designers, we prefer to hide the option of icon with "hcp" color }}
      {{#if (notEq color "hcp")}}
        <SG.Item @label={{color}}>
          <ShwFlex as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item>
                <HdsIconTile
                  @icon="dashboard"
                  @size={{size}}
                  @color={{color}}
                />
              </SF.Item>
            {{/each}}
          </ShwFlex>
        </SG.Item>
      {{/if}}
    {{/each}}
  </ShwGrid>
</template>;

export default SubSectionIconColor;
