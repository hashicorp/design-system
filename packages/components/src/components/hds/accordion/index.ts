import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemSignature } from './item/index.ts';

interface HdsAccordionSignature {
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsAccordionItemSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAccordionIndexComponent extends Component<HdsAccordionSignature> {}
