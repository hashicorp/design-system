/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsFormRadioGroup } from '@hashicorp/design-system-components/components';

const SubSectionGroupControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Group" of controls</ShwTextH2>

  <ShwTextH3>Vertical layout</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="With legend">
      <HdsFormRadioGroup @name="control-vertical-01" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SG.Item>
    <SG.Item @label="With legend / With helper text">
      <HdsFormRadioGroup @name="control-vertical-03" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SG.Item>
    <SG.Item @label="Without legend">
      <HdsFormRadioGroup @name="control-vertical-02" as |G|>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SG.Item>
    <SG.Item @label="Without legend / With helper text">
      <HdsFormRadioGroup @name="control-vertical-04" as |G|>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SG.Item>
    <SG.Item @label="With helper text at group level">
      <HdsFormRadioGroup @name="control-vertical-05" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SG.Item>
    <SG.Item @label="With error at group level">
      <HdsFormRadioGroup @name="control-vertical-06" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField name="control-vertical-06" as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField name="control-vertical-06" checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField name="control-vertical-06" as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
        <G.Error>Error for the entire group</G.Error>
      </HdsFormRadioGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Horizontal layout</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With legend">
      <HdsFormRadioGroup
        @layout="horizontal"
        @name="control-horizontal-01"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
    <SF.Item @label="Without legend">
      <HdsFormRadioGroup
        @layout="horizontal"
        @name="control-horizontal-02"
        as |G|
      >
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
    <SF.Item @label="With helper text at group level">
      <HdsFormRadioGroup
        @layout="horizontal"
        @name="control-horizontal-03"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
    <SF.Item @label="With error at group level">
      <HdsFormRadioGroup
        @layout="horizontal"
        @name="control-horizontal-04"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField name="control-horizontal-04" as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField name="control-horizontal-04" checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField name="control-horizontal-04" as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
        <G.Error>Error for the entire group</G.Error>
      </HdsFormRadioGroup>
    </SF.Item>
    <SF.Item @label="With controls on multiple lines" {{style width="450px"}}>
      <HdsFormRadioGroup
        @layout="horizontal"
        @name="control-horizontal-05"
        as |G|
      >
        <G.Legend>Lorem ipsum dolor</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Sit amet</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Consectetur adipiscing</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Elit</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Pellentesque erat</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Lacinia</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>At magna</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="With legend + Required">
      <HdsFormRadioGroup @isRequired={{true}} @name="control-required" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
    <SF.Item @label="With legend + Optional">
      <HdsFormRadioGroup @isOptional={{true}} @name="control-optional" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.RadioField>
        <G.RadioField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Disabled">
      <HdsFormRadioGroup @name="control-disabled" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.RadioField disabled={{true}} as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.RadioField>
        <G.RadioField disabled={{true}} checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.RadioField>
        <G.RadioField disabled={{true}} indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.RadioField>
      </HdsFormRadioGroup>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Special cases</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>With <code>true/false</code> as boolean values</SFI.Label>
      <HdsFormRadioGroup @name="control-booleans" as |G|>
        {{#let (array true false) as |bools|}}
          {{#each bools as |bool|}}
            {{! @glint-expect-error - this is a special case for consumers who pass a boolean value to the radio field }}
            <G.RadioField @id={{bool}} @value={{bool}} as |F|>
              <F.Label>{{bool}}</F.Label>
            </G.RadioField>
          {{/each}}
        {{/let}}
      </HdsFormRadioGroup>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionGroupControl;
