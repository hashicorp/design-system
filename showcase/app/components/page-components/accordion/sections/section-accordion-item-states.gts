/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import { eq, and, or, not, notEq } from 'ember-truth-helpers';
import { capitalize } from '@ember/string';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';

import { INTERACTION_STATES } from 'showcase/utils/component-states';

import { TYPES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';
import { HdsAccordionItem } from '@hashicorp/design-system-components/components';

export interface SectionAccordionItemStatesSignature {
  Element: HTMLDivElement;
}

const SectionAccordionItemStates: TemplateOnlyComponent<SectionAccordionItemStatesSignature> =
  <template>
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
                            (notEq state 'hover') '.hds-accordion-item__button'
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
  </template>;

export default SectionAccordionItemStates;
