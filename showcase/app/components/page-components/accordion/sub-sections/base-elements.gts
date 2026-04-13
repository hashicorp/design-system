/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
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

import { HdsAccordionItem } from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/accordion/types';

const STATES = ['default', 'active', 'hover', 'focus'] as const;

function getMockStateSelector(
  type: (typeof TYPES)[number],
  state: (typeof STATES)[number],
  containsInteractive: boolean,
): string {
  if (containsInteractive) {
    return '.hds-accordion-item__button';
  } else {
    if (type === 'card') {
      return state === 'focus' ? '.hds-accordion-item__button' : '';
    } else if (type === 'flush') {
      return state === 'focus'
        ? '.hds-accordion-item__button'
        : '.hds-disclosure-primitive__toggle';
    }
  }

  return '';
}

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
                      mock-state-selector={{getMockStateSelector
                        type
                        state
                        containsInteractive
                      }}
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
</template>;

export default SubSectionBaseElements;
