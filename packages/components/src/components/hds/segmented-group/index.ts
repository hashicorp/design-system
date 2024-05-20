import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsButtonSignature } from '../button';
import type { HdsYieldSignature } from '../yield';

interface HdsSegmentedGroupSignature {
  Blocks: {
    default: [
      {
        Button: ComponentLike<HdsButtonSignature>;
        // TODO add here the missing signatures
        // Dropdown
        // Select
        // TextInput
        Generic: ComponentLike<HdsYieldSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

const HdsSegmentedGroupComponent =
  TemplateOnlyComponent<HdsSegmentedGroupSignature>();

export default HdsSegmentedGroupComponent;
