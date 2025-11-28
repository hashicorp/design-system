/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
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
  HdsBadge,
  HdsFormRadioCard,
  HdsFormRadioCardGroup,
  HdsIcon,
  HdsTextBody,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

import {
  CONTROL_POSITIONS,
  ALIGNMENTS,
} from '@hashicorp/design-system-components/components/hds/form/radio-card/index';

import { LAYOUT_TYPES } from '@hashicorp/design-system-components/components/hds/form/fieldset/index';

const STATES = ['default', 'hover', 'focus', 'disabled'];

export interface CdsRadioTileContentSignature {
  Args: {
    alignment?: string;
    showIcon?: boolean;
    showBadge?: boolean;
    label?: string;
    description?: string;
    badgeText?: string;
  };
}

const CdsRadioTileContent: TemplateOnlyComponent<CdsRadioTileContentSignature> =
  <template>
    <div
      class="shw-carbonization-form-radio-card-mock-radio-tile-content shw-carbonization-form-radio-card-mock-radio-tile-content--align-{{if
          @alignment
          @alignment
          'left'
        }}"
    >
      {{#if @showIcon}}
        <HdsIcon @name="hexagon" @size="24" />
      {{/if}}
      <HdsTextDisplay @tag="span" @size="300" @weight="bold">{{if
          @label
          @label
          "Label"
        }}</HdsTextDisplay>
      {{#if @showBadge}}
        <HdsBadge @text="Badge" />
      {{/if}}
      <HdsTextBody @tag="span" @size="100">{{if
          @description
          @description
          "Description"
        }}</HdsTextBody>
    </div>
  </template>;

export default class FormRadioCardCarbonization extends Component {
  onChange = (event: Event) => {
    const control = event.target as HTMLInputElement;
    const group = control.closest('.hds-form-group__control-fields-wrapper');
    group?.querySelectorAll('.hds-form-radio-card').forEach((radioCard) => {
      radioCard.classList.remove('hds-form-radio-card--checked');
    });
    control
      ?.closest('.hds-form-radio-card')
      ?.classList.add('hds-form-radio-card--checked');
  };

  <template>
    {{pageTitle "RadioCard - Carbonization"}}

    <ShwTextH1>RadioCard - Carbonization</ShwTextH1>

    <section>

      <ShwTextH2>"Base" control</ShwTextH2>

      <ShwTextH3>States</ShwTextH3>

      {{#each STATES as |state|}}
        <ShwTextBody>{{capitalize state}}</ShwTextBody>
        <ShwCarbonizationComparisonGrid>
          <:theming>
            <div
              mock-state-value={{unless (eq state "disabled") state}}
              mock-state-selector="label"
            >
              <HdsFormRadioCard @disabled={{eq state "disabled"}} as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Label</R.Label>
                <R.Description>Description</R.Description>
              </HdsFormRadioCard>
            </div>
          </:theming>
          <:reference>
            <cds-radio-tile>
              <CdsRadioTileContent @showIcon={{true}} />
            </cds-radio-tile>
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      <ShwDivider @level={{2}} />

      {{#each STATES as |state|}}
        <ShwTextBody>{{capitalize state}} selected</ShwTextBody>
        <ShwCarbonizationComparisonGrid>
          <:theming>
            <div
              mock-state-value={{unless (eq state "disabled") state}}
              mock-state-selector="label"
            >
              <HdsFormRadioCard
                @checked={{true}}
                @disabled={{eq state "disabled"}}
                as |R|
              >
                <R.Icon @name="hexagon" />
                <R.Label>Label</R.Label>
                <R.Description>Description</R.Description>
              </HdsFormRadioCard>
            </div>
          </:theming>
          <:reference>
            <cds-radio-tile selected="">
              <CdsRadioTileContent @showIcon={{true}} />
            </cds-radio-tile>
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      <ShwDivider />

      <ShwTextH2>"Group" of controls</ShwTextH2>

      <ShwTextH3>Card content</ShwTextH3>

      <ShwCarbonizationComparisonGrid
        @label="With standard content"
        @sideBySide={{true}}
      >
        <:theming>
          <HdsFormRadioCardGroup @name="radio-card-group-default" as |G|>
            <G.Legend>This is the group legend</G.Legend>
            <G.RadioCard @checked={{true}} @value="1" as |R|>
              <R.Icon @name="hexagon" />
              <R.Label>Radio card label 1</R.Label>
              <R.Badge @text="Badge" />
              <R.Description>Radio card description 1</R.Description>
            </G.RadioCard>
            <G.RadioCard @value="2" as |R|>
              <R.Icon @name="hexagon" />
              <R.Label>Radio card label 2</R.Label>
              <R.Badge @text="Badge" />
              <R.Description>Radio card description 2</R.Description>
            </G.RadioCard>
          </HdsFormRadioCardGroup>
        </:theming>
        <:reference>
          <cds-tile-group>
            <legend slot="legend">This is the group legend</legend>
            <cds-radio-tile selected="selected">
              <CdsRadioTileContent
                @showIcon={{true}}
                @showBadge={{true}}
                @label="Radio tile label 1"
                @description="Radio tile description 1"
              />
            </cds-radio-tile>
            <cds-radio-tile>
              <CdsRadioTileContent
                @showIcon={{true}}
                @showBadge={{true}}
                @label="Radio tile label 2"
                @description="Radio tile description 1"
              />
            </cds-radio-tile>
          </cds-tile-group>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwCarbonizationComparisonGrid
        @label="With helper text, required, error"
        @sideBySide={{true}}
      >
        <:theming>
          <HdsFormRadioCardGroup
            @name="radio-card-group-with-extra-elements"
            @isRequired={{true}}
            as |G|
          >
            <G.Legend>This is the group legend</G.Legend>
            <G.HelperText>This is the group helper text</G.HelperText>
            <G.RadioCard @checked={{true}} @value="1" as |R|>
              <R.Icon @name="hexagon" />
              <R.Label>Radio card label 1</R.Label>
              <R.Badge @text="Badge" />
              <R.Description>Radio card description 1</R.Description>
            </G.RadioCard>
            <G.RadioCard @value="2" as |R|>
              <R.Icon @name="hexagon" />
              <R.Label>Radio card label 2</R.Label>
              <R.Badge @text="Badge" />
              <R.Description>Radio card description 2</R.Description>
            </G.RadioCard>
            <G.Error>This is the group error message</G.Error>
          </HdsFormRadioCardGroup>
        </:theming>
        <:reference>
          <cds-tile-group>
            <legend slot="legend">This is the group legend</legend>
            <cds-radio-tile selected="selected">
              <CdsRadioTileContent
                @showIcon={{true}}
                @showBadge={{true}}
                @label="Radio tile label 1"
                @description="Radio tile description 1"
              />
            </cds-radio-tile>
            <cds-radio-tile>
              <CdsRadioTileContent
                @showIcon={{true}}
                @showBadge={{true}}
                @label="Radio tile label 2"
                @description="Radio tile description 1"
              />
            </cds-radio-tile>
          </cds-tile-group>
        </:reference>
      </ShwCarbonizationComparisonGrid>

      <ShwDivider @level={{2}} />

      <ShwTextH3>Control position</ShwTextH3>

      {{#each CONTROL_POSITIONS as |position|}}
        <ShwCarbonizationComparisonGrid
          @label="Position = {{position}}"
          @sideBySide={{true}}
        >
          <:theming>
            <HdsFormRadioCardGroup
              @name="radio-card-position-{{position}}"
              @controlPosition={{position}}
              as |G|
            >
              <G.RadioCard @checked={{true}} @value="1" as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Radio card label 1</R.Label>
                <R.Badge @text="Badge" />
                <R.Description>Radio card description 1</R.Description>
              </G.RadioCard>
              <G.RadioCard @value="2" as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Radio card label 2</R.Label>
                <R.Badge @text="Badge" />
                <R.Description>Radio card description 2</R.Description>
              </G.RadioCard>
            </HdsFormRadioCardGroup>
          </:theming>
          <:reference>
            <cds-tile-group>
              <cds-radio-tile selected="selected">
                <CdsRadioTileContent
                  @showIcon={{true}}
                  @showBadge={{true}}
                  @label="Radio tile label 1"
                  @description="Radio tile description 1"
                />
              </cds-radio-tile>
              <cds-radio-tile>
                <CdsRadioTileContent
                  @showIcon={{true}}
                  @showBadge={{true}}
                  @label="Radio tile label 2"
                  @description="Radio tile description 1"
                />
              </cds-radio-tile>
            </cds-tile-group>
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      <ShwDivider @level={{2}} />

      <ShwTextH3>Card alignment</ShwTextH3>

      {{#each ALIGNMENTS as |alignment|}}
        <ShwCarbonizationComparisonGrid
          @label="Alignment = {{alignment}}"
          @sideBySide={{true}}
        >
          <:theming>
            <HdsFormRadioCardGroup
              @name="radio-card-alignment-{{alignment}}"
              @alignment={{alignment}}
              as |G|
            >
              <G.RadioCard @checked={{true}} @value="1" as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Radio card label 1</R.Label>
                <R.Badge @text="Badge" />
                <R.Description>Radio card description 1</R.Description>
              </G.RadioCard>
              <G.RadioCard @value="2" as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Radio card label 2</R.Label>
                <R.Badge @text="Badge" />
                <R.Description>Radio card description 2</R.Description>
              </G.RadioCard>
            </HdsFormRadioCardGroup>
          </:theming>
          <:reference>
            <cds-tile-group>
              <cds-radio-tile selected="selected">
                <CdsRadioTileContent
                  @alignment={{alignment}}
                  @showIcon={{true}}
                  @showBadge={{true}}
                  @label="Radio tile label 1"
                  @description="Radio tile description 1"
                />
              </cds-radio-tile>
              <cds-radio-tile>
                <CdsRadioTileContent
                  @alignment={{alignment}}
                  @showIcon={{true}}
                  @showBadge={{true}}
                  @label="Radio tile label 2"
                  @description="Radio tile description 1"
                />
              </cds-radio-tile>
            </cds-tile-group>
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}

      <ShwDivider @level={{2}} />

      <ShwTextH3>Group layout</ShwTextH3>

      {{#each LAYOUT_TYPES as |layout|}}
        <ShwCarbonizationComparisonGrid
          @label="Layout = {{layout}}"
          @sideBySide={{true}}
        >
          <:theming>
            <HdsFormRadioCardGroup
              @name="radio-card-layout-{{layout}}"
              @controlPosition="left"
              @layout={{layout}}
              as |G|
            >
              <G.RadioCard @checked={{true}} @value="1" as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Radio card label 1</R.Label>
                <R.Badge @text="Badge" />
                <R.Description>Radio card description 1</R.Description>
              </G.RadioCard>
              <G.RadioCard @value="2" as |R|>
                <R.Icon @name="hexagon" />
                <R.Label>Radio card label 2</R.Label>
                <R.Badge @text="Badge" />
                <R.Description>Radio card description 2</R.Description>
              </G.RadioCard>
            </HdsFormRadioCardGroup>
          </:theming>
          <:reference>
            <cds-tile-group>
              <cds-radio-tile selected="selected">
                <CdsRadioTileContent
                  @showIcon={{true}}
                  @showBadge={{true}}
                  @label="Radio tile label 1"
                  @description="Radio tile description 1"
                />
              </cds-radio-tile>
              <cds-radio-tile>
                <CdsRadioTileContent
                  @showIcon={{true}}
                  @showBadge={{true}}
                  @label="Radio tile label 2"
                  @description="Radio tile description 1"
                />
              </cds-radio-tile>
            </cds-tile-group>
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    </section>
  </template>
}
