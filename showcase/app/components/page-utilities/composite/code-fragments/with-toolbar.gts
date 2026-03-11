/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsComposite,
  HdsButton,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

import type { HdsCompositeSignature } from '@hashicorp/design-system-components/components/hds/composite/index';
import type { HdsLayoutFlexSignature } from '@hashicorp/design-system-components/components/hds/layout/flex/index';

export interface CompositeWithToolbarSignature {
  Args: {
    ariaLabel: string;
    defaultCurrentId?: HdsCompositeSignature['Args']['defaultCurrentId'];
    loop?: HdsCompositeSignature['Args']['loop'];
    orientation?: HdsCompositeSignature['Args']['orientation'];
    role: 'toolbar' | 'listbox';
    direction?: HdsLayoutFlexSignature['Args']['direction'];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const CompositeWithToolbar: TemplateOnlyComponent<CompositeWithToolbarSignature> =
  <template>
    <HdsComposite
      @defaultCurrentId={{@defaultCurrentId}}
      @orientation={{@orientation}}
      @loop={{@loop}}
      as |c|
    >
      <HdsLayoutFlex
        role={{@role}}
        aria-label={{@ariaLabel}}
        @gap="4"
        @direction={{@direction}}
        {{c.composite}}
      >
        <HdsButton {{c.item}} @text="First" id="preset-first" />
        <HdsButton {{c.item}} @text="Second" id="preset-second" />
        <HdsButton {{c.item}} @text="Third" id="preset-third" />
        <HdsButton {{c.item}} @text="Fourth" id="preset-fourth" />
      </HdsLayoutFlex>
    </HdsComposite>
  </template>;

export default CompositeWithToolbar;
