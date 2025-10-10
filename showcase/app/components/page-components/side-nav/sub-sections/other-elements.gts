/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

const SubSectionOtherElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Other elements (not componentized)</ShwTextH2>

  <ShwTextH3>Skip Link (A11y Refocus)</ShwTextH3>
  <ShwFlex as |SF|>
    <SF.Item @label="Skip Link">
      <div class="shw-component-sim-other-elements">
        <div class="hds-side-nav">
          <a href="#" class="ember-a11y-refocus-skip-link">Skip to main content</a>
        </div>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionOtherElements;
