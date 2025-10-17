/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import PowerSelectMultiple from 'ember-power-select/components/power-select-multiple';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwFlex from 'showcase/components/shw/flex';
import NOOP from 'showcase/utils/noop';

const OPTIONS: string[] = [
  'Oregon (us-west-2)',
  'N. Virginia (us-east-1)',
  'Ireland (eu-west-1)',
  'London (eu-west-2)',
  'Frankfurt (eu-central-1)',
];
const SELECTEDMULTIPLE: string[] = [
  'Oregon (us-west-2)',
  'N. Virginia (us-east-1)',
  'Ireland (eu-west-1)',
];

const SubSectionMultiSelect: TemplateOnlyComponent = <template>
  <ShwTextH2>Multiple selection</ShwTextH2>

  <ShwTextH3>Interaction</ShwTextH3>

  <ShwFlex {{style max-width="50%"}} @direction="column" as |SF|>
    <SF.Item @label="Default">
      <div class="hds-power-select">
        <PowerSelectMultiple
          @options={{OPTIONS}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelectMultiple>
      </div>
    </SF.Item>
    <SF.Item @label="Selected">
      <div class="hds-power-select">
        <PowerSelectMultiple
          @options={{OPTIONS}}
          @selected={{SELECTEDMULTIPLE}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelectMultiple>
      </div>
    </SF.Item>
    <SF.Item @label="Search enabled">
      <div class="hds-power-select">
        <PowerSelectMultiple
          @options={{OPTIONS}}
          @selected={{SELECTEDMULTIPLE}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          @searchEnabled={{true}}
          @searchFieldPosition="before-options"
          as |option|
        >
          {{option}}
        </PowerSelectMultiple>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>States</ShwTextH3>

  <ShwFlex {{style max-width="50%"}} @direction="column" as |SF|>
    <SF.Item @label="Default">
      <div class="hds-power-select">
        <PowerSelectMultiple
          @options={{OPTIONS}}
          @selected={{SELECTEDMULTIPLE}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          @searchEnabled={{true}}
          as |option|
        >
          {{option}}
        </PowerSelectMultiple>
      </div>
    </SF.Item>
    <SF.Item @label="Focus">
      <div class="hds-power-select">
        <PowerSelectMultiple
          class="mock-focus"
          @options={{OPTIONS}}
          @selected={{SELECTEDMULTIPLE}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelectMultiple>
      </div>
    </SF.Item>
    <SF.Item @label="Disabled">
      <div class="hds-power-select">
        <PowerSelectMultiple
          @options={{OPTIONS}}
          @selected={{SELECTEDMULTIPLE}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          @disabled={{true}}
          as |option|
        >
          {{option}}
        </PowerSelectMultiple>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionMultiSelect;
