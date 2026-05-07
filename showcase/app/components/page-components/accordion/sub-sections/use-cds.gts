/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { ACCORDION_ALIGNMENT } from '@carbon/web-components/es/components/accordion/accordion.js';

import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import {
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/accordion/item/index';

const SubSectionUseCds: TemplateOnlyComponent = <template>
  <ShwTextH2>useCds</ShwTextH2>

  <p class="hds-typography-body-200">When
    <code>@useCds</code>
    is true the accordion renders the Carbon
    <code>cds-accordion</code>
    implementation. When false (default), the original HDS implementation is
    rendered. The
    <code>@disabled</code>
    and
    <code>@alignment</code>
    args are only applied when
    <code>@useCds</code>
    is true.</p>

  <ShwTextH3>HDS vs Carbon (default)</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="HDS (default)">
      <HdsAccordion as |A|>
        <A.Item>
          <:toggle>Item one</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
        <A.Item>
          <:toggle>Item two</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="useCds=true">
      <HdsAccordion @useCds={{true}} as |A|>
        <A.Item>
          <:toggle>Item one</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
        <A.Item>
          <:toggle>Item two</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>useCds across types</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    {{#each TYPES as |type|}}
      <SG.Item @label={{capitalize type}}>
        <HdsAccordion @useCds={{true}} @type={{type}} as |A|>
          <A.Item>
            <:toggle>Item one</:toggle>
            <:content>
              <ShwPlaceholder @text="generic content" @height="40" />
            </:content>
          </A.Item>
          <A.Item>
            <:toggle>Item two</:toggle>
            <:content>
              <ShwPlaceholder @text="generic content" @height="40" />
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>useCds across sizes</ShwTextH3>

  {{#each SIZES as |size|}}
    <ShwGrid @columns={{1}} @gap="1rem" as |SG|>
      <SG.Item @label={{capitalize size}}>
        <HdsAccordion @useCds={{true}} @size={{size}} as |A|>
          <A.Item>
            <:toggle>Item one</:toggle>
            <:content>
              <ShwPlaceholder @text="generic content" @height="40" />
            </:content>
          </A.Item>
          <A.Item>
            <:toggle>Item two</:toggle>
            <:content>
              <ShwPlaceholder @text="generic content" @height="40" />
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>useCds-only args: @disabled and @alignment</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="@disabled={{true}}">
      <HdsAccordion @useCds={{true}} @disabled={{true}} as |A|>
        <A.Item>
          <:toggle>Item one</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
        <A.Item>
          <:toggle>Item two</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="alignment start">
      <HdsAccordion
        @useCds={{true}}
        @alignment={{ACCORDION_ALIGNMENT.START}}
        as |A|
      >
        <A.Item>
          <:toggle>Item one</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
        <A.Item>
          <:toggle>Item two</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionUseCds;
