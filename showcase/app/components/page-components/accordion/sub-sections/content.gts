/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsAccordion,
  HdsAlert,
  HdsButton,
  HdsFormTextInputField,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';

import CodeFragmentWithExternalControl from '../code-fragments/with-external-control';
import CodeFragmentWithPlaceholderContent from '../code-fragments/with-placeholder-content';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwTextH3>Generic content</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    {{#each TYPES as |type|}}
      <SG.Item @label="{{capitalize type}} with generic content in toggle">
        <HdsAccordion @type={{type}} as |A|>
          <A.Item>
            <:toggle>
              <ShwPlaceholder @text="generic content" @height="24" />
            </:toggle>
            <:content>
              <ShwPlaceholder @text="generic content" @height="40" />
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Rich content</ShwTextH3>

  <ShwFlex
    @direction="column"
    @gap="2rem"
    {{style marginBottom="2rem"}}
    as |SF|
  >
    <SF.Item @label="With rich content in toggle (HTML header tag)">
      <HdsAccordion as |A|>
        <A.Item>
          <:toggle>
            <h4 class="hds-typography-display-300">Header tag example</h4>
          </:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      </HdsAccordion>
    </SF.Item>
  </ShwFlex>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="With interactive content in toggle and in toggled content">
      <HdsAccordion as |A|>
        <A.Item @containsInteractive={{true}} @isOpen={{true}}>
          <:toggle>
            <div
              class="shw-component-accordion-layout shw-component-accordion-layout--justify"
            >
              <span>
                Related text
                <a href="https://www.hashicorp.com/">A link</a>
              </span>

              <HdsButton @text="Details" @color="secondary" @size="small" />
            </div>
          </:toggle>
          <:content>
            <HdsFormTextInputField @type="email" as |F|>
              <F.Label>Email</F.Label>
            </HdsFormTextInputField>
            <p>
              <HdsButton @text="Submit" />
            </p>
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>

    <SG.Item
      @label="With rich content in toggle (Alert) and containing a table"
    >
      <HdsAccordion as |A|>
        <A.Item @isOpen={{true}}>
          <:toggle>
            <HdsAlert @type="compact" @color="success" as |A|>
              <A.Title>Title</A.Title>
              <A.Description>Plan finished
                <small>22 days ago</small></A.Description>
            </HdsAlert>
          </:toggle>
          <:content>
            <p class="hds-typography-body-200">
              <strong>Queued:</strong>
              9 days ago >
              <strong>Finished:</strong>
              9 days ago
            </p>
            <HdsTable @caption="Example table">
              <:head as |H|>
                <H.Tr>
                  <H.Th>Name</H.Th>
                  <H.Th>Type</H.Th>
                  <H.Th>Value</H.Th>
                </H.Tr>
              </:head>
              <:body as |B|>
                <B.Tr>
                  <B.Td>Cell one A</B.Td>
                  <B.Td>Cell two A</B.Td>
                  <B.Td>Cell three A</B.Td>
                </B.Tr>
                <B.Tr>
                  <B.Td>Cell one B</B.Td>
                  <B.Td>Cell two B</B.Td>
                  <B.Td>Cell three B</B.Td>
                </B.Tr>
              </:body>
            </HdsTable>
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Nested Accordions</ShwTextH3>

  {{#each TYPES as |type|}}
    <ShwTextH4>{{capitalize type}}</ShwTextH4>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item {{style flex="1"}}>
        <HdsAccordion @type={{type}} as |A|>
          <A.Item @isOpen={{true}}>
            <:toggle>Item one</:toggle>
            <:content>
              <CodeFragmentWithPlaceholderContent
                @type={{type}}
                @labelPrefix="Nested"
              />
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>

      <SG.Item {{style flex="1"}}>
        <HdsAccordion @type={{type}} as |A|>
          <A.Item @isOpen={{true}}>
            <:toggle>Item one</:toggle>
            <:content>
              <CodeFragmentWithPlaceholderContent
                @type={{type}}
                @numberOfItems={{2}}
                @labelPrefix="Nested"
              />
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    </ShwGrid>

    <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
      <SG.Item
        @label="Nested Accordion with containsInteractive=true nested in containsInteractive=false"
      >
        <HdsAccordion @type={{type}} as |A|>
          <A.Item @isOpen={{true}}>
            <:toggle>Item with containsInteractive=false (the default)</:toggle>
            <:content>
              <HdsAccordion @type={{type}} as |AA|>
                <AA.Item @containsInteractive={{true}}>
                  <:toggle>Nested item with containsInteractive=true</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </AA.Item>
              </HdsAccordion>
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>

      <SG.Item
        @label="Nested Accordion with containsInteractive=false nested in containsInteractive=true"
      >
        <HdsAccordion @type={{type}} as |A|>
          <A.Item @isOpen={{true}} @containsInteractive={{true}}>
            <:toggle>Item with containsInteractive=true</:toggle>
            <:content>
              <HdsAccordion @type={{type}} as |AA|>
                <AA.Item>
                  <:toggle>Nested item with containsInteractive=false (the
                    default)</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </AA.Item>
              </HdsAccordion>
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwTextH4>Mixed</ShwTextH4>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="type=flush nested in type=card" {{style flex="1"}}>
      <HdsAccordion as |A|>
        <A.Item @isOpen={{true}}>
          <:toggle>Item one</:toggle>
          <:content>
            <HdsAccordion @type="flush" as |AA|>
              <AA.Item>
                <:toggle>Nested item one</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </AA.Item>
              <AA.Item @containsInteractive={{true}}>
                <:toggle>Nested item two</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </AA.Item>
            </HdsAccordion>
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="type=card nested in type=flush" {{style flex="1"}}>
      <HdsAccordion @type="flush" as |A|>
        <A.Item @isOpen={{true}}>
          <:toggle>Item one</:toggle>
          <:content>
            <HdsAccordion as |AA|>
              <AA.Item>
                <:toggle>Nested item one</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </AA.Item>
              <AA.Item @containsInteractive={{true}}>
                <:toggle>Nested item two</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </AA.Item>
            </HdsAccordion>
          </:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Externally controlled</ShwTextH3>

  <ShwGrid {{style gap="2rem"}} @columns={{2}} as |SG|>
    <SG.Item @label="All items">
      <CodeFragmentWithExternalControl @variant="all" />
    </SG.Item>
    <SG.Item @label="Single item">
      <CodeFragmentWithExternalControl @variant="single" />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Custom title tag</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    {{#each TYPES as |type|}}
      <SG.Item @label="With a custom title tag">
        <CodeFragmentWithPlaceholderContent @type={{type}} @titleTag="h2" />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Edge cases</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    {{#each TYPES as |type|}}
      <SG.Item @label="With long content in toggle which wraps">
        <HdsAccordion @type={{type}} as |A|>
          <A.Item>
            <:toggle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              culpa expedita assumenda at nisi minus unde fuga iure suscipit aut
              qui, odit natus eum voluptates ut molestiae! Perferendis, impedit
              qui? Lorem ipsum dolor sit amet?
            </:toggle>
            <:content>
              <ShwPlaceholder @text="generic content" @height="40" />
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionContent;
