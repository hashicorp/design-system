/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsIcon } from '@hashicorp/design-system-components/components';

interface DocCodeGroupExpandButtonSignature {
  Args: {
    isExpanded: boolean;
    onToggleExpand: () => void;
  };
  Element: HTMLButtonElement;
}

export default class DocCodeGroupExpandButton extends Component<DocCodeGroupExpandButtonSignature> {
  get icon() {
    return this.args.isExpanded ? 'unfold-close' : 'unfold-open';
  }

  <template>
    <button
      type="button"
      class="doc-code-group__expand-button"
      {{on "click" @onToggleExpand}}
      aria-expanded={{if @isExpanded "true" "false"}}
      aria-label="Expand .gts snippet"
      ...attributes
    >
      <HdsIcon @name={{this.icon}} />
    </button>
  </template>
}
