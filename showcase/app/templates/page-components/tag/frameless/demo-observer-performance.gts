/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier/modifiers/style';

import ShwTextBody from 'showcase/components/shw/text/body';

import {
  HdsLayoutGrid,
  HdsTag,
} from '@hashicorp/design-system-components/components';

const DEMO_RANGE: { index: number }[] = Array.from(
  { length: 1000 },
  (_, i) => ({ index: i + 1 }),
);

const PageComponentsTagFramelessDemoObserverPerformance: TemplateOnlyComponent =
  <template>
    {{pageTitle "Tag - Observer performance demo - Frameless"}}

    <div {{style padding="24px"}}>
      <ShwTextBody><strong>Note:</strong>
        This demo is to test the loading performance of the ResizeObserver when
        many Tags are rendered. There should be little increase in loading times
        even when many Tags with observers are present.</ShwTextBody>

      <HdsLayoutGrid @columnWidth="150px" @gap="16">
        {{#each DEMO_RANGE as |i|}}
          <HdsTag
            @text="{{i.index}} This is a very long text that should go on multiple lines"
          />
        {{/each}}
      </HdsLayoutGrid>
    </div>
  </template>;

export default PageComponentsTagFramelessDemoObserverPerformance;
