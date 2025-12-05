/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

// HDS components
import {
  HdsFormFooter,
  HdsLayoutFlex,
  HdsButtonSet,
  HdsButton,
  HdsAlert,
} from '@hashicorp/design-system-components/components';

// types
import type { HdsLayoutFlexSignature } from '@hashicorp/design-system-components/components/hds/layout/flex/index';

export interface MockAppMainGenericFormPartialsActionsSignature {
  Args: {
    extraText?: string;
  };
  Element: HdsLayoutFlexSignature['Element'];
}

const MockAppMainGenericFormPartialsActions: TemplateOnlyComponent<MockAppMainGenericFormPartialsActionsSignature> =
  <template>
    <HdsFormFooter>
      {{#if @extraText}}
        <HdsLayoutFlex @gap="24" @align="center" ...attributes>
          <HdsButtonSet>
            <HdsButton @color="primary" @text="Submit" type="submit" />
            <HdsButton @color="secondary" @text="Cancel" @href="#" />
          </HdsButtonSet>
          <HdsAlert @type="compact" @color="highlight" as |A|>
            <A.Description>{{@extraText}}</A.Description>
          </HdsAlert>
        </HdsLayoutFlex>
      {{else}}
        <HdsButtonSet ...attributes>
          <HdsButton @text="Submit" type="submit" />
          <HdsButton @text="Cancel" @color="secondary" />
        </HdsButtonSet>
      {{/if}}
    </HdsFormFooter>
  </template>;

export default MockAppMainGenericFormPartialsActions;
