/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsCardContainer } from '@hashicorp/design-system-components/components';
import { LEVELS as CONTAINER_LEVELS } from '@hashicorp/design-system-components/components/hds/card/container';

const SubSectionBorder: TemplateOnlyComponent = <template>
  <ShwTextH2>Border</ShwTextH2>

  <div class="shw-component-card-wrapper">
    <ShwGrid @columns={{3}} {{style width="fit-content"}} as |SG|>
      {{#each CONTAINER_LEVELS as |level|}}
        <SG.Item>
          <HdsCardContainer @level={{level}} @hasBorder={{true}}>
            <ShwPlaceholder
              @text={{level}}
              @width="200"
              @height="200"
              @background="transparent"
            />
          </HdsCardContainer>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  </div>
</template>;

export default SubSectionBorder;
