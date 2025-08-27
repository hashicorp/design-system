/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';

import { INTERACTION_STATES } from 'showcase/utils/component-states';
import NOOP from 'showcase/utils/noop';

import { SIZES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';
import HdsAccordionItemButton from '@hashicorp/design-system-components/components/hds/accordion/item/button';

export interface SectionAccordionItemButtonStatesSignature {
  Element: HTMLDivElement;
}

const SectionAccordionItemButtonStates: TemplateOnlyComponent<SectionAccordionItemButtonStatesSignature> =
  <template>
    {{#each SIZES as |size|}}
      {{#let (array false true) as |booleans|}}
        {{#each booleans as |bool|}}
          <ShwFlex
            @label="size={{size}}, parentContainsInteractive={{bool}}"
            @gap="2rem"
            {{style justifyContent="space-between"}}
            as |SF|
          >
            {{#each INTERACTION_STATES as |state|}}
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

export default SectionAccordionItemButtonStates;
