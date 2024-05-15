import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemIndexSignature } from './item/index.ts';

interface HdsAccordionIndexSignature {
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsAccordionItemIndexSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAccordionIndexComponent extends Component<HdsAccordionIndexSignature> {}
