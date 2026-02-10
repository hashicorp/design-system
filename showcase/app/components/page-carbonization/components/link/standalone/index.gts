/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { helper } from '@ember/component/helper';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsIcon,
  HdsLayoutFlex,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/link/standalone';

const MAPPING_HDS_SIZE_TO_CDS_SIZE = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
} as const;

type HdsSizeClasses = [keyof typeof MAPPING_HDS_SIZE_TO_CDS_SIZE];

const mapHdsSizeToCdsSize = helper(function ([size]: HdsSizeClasses) {
  return MAPPING_HDS_SIZE_TO_CDS_SIZE[size];
});

const STATES = ['default', 'hover', 'active', 'focus'];

const BadgeLinkStandaloneIndex: TemplateOnlyComponent = <template>
  {{pageTitle "LinkStandalone - Carbonization"}}

  <ShwTextH1>LinkStandalone - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsLinkStandalone @icon="plus" @text="Lorem ipsum" @href="#" />
        <HdsLinkStandalone
          @icon="arrow-right"
          @text="Lorem ipsum"
          @href="#"
          @iconPosition="trailing"
        />
        <HdsLinkStandalone
          @icon="arrow-right"
          @text="Very long text that should wrap for multiple lines"
          @href="#"
          @iconPosition="trailing"
        />
      </:theming>
      <:reference>
        <HdsLayoutFlex @direction="column">
          <cds-link size="md">Lorem ipsum
            <HdsIcon @name="arrow-right" slot="icon" /></cds-link>
          <cds-link size="md">Very long text that should wrap for multiple lines
            <HdsIcon @name="arrow-right" slot="icon" /></cds-link>
        </HdsLayoutFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Size</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each SIZES as |size|}}
          <HdsLinkStandalone
            @icon="arrow-right"
            @text="Lorem ipsum"
            @href="#"
            @iconPosition="trailing"
            @size={{size}}
          />
        {{/each}}
      </:theming>
      <:reference>
        <HdsLayoutFlex @direction="column">
          {{#each SIZES as |size|}}
            <cds-link size={{mapHdsSizeToCdsSize size}}>Lorem ipsum
              <HdsIcon @name="arrow-right" slot="icon" /></cds-link>
          {{/each}}
        </HdsLayoutFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwTextH3>{{capitalize color}}</ShwTextH3>

      {{#each STATES as |state|}}
        <ShwTextBody>{{state}}</ShwTextBody>

        <ShwCarbonizationComparisonGrid>
          <:theming>
            <HdsLinkStandalone
              @icon="arrow-right"
              @text="Lorem ipsum"
              @href="#"
              @iconPosition="trailing"
              @color={{color}}
              mock-state-value={{state}}
            />
          </:theming>
          <:reference>
            {{#if (eq state "default")}}
              <cds-link size="md">Lorem ipsum
                <HdsIcon @name="arrow-right" slot="icon" /></cds-link>
            {{else}}
              <pre>TODO: add static image here</pre>
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}
  </section>
</template>;

export default BadgeLinkStandaloneIndex;
