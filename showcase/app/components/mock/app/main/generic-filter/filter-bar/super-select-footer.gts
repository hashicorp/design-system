/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';
import type { WithBoundArgs } from '@glint/template';

// HDS components
import { HdsButton } from '@hashicorp/design-system-components/components';

import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

export interface MockAppMainGenericFilterBarSuperSelectFooterSignature {
  Args: HdsButtonSignature['Args'] & {
    button?: WithBoundArgs<typeof HdsButton, never>;
    onClick: (event: Event) => void;
    onClear: (event: Event) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const MockAppMainGenericFilterBarSuperSelectFooter: TemplateOnlyComponent<MockAppMainGenericFilterBarSuperSelectFooterSignature> =
  <template>
    <div class="filter__super-select__footer">
      <HdsButton
        {{on "click" @onClick}}
        @color="primary"
        @text="Apply"
        @size="small"
      />
      <HdsButton
        {{on "click" @onClear}}
        @color="secondary"
        @text="Clear all"
        @size="small"
      />
    </div>
  </template>;

export default MockAppMainGenericFilterBarSuperSelectFooter;
