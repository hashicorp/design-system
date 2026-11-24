/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

// matches the signatures ember-power-select expects from `beforeOptionsComponent` and `afterOptionsComponent`
interface CodeFragmentWithOptionsGenericContentSignature {
  Blocks: { default: [] };
  Element: HTMLDivElement;
}

const CodeFragmentWithOptionsGenericContent: TemplateOnlyComponent<CodeFragmentWithOptionsGenericContentSignature> =
  <template>
    <ShwPlaceholder
      @text="placeholder"
      {{style textShadow="0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff"}}
      @background="hsla(0, 100%, 92%, 1)"
      @height="40px"
    />
  </template>;

export default CodeFragmentWithOptionsGenericContent;
