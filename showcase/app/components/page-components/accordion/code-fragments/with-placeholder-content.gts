/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { get } from '@ember/object';
import { helper } from '@ember/component/helper';
import { or } from 'ember-truth-helpers';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

export interface CodeFragmentWithPlaceholderContentSignature {
  Args: {
    type?: HdsAccordionSignature['Args']['type'];
    titleTag?: HdsAccordionSignature['Args']['titleTag'];
    numberOfItems?: 1 | 2 | 3;
    labelPrefix?: string;
  };
  Element: HTMLDivElement;
}

const range = helper(([count]: [number]) => {
  return Array.from({ length: count }, (_, index) => index + 1);
});

const mapNumberToString: Record<number, string> = {
  1: 'one',
  2: 'two',
  3: 'three',
};

const CodeFragmentWithPlaceholderContent: TemplateOnlyComponent<CodeFragmentWithPlaceholderContentSignature> =
  <template>
    <HdsAccordion @type={{@type}} @titleTag={{@titleTag}} as |A|>
      {{#each (range (or @numberOfItems 1)) as |item|}}
        <A.Item>
          <:toggle>
            {{#if @labelPrefix}}
              {{@labelPrefix}}
              item
              {{get mapNumberToString item}}
            {{else}}
              Item
              {{get mapNumberToString item}}
            {{/if}}
          </:toggle>
          <:content>
            <ShwPlaceholder @text="generic content" @height="40" />
          </:content>
        </A.Item>
      {{/each}}
    </HdsAccordion>
  </template>;

export default CodeFragmentWithPlaceholderContent;
