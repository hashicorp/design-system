/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
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
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/link/inline';

const STATES = ['default', 'hover', 'active', 'focus'];

const BadgeLinkInlineIndex: TemplateOnlyComponent = <template>
  {{pageTitle "LinkInline - Carbonization"}}

  <ShwTextH1>LinkInline - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="hds-typography-body-300">
          <HdsLinkInline @color="primary" @href="#">Lorem ipsum dolor</HdsLinkInline>
        </div>
        <div class="hds-typography-body-300">
          <HdsLinkInline
            @color="primary"
            @icon="globe"
            @iconPosition="leading"
            @href="#"
          >Lorem ipsum dolor</HdsLinkInline>
        </div>
        <div class="hds-typography-body-300">
          <HdsLinkInline
            @color="primary"
            @icon="arrow-right-circle"
            @iconPosition="trailing"
            @href="#"
          >Lorem ipsum dolor</HdsLinkInline>
        </div>
      </:theming>
      <:reference>
        <HdsLayoutFlex @direction="column">
          <cds-link href="#" inline size="lg">Lorem ipsum dolor</cds-link>
          <cds-link href="#" inline size="lg">Lorem ipsum dolor
            <HdsIcon
              @name="arrow-right-circle"
              @isInline={{true}}
              slot="icon"
            /></cds-link>
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
            <div class="hds-typography-body-300">
              <HdsLinkInline
                @color={{color}}
                @href="#"
                mock-state-value={{state}}
              >Lorem ipsum dolor</HdsLinkInline>
            </div>
          </:theming>
          <:reference>
            {{#if (eq state "default")}}
              <cds-link href="#" inline size="lg">
                Lorem ipsum dolor
              </cds-link>
            {{else}}
              <pre>TODO: add static image here</pre>
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}
  </section>
</template>;

export default BadgeLinkInlineIndex;
