/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsPopoverPrimitive,
  HdsRichTooltipBubble,
  HdsRichTooltipToggle,
} from '@hashicorp/design-system-components/components';
import { SIZES as TOGGLE_SIZES } from '@hashicorp/design-system-components/components/hds/rich-tooltip/toggle';

const FONT_SIZES = ['14px', '16px', '18px'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>Toggle</ShwTextH3>

  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Only text">
      <HdsPopoverPrimitive as |PP|>
        <HdsRichTooltipToggle
          @text="Lorem ipsum dolor"
          @popoverId="unique-popover-id"
          @isOpen={{false}}
          @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
        />
      </HdsPopoverPrimitive>
    </SF.Item>
    <SF.Item @label="Text + Icon (trailing/default)">
      <HdsPopoverPrimitive as |PP|>
        <HdsRichTooltipToggle
          @icon="info"
          @text="Lorem ipsum dolor"
          @iconPosition="trailing"
          @popoverId="unique-popover-id"
          @isOpen={{false}}
          @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
        />
      </HdsPopoverPrimitive>
    </SF.Item>
    <SF.Item @label="Icon (leading) + Text">
      <HdsPopoverPrimitive as |PP|>
        <HdsRichTooltipToggle
          @icon="info"
          @iconPosition="leading"
          @text="Lorem ipsum dolor"
          @popoverId="unique-popover-id"
          @isOpen={{false}}
          @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
        />
      </HdsPopoverPrimitive>
    </SF.Item>
    <SF.Item @label="Generic (yielded)">
      <HdsPopoverPrimitive as |PP|>
        <HdsRichTooltipToggle
          @popoverId="unique-popover-id"
          @isOpen={{false}}
          @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
        >Lorem ipsum dolor</HdsRichTooltipToggle>
      </HdsPopoverPrimitive>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Sizes</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Inherited (default)">
      {{#each FONT_SIZES as |size|}}
        <div {{style font-size=size line-height="1.4"}}>
          Lorem
          <HdsPopoverPrimitive as |PP|>
            <HdsRichTooltipToggle
              @icon="info"
              @isInline={{true}}
              @text="ipsum dolor"
              @popoverId="unique-popover-id"
              @isOpen={{false}}
              @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            />
          </HdsPopoverPrimitive>
          sit amet
          <HdsPopoverPrimitive as |PP|>
            <HdsRichTooltipToggle
              @icon="info"
              @iconPosition="leading"
              @isInline={{true}}
              @text="consectetur adipiscing"
              @popoverId="unique-popover-id"
              @isOpen={{false}}
              @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
            />
          </HdsPopoverPrimitive>
          elit.
        </div>
      {{/each}}
    </SF.Item>
  </ShwFlex>

  {{#each TOGGLE_SIZES as |size|}}
    <ShwFlex @label="{{capitalize size}}" as |SF|>
      <SF.Item>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @size={{size}}
            @text="Lorem ipsum dolor"
            @popoverId="unique-popover-id"
            @isOpen={{false}}
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
          />
        </HdsPopoverPrimitive>
      </SF.Item>
      <SF.Item>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @icon="info"
            @size={{size}}
            @text="Lorem ipsum dolor"
            @popoverId="unique-popover-id"
            @isOpen={{false}}
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
          />
        </HdsPopoverPrimitive>
      </SF.Item>
      <SF.Item>
        <HdsPopoverPrimitive as |PP|>
          <HdsRichTooltipToggle
            @icon="info"
            @iconPosition="leading"
            @size={{size}}
            @text="Lorem ipsum dolor"
            @popoverId="unique-popover-id"
            @isOpen={{false}}
            @setupPrimitiveToggle={{PP.setupPrimitiveToggle}}
          />
        </HdsPopoverPrimitive>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Bubble</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Arrow" class="shw-component-rich-tooltip-arrow-standalone">
      <ShwOutliner {{style width="fit-content"}}>
        <div class="hds-rich-tooltip">
          <div class="hds-rich-tooltip__bubble-arrow" />
        </div>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="Bubble (popover)"
      class="shw-component-rich-tooltip-bubble-standalone"
    >
      {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
      <HdsRichTooltipBubble
        @isOpen={{true}}
        @popoverId="unique-popover-id"
        @arrowId="unique-arrow-id"
      >
        <ShwPlaceholder @text="generic content" width="250px" @height="40" />
      </HdsRichTooltipBubble>
    </SF.Item>
    <SF.Item
      @label="With fixed width/height"
      class="shw-component-rich-tooltip-bubble-standalone"
    >
      {{! @glint-expect-error - @setupPrimitivePopper is a required arg, but we are not passing to test the bubble in isolation }}
      <HdsRichTooltipBubble
        @width="250px"
        @height="125px"
        @isOpen={{true}}
        @popoverId="unique-popover-id"
        @arrowId="unique-arrow-id"
      >
        <ShwPlaceholder @text="generic content" width="100%" @height="100%" />
      </HdsRichTooltipBubble>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionBaseElements;
