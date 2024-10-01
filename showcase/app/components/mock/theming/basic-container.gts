/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

interface MockThemingBasicContainerSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class MockThemingBasicContainer extends Component<MockThemingBasicContainerSignature> {
  <template>
    <div class="mock-theming-basic-container" ...attributes>
      {{#if @text}}
        {{@text}}
      {{else}}
        {{yield}}
      {{/if}}
    </div>
  </template>
}
