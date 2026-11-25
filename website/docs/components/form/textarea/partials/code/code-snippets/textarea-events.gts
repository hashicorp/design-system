import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked description = '';

  updateDescription = (event: Event) => {
    const target = event.target;
    if (target instanceof HTMLTextAreaElement) {
      this.description = target.value;
    }
  };

  yourOnBlurFunction = () => {
    console.log('Invoked "yourOnBlurFunction"');
  };

  <template>
    <HdsFormTextareaField
      @value={{this.description}}
      placeholder="Workspace description"
      name="demo-description"
      {{on "input" this.updateDescription}}
      {{on "blur" this.yourOnBlurFunction}}
      as |F|
    >
      <F.Label>Workspace description</F.Label>
      <F.CharacterCount @maxLength={{200}} />
    </HdsFormTextareaField>
  </template>
}
