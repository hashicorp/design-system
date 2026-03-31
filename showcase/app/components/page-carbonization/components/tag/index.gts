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
        <:reference>
          {{#if (notEq color "secondary")}}
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <cds-operational-tag type="blue" text="Lorem ipsum" size="md">
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  ><path
                      d="M7.2,2.3c-1,4.4,1.7,8.7,6.1,9.8c0.1,0,0.1,0,0.2,0c-1.1,1.2-2.7,1.8-4.3,1.8c-0.1,0-0.2,0-0.2,0C5.6,13.8,3,11,3.2,7.7	C3.2,5.3,4.8,3.1,7.2,2.3 M8,1L8,1C4.1,1.6,1.5,5.3,2.1,9.1c0.6,3.3,3.4,5.8,6.8,5.9c0.1,0,0.2,0,0.3,0c2.3,0,4.4-1.1,5.8-3	c0.2-0.2,0.1-0.6-0.1-0.7c-0.1-0.1-0.2-0.1-0.3-0.1c-3.9-0.3-6.7-3.8-6.4-7.6C8.3,3,8.4,2.4,8.6,1.8c0.1-0.3,0-0.6-0.3-0.7	C8.1,1,8.1,1,8,1z"
                    ></path></svg>
                </cds-operational-tag>
              </SF.Item>
              <SF.Item>
                <cds-operational-tag
                  type="blue"
                  text="This is a very long text that should go on multiple lines"
                  size="md"
                >
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  ><path
                      d="M7.2,2.3c-1,4.4,1.7,8.7,6.1,9.8c0.1,0,0.1,0,0.2,0c-1.1,1.2-2.7,1.8-4.3,1.8c-0.1,0-0.2,0-0.2,0C5.6,13.8,3,11,3.2,7.7	C3.2,5.3,4.8,3.1,7.2,2.3 M8,1L8,1C4.1,1.6,1.5,5.3,2.1,9.1c0.6,3.3,3.4,5.8,6.8,5.9c0.1,0,0.2,0,0.3,0c2.3,0,4.4-1.1,5.8-3	c0.2-0.2,0.1-0.6-0.1-0.7c-0.1-0.1-0.2-0.1-0.3-0.1c-3.9-0.3-6.7-3.8-6.4-7.6C8.3,3,8.4,2.4,8.6,1.8c0.1-0.3,0-0.6-0.3-0.7	C8.1,1,8.1,1,8,1z"
                    ></path></svg>
                </cds-operational-tag>
              </SF.Item>
            </ShwFlex>
          {{else}}
            <pre>n/a</pre>
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
      <ShwTextH3>{{capitalize color}}</ShwTextH3>
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
          <:reference>
            {{#if (and (eq state "default") (notEq color "secondary"))}}
              <cds-operational-tag type="blue" text="Lorem ipsum" size="md">
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  slot="icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                ><path
                    d="M7.2,2.3c-1,4.4,1.7,8.7,6.1,9.8c0.1,0,0.1,0,0.2,0c-1.1,1.2-2.7,1.8-4.3,1.8c-0.1,0-0.2,0-0.2,0C5.6,13.8,3,11,3.2,7.7	C3.2,5.3,4.8,3.1,7.2,2.3 M8,1L8,1C4.1,1.6,1.5,5.3,2.1,9.1c0.6,3.3,3.4,5.8,6.8,5.9c0.1,0,0.2,0,0.3,0c2.3,0,4.4-1.1,5.8-3	c0.2-0.2,0.1-0.6-0.1-0.7c-0.1-0.1-0.2-0.1-0.3-0.1c-3.9-0.3-6.7-3.8-6.4-7.6C8.3,3,8.4,2.4,8.6,1.8c0.1-0.3,0-0.6-0.3-0.7	C8.1,1,8.1,1,8,1z"
                  ></path></svg>
              </cds-operational-tag>
            {{else if (eq color "secondary")}}
              <pre>n/a</pre>
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
