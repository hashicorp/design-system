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
import { BACKGROUNDS } from '@hashicorp/design-system-components/components/hds/card/container';

const SubSectionBackground: TemplateOnlyComponent = <template>
  <ShwTextH2>Background</ShwTextH2>

  <div class="shw-component-card-wrapper">
    <ShwGrid @columns={{2}} {{style width="fit-content"}} as |SG|>
      {{#each BACKGROUNDS as |background|}}
        <SG.Item>
          <HdsCardContainer
            @level="mid"
            @hasBorder={{true}}
            @background={{background}}
          >
            <ShwPlaceholder
              @text={{background}}
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

export default SubSectionBackground;
