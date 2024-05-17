import TemplateOnlyComponent from '@ember/component/template-only';
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

const HdsAccordionComponent = TemplateOnlyComponent<HdsAccordionSignature>();

export default HdsAccordionComponent;
