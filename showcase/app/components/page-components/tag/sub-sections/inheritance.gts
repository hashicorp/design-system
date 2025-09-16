/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import NOOP from 'showcase/utils/noop';

import { HdsTag } from '@hashicorp/design-system-components/components';

const SubSectionInheritance: TemplateOnlyComponent = <template>
  <ShwTextH2>Inheritance</ShwTextH2>

  <ShwFlex @label="Applied to parent" as |SF|>
    <SF.Item>
      <div class="shw-component-tag-inheritance-font-style">
        <HdsTag @text="My text tag" @onDismiss={{NOOP}} />
      </div>
    </SF.Item>
    <SF.Item>
      <div class="shw-component-tag-inheritance-font-style">
        <HdsTag
          @text="My link tag"
          @onDismiss={{NOOP}}
          @route="page-components.tag"
        />
      </div>
    </SF.Item>
    <SF.Item>
      <div class="shw-component-tag-inheritance-font-style">
        <HdsTag
          @text="This is a very long text that should go on multiple lines"
          @onDismiss={{NOOP}}
        />
      </div>
    </SF.Item>
    <SF.Item>
      <div class="shw-component-tag-inheritance-font-style">
        <HdsTag
          @text="This is a very long text that should go on multiple lines"
          @onDismiss={{NOOP}}
          @route="page-components.tag"
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @label="Applied to the tag" as |SF|>
    <SF.Item>
      <HdsTag
        @text="My text tag"
        @onDismiss={{NOOP}}
        class="shw-component-tag-inheritance-font-style shw-component-tag-inheritance-background-color"
      />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="My link tag"
        @onDismiss={{NOOP}}
        @route="page-components.tag"
        class="shw-component-tag-inheritance-font-style shw-component-tag-inheritance-background-color"
      />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="This is a very long text that should go on multiple lines"
        @onDismiss={{NOOP}}
        class="shw-component-tag-inheritance-font-style shw-component-tag-inheritance-background-color"
      />
    </SF.Item>
    <SF.Item>
      <HdsTag
        @text="This is a very long text that should go on multiple lines"
        @onDismiss={{NOOP}}
        @route="page-components.tag"
        class="shw-component-tag-inheritance-font-style shw-component-tag-inheritance-background-color"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionInheritance;
