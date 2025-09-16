/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import NOOP from 'showcase/utils/noop';

import {
  HdsTag,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item>
      <HdsTag @text="My text tag" @onDismiss={{NOOP}} />
    </SF.Item>
    <SF.Item>
      <HdsTag @text="My text tag" />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="My link tag"
        @onDismiss={{NOOP}}
        @route="page-components.tag"
      />
    </SF.Item>
    <SF.Item>
      <HdsTag @text="My link tag" @route="page-components.tag" />
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="Inline with other text" as |SF|>
    <SF.Item>
      <HdsTextBody @size="200" @tag="p">This is a paragraph:
        <HdsTag @text="My text tag" /></HdsTextBody>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="With long text" as |SF|>
    <SF.Item>
      <HdsTag
        @text="This is a very long text that should go on multiple lines"
        @onDismiss={{NOOP}}
      />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="This is a very long text that should go on multiple lines"
      />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="This is a very long text that should go on multiple lines"
        @onDismiss={{NOOP}}
        @route="page-components.tag"
      />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="This is a very long text that should go on multiple lines"
        @route="page-components.tag"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionContent;
