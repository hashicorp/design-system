import Component from '@glimmer/component';
import style from 'ember-style-modifier';

import ShwLabel from 'showcase/components/shw/label';
import THEMED_TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/themed-tokens.json';

import type { HdsModes } from '@hashicorp/design-system-components/services/hds-theming';

import type { DesignToken } from '../../../../../types/design-token';

export interface ShwCarbonizationTokenPreviewColorSignature {
  Args: {
    mode: HdsModes;
    tokenName: string;
  };
}

export default class ShwCarbonizationTokenPreviewColor extends Component<ShwCarbonizationTokenPreviewColorSignature> {
  get background(): string {
    return `var(--${this.args.tokenName})`;
  }

  get value(): string {
    const allThemedTokensForCurrentMode:
      | Record<string, DesignToken>
      | undefined = THEMED_TOKENS_RAW[this.args.mode];
    const themedToken = allThemedTokensForCurrentMode?.[this.args.tokenName];

    if (themedToken?.$value) {
      return themedToken.$value as string;
    } else {
      console.error(
        `Missing themed token for theme=${this.args.mode} and name=${this.args.tokenName}`,
      );
      return 'Undefined token value';
    }
  }

  <template>
    <div class="shw-carbonization-token-preview-color-wrapper">
      <ShwLabel
        class="shw-carbonization-token-preview-color-value"
      >{{this.value}}</ShwLabel>
      <div
        class="shw-carbonization-token-preview-color"
        {{style background=this.background}}
      />
    </div>
  </template>
}
