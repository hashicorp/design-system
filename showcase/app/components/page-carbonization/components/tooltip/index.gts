/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { hash } from '@ember/helper';
import { eq, or } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';
import {
  HdsBadge,
  HdsIcon,
  HdsTooltipButton,
} from '@hashicorp/design-system-components/components';
import { PLACEMENTS } from '@hashicorp/design-system-components/components/hds/tooltip-button/index';

const STATES = ['default', 'hover', 'focus'];

const TooltipCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Tooltip - Carbonization"}}

  <ShwTextH1>Tooltip - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>On its own</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsTooltipButton
              @text="Here is more information"
              aria-label="Information"
            >
              <HdsIcon @name="info" />
            </HdsTooltipButton>
          </SF.Item>

          <SF.Item>
            <HdsTooltipButton @text="2023-03-30T19:18:01.684Z">
              <time datetime="2023-03-30T19:18:01.684Z">Apr 5, 2023</time>
            </HdsTooltipButton>
          </SF.Item>

          <SF.Item>
            <HdsTooltipButton
              aria-label="Information"
              @text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            >
              <HdsBadge @icon="activity" @text="Lorem ipsum" />
            </HdsTooltipButton>
          </SF.Item>

          <SF.Item>
            <HdsTooltipButton
              aria-label="Information"
              @text="Loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempor!"
            >
              <HdsBadge @icon="activity" @text="Lorem ipsum" />
            </HdsTooltipButton>
          </SF.Item>

          <SF.Item>
            <span {{hdsTooltip "Here is more information"}}>hds-tooltip modifier</span>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-tooltip open>
              <HdsIcon @name="info" class="sb-tooltip-trigger" />
              <cds-tooltip-content id="content-1">Here is more information</cds-tooltip-content>
            </cds-tooltip>
          </SF.Item>

          <SF.Item>
            <cds-tooltip>
              <time
                datetime="2023-03-30T19:18:01.684Z"
                class="sb-tooltip-trigger"
              >Apr 5, 2023</time>
              <cds-tooltip-content
                id="content-2"
              >2023-03-30T19:18:01.684Z</cds-tooltip-content>
            </cds-tooltip>
          </SF.Item>

          <SF.Item>
            <cds-tooltip>
              <cds-tag class="sb-tooltip-trigger">Lorem ipsum
                <HdsIcon @name="activity" slot="icon" /></cds-tag>
              <cds-tooltip-content id="content-3">Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.</cds-tooltip-content>
            </cds-tooltip>
          </SF.Item>

          <SF.Item>
            <cds-tooltip>
              <cds-tag class="sb-tooltip-trigger">Lorem ipsum
                <HdsIcon @name="activity" slot="icon" /></cds-tag>
              <cds-tooltip-content
                id="content-4"
              >Loremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtempor!</cds-tooltip-content>
            </cds-tooltip>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>Used next to text</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <p>
          <span class="hds-typography-display-300">Lorem ipsum dolor</span>
          <HdsTooltipButton @text="Here is more info" aria-label="Information">
            <HdsIcon @name="info" />
          </HdsTooltipButton>
        </p>

        <p class="hds-typography-body-300">
          Lorem ipsum dolor sit amet
          <HdsTooltipButton
            aria-label="more information"
            @text="Here is more info"
          >
            <HdsIcon @name="info" />
          </HdsTooltipButton>
          consectetur adipisicing elit.
        </p>
      </:theming>
      <:reference>
        <p>
          <span class="hds-typography-display-300">Lorem ipsum dolor</span>
          <cds-tooltip>
            <HdsIcon @name="info" class="sb-tooltip-trigger" />
            <cds-tooltip-content id="content-inline-1">Here is more infor</cds-tooltip-content>
          </cds-tooltip>
        </p>

        <p class="hds-typography-body-300">
          Lorem ipsum dolor sit amet
          <cds-tooltip>
            <HdsIcon @name="info" class="sb-tooltip-trigger" />
            <cds-tooltip-content id="content-inline-2">Here is more info</cds-tooltip-content>
          </cds-tooltip>
          consectetur adipisicing elit.
        </p>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    {{#each STATES as |state|}}
      <ShwTextH3>{{state}}</ShwTextH3>

      <ShwCarbonizationComparisonGrid>
        <:theming>
          <ShwFlex @gap="4rem" @direction="column" as |SF|>
            <SF.Item>
              {{#if (or (eq state "hover") (eq state "focus"))}}
                <HdsTooltipButton
                  @text="More info"
                  mock-state-value={{state}}
                  @extraTippyOptions={{hash showOnCreate=true}}
                  aria-label="Information"
                ><HdsIcon @name="info" /></HdsTooltipButton>
              {{else}}
                <HdsTooltipButton
                  @text="More info"
                  aria-label="Information"
                  mock-state-value={{state}}
                >
                  <HdsIcon @name="info" />
                </HdsTooltipButton>
              {{/if}}
            </SF.Item>
            <SF.Item>
              {{#if (or (eq state "hover") (eq state "focus"))}}
                <HdsTooltipButton
                  @text="More info"
                  mock-state-value={{state}}
                  @extraTippyOptions={{hash showOnCreate=true}}
                >Text</HdsTooltipButton>
              {{else}}
                <HdsTooltipButton
                  @text="More info"
                  mock-state-value={{state}}
                >Text</HdsTooltipButton>
              {{/if}}
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference>
          {{#if (eq state "default")}}
            <ShwFlex @gap="4rem" @direction="column" as |SF|>
              <SF.Item>
                <cds-tooltip>
                  <HdsIcon @name="info" class="sb-tooltip-trigger" />
                  <cds-tooltip-content id="content-{{state}}-1">More info</cds-tooltip-content>
                </cds-tooltip>
              </SF.Item>
              <SF.Item>
                <cds-tooltip>
                  <span class="sb-tooltip-trigger">Text</span>
                  <cds-tooltip-content id="content-{{state}}-2">More info</cds-tooltip-content>
                </cds-tooltip>
              </SF.Item>
            </ShwFlex>
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
          class="shw-component-tooltip-placement-grid"
          @columns={{3}}
          @gap="4rem"
          as |SG|
        >
          {{#each PLACEMENTS as |place|}}
            <SG.Item
              class="shw-component-tooltip-placement-grid__item--{{place}}"
            >
              <HdsTooltipButton
                @text="More info"
                @placement={{place}}
                @extraTippyOptions={{hash showOnCreate=true}}
              >
                <div
                  class="shw-component-tooltip-placement-grid__target"
                >{{place}}</div>
              </HdsTooltipButton>
            </SG.Item>
          {{/each}}
        </ShwGrid>
      </:theming>
      <:reference>
        <ShwGrid
          class="shw-component-tooltip-placement-grid"
          @columns={{3}}
          @gap="4rem"
          as |SG|
        >
          {{#each PLACEMENTS as |place|}}
            <SG.Item
              class="shw-component-tooltip-placement-grid__item--{{place}}"
            >
              <cds-tooltip align={{place}} defaultOpen>
                <div
                  class="shw-component-tooltip-placement-grid__target"
                >{{place}}</div>
                <cds-tooltip-content id="content-{{place}}">More info</cds-tooltip-content>
              </cds-tooltip>
            </SG.Item>
          {{/each}}
        </ShwGrid>
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default TooltipCarbonizationIndex;
