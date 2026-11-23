/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

import CodeFragmentWithExternalControl from 'showcase/components/page-components/dropdown/code-fragments/with-external-control';
import CodeFragmentWithReturnFocus from 'showcase/components/page-components/dropdown/code-fragments/with-return-focus';
import CodeFragmentOnboardingFlow from 'showcase/components/page-components/dropdown/code-fragments/onboarding-flow';
import CodeFragmentOnboardingFlowWithBubble from 'showcase/components/page-components/dropdown/code-fragments/onboarding-flow-with-bubble';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Using <code>preserveContentInDom</code></SFI.Label>
      <div class="shw-component-dropdown-fixed-height-container">
        <HdsDropdown
          @listPosition="bottom-left"
          @preserveContentInDom={{true}}
          as |D|
        >
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Header @hasDivider={{true}}>
            This header should always be present in the DOM, regardless of
            whether the dropdown is open or closed
          </D.Header>
          <D.Interactive @href="#">
            This item should always be present in the DOM, regardless of whether
            the dropdown is open or closed
          </D.Interactive>
          <D.Footer @hasDivider={{true}}>
            This footer should always be present in the DOM, regardless of
            whether the dropdown is open or closed
          </D.Footer>
        </HdsDropdown>
      </div>
    </SF.Item>
    <SF.Item @label="Using @forceState to externally control dropdown">
      <div class="shw-component-dropdown-fixed-height-container">
        <CodeFragmentWithExternalControl />
      </div>
    </SF.Item>
    <SF.Item @label="Using @returnFocusTo to move focus to another element on close">
      <div class="shw-component-dropdown-fixed-height-container">
        <CodeFragmentWithReturnFocus />
      </div>
    </SF.Item>
    <SF.Item>
      <ShwFlex as |SF2|>
        <SF2.Item
          @label="Using @forceState and @returnFocusTo to simulate onboarding flow with dropdown and nested rich tooltip"
          {{style flex="1"}}
        >
          <div class="shw-component-dropdown-fixed-height-container">
            <CodeFragmentOnboardingFlow />
          </div>
        </SF2.Item>
        <SF2.Item
          @label="Using @forceState and @returnFocusTo to simulate onboarding flow with dropdown and nested rich tooltip bubble"
          {{style flex="1"}}
        >
          <div class="shw-component-dropdown-fixed-height-container">
            <CodeFragmentOnboardingFlowWithBubble />
          </div>
        </SF2.Item>
      </ShwFlex>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionDemo;
