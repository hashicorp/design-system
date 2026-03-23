import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormMaskedInputField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Invoked "yourOnBlurFunction"');
  };

  <template>
    <HdsFormMaskedInputField
      name="demo-team-token"
      {{on "blur" this.yourOnBlurFunction}}
      as |F|
    >
      <F.Label>Terraform Cloud team token</F.Label>
    </HdsFormMaskedInputField>
  </template>
}
