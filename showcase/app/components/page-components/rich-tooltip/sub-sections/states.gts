/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsBadge,
  HdsIcon,
  HdsRichTooltip,
  HdsTag,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];
const TOGGLE_OPTIONS = ['text', 'icon', 'badge', 'tag'];

const SubSectionStates: TemplateOnlyComponent = <template>
  <ShwTextH2>Interaction states</ShwTextH2>

  <ShwTextH3>Text + Icon</ShwTextH3>

  <ShwTextH4>Block</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label="{{capitalize state}}"
        class="shw-component-link-inline-state-samples"
      >
        <HdsRichTooltip as |RT|>
          <RT.Toggle
            @text="Lorem ipsum dolor"
            @isInline={{false}}
            @icon="info"
            @size="medium"
            mock-state-value={{state}}
          />
          <RT.Bubble>
            <ShwPlaceholder @text="generic content" @height="30" />
          </RT.Bubble>
        </HdsRichTooltip>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH4>Inline</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label="{{capitalize state}}"
        class="shw-component-link-inline-state-samples"
      >
        <HdsTextBody @size="200" @tag="p" {{style margin-bottom="16px"}}>
          Lorem
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @text="ipsum dolor"
              @isInline={{true}}
              @icon="info"
              @size="medium"
              mock-state-value={{state}}
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet
        </HdsTextBody>
        <HdsTextBody @size="200" @tag="p" {{style margin-bottom="16px"}}>
          Lorem ipsum dolor sit
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @text="amet consectetur"
              @isInline={{true}}
              @icon="info"
              @size="medium"
              mock-state-value={{state}}
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          adipisicing elit
        </HdsTextBody>
        <HdsTextBody @size="200" @tag="p">
          Lorem ipsum
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @text="dolor sit amet consectetur adipisicing elit"
              @isInline={{true}}
              @icon="info"
              @size="medium"
              mock-state-value={{state}}
            />
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
        </HdsTextBody>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Generic</ShwTextH3>

  <ShwTextBody>
    <strong>Not for use in production.</strong>
  </ShwTextBody>

  <ShwTextBody>
    In this case the "toggle" doesn't have special styles of its own other than
    for the "focus" state.
  </ShwTextBody>

  <ShwTextH4>Block</ShwTextH4>

  {{#each TOGGLE_OPTIONS as |toggle|}}
    <ShwGrid @columns={{4}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{state}}>
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              aria-label={{if (eq toggle "icon") "Information"}}
              mock-state-value={{state}}
            >
              {{#if (eq toggle "text")}}
                Lorem ipsum dolor
              {{/if}}
              {{#if (eq toggle "icon")}}
                <HdsIcon @name="org" />
              {{/if}}
              {{#if (eq toggle "badge")}}
                <HdsBadge
                  @text="Lorem ipsum"
                  @color="neutral"
                  @icon="hexagon"
                  type="outlined"
                />
              {{/if}}
              {{#if (eq toggle "tag")}}
                <HdsTag @text="Lorem ipsum" />
              {{/if}}
            </RT.Toggle>
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="40" />
            </RT.Bubble>
          </HdsRichTooltip>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  {{/each}}

  <ShwTextH4>Inline</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label="{{capitalize state}}"
        class="shw-component-link-inline-state-samples"
      >
        <div {{style margin-bottom="16px"}}>
          Lorem
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @isInline={{true}}
              @icon="info"
              mock-state-value={{state}}
            >ipsum dolor</RT.Toggle>
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          sit amet
        </div>
        <div {{style margin-bottom="16px"}}>
          Lorem ipsum dolor sit
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @isInline={{true}}
              @icon="info"
              mock-state-value={{state}}
            >amet consectetur</RT.Toggle>
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
          adipisicing elit
        </div>
        <div>
          Lorem ipsum
          <HdsRichTooltip as |RT|>
            <RT.Toggle
              @isInline={{true}}
              @icon="info"
              mock-state-value={{state}}
            >dolor sit amet consectetur adipisicing elit</RT.Toggle>
            <RT.Bubble>
              <ShwPlaceholder @text="generic content" @height="30" />
            </RT.Bubble>
          </HdsRichTooltip>
        </div>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionStates;
