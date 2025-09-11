/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';
import { hash, array, concat } from '@ember/helper';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';

import CodeFragmentWithButtonTrigger from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-button-trigger';

const SubSectionInteraction: TemplateOnlyComponent = <template>
  <ShwTextH2>Interaction</ShwTextH2>

  <ShwGrid @columns={{4}} @gap="2rem" {{style align-items="center"}} as |SG|>
    {{#let (array "soft" "click") as |interactionVariants|}}
      {{#each interactionVariants as |interaction|}}
        <SG.Item
          @label={{if (eq interaction "soft") 'Hover/Focus ("Soft")' "Click"}}
        >
          <HdsPopoverPrimitive
            @enableSoftEvents={{eq interaction "soft"}}
            @enableClickEvents={{eq interaction "click"}}
            as |PP|
          >
            <div
              class="shw-utilities-popover-primitive-fake-container"
              {{PP.setupPrimitiveContainer}}
            >
              <button
                type="button"
                class="shw-utilities-popover-primitive-fake-toggle"
                {{PP.setupPrimitiveToggle}}
              >Toggle</button>
              <div
                class="shw-utilities-popover-primitive-fake-popover"
                {{PP.setupPrimitivePopover
                  anchoredPositionOptions=(hash
                    enableCollisionDetection=true
                    offsetOptions=16
                    arrowSelector=(concat "#" "arrow-interaction-" interaction)
                  )
                }}
              >
                <div
                  id="arrow-interaction-{{interaction}}"
                  class="shw-utilities-popover-primitive-fake-arrow"
                />
                <div class="shw-component-popover-primitive-interaction-bubble">
                  <button
                    type="button"
                    {{on "click" PP.hidePopover}}
                    title="Button that closes the popover on click"
                  >x</button>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet consectetur
                    </li>
                    <li>
                      <a href="https://google.com">Link to Google</a>
                    </li>
                    <li>
                      <button type="button" {{on "click" PP.hidePopover}}>Got
                        it!</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </HdsPopoverPrimitive>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>In combination with <code>@isOpen</code></ShwTextH3>

  {{#let (array false true) as |booleans|}}
    {{#each booleans as |isOpen|}}
      <ShwGrid
        @columns={{3}}
        @gap="2rem"
        {{style margin-bottom="4rem"}}
        as |SG|
      >
        {{#let (array "none" "soft" "click") as |interactionVariants|}}
          {{#each interactionVariants as |interaction|}}
            <SG.Item @label={{concat interaction " / isOpen={{" isOpen "}}"}}>
              <CodeFragmentWithButtonTrigger
                @hasArrow={{true}}
                @arrowId={{concat
                  "arrow-interaction-isopen-"
                  isOpen
                  "-"
                  interaction
                }}
                @isOpen={{isOpen}}
                @enableClickEvents={{eq interaction "click"}}
                @enableSoftEvents={{eq interaction "soft"}}
                @enableCollisionDetection={{true}}
              />
            </SG.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>
    {{/each}}
  {{/let}}
</template>;

export default SubSectionInteraction;
