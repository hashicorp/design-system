import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { helper } from '@ember/component/helper';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

import {
  HdsButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

const MAPPING_HDS_COLOR_TO_CDS_KIND = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  critical: 'danger',
} as const;

// tried to use `HdsButtonColors` from the HdsButton types but doesn't make TS happy
type HdsButtonColors = [keyof typeof MAPPING_HDS_COLOR_TO_CDS_KIND];

const mapHdsColorToCdsKind = helper(function ([color]: HdsButtonColors) {
  return MAPPING_HDS_COLOR_TO_CDS_KIND[color];
});

const ButtonCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Button - Carbonization"}}

  <ShwTextH1>Button - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsButton @text="Lorem ipsum" />
          </SF.Item>
          <SF.Item>
            <HdsButton
              @icon="plus"
              @iconPosition="leading"
              @text="Lorem ipsum"
            />
          </SF.Item>
          <SF.Item>
            <HdsButton
              @icon="arrow-right"
              @iconPosition="trailing"
              @text="Lorem ipsum"
            />
          </SF.Item>
          <SF.Item>
            <HdsButton @icon="plus" @isIconOnly={{true}} @text="Lorem ipsum" />
          </SF.Item>
          <SF.Item {{style width="200px"}}>
            <HdsButton
              @icon="plus"
              @text="This is a very long text that should go on multiple lines"
            />
          </SF.Item>
          <SF.Item {{style width="150px"}}>
            <HdsButton @text="Loading" @icon="loading" @isFullWidth={{true}} />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <cds-button size="md" kind="primary">Lorem ipsum</cds-button>
          </SF.Item>
          <SF.Item>
            <cds-button size="md" kind="primary"><HdsIcon
                @name="plus"
                slot="icon"
              />Lorem ipsum</cds-button>
          </SF.Item>
          <SF.Item>
            {{! same as 'cds-icon-button' - see: https://ibm-studios.slack.com/archives/C08Q3RGAGR5/p1759864437238719?thread_ts=1759863653.216359&cid=C08Q3RGAGR5 }}
            <cds-button
              size="md"
              kind="primary"
              tooltip-text="cds-button description (via attribute)"
              tooltip-position="top"
            >
              <HdsIcon @name="plus" slot="icon" />
            </cds-button>
          </SF.Item>
          <SF.Item>
            <cds-button size="md" kind="primary"><HdsIcon
                @name="plus"
                slot="icon"
              />This is a very long text that should go on multiple lines</cds-button>
          </SF.Item>
          <SF.Item {{style width="150px"}}>
            <cds-button size="md" kind="primary"><HdsIcon
                @name="loading"
                slot="icon"
              />Loading</cds-button>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Sizes</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
              <HdsButton
                @icon="plus"
                @iconPosition="trailing"
                @text="Lorem ipsum"
                @size={{size}}
                @isInline={{true}}
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "sm" "md" "lg") as |SIZES|}}
            {{#each SIZES as |size|}}
              <SF.Item>
                <cds-button size={{size}}><HdsIcon
                    @name="plus"
                    slot="icon"
                  />Lorem ipsum</cds-button>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH2>Colors</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwCarbonizationComparisonGrid @label={{color}}>
        <:theming>
          <HdsButton
            @icon="plus"
            @iconPosition="trailing"
            @text="Lorem ipsum"
            @color={{color}}
          />
        </:theming>
        <:reference>
          <cds-button size="md" kind={{mapHdsColorToCdsKind color}}><HdsIcon
              @name="plus"
              slot="icon"
            />Lorem ipsum</cds-button>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH2>States</ShwTextH2>

    {{#each COLORS as |color|}}
      <ShwTextH3>{{capitalize color}}</ShwTextH3>
      {{#each STATES as |state|}}
        <ShwTextBody>{{state}}</ShwTextBody>
        <ShwCarbonizationComparisonGrid>
          <:theming>
            <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
              {{#each SIZES as |size|}}
                <SF.Item>
                  {{#if (eq state "disabled")}}
                    <HdsButton
                      @icon="plus"
                      @iconPosition="trailing"
                      @text="Lorem"
                      @size={{size}}
                      @color={{color}}
                      disabled
                    />
                  {{else}}
                    <HdsButton
                      @icon="plus"
                      @iconPosition="trailing"
                      @text="Lorem"
                      @size={{size}}
                      @color={{color}}
                      mock-state-value={{state}}
                    />
                  {{/if}}
                </SF.Item>
              {{/each}}
            </ShwFlex>
          </:theming>
          <:reference>
            {{#if (eq state "default")}}
              <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
                {{#let (array "sm" "md" "lg") as |SIZES|}}
                  {{#each SIZES as |size|}}
                    <SF.Item>
                      <cds-button
                        size={{size}}
                        kind={{mapHdsColorToCdsKind color}}
                      ><HdsIcon @name="plus" slot="icon" />Lorem ipsum</cds-button>
                    </SF.Item>
                  {{/each}}
                {{/let}}
              </ShwFlex>
            {{else if (eq state "disabled")}}
              <ShwFlex @direction="column" @gap="0.75rem" as |SF|>
                {{#let (array "sm" "md" "lg") as |SIZES|}}
                  {{#each SIZES as |size|}}
                    <SF.Item>
                      <cds-button
                        size={{size}}
                        kind={{mapHdsColorToCdsKind color}}
                        disabled
                      ><HdsIcon @name="plus" slot="icon" />Lorem ipsum</cds-button>
                    </SF.Item>
                  {{/each}}
                {{/let}}
              </ShwFlex>
            {{else}}
              <pre>TODO: add static image here</pre>
            {{/if}}
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}

  </section>
</template>;

export default ButtonCarbonization;
