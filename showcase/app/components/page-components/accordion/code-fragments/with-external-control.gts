/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

import type { HdsAccordionForceStates } from '@hashicorp/design-system-components/components/hds/accordion/types';

export interface CodeFragmentWithExternalControlSignature {
  Args: {
    variant: 'all' | 'single';
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithExternalControl extends Component<CodeFragmentWithExternalControlSignature> {
  @tracked state: HdsAccordionForceStates = 'close';

  get buttonLabel(): string {
    const label = this.state === 'open' ? 'Collapse all' : 'Expand all';

    if (this.args.variant === 'single') {
      return label.replace('all', 'item 2');
    }

    return label;
  }

  onToggle = () => {
    this.state = this.state === 'open' ? 'close' : 'open';
  };

  <template>
    <button
      type="button"
      {{style padding=".25rem" marginBottom="1rem"}}
      {{on "click" this.onToggle}}
    >
      {{this.buttonLabel}}
    </button>
    <HdsAccordion @forceState={{if (eq @variant "all") this.state}} as |A|>
      <A.Item>
        <:toggle>Item one</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>
      <A.Item
        @forceState={{this.state}}
        @onClickToggle={{if (eq @variant "single") this.onToggle}}
      >
        <:toggle>Item two</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>
      <A.Item>
        <:toggle>Item Three</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>
}
