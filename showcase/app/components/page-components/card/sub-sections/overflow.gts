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

const SubSectionOverflow: TemplateOnlyComponent = <template>
  <ShwTextH2>Overflow</ShwTextH2>

  <div class="shw-component-card-wrapper">
    <ShwGrid @columns={{2}} @gap="2rem" {{style width="fit-content"}} as |SG|>
      <SG.Item>
        <HdsCardContainer @level="mid" @hasBorder={{true}}>
          <div class="shw-component-card-overflow__wrapper-relative">
            <ShwPlaceholder
              @text="visible (default)"
              @width="200"
              @height="200"
              @background="#e1f5fe"
            />
            <div class="shw-component-card-overflow__content-absolute"></div>
          </div>
        </HdsCardContainer>
      </SG.Item>
      <SG.Item>
        <HdsCardContainer @level="mid" @hasBorder={{true}} @overflow="hidden">
          <div class="shw-component-card-overflow__wrapper-relative">
            <ShwPlaceholder
              @text="hidden"
              @width="200"
              @height="200"
              @background="#e1f5fe"
            />
            <div class="shw-component-card-overflow__content-absolute"></div>
          </div>
        </HdsCardContainer>
      </SG.Item>
    </ShwGrid>
  </div>
</template>;

export default SubSectionOverflow;
