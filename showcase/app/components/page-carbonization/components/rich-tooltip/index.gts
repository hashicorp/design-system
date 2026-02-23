/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsRichTooltip } from '@hashicorp/design-system-components/components';
import { SIZES as TOGGLE_SIZES } from '@hashicorp/design-system-components/components/hds/rich-tooltip/toggle';
import { PLACEMENTS } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';

const STATES = ['default', 'hover', 'active', 'focus'];

const RichTooltipCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "RichTooltip - Carbonization"}}

  <ShwTextH1>RichTooltip - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsRichTooltip as |RT|>
              <RT.Toggle @text="Lorem ipsum dolor" />
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
          <SF.Item>
            <HdsRichTooltip as |RT|>
              <RT.Toggle
                @text="Lorem ipsum dolor"
                @icon="info"
                @iconPosition="trailing"
              />
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
          <SF.Item>
            <HdsRichTooltip as |RT|>
              <RT.Toggle
                @text="Lorem ipsum dolor"
                @icon="info"
                @iconPosition="leading"
              />
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
          <SF.Item>
            <HdsRichTooltip as |RT|>
              <RT.Toggle @icon="info" aria-label="more info" />
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-toggletip alignment="bottom">
              Lorem ipsum dolor
              <span slot="body-text">Generic content</span>
            </cds-toggletip>
          </SF.Item>
          <SF.Item>
            <cds-toggletip alignment="bottom">
              <span slot="body-text">Generic content</span>
            </cds-toggletip>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Size</ShwTextH2>

    <ShwTextBody><strong>Note:</strong>
      Typographic styles only get applied to the HDS component when the size
      argument is present.</ShwTextBody>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each TOGGLE_SIZES as |size|}}
            <SF.Item>
              <HdsRichTooltip as |RT|>
                <RT.Toggle @text="Lorem ipsum" @size={{size}} @icon="info" />
                <RT.Bubble>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </RT.Bubble>
              </HdsRichTooltip>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#each TOGGLE_SIZES}}
            <SF.Item>
              <cds-toggletip alignment="bottom">
                Lorem ipsum
                <span slot="body-text">Generic content</span>
              </cds-toggletip>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    {{#each STATES as |state|}}
      <ShwTextH3>{{state}}</ShwTextH3>

      <ShwCarbonizationComparisonGrid>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsRichTooltip as |RT|>
                <RT.Toggle
                  @text="Lorem ipsum dolor"
                  @icon="info"
                  @iconPosition="trailing"
                  mock-state-value={{state}}
                />
                <RT.Bubble>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </RT.Bubble>
              </HdsRichTooltip>
            </SF.Item>
            <SF.Item>
              <HdsRichTooltip as |RT|>
                <RT.Toggle
                  @text="Lorem ipsum dolor"
                  @icon="info"
                  @iconPosition="trailing"
                  @size="medium"
                  mock-state-value={{state}}
                />
                <RT.Bubble>
                  <ShwPlaceholder @text="generic content" @height="40" />
                </RT.Bubble>
              </HdsRichTooltip>
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-toggletip alignment="bottom">
              Lorem ipsum dolor
              <span slot="body-text">Generic content</span>
            </cds-toggletip>
          {{else}}
            <pre>TODO: add static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>Options</ShwTextH2>

    <ShwTextH3>Placement</ShwTextH3>

    <ShwCarbonizationComparisonGrid @sideBySide={{true}}>
      <:theming>
        <ShwGrid
          class="shw-component-rich-tooltip-placement-grid"
          @columns={{3}}
          @gap="4rem"
          as |SG|
        >
          {{#each PLACEMENTS as |place|}}
            <SG.Item
              class="shw-component-rich-tooltip-placement-grid__item--{{place}}"
            >
              <HdsRichTooltip
                @isOpen={{true}}
                @enableClickEvents={{true}}
                as |RT|
              >
                <RT.Toggle @icon="info" @size="large" aria-label="more info" />
                <RT.Bubble
                  @placement={{place}}
                  @enableCollisionDetection={{false}}
                >
                  <ShwPlaceholder @text={{place}} @height="30" @width="80" />
                </RT.Bubble>
              </HdsRichTooltip>
            </SG.Item>
          {{/each}}
        </ShwGrid>
      </:theming>
      <:reference>
        <ShwGrid
          class="shw-component-rich-tooltip-placement-grid"
          @columns={{3}}
          @gap="4rem"
          as |SG|
        >
          {{#each PLACEMENTS as |place|}}
            <SG.Item
              class="shw-component-rich-tooltip-placement-grid__item--{{place}}"
            >
              <cds-toggletip alignment="bottom" default-open>
                <span slot="body-text">Generic content</span>
              </cds-toggletip>
            </SG.Item>
          {{/each}}
        </ShwGrid>
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default RichTooltipCarbonizationIndex;
