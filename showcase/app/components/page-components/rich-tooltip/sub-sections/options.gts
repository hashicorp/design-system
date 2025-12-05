/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash, concat } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwAutoscrollable from 'showcase/components/shw/autoscrollable';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsRichTooltip,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';
import {
  PLACEMENTS,
  ENABLE_COLLISION_DETECTION_OPTIONS,
} from '@hashicorp/design-system-components/modifiers/hds-anchored-position';

const BOOLEANS = [false, true];

const SubSectionOptions: TemplateOnlyComponent = <template>
  <ShwTextH2>Interactions</ShwTextH2>

  <ShwFlex @gap="8rem" as |SF|>
    <SF.Item @label="'Soft' (hover/focus)">
      <HdsRichTooltip as |RT|>
        <RT.Toggle @text="Lorem ipsum dolor" @icon="info" @size="medium" />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item @label="'Click'">
      <HdsRichTooltip @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum dolor" @icon="info" @size="medium" />
        <RT.Bubble>
          <ShwPlaceholder @text="generic content" @height="40" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />

  <ShwTextH2>Options</ShwTextH2>

  <ShwTextH3>Placement</ShwTextH3>
  <ShwGrid
    class="shw-component-rich-tooltip-placement-grid"
    @columns={{5}}
    as |SG|
  >
    {{#each PLACEMENTS as |place|}}
      <SG.Item
        class="shw-component-rich-tooltip-placement-grid__item--{{place}}"
      >
        <div class="shw-component-rich-tooltip-placement-grid__target">
          <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
            <RT.Toggle @icon="info" @size="large" aria-label="more info" />
            <RT.Bubble @placement={{place}} @enableCollisionDetection={{false}}>
              <ShwPlaceholder @text={{place}} @height="30" @width="80" />
            </RT.Bubble>
          </HdsRichTooltip>
        </div>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Offset</ShwTextH3>

  <ShwFlex @gap="5rem" {{style margin-bottom="10rem"}} as |SF|>
    <SF.Item @label="Offset: 12 (default)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble @enableCollisionDetection={{false}}>
          <ShwPlaceholder @text="generic content" @height="30" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item @label="Offset: { mainAxis: 30, crossAxis: 0 }">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble
          @offset={{hash mainAxis=30 crossAxis=0}}
          @enableCollisionDetection={{false}}
        >
          <ShwPlaceholder @text="generic content" @height="30" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
    <SF.Item @label="Offset: { mainAxis: 12, crossAxis: 80 }">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble
          @offset={{hash mainAxis=12 crossAxis=80}}
          @enableCollisionDetection={{false}}
        >
          <ShwPlaceholder @text="generic content" @height="30" />
        </RT.Bubble>
      </HdsRichTooltip>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Display</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each BOOLEANS as |isInline|}}
      <SF.Item @label={{if isInline "Inline" "Block (default)"}}>
        <HdsTextBody @size="200" @tag="p">
          Lorem
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @isInline={{isInline}}
              @text="ipsum dolor"
              @icon="info"
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="40" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @isInline={{isInline}}
              @text="consectetur adipiscing"
              @icon="info"
              @iconPosition="leading"
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="40" />
            </RT.Bubble>
          </HdsRichTooltip>
          elit.
        </HdsTextBody>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Width</ShwTextH3>

  <ShwGrid @columns={{2}} {{style padding-bottom="6rem"}} as |SG|>
    <SG.Item @label="Default (width=fit-content/max-width=280px)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble
          @placement="bottom-start"
          @enableCollisionDetection={{false}}
        >
          <ShwPlaceholder
            @text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            {{style padding="12px 16px"}}
          />
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
    <SG.Item @label="Custom fixed width (width=450px)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble
          @width="450px"
          @placement="bottom-start"
          @enableCollisionDetection={{false}}
        >
          <ShwPlaceholder
            @text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            {{style padding="12px 16px"}}
          />
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Height</ShwTextH3>

  <ShwGrid @columns={{2}} {{style padding-bottom="10rem"}} as |SG|>
    <SG.Item @label="Default (height=fit-content/max-height=none)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble
          @placement="bottom-start"
          @enableCollisionDetection={{false}}
        >
          <ShwPlaceholder
            @text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            {{style padding="12px 16px"}}
          />
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
    <SG.Item @label="Custom fixed height (height=150px)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
        <RT.Bubble
          @height="150px"
          @placement="bottom-start"
          @enableCollisionDetection={{false}}
        >
          <ShwPlaceholder
            @text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            {{style padding="12px 16px"}}
          />
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Collision detection</ShwTextH3>

  <ShwTextBody>Scroll within the boxes to see the collision detection in action</ShwTextBody>

  <ShwGrid @columns={{4}} @gap="2rem" {{style margin-bottom="6rem"}} as |SF|>
    {{#each BOOLEANS as |detection|}}
      <SF.Item
        @forceMinWidth={{true}}
        @label={{concat "enableCollisionDetection=" detection}}
      >
        <ShwAutoscrollable @verticalShift={{30}}>
          <div class="shw-component-rich-tooltip-collision-detection-wrapper">
            <HdsRichTooltip
              @isOpen={{true}}
              @enableClickEvents={{true}}
              as |RT|
            >
              <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
              <RT.Bubble @enableCollisionDetection={{detection}}>
                <ShwPlaceholder @text="generic content" @height="30" />
              </RT.Bubble>
            </HdsRichTooltip>
          </div>
        </ShwAutoscrollable>
      </SF.Item>
    {{/each}}
    <SF.Item />
    <SF.Item />
    {{#each ENABLE_COLLISION_DETECTION_OPTIONS as |detection|}}
      <SF.Item
        @forceMinWidth={{true}}
        @label={{concat "enableCollisionDetection=" detection}}
      >
        <ShwAutoscrollable @verticalShift={{30}}>
          <div class="shw-component-rich-tooltip-collision-detection-wrapper">
            <HdsRichTooltip
              @isOpen={{true}}
              @enableClickEvents={{true}}
              as |RT|
            >
              <RT.Toggle @text="Lorem ipsum" @icon="info" @size="medium" />
              <RT.Bubble @enableCollisionDetection={{detection}}>
                <ShwPlaceholder @text="generic content" @height="30" />
              </RT.Bubble>
            </HdsRichTooltip>
          </div>
        </ShwAutoscrollable>
      </SF.Item>
    {{/each}}
    <SF.Item />
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionOptions;
