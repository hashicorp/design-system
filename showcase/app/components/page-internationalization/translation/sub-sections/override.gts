/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH4 from 'showcase/components/shw/text/h4';

// HDS Components
import { HdsAppFooter } from '@hashicorp/design-system-components/components';

const SubSectionOverride: TemplateOnlyComponent = <template>
  <ShwTextH4 @tag="h3">Overriding of HDS translations</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @grow={{true}} as |SFI|>
      <SFI.Label><code>app-footer</code>
        with overridden (local) translations</SFI.Label>
      <HdsAppFooter as |F|>
        <F.LegalLinks />
      </HdsAppFooter>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionOverride;
