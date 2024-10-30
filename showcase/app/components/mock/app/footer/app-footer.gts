/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// HDS components
import { HdsAppFooter } from '@hashicorp/design-system-components/components';

// types
import type { HdsAppFooterSignature } from '@hashicorp/design-system-components/components/hds/app-footer/index';

export interface MockAppFooterAppFooterSignature {
  Element: HdsAppFooterSignature['Element'];
}

const MockAppFooterAppFooter: TemplateOnlyComponent<MockAppFooterAppFooterSignature> =
  <template>
    <HdsAppFooter ...attributes as |AF|>
      <AF.LegalLinks />
    </HdsAppFooter>
  </template>;
export default MockAppFooterAppFooter;
