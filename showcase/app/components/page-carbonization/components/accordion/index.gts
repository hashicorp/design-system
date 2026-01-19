/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq, lt } from 'ember-truth-helpers';
import { get, hash, array } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import NOOP from 'showcase/utils/noop';

import {
  HdsAccordion,
  HdsAccordionItem,
  HdsBadge,
  HdsLayoutFlex,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import HdsAccordionItemButton from '@hashicorp/design-system-components/components/hds/accordion/item/button';
import {
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/accordion/item/index';

import CodeFragmentWithPlaceholderContent from '../../../page-components/accordion/code-fragments/with-placeholder-content';
import CodeFragmentWithToggleVariants from '../../../page-components/accordion/code-fragments/with-toggle-variants';
import { getMockStateSelector } from '../../../page-components/accordion/sub-sections/base-elements';

const STATES = ['default', 'active', 'hover', 'focus'];

const AccordionCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Accordion - Carbonization"}}

  <ShwTextH1>Accordion - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Type</ShwTextH2>

    {{#each TYPES as |type index|}}
      <ShwTextH3>{{capitalize type}}</ShwTextH3>
      <ShwCarbonizationComparisonGrid @label="One item">
        <:theming>
          <CodeFragmentWithPlaceholderContent @type={{type}} />
        </:theming>
        <:reference>
          <cds-accordion
            alignment={{if (eq type "flush") "end" "start"}}
            isFlush={{eq type "flush"}}
          >
            <cds-accordion-item title="Item one">
              <ShwPlaceholder @text="generic content" @height="40" />
            </cds-accordion-item>
          </cds-accordion>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwCarbonizationComparisonGrid @label="Multiple items">
        <:theming>
          <CodeFragmentWithToggleVariants @type={{type}} />
        </:theming>
        <:reference>
          <cds-accordion
            alignment={{if (eq type "flush") "end" "start"}}
            isFlush={{eq type "flush"}}
          >
            <cds-accordion-item title="Item one">
              <ShwPlaceholder @text="generic content" @height="40" />
            </cds-accordion-item>
            <cds-accordion-item title="Item two">
              <ShwPlaceholder @text="generic content" @height="40" />
            </cds-accordion-item>
            <cds-accordion-item title="Item three">
              <ShwPlaceholder @text="generic content" @height="40" />
            </cds-accordion-item>
          </cds-accordion>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      {{#if (lt index 1)}}
        <ShwDivider @level={{2}} />
      {{/if}}
    {{/each}}

    <ShwDivider />

    <ShwTextH2>Size</ShwTextH2>

    {{#each SIZES as |size index|}}
      <ShwTextH3>{{capitalize size}}</ShwTextH3>

      {{#each TYPES as |type|}}
        <ShwCarbonizationComparisonGrid @label={{type}}>
          <:theming>
            <CodeFragmentWithToggleVariants @size={{size}} @type={{type}} />
          </:theming>
          <:reference>
            {{#let (hash small="sm" medium="md" large="lg") as |sizeMap|}}
              <cds-accordion
                alignment={{if (eq type "flush") "end" "start"}}
                isFlush={{eq type "flush"}}
                size={{get sizeMap size}}
              >
                <cds-accordion-item title="Item one">
                  <ShwPlaceholder @text="generic content" @height="40" />
                </cds-accordion-item>
                <cds-accordion-item title="Item two">
                  <ShwPlaceholder @text="generic content" @height="40" />
                </cds-accordion-item>
                <cds-accordion-item title="Item three">
                  <ShwPlaceholder @text="generic content" @height="40" />
                </cds-accordion-item>
              </cds-accordion>
            {{/let}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      {{#if (lt index 2)}}
        <ShwDivider @level={{2}} />
      {{/if}}
    {{/each}}

    <ShwDivider />

    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Generic content</ShwTextH3>

    {{#each TYPES as |type|}}
      <ShwCarbonizationComparisonGrid
        @label="{{capitalize type}} with generic content in toggle"
      >
        <:theming>
          <HdsAccordion @type={{type}} as |A|>
            <A.Item @isOpen={{true}}>
              <:toggle>
                <ShwPlaceholder @text=":toggle" @height="24" />
              </:toggle>
              <:content>
                <ShwPlaceholder @text=":content" @height="40" />
              </:content>
            </A.Item>
          </HdsAccordion>
        </:theming>
        <:reference>
          <cds-accordion
            alignment={{if (eq type "flush") "end" "start"}}
            isFlush={{eq type "flush"}}
          >
            <cds-accordion-item open="true">
              <ShwPlaceholder @text=":toggle" @height="24" slot="title" />
              <ShwPlaceholder @text=":content" @height="40" />
            </cds-accordion-item>
          </cds-accordion>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Rich content</ShwTextH3>

    {{#each TYPES as |type|}}
      <ShwCarbonizationComparisonGrid
        @label="{{capitalize type}} with rich content in toggle"
      >
        <:theming>
          <HdsAccordion @type={{type}} as |A|>
            <A.Item @isOpen={{true}}>
              <:toggle>
                <HdsLayoutFlex @align="center" @gap="8" as |LF|>
                  <LF.Item @grow={{true}} @shrink={{false}}>
                    <HdsLinkInline
                      @color="secondary"
                      @href="#"
                    >Link</HdsLinkInline>
                  </LF.Item>
                  <LF.Item @grow={{false}}>
                    <HdsBadge @text="New" @size="small" @color="highlight" />
                  </LF.Item>
                </HdsLayoutFlex>
              </:toggle>
              <:content>
                <ShwPlaceholder @text="generic content" @height="40" />
              </:content>
            </A.Item>
          </HdsAccordion>
        </:theming>
        <:reference>
          <cds-accordion
            alignment={{if (eq type "flush") "end" "start"}}
            isFlush={{eq type "flush"}}
          >
            <cds-accordion-item open="true">
              <HdsLayoutFlex @align="center" @gap="8" slot="title" as |LF|>
                <LF.Item @grow={{true}} @shrink={{false}}>
                  <HdsLinkInline
                    @color="secondary"
                    @href="#"
                  >Link</HdsLinkInline>
                </LF.Item>
                <LF.Item @grow={{false}}>
                  <HdsBadge @text="New" @size="small" @color="highlight" />
                </LF.Item>
              </HdsLayoutFlex>
              <ShwPlaceholder @text="generic content" @height="40" />
            </cds-accordion-item>
          </cds-accordion>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Nested Accordions</ShwTextH3>

    {{#each TYPES as |type|}}
      <ShwTextH4>{{capitalize type}}</ShwTextH4>

      <ShwCarbonizationComparisonGrid>
        <:theming>
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
        </:theming>
        <:reference>
          <cds-accordion
            alignment={{if (eq type "flush") "end" "start"}}
            isFlush={{eq type "flush"}}
          >
            <cds-accordion-item title="Item one" open="true">
              <cds-accordion
                alignment={{if (eq type "flush") "end" "start"}}
                isFlush={{eq type "flush"}}
              >
                <cds-accordion-item title="Nested item one">
                  <ShwPlaceholder @text="generic content" @height="40" />
                </cds-accordion-item>
              </cds-accordion>
            </cds-accordion-item>
          </cds-accordion>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwCarbonizationComparisonGrid>
        <:theming>
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
        </:theming>
        <:reference>
          <cds-accordion
            alignment={{if (eq type "flush") "end" "start"}}
            isFlush={{eq type "flush"}}
          >
            <cds-accordion-item title="Item one" open="true">
              <cds-accordion
                alignment={{if (eq type "flush") "end" "start"}}
                isFlush={{eq type "flush"}}
              >
                <cds-accordion-item title="Nested item one">
                  <ShwPlaceholder @text="generic content" @height="40" />
                </cds-accordion-item>
                <cds-accordion-item title="Nested item two">
                  <ShwPlaceholder @text="generic content" @height="40" />
                </cds-accordion-item>
              </cds-accordion>
            </cds-accordion-item>
          </cds-accordion>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH4>Mixed</ShwTextH4>

    <ShwCarbonizationComparisonGrid @label="type=flush nested in type=card">
      <:theming>
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
      </:theming>
      <:reference>
        <cds-accordion alignment="start">
          <cds-accordion-item title="Item one" open="true">
            <cds-accordion alignment="end" isFlush="true">
              <cds-accordion-item title="Nested item one">
                <ShwPlaceholder @text="generic content" @height="40" />
              </cds-accordion-item>
              <cds-accordion-item title="Nested item two">
                <ShwPlaceholder @text="generic content" @height="40" />
              </cds-accordion-item>
            </cds-accordion>
          </cds-accordion-item>
        </cds-accordion>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="type=card nested in type=flush">
      <:theming>
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
      </:theming>
      <:reference>
        <cds-accordion alignment="end" isFlush="true">
          <cds-accordion-item title="Item one" open="true">
            <cds-accordion alignment="start">
              <cds-accordion-item title="Nested item one">
                <ShwPlaceholder @text="generic content" @height="40" />
              </cds-accordion-item>
              <cds-accordion-item title="Nested item two">
                <ShwPlaceholder @text="generic content" @height="40" />
              </cds-accordion-item>
            </cds-accordion>
          </cds-accordion-item>
        </cds-accordion>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>AccordionItem</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#each TYPES as |type|}}
      {{#let (array false true) as |booleans|}}
        {{#each booleans as |containsInteractive|}}
          <ShwTextBody>{{capitalize type}}
            {{if
              containsInteractive
              " (with interactive content)"
            }}</ShwTextBody>
          {{#each STATES as |state|}}
            <ShwCarbonizationComparisonGrid
              @label={{state}}
              @hideThemeLabels={{true}}
              @hideCarbonLabels={{true}}
            >
              <:theming>
                <ShwFlex @direction="column" as |SF|>
                  {{#each booleans as |isOpen|}}
                    <SF.Item>
                      <HdsAccordionItem
                        @containsInteractive={{containsInteractive}}
                        @isOpen={{isOpen}}
                        @type={{type}}
                        mock-state-value={{state}}
                        mock-state-selector={{getMockStateSelector
                          type
                          state
                          containsInteractive
                        }}
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
                </ShwFlex>
              </:theming>
              <:reference>
                <ShwFlex @direction="column" as |SF|>
                  {{#each booleans as |isOpen|}}
                    <SF.Item>
                      <cds-accordion
                        alignment={{if (eq type "flush") "end" "start"}}
                        isFlush={{eq type "flush"}}
                        open={{isOpen}}
                      >
                        <cds-accordion-item title="Item" open="true">
                          <ShwPlaceholder
                            @text="generic content"
                            @height="40"
                          />
                        </cds-accordion-item>
                      </cds-accordion>
                    </SF.Item>
                  {{/each}}
                </ShwFlex>
              </:reference>
            </ShwCarbonizationComparisonGrid>
          {{/each}}
        {{/each}}
        <ShwDivider @level={{2}} />
      {{/let}}
    {{/each}}

    <ShwTextH3>AccordionItemButton</ShwTextH3>

    <ShwTextH4>States (only with parentContainsInteractive=true)</ShwTextH4>
    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label={{state}}
        @hideThemeLabels={{true}}
        @hideCarbonLabels={{true}}
      >
        <:theming>
          <ShwFlex @gap="0.75rem" as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item>
                <div
                  class="shw-component-accordion-standalone-button hds-accordion-item--size-{{size}}"
                >
                  <HdsAccordionItemButton
                    @parentContainsInteractive={{true}}
                    @onClickToggle={{NOOP}}
                    @size={{size}}
                    mock-state-value={{state}}
                    aria-label={{state}}
                  />
                </div>
              </SF.Item>
            {{/each}}
          </ShwFlex>
        </:theming>
        <:reference>
          <code>???</code>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

  </section>
</template>;

export default AccordionCarbonizationIndex;
