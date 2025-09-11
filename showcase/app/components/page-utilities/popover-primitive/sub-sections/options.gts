/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';
import { hash, array, concat, get } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwAutoscrollable from 'showcase/components/shw/autoscrollable';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import type { HdsAnchoredPositionOptions } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';
import { PLACEMENTS } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';

import CodeFragmentWithPlaceholderTrigger from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-placeholder-trigger';
import CodeFragmentWithButtonTrigger from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-button-trigger';

const DETECTIONS: HdsAnchoredPositionOptions['enableCollisionDetection'][] = [
  false,
  true,
  'flip',
  'shift',
  'auto',
];
const STRATEGIES: HdsAnchoredPositionOptions['strategy'][] = [
  'absolute',
  'fixed',
];

const SubSectionOptions: TemplateOnlyComponent = <template>
  <ShwTextH2>Options</ShwTextH2>

  <ShwTextH3>Display</ShwTextH3>

  <ShwTextH4>Placement</ShwTextH4>

  <ShwGrid
    class="shw-utilities-popover-primitive-placement-grid"
    @columns={{5}}
    as |SG|
  >
    {{#each PLACEMENTS as |place|}}
      <SG.Item
        class="shw-utilities-popover-primitive-placement-grid__item--{{place}}"
      >
        <div class="shw-utilities-popover-primitive-placement-grid__target">
          <CodeFragmentWithPlaceholderTrigger @placement={{place}} />
        </div>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH4>With arrow</ShwTextH4>

  <ShwGrid
    class="shw-utilities-popover-primitive-placement-grid"
    @columns={{5}}
    as |SG|
  >
    {{#each PLACEMENTS as |placement|}}
      <SG.Item
        class="shw-utilities-popover-primitive-placement-grid__item--{{placement}}"
      >
        <div class="shw-utilities-popover-primitive-placement-grid__target">
          <CodeFragmentWithPlaceholderTrigger
            @placement={{placement}}
            @hasArrow={{true}}
          />
        </div>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Offset</ShwTextH3>

  <ShwTextH4>offsetOptions</ShwTextH4>

  {{#let (array false true) as |booleans|}}
    {{#each booleans as |popoverHasArrow|}}
      <ShwGrid
        @columns={{4}}
        @gap="2rem"
        {{style margin-bottom="8rem"}}
        as |SF|
      >
        {{#let
          (array
            (hash label="not set" offset=0)
            (hash label="16" offset=16)
            (hash
              label="{ mainAxis: 40, crossAxis: 0 }"
              offset=(hash mainAxis=40 crossAxis=0)
            )
            (hash
              label="{ mainAxis: 16, crossAxis: 100 }"
              offset=(hash mainAxis=16 crossAxis=100)
            )
          )
          as |offsetOptionsVariants|
        }}
          {{#each offsetOptionsVariants as |offsetOptionsVariant count|}}
            <SF.Item
              @label={{if
                (eq popoverHasArrow false)
                (get offsetOptionsVariant "label")
              }}
            >
              <CodeFragmentWithPlaceholderTrigger
                @hasArrow={{popoverHasArrow}}
                @offset={{get offsetOptionsVariant "offset"}}
                @arrowId={{if popoverHasArrow (concat "arrow-offset-" count)}}
              />
            </SF.Item>
          {{/each}}
        {{/let}}
      </ShwGrid>

    {{/each}}
  {{/let}}

  <ShwTextH4>arrowPadding</ShwTextH4>

  <ShwGrid @columns={{4}} @gap="2rem" {{style margin-bottom="8rem"}} as |SF|>
    {{#let
      (array (hash label="not set") (hash label="32" arrowPadding=32))
      as |arrowPaddingVariants|
    }}
      {{#each arrowPaddingVariants as |arrowPaddingVariant count|}}
        <SF.Item @label={{get arrowPaddingVariant "label"}}>
          <CodeFragmentWithPlaceholderTrigger
            @placement="bottom-start"
            @hasArrow={{true}}
            @arrowId={{concat "arrow-padding-" count}}
            @arrowPadding={{get arrowPaddingVariant "arrowPadding"}}
          />
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Strategy</ShwTextH3>

  <ShwGrid @columns={{4}} @gap="2rem" {{style margin-bottom="8rem"}} as |SF|>
    {{#each STRATEGIES as |strategy|}}
      <SF.Item @label={{strategy}}>
        <CodeFragmentWithButtonTrigger
          @strategy={{strategy}}
          @hasArrow={{true}}
          @arrowId={{concat "arrow-strategy-" strategy}}
        />
      </SF.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Collision detection</ShwTextH3>

  <ShwTextBody>Scroll within the boxes to see the collision detection in action</ShwTextBody>

  <ShwGrid @columns={{4}} @gap="2rem" {{style margin-bottom="6rem"}} as |SF|>
    {{#each DETECTIONS as |detection|}}
      <SF.Item
        @forceMinWidth={{true}}
        @label={{concat "enableCollisionDetection=" detection}}
      >
        <ShwAutoscrollable @verticalShift={{20}}>
          <div
            class="shw-utilities-popover-primitive-collision-detection-wrapper"
          >
            <CodeFragmentWithButtonTrigger
              @arrowId={{concat "arrow-collision-detection-" detection}}
              @hasArrow={{true}}
              @enableCollisionDetection={{detection}}
            />
          </div>
        </ShwAutoscrollable>
      </SF.Item>
      {{#if (eq detection true)}}
        <SF.Item />
        <SF.Item />
      {{else if (eq detection "auto")}}
        <SF.Item />
      {{/if}}
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionOptions;
