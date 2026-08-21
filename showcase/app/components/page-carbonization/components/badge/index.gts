/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';
import Activity16 from '@carbon/icons/es/activity/16';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import { HdsBadge } from '@hashicorp/design-system-components/components';
import setCdsIcon from 'showcase/modifiers/set-cds-icon';
import {
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge/index';

const BadgeCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Badge - Carbonization"}}

  <ShwTextH1>Badge - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge @text="Lorem ipsum" />
      </:theming>
      <:reference>
        <cds-tag>Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge @icon="activity" @text="Lorem ipsum" />
      </:theming>
      <:reference>
        <cds-tag>Lorem ipsum
          <cds-icon slot="icon" {{setCdsIcon Activity16}} /></cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge @icon="activity" @text="Only icon" @isIconOnly={{true}} />
      </:theming>
      <:reference>
        <cds-tag><cds-icon slot="icon" {{setCdsIcon Activity16}} /></cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge
          @icon="activity"
          @text="This is a very long text that should go on two lines"
        />
      </:theming>
      <:reference>
        <cds-tag><cds-icon slot="icon" {{setCdsIcon Activity16}} />
          This is a very long text that should go on multiple lines</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Size</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @isIconOnly={{true}}
                @text="Lorem ipsum"
                @size={{size}}
              />
              <HdsBadge @icon="activity" @text="Lorem ipsum" @size={{size}} />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "sm" "md" "lg") as |SIZES|}}
            {{#each SIZES as |size|}}
              <SF.Item>
                <cds-tag size={{size}}><cds-icon
                    slot="icon"
                    {{setCdsIcon Activity16}}
                  /></cds-tag>
                <cds-tag size={{size}}><cds-icon
                    slot="icon"
                    {{setCdsIcon Activity16}}
                  />Lorem ipsum</cds-tag>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Type</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @isIconOnly={{true}}
                @text="Lorem ipsum"
                @type={{type}}
              />
              <HdsBadge @icon="activity" @text="Lorem ipsum" @type={{type}} />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "gray" "high-contrast" "outline") as |TYPES|}}
            {{#each TYPES as |type|}}
              <SF.Item>
                <cds-tag type={{type}}><cds-icon
                    slot="icon"
                    {{setCdsIcon Activity16}}
                  /></cds-tag>
                <cds-tag type={{type}}><cds-icon
                    slot="icon"
                    {{setCdsIcon Activity16}}
                  />
                  Lorem ipsum</cds-tag>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Color</ShwTextH2>

    <ShwCarbonizationComparisonGrid @label="neutral">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color="neutral"
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color="neutral"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          <SF.Item>
            <cds-tag type="gray"><cds-icon
                slot="icon"
                {{setCdsIcon Activity16}}
              /></cds-tag>
            <cds-tag type="gray"><cds-icon
                slot="icon"
                {{setCdsIcon Activity16}}
              />
              Lorem ipsum</cds-tag>
          </SF.Item>
          <SF.Item>
            <cds-tag type="outline"><cds-icon
                slot="icon"
                {{setCdsIcon Activity16}}
              /></cds-tag>
            <cds-tag type="outline"><cds-icon
                slot="icon"
                {{setCdsIcon Activity16}}
              />
              Lorem ipsum</cds-tag>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="neutral-dark-mode">
      <:theming>
        <ShwFlex
          @direction="column"
          @gap="0.5rem"
          class="shw-component-badge-sample-color--neutral-dark-mode"
          as |SF|
        >
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color="neutral-dark-mode"
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color="neutral-dark-mode"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <div class="shw-component-badge-sample-color--neutral-dark-mode">
          <cds-tag type="high-contrast"><cds-icon
              slot="icon"
              {{setCdsIcon Activity16}}
            /></cds-tag>
          <cds-tag type="high-contrast"><cds-icon
              slot="icon"
              {{setCdsIcon Activity16}}
            />
            Lorem ipsum</cds-tag>
        </div>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="highlight">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color="highlight"
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color="highlight"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-tag type="purple"><cds-icon
            slot="icon"
            {{setCdsIcon Activity16}}
          /></cds-tag>
        <cds-tag type="purple"><cds-icon
            slot="icon"
            {{setCdsIcon Activity16}}
          />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="success">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color="success"
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color="success"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-tag type="green"><cds-icon
            slot="icon"
            {{setCdsIcon Activity16}}
          /></cds-tag>
        <cds-tag type="green"><cds-icon slot="icon" {{setCdsIcon Activity16}} />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="warning">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color="warning"
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color="warning"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="critical">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item>
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color="critical"
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color="critical"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <cds-tag type="red"><cds-icon
            slot="icon"
            {{setCdsIcon Activity16}}
          /></cds-tag>
        <cds-tag type="red"><cds-icon slot="icon" {{setCdsIcon Activity16}} />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default BadgeCarbonizationIndex;
