/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Text & leading icon">
      <HdsLinkStandalone
        @icon="plus"
        @text="Lorem ipsum"
        @href="../components/link"
      />
    </SF.Item>
    <SF.Item @label="Text & trailing icon">
      <HdsLinkStandalone
        @icon="arrow-right"
        @text="Lorem ipsum"
        @href="../components/link"
        @iconPosition="trailing"
      />
    </SF.Item>
    <SF.Item @label="With long text">
      <div {{style width="200px"}}>
        <HdsLinkStandalone
          @icon="plus"
          @text="Very long text that should wrap for multiple lines"
          @href="../components/link"
        />
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
