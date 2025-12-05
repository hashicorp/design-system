/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsButton } from '@hashicorp/design-system-components/components';

import CodeFragmentWithLoadingState from 'showcase/components/page-components/button/code-fragments/with-loading-state';

const ButtonIndex: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Only text">
      <HdsButton @text="Lorem ipsum" />
    </SF.Item>
    <SF.Item @label="Text + leading icon">
      <HdsButton @icon="plus" @iconPosition="leading" @text="Lorem ipsum" />
    </SF.Item>
    <SF.Item @label="Text + trailing icon">
      <HdsButton
        @icon="arrow-right"
        @iconPosition="trailing"
        @text="Lorem ipsum"
      />
    </SF.Item>
    <SF.Item @label="Icon only">
      <HdsButton @icon="plus" @isIconOnly={{true}} @text="Lorem ipsum" />
    </SF.Item>
    <SF.Item {{style width="200px"}} @label="Icon + Long text">
      <HdsButton
        @icon="plus"
        @text="This is a very long text that should go on multiple lines"
      />
    </SF.Item>
    <SF.Item {{style width="150px"}} @label="Loading (click to toggle)">
      <CodeFragmentWithLoadingState />
    </SF.Item>
  </ShwFlex>
</template>;

export default ButtonIndex;
