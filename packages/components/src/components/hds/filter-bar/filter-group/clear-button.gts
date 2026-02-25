/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsButton from '../../button/index.gts';

import type { HdsButtonSignature } from '../../button/index.gts';

export interface HdsFilterBarFilterGroupClearButtonSignature {
  Args: {
    text: string;
  };
  Blocks: {
    default: [];
  };
  Element: HdsButtonSignature['Element'];
}

const HdsFilterBarFilterGroupClearButton: TemplateOnlyComponent<HdsFilterBarFilterGroupClearButtonSignature> =
  <template>
    <HdsButton
      @text={{@text}}
      @color="tertiary"
      @size="small"
      @icon="rotate-ccw"
      ...attributes
      class="hds-filter-bar__filter-group__clear-button"
    />
  </template>;

export default HdsFilterBarFilterGroupClearButton;
