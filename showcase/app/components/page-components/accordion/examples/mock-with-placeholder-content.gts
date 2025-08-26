/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { helper } from '@ember/component/helper';
import { or } from 'ember-truth-helpers';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

export interface MockWithPlaceholderContentSignature {
  Args: HdsAccordionSignature['Args'] & {
    numberOfItems?: 1 | 2 | 3;
    labelPrefix?: string;
  };
  Element: HTMLDivElement;
}

const range = helper(([count]: [number]) => {
  return Array.from({ length: count }, (_, index) => index + 1);
});

const MockWithPlaceholderContent: TemplateOnlyComponent<MockWithPlaceholderContentSignature> =
  <template>
    <HdsAccordion @type={{@type}} as |A|>
      {{#each (range (or @numberOfItems 1)) as |item|}}
        <A.Item>
          <:toggle>
            {{#if @labelPrefix}}
              {{@labelPrefix}}
              item
              {{item}}
            {{else}}
              Item
              {{item}}
            {{/if}}
          </:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      {{/each}}
    </HdsAccordion>
  </template>;

export default MockWithPlaceholderContent;
