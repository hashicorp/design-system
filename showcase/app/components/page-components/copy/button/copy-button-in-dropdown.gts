/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';
import type { HdsDropdownSignature } from '@hashicorp/design-system-components/components/hds/dropdown/index';

import CopyButtonGenericContent from 'showcase/components/page-components/copy/button/copy-button-generic-demo';

export interface CopyButtonGenericContentSignature {
  Element: HdsDropdownSignature['Element'];
}

const CopyButtonInDropdown: TemplateOnlyComponent = <template>
  <HdsDropdown @listPosition="bottom-left" as |dd|>
    <dd.ToggleButton @text="Open menu" />
    <dd.Generic>
      <CopyButtonGenericContent />
    </dd.Generic>
  </HdsDropdown>
</template>;

export default CopyButtonInDropdown;
