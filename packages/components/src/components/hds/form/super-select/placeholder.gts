/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../../text/body.gts';

import type { TOC } from '@ember/component/template-only';

export interface HdsFormSuperSelectPlaceholderSignature {
  Args: {
    placeholder?: string;
  };
}

const HdsFormSuperSelectPlaceholder: TOC<HdsFormSuperSelectPlaceholderSignature> =
  <template>
    <HdsTextBody @tag="span" @size="200" class="ember-power-select-placeholder">
      {{@placeholder}}</HdsTextBody>
  </template>;

export default HdsFormSuperSelectPlaceholder;
