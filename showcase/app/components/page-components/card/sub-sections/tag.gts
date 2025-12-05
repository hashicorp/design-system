/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsCardContainer } from '@hashicorp/design-system-components/components';

const SubSectionTag: TemplateOnlyComponent = <template>
  <ShwTextH2>Tag</ShwTextH2>

  <div class="shw-component-card-wrapper">
    <ShwGrid @columns={{2}} @gap="2rem" {{style width="fit-content"}} as |SG|>
      <SG.Item @label="Card using default div tag">
        <HdsCardContainer @level="mid" @hasBorder={{true}}>
          <ShwPlaceholder
            @text="div"
            @width="200"
            @height="200"
            @background="transparent"
          />
        </HdsCardContainer>
      </SG.Item>

      <SG.Item @label="Card using list item tag">
        <ul class="shw-component-card-list">
          <HdsCardContainer @level="mid" @hasBorder={{true}} @tag="li">
            <ShwPlaceholder
              @text="li"
              @width="200"
              @height="200"
              @background="transparent"
            />
          </HdsCardContainer>
        </ul>
      </SG.Item>
    </ShwGrid>
  </div>
</template>;

export default SubSectionTag;
