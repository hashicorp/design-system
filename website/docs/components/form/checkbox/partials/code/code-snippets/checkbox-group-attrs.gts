import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormCheckboxGroup } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormCheckboxGroup @layout="vertical" @name="demo-datacenter" as |G|>
      <G.Legend>Valid datacenters</G.Legend>
      <G.CheckboxField
        name="datacenter1"
        @id="datacenter-NYC1"
        @value="NYC1"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>NYC1</F.Label>
        <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
      </G.CheckboxField>
      <G.CheckboxField
        name="datacenter2"
        @id="datacenter-DC1"
        checked
        @value="DC1"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>DC1</F.Label>
        <F.HelperText>CoreSite- K Street</F.HelperText>
      </G.CheckboxField>
      <G.CheckboxField
        name="datacenter3"
        @id="datacenter-NYC2"
        checked
        @value="NYC2"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>NYC2</F.Label>
        <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
      </G.CheckboxField>
      <G.CheckboxField
        name="datacenter4"
        @id="datacenter-SF1"
        @value="SF1"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>SF1</F.Label>
        <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
      </G.CheckboxField>
    </HdsFormCheckboxGroup>
  </template>
}
