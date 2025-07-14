/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import StyleModifier from 'ember-style-modifier';

import ShwPlaceholder, {
  type ShwPlaceholderSignature,
} from '../../../../shw/placeholder';

interface MockFormSuperSelectGenericContentSignature {
  Element: ShwPlaceholderSignature['Element'];
}

// This is not an HDS component, but a supporting file for `form/super-select.hbs` which requires a component to be passed in for the showcase
const MockFormSuperSelectGenericContent: TemplateOnlyComponent<MockFormSuperSelectGenericContentSignature> =
  <template>
    <ShwPlaceholder
      @text="placeholder"
      {{StyleModifier textShadow="0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff"}}
      @background="hsla(0, 100%, 92%, 1)"
      @height="40px"
    />
  </template>;

export default MockFormSuperSelectGenericContent;
