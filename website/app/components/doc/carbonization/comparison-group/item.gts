import Component from '@glimmer/component';

import { HdsThemeContext } from '@hashicorp/design-system-components/components';
import type { HdsThemeContexts } from '@hashicorp/design-system-components/components/hds/theme-context/types';

export interface DocCarbonizationComparisonGroupItemSignature {
  Args: {
    context: HdsThemeContexts;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocCarbonizationComparisonGroupItem extends Component<DocCarbonizationComparisonGroupItemSignature> {
  get label(): string {
    switch (this.args.context) {
      case 'default':
        return 'hds/default';
      case 'light':
      case 'dark':
      case 'system':
      case 'cds-g0':
      case 'cds-g10':
      case 'cds-g90':
      case 'cds-g100':
        return `carbon/${this.args.context}`;
    }
  }

  get classNames(): string {
    const classes = ['doc-carbonization-comparison-group__item'];

    // add a class based on `this.args.context`
    classes.push(
      `doc-carbonization-comparison-group__item--context-${this.args.context}`,
    );

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      <div
        class="doc-carbonization-comparison-group__item-label"
      >{{this.label}}</div>
      <div class="doc-carbonization-comparison-group__item-content">
        <HdsThemeContext @context={{@context}}>
          {{yield}}
        </HdsThemeContext>
      </div>
    </div>
  </template>
}
