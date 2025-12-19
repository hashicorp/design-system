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
  get label() {
    return this.args.isExpanded
      ? 'Collapse .gts snippet'
      : 'Expand .gts snippet';
  }

  get icon() {
    return this.args.isExpanded ? 'unfold-close' : 'unfold-open';
  }

  <template>
    <button
      type="button"
      class="doc-code-group__expand-button"
      {{on "click" @onToggleExpand}}
      aria-expanded={{@isExpanded}}
      ...attributes
    >
      <HdsIcon @name={{this.icon}} />
      <span>
        {{this.label}}
      </span>
    </button>
  </template>
}
