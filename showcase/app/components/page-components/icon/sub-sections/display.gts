/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const SubSectionDisplay: TemplateOnlyComponent = <template>
  <ShwTextH2>Display</ShwTextH2>

  {{#let (array false true) as |booleans|}}
    {{#each booleans as |isInline|}}
      <ShwTextH4 @tag="h3">{{if
          isInline
          "Inline"
          "Block (default)"
        }}</ShwTextH4>

      <ShwFlex class="shw-component-outline-icons" as |SF|>
        <SF.Item @label="single icon">
          <HdsIcon @name="bookmark" @isInline={{isInline}} />
        </SF.Item>
        <SF.Item @label="multiple icons">
          <HdsIcon @name="alert-circle-fill" @isInline={{isInline}} />
          <HdsIcon @name="alert-diamond-fill" @isInline={{isInline}} />
          <HdsIcon @name="alert-triangle-fill" @isInline={{isInline}} />
        </SF.Item>
      </ShwFlex>

      <ShwFlex class="shw-component-outline-icons" @gap="4rem" as |SG|>
        <SG.Item @label="icon + inline text">
          <HdsIcon @name="bookmark" @isInline={{isInline}} />
          <span class="hds-typography-body-200">Lorem ipsum dolor</span>
        </SG.Item>
        <SG.Item @label="icon + inline text (inside flexbox)">
          <div class="shw-component-icon-container-flex">
            <HdsIcon @name="bookmark" @isInline={{isInline}} />
            <span class="hds-typography-body-200">Lorem ipsum dolor</span>
          </div>
        </SG.Item>
        <SG.Item @label="icon + inline text (inside grid)">
          <div class="shw-component-icon-container-grid">
            <HdsIcon @name="bookmark" @isInline={{isInline}} />
            <span class="hds-typography-body-200">Lorem ipsum dolor</span>
          </div>
        </SG.Item>
      </ShwFlex>

      <ShwFlex class="shw-component-outline-icons" @gap="4rem" as |SF|>
        <SF.Item @label="icons interleaved with inline text">
          <span class="hds-typography-body-200">Lorem ipsum dolor</span>
          <HdsIcon @name="bookmark" @isInline={{isInline}} />
          <span class="hds-typography-body-200">Sit amet consectetur</span>
          <HdsIcon @name="alert-circle-fill" @isInline={{isInline}} />
          <HdsIcon @name="alert-diamond-fill" @isInline={{isInline}} />
          <HdsIcon @name="alert-triangle-fill" @isInline={{isInline}} />
          <span class="hds-typography-body-200">Adipisicing elit</span>
        </SF.Item>
        <SF.Item @label="icons interleaved with block text">
          <p class="hds-typography-body-200">Lorem ipsum dolor</p>
          <HdsIcon @name="bookmark" @isInline={{isInline}} />
          <p class="hds-typography-body-200">Sit amet consectetur</p>
          <HdsIcon @name="alert-circle-fill" @isInline={{isInline}} />
          <HdsIcon @name="alert-diamond-fill" @isInline={{isInline}} />
          <HdsIcon @name="alert-triangle-fill" @isInline={{isInline}} />
          <p class="hds-typography-body-200">Adipisicing elit</p>
        </SF.Item>
      </ShwFlex>

    {{/each}}
  {{/let}}

  <ShwDivider />
</template>;

export default SubSectionDisplay;
