import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import DocCarbonizationComparisonGroupItem from './item';

export interface DocCarbonizationComparisonGroupSignature {
  Args: {
    label?: string;
    display?: 'flex' | 'grid';
    layout?: 'row' | 'column';
  };
  Blocks: {
    label: [];
    default: [
      {
        Item: typeof DocCarbonizationComparisonGroupItem;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class DocCarbonizationComparisonGroup extends Component<DocCarbonizationComparisonGroupSignature> {
  get display(): string {
    return this.args.display ?? 'grid';
  }

  get layout(): string {
    return this.args.layout ?? 'row';
  }

  get classNames(): string {
    const classes = ['doc-carbonization-comparison-group'];

    // add a class based on `this.display`
    classes.push(`doc-carbonization-comparison-group--display-${this.display}`);

    // add a class based on `this.layout`
    classes.push(`doc-carbonization-comparison-group--layout-${this.layout}`);

    return classes.join(' ');
  }

  <template>
    {{#if @label}}
      <div
        class="doc-carbonization-comparison-group__top-label"
      >{{@label}}</div>
    {{/if}}
    {{#if (has-block "label")}}
      <div class="doc-carbonization-comparison-group__top-label">{{yield
          to="label"
        }}</div>
    {{/if}}
    <div class={{this.classNames}} ...attributes>
      {{yield (hash Item=DocCarbonizationComparisonGroupItem)}}
    </div>
  </template>
}
