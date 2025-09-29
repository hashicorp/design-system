/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq, and, or, not, notEq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import NOOP from 'showcase/utils/noop';

import { HdsAccordionItem } from '@hashicorp/design-system-components/components';
import HdsAccordionItemButton from '@hashicorp/design-system-components/components/hds/accordion/item/button';
import {
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/accordion/item/index';

const STATES = ['default', 'active', 'hover', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
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
        <HdsAccordionItem @type={{type}} @isStatic={{true}} @isOpen={{true}}>
          <:toggle>Item one</:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </HdsAccordionItem>
      </SG.Item>

      <SG.Item @label="isStatic=true, containsInteractive=true, isOpen=true">
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

  <ShwFlex {{style gap="2rem" marginBottom="2rem"}} @direction="column" as |SF|>
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

  {{! This one is broken }}
  {{#each TYPES as |type|}}
    {{#let (array false true) as |booleans|}}
      <ShwTextBody>{{capitalize type}}</ShwTextBody>
      <ShwGrid @columns={{4}} @gap="2rem" as |SG|>
        {{#each STATES as |state|}}
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
                        (if (notEq state 'hover') '.hds-accordion-item__button')
                      }}"
                    >
                      <:toggle>Item</:toggle>
                      <:content>
                        <ShwPlaceholder @text="generic content" @height="40" />
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
  {{#each SIZES as |size|}}
    {{#let (array false true) as |booleans|}}
      {{#each booleans as |bool|}}
        <ShwFlex
          @label="size={{size}}, parentContainsInteractive={{bool}}"
          @gap="2rem"
          {{style justifyContent="space-between"}}
          as |SF|
        >
          {{#each STATES as |state|}}
            <SF.Item @label={{state}}>
              <div
                class="shw-component-accordion-standalone-button hds-accordion-item--size-{{size}}"
              >
                <HdsAccordionItemButton
                  @parentContainsInteractive={{bool}}
                  @onClickToggle={{NOOP}}
                  @size={{size}}
                  mock-state-value={{state}}
                  aria-label={{state}}
                />
              </div>
            </SF.Item>
          {{/each}}

          <SF.Item @label="isOpen=true">
            <div
              class="shw-component-accordion-standalone-button hds-accordion-item--size-{{size}}"
            >
              <HdsAccordionItemButton
                @parentContainsInteractive={{bool}}
                @isOpen={{true}}
                @onClickToggle={{NOOP}}
                @size={{size}}
                aria-label="open is true"
              />
            </div>
          </SF.Item>

          <SF.Item
            @label="focus & isOpen=true"
            {{style width="calc(20% - 2rem)" position="relative"}}
          >
            <div
              class="shw-component-accordion-standalone-button hds-accordion-item--size-{{size}}"
            >
              <HdsAccordionItemButton
                @parentContainsInteractive={{bool}}
                @isOpen={{true}}
                @onClickToggle={{NOOP}}
                @size={{size}}
                mock-state-value="focus"
                aria-label="focused and is open"
              />
            </div>
          </SF.Item>
        </ShwFlex>
      {{/each}}
    {{/let}}
  {{/each}}
</template>;

export default SubSectionBaseElements;
