/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsFormToggleGroup } from '@hashicorp/design-system-components/components';

const GENERIC_ITEMS = ['1', '2', '3'];

const SubSectionGroup: TemplateOnlyComponent = <template>
  <ShwTextH2>"Group" of controls</ShwTextH2>

  <ShwTextH3>Vertical layout / Single field</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="With legend">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.ToggleField checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
        </G.ToggleField>
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="With legend / With helper text">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.ToggleField checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
        </G.ToggleField>
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="Without legend">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        <G.ToggleField checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
        </G.ToggleField>
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="Without legend / With helper text">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.ToggleField checked="checked" as |F|>
          <F.Label>This is the label</F.Label>
        </G.ToggleField>
        <G.Error>Error for the entire group</G.Error>
      </HdsFormToggleGroup>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Vertical layout / Multiple fields</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="With legend">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="With legend / With helper text">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
            <F.HelperText>Helper text for control #{{item}}</F.HelperText>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="Without legend">
      <HdsFormToggleGroup as |G|>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="Without legend / With helper text">
      <HdsFormToggleGroup as |G|>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
            <F.HelperText>Helper text for control #{{item}}</F.HelperText>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="With helper text at group level">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SG.Item>
    <SG.Item @label="With error at group level">
      <HdsFormToggleGroup as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
        <G.Error>Error for the entire group</G.Error>
      </HdsFormToggleGroup>
    </SG.Item>
  </ShwGrid>

  <ShwTextH3>Horizontal layout</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With legend">
      <HdsFormToggleGroup @layout="horizontal" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SF.Item>
    <SF.Item @label="Without legend">
      <HdsFormToggleGroup @layout="horizontal" as |G|>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SF.Item>
    <SF.Item @label="With helper text at group level">
      <HdsFormToggleGroup @layout="horizontal" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        <G.HelperText>Helper text for the entire group</G.HelperText>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SF.Item>
    <SF.Item @label="With error at group level">
      <HdsFormToggleGroup @layout="horizontal" as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
        <G.Error>Error for the entire group</G.Error>
      </HdsFormToggleGroup>
    </SF.Item>
    <SF.Item @label="With controls on multiple lines" {{style width="450px"}}>
      <HdsFormToggleGroup @layout="horizontal" as |G|>
        <G.Legend>Lorem ipsum dolor</G.Legend>
        <G.ToggleField as |F|>
          <F.Label>Sit amet</F.Label>
        </G.ToggleField>
        <G.ToggleField checked="checked" as |F|>
          <F.Label>Consectetur adipiscing</F.Label>
        </G.ToggleField>
        <G.ToggleField as |F|>
          <F.Label>Elit</F.Label>
        </G.ToggleField>
        <G.ToggleField as |F|>
          <F.Label>Pellentesque erat</F.Label>
        </G.ToggleField>
        <G.ToggleField as |F|>
          <F.Label>Lacinia</F.Label>
        </G.ToggleField>
        <G.ToggleField checked="checked" as |F|>
          <F.Label>At magna</F.Label>
        </G.ToggleField>
      </HdsFormToggleGroup>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="With legend + Required">
      <HdsFormToggleGroup @isRequired={{true}} as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SF.Item>
    <SF.Item @label="With legend + Optional">
      <HdsFormToggleGroup @isOptional={{true}} as |G|>
        <G.Legend>Legend of the group</G.Legend>
        {{#each GENERIC_ITEMS as |item|}}
          <G.ToggleField checked={{if (eq item "2") "checked"}} as |F|>
            <F.Label>Label of control #{{item}}</F.Label>
          </G.ToggleField>
        {{/each}}
      </HdsFormToggleGroup>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionGroup;
