/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import PowerSelect from 'ember-power-select/components/power-select';

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
const SELECTED: string[] = ['Oregon (us-west-2)'];

const SubSectionSingleSelect: TemplateOnlyComponent = <template>
  <ShwTextH2>Single selection</ShwTextH2>

  <ShwTextH3>Interaction</ShwTextH3>
  <ShwFlex {{style max-width="50%"}} @direction="column" as |SF|>
    <SF.Item @label="Default">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
    <SF.Item @label="Selected">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
    <SF.Item @label="Search enabled">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          @searchEnabled={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>States</ShwTextH3>

  <ShwFlex {{style max-width="50%"}} @direction="column" as |SF|>
    <SF.Item @label="Default">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
    <SF.Item @label="Focus">
      <div class="hds-power-select">
        <PowerSelect
          class="mock-focus"
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
    <SF.Item @label="Disabled">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @disabled={{true}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>List position</ShwTextH3>

  <ShwFlex {{style max-width="50%"}} @direction="column" as |SF|>
    <SF.Item @label="Below (default)">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
    <SF.Item @label="Above">
      <div class="hds-power-select">
        <PowerSelect
          @options={{OPTIONS}}
          @selected={{SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          @verticalPosition="above"
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionSingleSelect;
