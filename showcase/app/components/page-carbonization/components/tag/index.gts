/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { eq, notEq, and } from 'ember-truth-helpers';
import { capitalize } from '@ember/string';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import NOOP from 'showcase/utils/noop';

import { HdsTag } from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/tag/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const TagCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Tag - Carbonization"}}

  <ShwTextH1>Tag - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Plain text</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsTag @text="Lorem ipsum" />
          </SF.Item>
          <SF.Item>
            <HdsTag @text="Lorem ipsum" @onDismiss={{NOOP}} />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @text="This is a very long text that should go on multiple lines"
            />
          </SF.Item>
          <SF.Item>
            <HdsTag
              @text="This is a very long text that should go on multiple lines"
              @onDismiss={{NOOP}}
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-tag>Lorem ipsum</cds-tag>
          </SF.Item>
          <SF.Item>
            <cds-dismissible-tag text="Lorem ipsum" />
          </SF.Item>
          <SF.Item>
            <cds-tag>This is a very long text that should go on multiple lines</cds-tag>
          </SF.Item>
          <SF.Item>
            <cds-dismissible-tag
              text="This is a very long text that should go on multiple lines"
            />
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Links</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwTextH3>{{capitalize color}}</ShwTextH3>
      <ShwCarbonizationComparisonGrid>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsTag @color={{color}} @text="Lorem ipsum" @href="#" />
            </SF.Item>
            <SF.Item>
              <HdsTag
                @color={{color}}
                @text="Lorem ipsum"
                @onDismiss={{NOOP}}
                @href="#"
              />
            </SF.Item>
            <SF.Item>
              <HdsTag
                @color={{color}}
                @text="This is a very long text that should go on multiple lines"
                @href="#"
              />
            </SF.Item>
            <SF.Item>
              <HdsTag
                @color={{color}}
                @text="This is a very long text that should go on multiple lines"
                @onDismiss={{NOOP}}
                @href="#"
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          {{#if (notEq color "secondary")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <cds-operational-tag type="blue" text="Lorem ipsum" size="md" />
              </SF.Item>
              <SF.Item>
                <cds-operational-tag
                  type="blue"
                  text="This is a very long text that should go on multiple lines"
                  size="md"
                />
              </SF.Item>
            </ShwFlex>
          {{else}}
            <R.NoEquivalent @isCompact={{true}} />
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    <ShwTextH3>Plain text</ShwTextH3>

    {{#each STATES as |state|}}
      <ShwCarbonizationComparisonGrid @label={{state}}>
        <:theming>
          <HdsTag
            @text="Lorem ipsum"
            @onDismiss={{NOOP}}
            mock-state-value={{if (eq state "default") undefined state}}
            mock-state-selector="button"
          />
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <cds-dismissible-tag text="Lorem ipsum" />
          {{else}}
            <pre>TODO: static image here</pre>
          {{/if}}
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwTextH3>Links</ShwTextH3>

    {{#each COLORS as |color|}}
      <ShwTextH4>{{capitalize color}}</ShwTextH4>
      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <HdsTag
                  @color={{color}}
                  @text="Lorem ipsum"
                  @href="#"
                  mock-state-value={{if (eq state "default") undefined state}}
                  mock-state-selector="a"
                />
              </SF.Item>
              <SF.Item>
                <HdsTag
                  @color={{color}}
                  @text="Lorem ipsum"
                  @onDismiss={{NOOP}}
                  @href="#"
                  mock-state-value={{if (eq state "default") undefined state}}
                  mock-state-selector="a"
                />
              </SF.Item>
            </ShwFlex>
          </:theming>
          <:reference as |R|>
            {{#if (and (eq state "default") (notEq color "secondary"))}}
              <cds-operational-tag type="blue" text="Lorem ipsum" size="md" />
            {{else if (eq color "secondary")}}
              <R.NoEquivalent @isCompact={{true}} />
            {{else}}
              <pre>TODO: static image here</pre>
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}
  </section>
</template>;

export default TagCarbonizationIndex;
