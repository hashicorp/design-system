/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsRichTooltip } from '@hashicorp/design-system-components/components';

const TEXT_ALIGNMENTS = ['left', 'center', 'right'] as const;

const SubSectionInheritance: TemplateOnlyComponent = <template>
  <ShwTextH3>Inheritance</ShwTextH3>

  <ShwTextBody>HDS classes</ShwTextBody>

  <ShwGrid @columns={{3}} @gap="2rem" {{style margin-bottom="6rem"}} as |SG|>
    <SG.Item @label="Applied to the parent (text+icon with size)">
      <div
        class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        {{style width="fit-content"}}
      >
        Lorem
        <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
          <RT.Toggle
            @text="ipsum"
            @isInline={{true}}
            @icon="info"
            @size="medium"
          />
          <RT.Bubble @enableCollisionDetection={{false}}>
            Generic text content
          </RT.Bubble>
        </HdsRichTooltip>
        dolor
      </div>
    </SG.Item>
    <SG.Item @label="Applied to the component (text+icon with size)">
      <HdsRichTooltip
        class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        @isOpen={{true}}
        @enableClickEvents={{true}}
        as |RT|
      >
        <RT.Toggle @text="Lorem ipsum dolor" @icon="info" @size="medium" />
        <RT.Bubble @enableCollisionDetection={{false}}>
          Generic text content
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
    <SG.Item @label="Applied to the toggle (text+icon with size)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle
          @text="Lorem ipsum dolor"
          @icon="info"
          @size="medium"
          class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        />
        <RT.Bubble @enableCollisionDetection={{false}}>
          Generic text content
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
  </ShwGrid>

  <ShwGrid @columns={{3}} @gap="2rem" {{style margin-bottom="6rem"}} as |SG|>
    <SG.Item @label="Applied to the parent (generic)">
      <div
        class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        {{style width="fit-content"}}
      >
        Lorem
        <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
          <RT.Toggle @isInline={{true}}>ipsum</RT.Toggle>
          <RT.Bubble @enableCollisionDetection={{false}}>
            Generic text content
          </RT.Bubble>
        </HdsRichTooltip>
        dolor
      </div>
    </SG.Item>
    <SG.Item @label="Applied to the component (generic)">
      <HdsRichTooltip
        class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        @isOpen={{true}}
        @enableClickEvents={{true}}
        as |RT|
      >
        <RT.Toggle>Lorem ipsum dolor</RT.Toggle>
        <RT.Bubble @enableCollisionDetection={{false}}>
          Generic text content
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
    <SG.Item @label="Applied to the toggle (generic)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle
          class="hds-typography-display-400 hds-foreground-warning-on-surface hds-surface-warning"
        >
          Lorem ipsum dolor
        </RT.Toggle>
        <RT.Bubble @enableCollisionDetection={{false}}>
          Generic text content
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>Using a custom class</ShwTextBody>

  <ShwGrid @columns={{3}} @gap="2rem" {{style margin-bottom="6rem"}} as |SG|>
    <SG.Item @label="Applied to the parent (text+icon with size)">
      <div
        class="shw-component-rich-tooltip-font-style"
        {{style width="fit-content"}}
      >
        Lorem
        <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
          <RT.Toggle
            @text="ipsum"
            @isInline={{true}}
            @icon="info"
            @size="medium"
          />
          <RT.Bubble @enableCollisionDetection={{false}}>
            Generic text content
          </RT.Bubble>
        </HdsRichTooltip>
        dolor
      </div>
    </SG.Item>
    <SG.Item @label="Applied to the container (text+icon with size)">
      <HdsRichTooltip
        class="shw-component-rich-tooltip-font-style"
        @isOpen={{true}}
        @enableClickEvents={{true}}
        as |RT|
      >
        <RT.Toggle
          @text="Lorem ipsum dolor"
          @isInline={{true}}
          @icon="info"
          @size="medium"
        />
        <RT.Bubble @enableCollisionDetection={{false}}>
          Generic text content
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
    <SG.Item @label="Applied to the toggle (text+icon with size)">
      <HdsRichTooltip @isOpen={{true}} @enableClickEvents={{true}} as |RT|>
        <RT.Toggle
          @text="Lorem ipsum dolor"
          @isInline={{true}}
          @icon="info"
          @size="medium"
          class="shw-component-rich-tooltip-font-style"
        />
        <RT.Bubble @enableCollisionDetection={{false}}>
          Generic text content
        </RT.Bubble>
      </HdsRichTooltip>
    </SG.Item>
  </ShwGrid>

  <ShwTextBody>Style interference</ShwTextBody>

  <ShwFlex @gap="2rem" {{style margin-bottom="9rem"}} as |SF|>
    <SF.Item @label="Parent has white-space: nowrap">
      <div {{style whiteSpace="nowrap"}}>
        <HdsRichTooltip @isOpen={{true}} as |RT|>
          <RT.Toggle @text="Lorem ipsum dolor" @icon="info" @size="medium" />
          <RT.Bubble @width="200px" @enableCollisionDetection={{false}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </RT.Bubble>
        </HdsRichTooltip>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Used within a parent with explicit text alignment</ShwTextBody>

  <ShwGrid @columns={{3}} {{style margin-bottom="9rem"}} as |SG|>
    {{#each TEXT_ALIGNMENTS as |alignment|}}
      <SG.Item
        @label="text-align = {{alignment}}"
        {{style text-align=alignment}}
      >
        <ShwOutliner>
          Lorem
          <HdsRichTooltip @isOpen={{true}} as |RT|>
            <RT.Toggle @text="ipsum dolor" @isInline={{true}} @icon="info" />
            <RT.Bubble @width="200px" @enableCollisionDetection={{false}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet.
        </ShwOutliner>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionInheritance;
