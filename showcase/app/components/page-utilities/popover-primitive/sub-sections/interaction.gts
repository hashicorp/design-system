/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';
import { hash, concat } from '@ember/helper';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';

import CodeFragmentWithButtonTrigger from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-button-trigger';

const INTERACTION_VARIANTS = ['none', 'soft', 'click'];
const IS_OPEN_VARIANTS = [false, true];

const SubSectionInteraction: TemplateOnlyComponent = <template>
  <ShwTextH2>Interaction</ShwTextH2>

  <ShwGrid @columns={{4}} @gap="2rem" {{style align-items="center"}} as |SG|>
    {{#each INTERACTION_VARIANTS as |interaction|}}
      {{#unless (eq interaction "none")}}
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
      {{/unless}}
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>In combination with <code>@isOpen</code></ShwTextH3>

  {{#each IS_OPEN_VARIANTS as |isOpen|}}
    <ShwGrid @columns={{3}} @gap="2rem" {{style margin-bottom="4rem"}} as |SG|>
      {{#each INTERACTION_VARIANTS as |interaction|}}
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
    </ShwGrid>
  {{/each}}
</template>;

export default SubSectionInteraction;
