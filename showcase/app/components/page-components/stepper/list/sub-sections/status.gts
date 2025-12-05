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

import { HdsStepperList } from '@hashicorp/design-system-components/components';

const SubSectionStatus: TemplateOnlyComponent = <template>
  <ShwTextH2>Status</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Default">
      <HdsStepperList
        @titleTag="h3"
        @ariaLabel="Label"
        {{style width="200px"}}
        as |S|
      >
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 1: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 2: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="progress">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 3: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="incomplete">
          <:title>Title</:title>
        </S.Step>
      </HdsStepperList>
    </SG.Item>
    <SG.Item @label="All complete">
      <HdsStepperList
        @titleTag="h3"
        {{style width="200px"}}
        @ariaLabel="Label"
        as |S|
      >
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 1: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 2: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
          <:description>Description</:description>
          <:content>
            <ShwPlaceholder @text="Step 3: Generic content" @height="20" />
          </:content>
        </S.Step>
        <S.Step @status="complete">
          <:title>Title</:title>
        </S.Step>
      </HdsStepperList>
    </SG.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionStatus;
