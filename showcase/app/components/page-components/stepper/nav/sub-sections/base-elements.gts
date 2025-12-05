/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>NavStep</ShwTextH3>

  <ShwTextH4>Default</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Complete">
      <HdsStepperNav
        @currentStep={{1}}
        @isInteractive={{false}}
        @ariaLabel="Label"
        as |S|
      >
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
    <SG.Item @label="Active">
      <HdsStepperNav
        @currentStep={{0}}
        @isInteractive={{false}}
        @ariaLabel="Label"
        as |S|
      >
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
    <SG.Item @label="Incomplete">
      <HdsStepperNav
        @ariaLabel="Label"
        @isInteractive={{false}}
        class="shw-component-stepper-nav-step-mock-incomplete"
        as |S|
      >
        <S.Step {{style display="none"}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>Nav Interactive</ShwTextH4>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Complete">
      <HdsStepperNav @currentStep={{1}} @ariaLabel="Label" as |S|>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
    <SG.Item @label="Active">
      <HdsStepperNav @currentStep={{0}} @ariaLabel="Label" as |S|>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
    <SG.Item @label="Incomplete">
      <HdsStepperNav
        @ariaLabel="Label"
        class="shw-component-stepper-nav-step-mock-incomplete"
        as |S|
      >
        <S.Step {{style display="none"}}>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Step class="hds-stepper-navigation__step--incomplete">
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
  </ShwGrid>

  <ShwTextH4>Interactive States</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item @label="Complete/{{state}}">
        <HdsStepperNav @currentStep={{1}} @ariaLabel="Label" as |S|>
          <S.Step mock-state-value={{state}} mock-state-selector="button">
            <:title>Title</:title>
            <:description>Description</:description>
          </S.Step>
          <S.Panel />
        </HdsStepperNav>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Active/default">
      <HdsStepperNav @currentStep={{0}} @ariaLabel="Label" as |S|>
        <S.Step mock-state-value="default" mock-state-selector="button">
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
    <SG.Item @label="Active/focus">
      <HdsStepperNav @currentStep={{0}} @ariaLabel="Label" as |S|>
        <S.Step mock-state-value="focus" mock-state-selector="button">
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
      </HdsStepperNav>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>NavPanel</ShwTextH3>

  <HdsStepperNav
    @currentStep={{0}}
    @isInteractive={{false}}
    @ariaLabel="Nav panel"
    as |S|
  >
    <S.Panel>
      <ShwPlaceholder @text="Generic content" @height="100" />
    </S.Panel>
  </HdsStepperNav>

  <ShwDivider />
</template>;

export default SubSectionBaseElements;
