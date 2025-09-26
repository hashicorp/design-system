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

const SubSectionElevation: TemplateOnlyComponent = <template>
  <ShwTextH2>Elevation</ShwTextH2>

  <div class="shw-component-card-wrapper">
    <ShwGrid
      @label="Level"
      @columns={{3}}
      {{style width="fit-content"}}
      as |SG|
    >
      {{#each CONTAINER_LEVELS as |level|}}
        <SG.Item>
          <HdsCardContainer @level={{level}}>
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
    <ShwGrid
      @label="Level Hover"
      @columns={{3}}
      {{style width="fit-content"}}
      as |SG|
    >
      {{#each CONTAINER_LEVELS as |level|}}
        <SG.Item>
          <HdsCardContainer @levelHover={{level}} mock-state-value="hover">
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
    <ShwGrid
      @label="Level Active"
      @columns={{3}}
      {{style width="fit-content"}}
      as |SG|
    >
      {{#each CONTAINER_LEVELS as |level|}}
        <SG.Item>
          <HdsCardContainer @levelActive={{level}} mock-state-value="active">
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

export default SubSectionElevation;
