/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

const CodeFragmentWithOptionsGenericContent: TemplateOnlyComponent = <template>
  <ShwPlaceholder
    @text="placeholder"
    {{style textShadow="0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff"}}
    @background="hsla(0, 100%, 92%, 1)"
    @height="40px"
  />
</template>;

export default CodeFragmentWithOptionsGenericContent;
