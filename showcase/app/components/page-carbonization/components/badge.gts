/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { array } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsBadge,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge/index';

const BadgeCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Badge - Carbonization"}}

  <ShwTextH1>Badge - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge @text="Only text" />
      </:theming>
      <:reference>
        <cds-tag>Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge @icon="activity" @text="Text + icon" />
      </:theming>
      <:reference>
        <cds-tag>Lorem ipsum <HdsIcon @name="activity" slot="icon" /></cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBadge @icon="activity" @text="Only icon" @isIconOnly={{true}} />
      </:theming>
      <:reference>
        {{! <cds-tag><cds-icon shape="check"></cds-icon></cds-tag> }}
        <cds-tag><HdsIcon @name="activity" slot="icon" /></cds-tag>
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
        <cds-tag><HdsIcon @name="activity" slot="icon" />
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
                <cds-tag size={{size}}><HdsIcon
                    @name="activity"
                    slot="icon"
                  /></cds-tag>
                <cds-tag size={{size}}><HdsIcon
                    @name="activity"
                    slot="icon"
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
                <cds-tag type={{type}}><HdsIcon
                    @name="activity"
                    slot="icon"
                  /></cds-tag>
                <cds-tag type={{type}}><HdsIcon @name="activity" slot="icon" />
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
            <SF.Item class="shw-component-badge-sample-color--neutral">
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
            <cds-tag type="gray"><HdsIcon
                @name="activity"
                slot="icon"
              /></cds-tag>
            <cds-tag type="gray"><HdsIcon @name="activity" slot="icon" />
              Lorem ipsum</cds-tag>
          </SF.Item>
          <SF.Item>
            <cds-tag type="outline"><HdsIcon
                @name="activity"
                slot="icon"
              /></cds-tag>
            <cds-tag type="outline"><HdsIcon @name="activity" slot="icon" />
              Lorem ipsum</cds-tag>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="neutral-dark-mode">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item
              class="shw-component-badge-sample-color--neutral-dark-mode"
            >
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
        <cds-tag type="high-contrast"><HdsIcon
            @name="activity"
            slot="icon"
          /></cds-tag>
        <cds-tag type="high-contrast"><HdsIcon @name="activity" slot="icon" />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="highlight">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item class="shw-component-badge-sample-color--highlight">
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
        <cds-tag type="purple"><HdsIcon
            @name="activity"
            slot="icon"
          /></cds-tag>
        <cds-tag type="purple"><HdsIcon @name="activity" slot="icon" />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="success">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item class="shw-component-badge-sample-color--success">
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
        <cds-tag type="green"><HdsIcon @name="activity" slot="icon" /></cds-tag>
        <cds-tag type="green"><HdsIcon @name="activity" slot="icon" />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="warning">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item class="shw-component-badge-sample-color--warning">
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
      <:reference>
        <code>???</code>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="critical">
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item class="shw-component-badge-sample-color--critical">
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
        <cds-tag type="red"><HdsIcon @name="activity" slot="icon" /></cds-tag>
        <cds-tag type="red"><HdsIcon @name="activity" slot="icon" />
          Lorem ipsum</cds-tag>
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default BadgeCarbonization;
