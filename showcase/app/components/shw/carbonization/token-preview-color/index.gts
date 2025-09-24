import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

import type { SafeString } from '@ember/template';

import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';

interface ColorTokenRaw {
  name: string;
  $value: string;
}

export interface ShwCarbonizationTokenPreviewColorSignature {
  Args: {
    token: ColorTokenRaw;
  };
}

export default class ShwCarbonizationTokenPreviewColor extends Component<ShwCarbonizationTokenPreviewColorSignature> {
  get shortName(): string {
    return this.args.token.name.replace(/^token-/, '');
  }

  get style(): SafeString | undefined {
    const styles: string[] = [];
    if (this.args.token.$value) {
      styles.push(`background: ${this.args.token.$value}`);
    }
    return styles.length > 0 ? htmlSafe(styles.join('; ')) : undefined;
  }

  <template>
    <ShwCarbonizationComparisonGrid
      @label={{this.shortName}}
      @hideThemeLabels={{true}}
    >
      <:themed>
        <div
          class="shw-carbonization-token-preview-color"
          style={{this.style}}
        />
      </:themed>
    </ShwCarbonizationComparisonGrid>
  </template>
}
