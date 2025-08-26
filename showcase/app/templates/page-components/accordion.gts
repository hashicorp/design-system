/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import { eq, lt, and, or, not, notEq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { INTERACTION_STATES } from 'showcase/utils/component-states';

import {
  HdsAccordion,
  HdsAccordionItem,
  HdsAlert,
  HdsButton,
  HdsCardContainer,
  HdsFlyout,
  HdsFormTextInputField,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';
import { TYPES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';

import MockWithExternalControl from 'showcase/components/page-components/accordion/examples/MockWithExternalControl';

import MatrixAccordionItemButton from 'showcase/components/page-components/accordion/sections/matrix-accordion-item-button';

export interface PageComponentsAccordionSignature {
  Element: HTMLDivElement;
}

const PageComponentsAccordion: TemplateOnlyComponent<PageComponentsAccordionSignature> =
  <template>
    {{pageTitle "Accordion Component"}}

    <ShwTextH1>Accordion</ShwTextH1>

    <section data-test-percy>

      <ShwTextH2>Type</ShwTextH2>

      {{#each TYPES as |type index|}}
        <ShwTextH3>{{capitalize type}}</ShwTextH3>

        <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
          <SG.Item @label="One item">
            <HdsAccordion @type={{type}} as |A|>
              <A.Item>
                <:toggle>Item one</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>
            </HdsAccordion>
          </SG.Item>

          <SG.Item @label="Multiple items">
            <HdsAccordion @type={{type}} as |A|>
              <A.Item>
                <:toggle>Item one</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>

              <A.Item @isStatic={{true}}>
                <:toggle>Item two</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>

              <A.Item @containsInteractive={{true}}>
                <:toggle>Item three</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>
            </HdsAccordion>
          </SG.Item>
        </ShwGrid>

        {{#if (lt index 1)}}
          <ShwDivider @level={{2}} />
        {{/if}}
      {{/each}}

      <ShwDivider />

      <ShwTextH2>Size</ShwTextH2>

      {{#each SIZES as |size index|}}
        <ShwTextH3>{{capitalize size}}</ShwTextH3>

        <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
          {{#each TYPES as |type|}}
            <SG.Item @label={{type}}>
              <HdsAccordion @size={{size}} @type={{type}} as |A|>
                <A.Item>
                  <:toggle>Item one</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </A.Item>

                <A.Item @isStatic={{true}}>
                  <:toggle>Item two</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </A.Item>

                <A.Item @containsInteractive={{true}}>
                  <:toggle>Item three</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </A.Item>
              </HdsAccordion>
            </SG.Item>
          {{/each}}
        </ShwGrid>

        {{#if (lt index 2)}}
          <ShwDivider @level={{2}} />
        {{/if}}
      {{/each}}

      <ShwDivider />

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
        <SG.Item
          @label="With interactive content in toggle and in toggled content"
        >
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
                  <HdsAccordion @type={{type}} as |AA|>
                    <AA.Item>
                      <:toggle>Nested item one</:toggle>
                      <:content>
                        <ShwPlaceholder @text="generic content" @height="40" />
                      </:content>
                    </AA.Item>
                  </HdsAccordion>
                </:content>
              </A.Item>
            </HdsAccordion>
          </SG.Item>

          <SG.Item {{style flex="1"}}>
            <HdsAccordion @type={{type}} as |A|>
              <A.Item @isOpen={{true}}>
                <:toggle>Item one</:toggle>
                <:content>
                  <HdsAccordion @type={{type}} as |AA|>
                    <AA.Item>
                      <:toggle>Nested item one</:toggle>
                      <:content>
                        <ShwPlaceholder @text="generic content" @height="40" />
                      </:content>
                    </AA.Item>
                    <AA.Item>
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
          <MockWithExternalControl @variant="all" />
        </SG.Item>
        <SG.Item @label="Single item">
          <MockWithExternalControl @variant="single" />
        </SG.Item>
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Custom title tag</ShwTextH3>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#each TYPES as |type|}}
          <SG.Item @label="With a custom title tag">
            <HdsAccordion @type={{type}} @titleTag="h2" as |A|>
              <A.Item>
                <:toggle>
                  Item one
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

      <ShwTextH3>Edge cases</ShwTextH3>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#each TYPES as |type|}}
          <SG.Item @label="With long content in toggle which wraps">
            <HdsAccordion @type={{type}} as |A|>
              <A.Item>
                <:toggle>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero culpa expedita assumenda at nisi minus unde fuga iure
                  suscipit aut qui, odit natus eum voluptates ut molestiae!
                  Perferendis, impedit qui? Lorem ipsum dolor sit amet?
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

      <ShwTextH2>Context</ShwTextH2>

      <ShwTextH3>Flush Accordion used within containers</ShwTextH3>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        <SG.Item @label="In a Card w/ no padding">
          <HdsCardContainer @hasBorder={{true}}>
            <HdsAccordion @type="flush" as |A|>
              <A.Item>
                <:toggle>Item one</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>

              <A.Item @isStatic={{true}}>
                <:toggle>Item two</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>

              <A.Item @containsInteractive={{true}}>
                <:toggle>Item three</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>
            </HdsAccordion>
          </HdsCardContainer>
        </SG.Item>

        <SG.Item @label="in a Card w/ padding">
          <HdsCardContainer @hasBorder={{true}} {{style padding="16px"}}>
            <HdsAccordion @type="flush" as |A|>
              <A.Item>
                <:toggle>Item one</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>

              <A.Item @isStatic={{true}}>
                <:toggle>Item two</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>

              <A.Item @containsInteractive={{true}}>
                <:toggle>Item three</:toggle>
                <:content>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </:content>
              </A.Item>
            </HdsAccordion>
          </HdsCardContainer>
        </SG.Item>

        <SG.Item @label="in a Flyout" class="shw-component-flyout-sample-item">
          <HdsFlyout open id="flyout-example-one-action" as |F|>
            <F.Header>Title</F.Header>
            <F.Body>
              <HdsAccordion @type="flush" as |A|>
                <A.Item>
                  <:toggle>Item one</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </A.Item>

                <A.Item @isStatic={{true}}>
                  <:toggle>Item two</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </A.Item>

                <A.Item @containsInteractive={{true}}>
                  <:toggle>Item three</:toggle>
                  <:content>
                    <ShwPlaceholder @text="generic content" @height="40" />
                  </:content>
                </A.Item>
              </HdsAccordion>
            </F.Body>
            <F.Footer>
              <HdsButton type="submit" @text="Primary" />
            </F.Footer>
          </HdsFlyout>
        </SG.Item>
      </ShwGrid>

      <ShwDivider />

      <ShwTextH2>Base elements</ShwTextH2>

      <ShwTextH3>AccordionItem</ShwTextH3>

      <ShwTextH4>Type</ShwTextH4>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#each TYPES as |type|}}
          <SG.Item @label="type={{type}}">
            <HdsAccordionItem @type={{type}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
        {{#each TYPES as |type|}}
          <SG.Item @label="type={{type}}, containsInteractive=true">
            <HdsAccordionItem @containsInteractive={{true}} @type={{type}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH4>isOpen</ShwTextH4>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#each TYPES as |type|}}
          <SG.Item @label="isOpen=false (default)">
            <HdsAccordionItem @type={{type}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
        {{#each TYPES as |type|}}
          <SG.Item @label="isOpen=true">
            <HdsAccordionItem @type={{type}} @isOpen={{true}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH4>containsInteractive</ShwTextH4>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#each TYPES as |type|}}
          <SG.Item @label="containsInteractive=false (default)">
            <HdsAccordionItem @type={{type}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
        {{#each TYPES as |type|}}
          <SG.Item @label="containsInteractive=true">
            <HdsAccordionItem @type={{type}} @containsInteractive={{true}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH4>isStatic</ShwTextH4>

      <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
        {{#each TYPES as |type|}}
          <SG.Item @label="isStatic=true">
            <HdsAccordionItem @type={{type}} @isStatic={{true}}>
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>

          <SG.Item @label="isStatic=true, containsInteractive=true">
            <HdsAccordionItem
              @type={{type}}
              @isStatic={{true}}
              @containsInteractive={{true}}
            >
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>

          <SG.Item @label="isStatic=true, isOpen=true">
            <HdsAccordionItem
              @type={{type}}
              @isStatic={{true}}
              @isOpen={{true}}
            >
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>

          <SG.Item
            @label="isStatic=true, containsInteractive=true, isOpen=true"
          >
            <HdsAccordionItem
              @type={{type}}
              @isStatic={{true}}
              @containsInteractive={{true}}
              @isOpen={{true}}
            >
              <:toggle>Item one</:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </HdsAccordionItem>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH4>Close</ShwTextH4>

      <ShwFlex
        {{style gap="2rem" marginBottom="2rem"}}
        @direction="column"
        as |SF|
      >
        <SF.Item @label="Close action within content">
          <HdsAccordionItem>
            <:toggle>Item one</:toggle>
            <:content as |c|>
              <button
                type="button"
                {{style padding=".25rem" marginBottom="1rem"}}
                {{on "click" c.close}}
              >Close</button>
            </:content>
          </HdsAccordionItem>
        </SF.Item>
      </ShwFlex>

      <ShwDivider @level={{2}} />

      <ShwTextH4>States</ShwTextH4>

      {{#each TYPES as |type|}}
        {{#let (array false true) as |booleans|}}
          <ShwTextBody>{{capitalize type}}</ShwTextBody>
          <ShwGrid @columns={{4}} @gap="2rem" as |SG|>
            {{#each INTERACTION_STATES as |state|}}
              <SG.Item @label={{state}}>
                <ShwFlex @direction="column" @gap="2rem" as |SF|>
                  {{#each booleans as |containsInteractive|}}
                    {{#each booleans as |isOpen|}}
                      <SF.Item>
                        <HdsAccordionItem
                          @containsInteractive={{containsInteractive}}
                          @isOpen={{isOpen}}
                          @type={{type}}
                          mock-state-value={{state}}
                          mock-state-selector="{{if
                            (and
                              (or (eq state 'active') (eq state 'hover'))
                              (not containsInteractive)
                            )
                            '.hds-disclosure-primitive__toggle'
                            (if
                              (notEq state 'hover')
                              '.hds-accordion-item__button'
                            )
                          }}"
                        >
                          <:toggle>Item</:toggle>
                          <:content>
                            <ShwPlaceholder
                              @text="generic content"
                              @height="40"
                            />
                          </:content>
                        </HdsAccordionItem>
                      </SF.Item>
                    {{/each}}
                  {{/each}}
                </ShwFlex>
              </SG.Item>
            {{/each}}
          </ShwGrid>
          <ShwDivider @level={{2}} />
        {{/let}}
      {{/each}}

      <ShwTextH3>AccordionItemButton</ShwTextH3>

      <ShwTextH4>States</ShwTextH4>
      <MatrixAccordionItemButton />
    </section>
  </template>;

export default PageComponentsAccordion;
