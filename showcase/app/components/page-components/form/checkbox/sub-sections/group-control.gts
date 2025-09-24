/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsFormCheckboxGroup } from '@hashicorp/design-system-components/components';

const SubSectionFieldGroup: TemplateOnlyComponent = <template>
  <ShwTextH2>"Group" of controls</ShwTextH2>

  <ShwTextH3>Vertical layout</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="With legend">
      <HdsFormCheckboxGroup @name="control-vertical-01" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SG.Item>
    <SG.Item @label="With legend / With helper text">
      <HdsFormCheckboxGroup @name="control-vertical-02" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SG.Item>
    <SG.Item @label="Without legend">
      <HdsFormCheckboxGroup @name="control-vertical-03" as |G|>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SG.Item>
    <SG.Item @label="Without legend / With helper text">
      <HdsFormCheckboxGroup @name="control-vertical-04" as |G|>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SG.Item>
    <SG.Item @label="With helper text at group level">
      <HdsFormCheckboxGroup @name="control-vertical-05" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SG.Item>
    <SG.Item @label="With error at group level">
      <HdsFormCheckboxGroup @name="control-vertical-06" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
        <G.Error>Error for the entire group</G.Error>
      </HdsFormCheckboxGroup>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Horizontal layout</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With legend">
      <HdsFormCheckboxGroup
        @layout="horizontal"
        @name="control-horizontal-01"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
    <SF.Item @label="Without legend">
      <HdsFormCheckboxGroup
        @layout="horizontal"
        @name="control-horizontal-02"
        as |G|
      >
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
    <SF.Item @label="With helper text at group level">
      <HdsFormCheckboxGroup
        @layout="horizontal"
        @name="control-horizontal-03"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
    <SF.Item @label="With error at group level">
      <HdsFormCheckboxGroup
        @layout="horizontal"
        @name="control-horizontal-04"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
        <G.Error>Error for the entire group</G.Error>
      </HdsFormCheckboxGroup>
    </SF.Item>
    <SF.Item @label="With controls on multiple lines" {{style width="450px"}}>
      <HdsFormCheckboxGroup
        @layout="horizontal"
        @name="control-horizontal-05"
        as |G|
      >
        <G.Legend>Lorem ipsum dolor</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Sit amet</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Consectetur adipiscing</F.Label>
        </G.CheckboxField>
        <G.CheckboxField as |F|>
          <F.Label>Elit</F.Label>
        </G.CheckboxField>
        <G.CheckboxField as |F|>
          <F.Label>Pellentesque erat</F.Label>
        </G.CheckboxField>
        <G.CheckboxField as |F|>
          <F.Label>Lacinia</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>At magna</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="With legend + Required">
      <HdsFormCheckboxGroup
        @isRequired={{true}}
        @name="control-required"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
    <SF.Item @label="With legend + Optional">
      <HdsFormCheckboxGroup
        @isOptional={{true}}
        @name="control-optional"
        as |G|
      >
        <G.Legend>Legend of the group</G.Legend>
        <G.CheckboxField as |F|>
          <F.Label>Label of control #1</F.Label>
        </G.CheckboxField>
        <G.CheckboxField checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
        </G.CheckboxField>
        <G.CheckboxField indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Disabled">
      <HdsFormCheckboxGroup @name="control-disabled" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.CheckboxField disabled={{true}} as |F|>
          <F.Label>Label of control #1</F.Label>
          <F.HelperText>Helper text for control #1</F.HelperText>
        </G.CheckboxField>
        <G.CheckboxField disabled={{true}} checked="checked" as |F|>
          <F.Label>Label of control #2</F.Label>
          <F.HelperText>Helper text for control #2</F.HelperText>
        </G.CheckboxField>
        <G.CheckboxField disabled={{true}} indeterminate={{true}} as |F|>
          <F.Label>Label of control #3</F.Label>
          <F.HelperText>Helper text for control #3</F.HelperText>
        </G.CheckboxField>
      </HdsFormCheckboxGroup>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionFieldGroup;
