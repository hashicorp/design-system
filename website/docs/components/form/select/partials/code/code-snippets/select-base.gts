import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormSelectBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Invoked "yourOnBlurFunction"');
  };

  <template>
    <HdsFormSelectBase
      aria-label="Target infrastructure"
      required={{true}}
      name="demo-target-infrastructure"
      {{on "blur" this.yourOnBlurFunction}}
      as |S|
    >
      <S.Options>
        <option value="Kubernetes">Kubernetes</option>
        <option value="Other">Other</option>
      </S.Options>
    </HdsFormSelectBase>
  </template>
}
