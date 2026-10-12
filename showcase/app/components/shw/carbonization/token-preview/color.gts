import Component from '@glimmer/component';
import style from 'ember-style-modifier';

import ShwLabel from 'showcase/components/shw/label';

export interface ShwCarbonizationTokenPreviewColorSignature {
  Args: {
    tokenName: string;
    tokenValue: string;
  };
}

export default class ShwCarbonizationTokenPreviewColor extends Component<ShwCarbonizationTokenPreviewColorSignature> {
  get background(): string {
    return `var(--${this.args.tokenName})`;
  }

  <template>
    <div class="shw-carbonization-token-preview-color-wrapper">
      <ShwLabel
        class="shw-carbonization-token-preview-color-value"
      >{{@tokenValue}}</ShwLabel>
      <div
        class="shw-carbonization-token-preview-color"
        {{style background=this.background}}
      />
    </div>
  </template>
}
