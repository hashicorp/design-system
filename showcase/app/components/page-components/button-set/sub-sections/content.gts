/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsButtonSet,
  HdsButton,
} from '@hashicorp/design-system-components/components';

import CodeFragmentWithLoadingState from 'showcase/components/page-components/button-set/code-fragments/with-loading-state';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Default">
      <HdsButtonSet>
        <HdsButton @text="Submit" type="submit" />
        <HdsButton
          @text="Cancel"
          @color="secondary"
          @href="https://hashicorp.com"
        />
      </HdsButtonSet>
    </SF.Item>
    <SF.Item @label="Parent with max-width">
      <ShwOutliner {{style width="300px"}}>
        <HdsButtonSet>
          <HdsButton @text="This is a very long text" type="submit" />
          <HdsButton
            @text="This is also a very long text"
            @color="secondary"
            @href="https://hashicorp.com"
          />
        </HdsButtonSet>
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="Parent with max-width and buttons full with">
      <ShwOutliner {{style width="300px"}}>
        <HdsButtonSet>
          <HdsButton @text="Save" @isFullWidth={{true}} />
          <HdsButton
            @text="Cancel"
            @isFullWidth={{true}}
            @color="secondary"
            @href="#"
          />
        </HdsButtonSet>
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      {{style width="300px"}}
      @label="Idle/Loading states (click 'Save' to toggle)"
    >
      <ShwOutliner {{style width="300px"}}>
        <CodeFragmentWithLoadingState />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
