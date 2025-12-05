/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwOutliner from 'showcase/components/shw/outliner';

import { HdsFormVisibilityToggle } from '@hashicorp/design-system-components/components';

const SubSectionVisibilityToggle: TemplateOnlyComponent = <template>
  <ShwTextH2>Visibility toggle</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="On">
      <ShwOutliner>
        <HdsFormVisibilityToggle @isVisible={{true}} aria-label="is-visible" />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="Off">
      <ShwOutliner>
        <HdsFormVisibilityToggle
          @isVisible={{false}}
          aria-label="is-not-visible"
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionVisibilityToggle;
