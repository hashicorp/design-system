import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormRadioGroup } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnChangeFunction = () => {
    console.log('Invoked "yourOnChangeFunction"');
  };

  <template>
    <HdsFormRadioGroup @layout="vertical" @name="datacenter-demo5" as |G|>
      <G.Legend>Choose datacenter</G.Legend>
      <G.RadioField
        @id="datacenter-NYC1"
        checked
        @value="NYC1"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>NYC1</F.Label>
        <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
      </G.RadioField>
      <G.RadioField
        @id="datacenter-DC1"
        @value="DC1"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>DC1</F.Label>
        <F.HelperText>CoreSite- K Street</F.HelperText>
      </G.RadioField>
      <G.RadioField
        @id="datacenter-NYC2"
        @value="NYC2"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>NYC1</F.Label>
        <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
      </G.RadioField>
      <G.RadioField
        @id="datacenter-SF1"
        @value="SF1"
        {{on "change" this.yourOnChangeFunction}}
        as |F|
      >
        <F.Label>SF1</F.Label>
        <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
      </G.RadioField>
    </HdsFormRadioGroup>
  </template>
}
