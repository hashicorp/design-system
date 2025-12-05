/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsAlert } from '@hashicorp/design-system-components/components';

const SubSectionIcon: TemplateOnlyComponent = <template>
  <ShwTextH2>Icon</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item>
      <HdsAlert @type="inline" @color="highlight" as |A|>
        <A.Title>Default icon</A.Title>
        <A.Description>Lorem ipsum dolor sit amet.</A.Description>
      </HdsAlert>
    </SG.Item>
    <SG.Item>
      <HdsAlert @type="inline" @color="highlight" @icon="meh" as |A|>
        <A.Title>With icon override</A.Title>
        <A.Description>Lorem ipsum dolor sit amet.</A.Description>
      </HdsAlert>
    </SG.Item>
    <SG.Item>
      <HdsAlert @type="inline" @color="highlight" @icon="running" as |A|>
        <A.Title>With animated icon</A.Title>
        <A.Description>Lorem ipsum dolor sit amet.</A.Description>
      </HdsAlert>
    </SG.Item>
    <SG.Item>
      <HdsAlert @type="inline" @color="highlight" @icon={{false}} as |A|>
        <A.Title>Without icon</A.Title>
        <A.Description>Lorem ipsum dolor sit amet.</A.Description>
      </HdsAlert>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionIcon;
