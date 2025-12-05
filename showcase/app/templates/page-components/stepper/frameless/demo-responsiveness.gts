/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

const PageComponentsStepperNavFramelessDemoResponsiveness: TemplateOnlyComponent =
  <template>
    <div {{style padding="24px"}}>
      <HdsStepperNav @currentStep={{1}} @ariaLabel="Label" as |S|>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Panel />
        <S.Panel />
        <S.Panel />
      </HdsStepperNav>

      <ShwDivider @level={{2}} />

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
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
        <S.Step>
          <:title>Title</:title>
          <:description>Description</:description>
        </S.Step>
      </HdsStepperNav>
    </div>
  </template>;

export default PageComponentsStepperNavFramelessDemoResponsiveness;
