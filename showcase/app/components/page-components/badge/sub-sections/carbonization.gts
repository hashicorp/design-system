/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { notEq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
// import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsBadge,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
  TYPES,
} from '@hashicorp/design-system-components/components/hds/badge/index';

const SubSectionCarbonization: TemplateOnlyComponent = <template>
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
  </ShwCarbonizationComparisonGrid>

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
  </ShwCarbonizationComparisonGrid>

  <ShwTextH2>Color</ShwTextH2>

  {{#each COLORS as |color index|}}
    <ShwCarbonizationComparisonGrid
      @hideThemeLabels={{(if (notEq index 0) true)}}
    >
      <:theming>
        <ShwFlex @direction="column" @gap="0.5rem" as |SF|>
          {{#each TYPES as |type|}}
            <SF.Item class="shw-component-badge-sample-color--{{color}}">
              <HdsBadge
                @icon="activity"
                @text="Lorem Ipsum"
                @type={{type}}
                @color={{color}}
                @isIconOnly={{true}}
              />
              <HdsBadge
                @icon="activity"
                @text="Lorem ipsum"
                @type={{type}}
                @color={{color}}
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
  {{/each}}
</template>;

export default SubSectionCarbonization;
